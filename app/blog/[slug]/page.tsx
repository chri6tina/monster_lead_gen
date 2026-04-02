import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ChevronLeft, Calendar, User, ArrowRight, ArrowLeft } from "lucide-react";
import fs from 'fs/promises';
import path from 'path';
import { supabase } from "@/lib/supabase";

// Define the shape of our AI Agent Blog Payload
interface BlogData {
  title: string;
  excerpt: string;
  content: string; // HTML string
  author: string;
  date: string;
  targetNiche?: string;
  targetCity?: string;
  linkedUrl?: string; // Optional direct custom URL to link to at bottom
}

async function getBlogData(slug: string): Promise<BlogData | null> {
  // 1. Try Supabase
  if (supabase) {
    try {
      const { data, error } = await supabase.from('blogs').select('*').eq('slug', slug).single();
      if (!error && data) {
        return data as BlogData;
      }
    } catch (e) {
      console.warn(`Supabase fetch failed for blog slug: ${slug}`, e);
    }
  }

  // 2. Fallback to Local JSON
  try {
    const dataPath = path.join(process.cwd(), 'data', 'blogs', `${slug}.json`);
    const fileContents = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(fileContents) as BlogData;
  } catch (err) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const data = await getBlogData(resolvedParams.slug);
  
  if (!data) {
    return { title: 'Intelligence Report Not Found | Lead Monster' };
  }

  return {
    title: `${data.title} | Lead Monster Intelligence`,
    description: data.excerpt,
  };
}

export const revalidate = 60; // Force ISR: Cache this page to prevent Supabase bottlenecking, but invalidate every 60 seconds for fresh AI data

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const data = await getBlogData(resolvedParams.slug);

  if (!data) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white py-20 px-6">
        <h1 className="text-4xl font-black uppercase mb-4 text-emerald-500">404: Report Unclassified</h1>
        <p className="text-zinc-400 mb-8 max-w-sm text-center">We cannot locate this intelligence report. It may have been archived or removed by our agents.</p>
        <Link href="/blog" className="px-6 py-3 bg-zinc-900 border border-zinc-800 hover:border-emerald-500 rounded-full font-bold flex items-center gap-2 text-sm uppercase tracking-widest transition-all">
          <ArrowLeft className="w-4 h-4" /> Return to Database
        </Link>
      </div>
    );
  }

  // Generate Structured Data (JSON-LD) for Google Rich Snippets
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.leadmonster.com';
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": data.title,
    "description": data.excerpt,
    "author": [{
      "@type": "Person",
      "name": data.author || "LeadMonster Intelligence",
      "url": baseUrl
    }],
    "datePublished": new Date(data.date).toISOString(),
    "url": `${baseUrl}/blog/${resolvedParams.slug}`
  };

  // Derive contextual URLs if tags exist
  const derivedLink = data.targetCity && data.targetNiche 
    ? `/${data.targetNiche}/${data.targetCity}` 
    : (data.targetNiche ? `/${data.targetNiche}` : '/businesses');

  const ctaLink = data.linkedUrl || derivedLink;

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-50 flex flex-col pt-20 selection:bg-emerald-500/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Navbar Drop-in */}
      <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-[10px] overflow-hidden border border-emerald-500/30 flex items-center justify-center bg-zinc-900 shadow-[0_0_10px_rgba(16,185,129,0.2)] group-hover:border-emerald-500/60 transition-all">
              <Image src="/mascot.png" alt="Lead Monster" width={48} height={48} className="object-cover scale-150 group-hover:scale-[1.6] transition-transform" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase text-white hidden sm:block">
              Lead<span className="text-emerald-500">Monster</span>
            </span>
          </Link>
          <div className="flex items-center gap-8 text-sm font-bold text-zinc-400">
            <Link href="/blog" className="flex items-center gap-2 hover:text-emerald-400 transition-colors uppercase tracking-widest"><ChevronLeft className="w-4 h-4"/> Back to Index</Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Article Header */}
        <section className="pt-24 pb-16 relative border-b border-zinc-900">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
          <div className="container mx-auto px-6 max-w-3xl relative z-10 text-center">
            
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              {data.targetCity && (
                 <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-bold text-zinc-400 uppercase tracking-widest">
                   {data.targetCity.replace(/-/g, ' ')}
                 </span>
              )}
              {data.targetNiche && (
                 <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-bold text-emerald-400 uppercase tracking-widest">
                   {data.targetNiche.replace(/-/g, ' ')}
                 </span>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter mb-8 leading-[1.05]">
              {data.title}
            </h1>
            
            <p className="text-xl text-zinc-400 leading-relaxed font-medium mb-12 italic">
              "{data.excerpt}"
            </p>
            
            <div className="flex items-center justify-center gap-6 text-sm font-bold text-zinc-500 uppercase tracking-widest">
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-emerald-500" /> {new Date(data.date).toLocaleDateString()}</span>
              <span className="flex items-center gap-2"><User className="w-4 h-4 text-emerald-500" /> {data.author || 'Intelligence Div.'}</span>
            </div>
          </div>
        </section>

        {/* Article Content Matrix */}
        <section className="py-20 bg-zinc-950 relative z-10">
          <div className="container mx-auto px-6 max-w-5xl flex flex-col lg:flex-row gap-16">
            
            {/* Main Article Content */}
            <div className="flex-1 w-full lg:max-w-3xl">
              
              {/* Executive Summary Agent Container */}
              <div className="bg-emerald-900/10 border border-emerald-500/20 rounded-2xl p-8 mb-16 shadow-[0_0_30px_rgba(16,185,129,0.05)]">
                <h3 className="text-emerald-400 font-black uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> Executive Summary
                </h3>
                <p className="text-zinc-300 leading-relaxed font-medium text-lg">&quot;{data.excerpt}&quot;</p>
              </div>

              {/* The actual HTML injected by the AI Agent */}
              {/* Complex descendant selectors handle spacing natively without Typography Plugin */}
              <article 
                className="max-w-none text-zinc-300 leading-[1.9] tracking-wide 
                  [&>p]:mb-10 [&>p]:text-lg
                  [&>h2]:text-3xl lg:[&>h2]:text-4xl [&>h2]:font-black [&>h2]:text-white [&>h2]:uppercase [&>h2]:mb-8 [&>h2]:mt-20 [&>h2]:tracking-tight
                  [&>h3]:text-2xl [&>h3]:font-black [&>h3]:text-zinc-100 [&>h3]:mb-6 [&>h3]:mt-16 [&>h3]:tracking-tight
                  [&>h4]:text-xl [&>h4]:font-bold [&>h4]:text-emerald-400 [&>h4]:mb-4 [&>h4]:mt-10
                  [&>ul]:mb-12 [&>ul]:list-none [&>ul]:pl-0 [&>ul>li]:mb-4 [&>ul>li]:pl-6 [&>ul>li]:relative [&>ul>li]:text-lg
                  [&>ul>li::before]:content-[''] [&>ul>li::before]:absolute [&>ul>li::before]:left-0 [&>ul>li::before]:top-3 [&>ul>li::before]:w-2 [&>ul>li::before]:h-2 [&>ul>li::before]:bg-emerald-500 [&>ul>li::before]:rounded-full
                  [&>ol]:mb-12 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol>li]:mb-4 [&>ol>li]:text-lg [&>ol>li]:pl-2 marker:[&>ol>li]:text-emerald-500 marker:[&>ol>li]:font-black
                  [&>strong]:text-white [&>strong]:font-bold 
                  [&>blockquote]:border-l-4 [&>blockquote]:border-emerald-500 [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-emerald-400/80 [&>blockquote]:mb-10 [&>blockquote]:text-xl
                  [&>a]:text-emerald-400 [&>a]:underline [&>a]:underline-offset-4 hover:[&>a]:text-emerald-300 transition-colors
                  [&>img]:rounded-2xl [&>img]:mb-10 [&>img]:border [&>img]:border-zinc-800 [&>img]:shadow-2xl [&>img]:w-full
                  [&>figure]:mb-12 [&>figure>img]:rounded-2xl [&>figure>img]:border [&>figure>img]:border-zinc-800 [&>figure>img]:w-full [&>figure>figcaption]:text-center [&>figure>figcaption]:text-sm [&>figure>figcaption]:text-zinc-500 [&>figure>figcaption]:mt-4 [&>figure>figcaption]:italic
                  [&>table]:w-full [&>table]:mb-12 [&>table]:border-collapse [&>table]:text-sm [&>table]:text-left
                  [&>table_th]:bg-zinc-900 [&>table_th]:text-white [&>table_th]:font-bold [&>table_th]:uppercase [&>table_th]:p-4 [&>table_th]:border [&>table_th]:border-zinc-800
                  [&>table_td]:p-4 [&>table_td]:border [&>table_td]:border-zinc-800 [&>table_td]:text-zinc-400
                  [&>svg]:w-full [&>svg]:h-auto [&>svg]:mb-10 [&>svg]:bg-zinc-900 [&>svg]:rounded-2xl [&>svg]:p-6 [&>svg]:border [&>svg]:border-zinc-800"
                dangerouslySetInnerHTML={{ __html: data.content }} 
              />
              
              {/* In-Line CTA matching exact Niche/City mappings */}
              <div className="mt-24 pt-16 border-t border-zinc-900 flex flex-col items-center justify-center text-center bg-zinc-900/30 rounded-3xl p-12">
                 <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center mb-6 shadow-xl text-emerald-400 hover:scale-110 transition-transform cursor-default">
                    <ArrowRight className="w-8 h-8" />
                 </div>
                 <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">Ready to Deploy This Strategy?</h3>
                 <p className="text-zinc-400 max-w-md mx-auto mb-8 leading-relaxed">Stop manually researching and start dialing. We have verified {data.targetNiche ? data.targetNiche.replace(/-/g, ' ') : 'Outbound B2B'} prospect databases ready for immediate download.</p>
                 <Link href={ctaLink} className="inline-block px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 rounded-full font-black uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:-translate-y-1 transition-all">
                   View {data.targetCity ? 'Local' : 'Available'} Prospects
                 </Link>
              </div>
            </div>

            {/* Sidebar (Author / Metadata Engine) */}
            <div className="hidden lg:block w-[320px] shrink-0">
               <div className="sticky top-32">
                 <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-8 shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px] pointer-events-none"></div>
                   
                   <h4 className="text-xs uppercase font-black tracking-widest text-zinc-500 mb-6">Agent Insight</h4>
                   <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm uppercase tracking-wider">{data.author || 'Intelligence Div.'}</div>
                        <div className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Lead Monster</div>
                      </div>
                   </div>
                   
                   <div className="space-y-4 mb-8">
                     <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
                       <span className="block text-[10px] uppercase font-bold tracking-widest text-emerald-500 mb-1">Target Sector</span>
                       <span className="text-sm font-bold text-zinc-300 capitalize">{data.targetNiche ? data.targetNiche.replace(/-/g, ' ') : 'General Strategy'}</span>
                     </div>
                     <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
                       <span className="block text-[10px] uppercase font-bold tracking-widest text-emerald-500 mb-1">Market Analysis</span>
                       <span className="text-sm font-bold text-zinc-300 capitalize">{data.targetCity ? data.targetCity.replace(/-/g, ' ') : 'National Level'}</span>
                     </div>
                   </div>

                   <Link href={ctaLink} className="flex items-center justify-center gap-2 w-full py-4 bg-zinc-800 hover:bg-emerald-500 text-white hover:text-zinc-950 transition-colors rounded-xl font-bold text-xs uppercase tracking-widest group">
                     Take Action <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </Link>
                 </div>
               </div>
            </div>

          </div>
        </section>
      </main>

      {/* Footer Minimal */}
      <footer className="bg-zinc-950 py-12 border-t border-zinc-900 relative">
        <div className="container mx-auto px-6 text-center text-zinc-600 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-4">
           <span>&copy; {new Date().getFullYear()} Lead Monster Intelligence.</span>
        </div>
      </footer>
    </div>
  );
}
