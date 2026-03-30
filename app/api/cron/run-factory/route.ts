import { NextResponse } from 'next/server';
import { runDailyContentFactory, activeIndustries, allUsCities } from '@/bots/orchestrator';

// Vercel Serverless maximum timeout capability (Requires Pro plan for 300)
export const maxDuration = 300; 

// Disable caching entirely so cron triggers fresh computation every time
export const dynamic = 'force-dynamic'; 

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const authHeader = request.headers.get('authorization');
    
    // 1. Enforce Vercel Cron Security Authentication
    // Vercel securely passes `Bearer <CRON_SECRET>` when it triggers this endpoint
    const internalSecret = process.env.CRON_SECRET;
    if (internalSecret) {
      const expectedAuth = `Bearer ${internalSecret}`;
      if (authHeader !== expectedAuth) {
        console.warn(`[VERCEL CRON] Unauthorized access attempt blocked.`);
        return NextResponse.json({ error: 'Unauthorized: Invalid Cron Secret' }, { status: 401 });
      }
    } else {
      console.warn(`[VERCEL CRON] WARNING: No CRON_SECRET defined in .env.local! Endpoint is currently unprotected.`);
    }

    // 2. Identify which industry to run via query parameter (?industry=niche-slug)
    const industrySlug = searchParams.get('industry');
    if (!industrySlug) {
      return NextResponse.json({ error: 'Missing required `industry` query parameter. Example: ?industry=hvac-leads' }, { status: 400 });
    }

    const targetIndustry = activeIndustries.find(i => i.slug === industrySlug);
    if (!targetIndustry) {
      return NextResponse.json({ error: `Industry slug '${industrySlug}' not found in active configuration.` }, { status: 404 });
    }

    // 3. Trigger the Bot Army securely on the server
    console.log(`[VERCEL CRON] Waking up Bot Army for: ${targetIndustry.name}`);
    
    // Await the generation so it finishes before Vercel kills the container
    await runDailyContentFactory(targetIndustry.name, targetIndustry.slug, allUsCities);

    return NextResponse.json({
      success: true,
      message: `Successfully executed Bot Army loop for ${targetIndustry.name}`,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('[VERCEL CRON ERROR]', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Bot Army Execution Failed',
      details: error?.message || 'Unknown server error'
    }, { status: 500 });
  }
}
