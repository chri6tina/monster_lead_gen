import Link from "next/link";
import Image from "next/image";
import { 
  CheckCircle2, 
  Search,
  ShoppingCart,
  Database,
  ChevronRight,
  MapPin,
  X,
  UserCheck
} from "lucide-react";
import { PricingSection } from "@/components/PricingSection";
import fs from 'fs/promises';
import path from 'path';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ niche: string; city: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  
  let decodedNiche = decodeURIComponent(resolvedParams.niche || "");
  const rawNiche = decodedNiche.toLowerCase().replace(/-leads$/, '').replace(/-/g, ' ').replace(/[^a-z0-9 ]/g, '').trim();
  const formattedNiche = rawNiche.split(' ').filter(Boolean).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  let decodedCity = decodeURIComponent(resolvedParams.city || "");
  decodedCity = decodedCity.toLowerCase().replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '');
  const cityParts = decodedCity.split('-');
  
  let stateAbbr = "";
  if (cityParts.length > 1 && cityParts[cityParts.length - 1].length === 2) {
    stateAbbr = cityParts.pop()?.toUpperCase() || "";
  }
  const cityName = cityParts.filter(Boolean).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const formattedLocation = stateAbbr ? `${cityName}, ${stateAbbr}` : cityName;

  return {
    title: `Buy ${formattedNiche} Leads in ${formattedLocation} | Lead Monster`,
    description: `Download verified B2B contact lists for ${formattedNiche} prospects in ${formattedLocation}. Get direct emails and cell phones to close commercial contracts.`,
  };
}

// Server Component for dynamic routes in Next.js App Router (App router uses `params` as a Promise in Next.js 15+)
// Note: Depending on Next.js exact version, params is either a promise (Next.js 15+) or an object (Next.js 14-). Since we're using latest app router (Next.js 15+ convention), let's await it.
export default async function CityPage({ params }: { params: Promise<{ niche: string; city: string }> }) {
  const resolvedParams = await params;
  
  let decodedNiche = decodeURIComponent(resolvedParams.niche || "");
  const rawNiche = decodedNiche.toLowerCase().replace(/-leads$/, '').replace(/-/g, ' ').replace(/[^a-z0-9 ]/g, '').trim();
  const formattedNiche = rawNiche.split(' ').filter(Boolean).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  let decodedCity = decodeURIComponent(resolvedParams.city || "");
  decodedCity = decodedCity.toLowerCase().replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '');
  const cityParts = decodedCity.split('-');
  
  let stateAbbr = "";
  if (cityParts.length > 1 && cityParts[cityParts.length - 1].length === 2) {
    stateAbbr = cityParts.pop()?.toUpperCase() || "";
  }
  const cityName = cityParts.filter(Boolean).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const formattedLocation = stateAbbr ? `${cityName}, ${stateAbbr}` : cityName;

  // ==== AGENT DATA INGESTION HOOK ====
  // Future AI Agents (like the Cleaning Company Agent Manager) will write their heavily researched 
  // content into JSON files structured like: /data/commercial-cleaning-leads/jacksonville-fl.json
  // If the file exists, the template uses it. If not, it gracefully degrades to the optimized universal SEO template.
  let agentData: any = null;
  try {
    const dataPath = path.join(process.cwd(), 'data', resolvedParams.niche, `${resolvedParams.city}.json`);
    const fileContents = await fs.readFile(dataPath, 'utf-8');
    agentData = JSON.parse(fileContents);
  } catch (err) {
    // No custom agent data generated yet for this specific city/niche combo
  }

  // SEO Optimized Fallbacks (Long-Tail Focus)
  const heroHeadline = agentData?.heroHeadline || `Dominate The ${formattedLocation} ${formattedNiche} Market.`;
  const heroSub = agentData?.heroSub || `Buy verified ${formattedNiche.toLowerCase()} leads in ${formattedLocation}. Access direct emails, cell phones, and facility decision-makers instantly to secure top-tier commercial contracts without wasting ad spend.`;
  const infoHeading = agentData?.infoHeading || `Why Buy Exclusive ${formattedLocation} ${formattedNiche} Leads?`;
  const infoParagraph = agentData?.infoParagraph || `Scaling a ${formattedNiche.toLowerCase()} business in ${cityName} requires speed and direct access. Stop paying for shared, low-converting homeowner leads. Purchase a static, manually-verified database of ${formattedLocation} B2B prospects and own your outreach pipeline forever.`;

  // Local Blogs Hook
  const localBlogs = agentData?.blogs || [
    { 
      title: `How to Secure ${formattedNiche} Contracts in ${formattedLocation}`, 
      excerpt: `Discover the exact outreach strategies and decision-maker scripts for closing commercial deals and scaling your growing agency in the ${cityName} area.`, 
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      url: "#blog" 
    },
    { 
      title: `Top 5 Lead Generation Mistakes ${formattedNiche} Businesses Make in ${stateAbbr || cityName}`, 
      excerpt: `Avoid these costly errors when doing cold outreach to facility managers, offices, and decision makers in ${formattedLocation}.`, 
      date: new Date(Date.now() - 86400000 * 3).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      url: "#blog" 
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-50 flex flex-col pt-20 selection:bg-emerald-500/30">
      {/* Navbar - Sticky at top */}
      <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-[10px] overflow-hidden border border-emerald-500/30 flex items-center justify-center bg-zinc-900 shadow-[0_0_10px_rgba(16,185,129,0.2)] group-hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] group-hover:border-emerald-500/60 transition-all">
              <Image src="/mascot.png" alt="Lead Monster" width={48} height={48} className="object-cover scale-150 group-hover:scale-[1.6] transition-transform" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase text-white group-hover:opacity-90 transition-opacity">
              Lead<span className="text-emerald-500">Monster</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-zinc-400">
            <Link href="/" className="hover:text-emerald-400 transition-colors uppercase tracking-wide">Back to Home</Link>
            <Link href="#pricing" className="hover:text-emerald-400 transition-colors uppercase tracking-wide">View Packages</Link>
          </div>
          <div className="flex items-center">
            <Link 
              href="#pricing" 
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 px-6 py-2.5 rounded-full font-black transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] flex items-center gap-2 uppercase text-sm tracking-wide"
            >
              Shop {cityName} <ShoppingCart className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section Dynamic */}
        <section className="relative pt-20 pb-32 overflow-hidden border-b border-zinc-900">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/20 rounded-full blur-[140px] opacity-50 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-[120px] opacity-40 pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
          
          <div className="container mx-auto px-6 relative z-10 text-center max-w-5xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-xs sm:text-sm mb-8 uppercase tracking-widest shadow-[0_0_10px_rgba(16,185,129,0.1)]">
              <MapPin className="h-4 w-4" /> Exclusive {formattedLocation} Territory
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-white tracking-tighter mb-8 leading-[1.05] uppercase">
              {heroHeadline.split(formattedLocation).map((part: string, i: number, arr: any[]) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500">{formattedLocation}</span>}
                </span>
              ))}
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              {agentData?.heroSub ? agentData.heroSub : (
                <>Verified contact info for local decision-makers in the <strong>{formattedLocation} {formattedNiche}</strong> space. Skip the gatekeepers. Unlock commercial contracts instantly.</>
              )}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                href="#pricing" 
                className="w-full sm:w-auto px-8 py-5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 rounded-full font-black text-lg transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] flex items-center justify-center gap-3 uppercase tracking-wider hover:-translate-y-1"
              >
                View {cityName} Packages <ChevronRight className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </section>

        {/* Universal Pricing Section Directly Under Hero */}
        <PricingSection 
          cityName={cityName} 
          formattedLocation={formattedLocation} 
          formattedNiche={formattedNiche} 
        />

        {/* Information Section */}
        <section className="py-24 bg-zinc-950 relative border-b border-zinc-900">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">{infoHeading}</h2>
                <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
                  {infoParagraph}
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="bg-emerald-500/10 p-2 rounded-lg mt-1"><CheckCircle2 className="h-5 w-5 text-emerald-400" /></div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">{agentData?.feat1Title || "Exclusive Data Ownership"}</h4>
                      <p className="text-zinc-500 text-sm">{agentData?.feat1Desc || `Download our ${formattedLocation} targeted directory and own the B2B contact records forever to pitch infinitely.`}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-emerald-500/10 p-2 rounded-lg mt-1"><UserCheck className="h-5 w-5 text-emerald-400" /></div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">{agentData?.feat2Title || "Direct to Decision-Makers"}</h4>
                      <p className="text-zinc-500 text-sm">{agentData?.feat2Desc || `Bypass gatekeepers using verified cell phones and direct email addresses of ${cityName} business owners and facility managers.`}</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 relative overflow-hidden h-full flex flex-col justify-center shadow-xl">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px]"></div>
                 <h3 className="text-2xl font-black text-white mb-4 z-10">Stop Renting Traffic.</h3>
                 <p className="text-zinc-400 z-10">Ads cost you money every time someone clicks. A static cold lead list costs you once. We&apos;ve done the heavy lifting of scraping, cleaning, and verifying {formattedNiche} prospects in {formattedLocation}. You just have to dial.</p>
              </div>
            </div>
          </div>
        </section>



        {/* FAQ Section */}
        <section className="py-24 bg-zinc-950 border-t border-zinc-900">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">Frequently Asked Questions</h2>
              <p className="text-lg text-zinc-400">Everything you need to know about our {formattedLocation} data.</p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-emerald-500/30 transition-colors cursor-default">
                <h4 className="text-xl font-bold text-white mb-3">Are these {formattedLocation} leads exclusive?</h4>
                <p className="text-zinc-400 leading-relaxed">Our static database products give you access to all verified {formattedNiche} prospects in the area. Like a highly-targeted directory, they belong to you once downloaded to market to continuously.</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-emerald-500/30 transition-colors cursor-default">
                <h4 className="text-xl font-bold text-white mb-3">How accurate is the contact data?</h4>
                <p className="text-zinc-400 leading-relaxed">We use premium aggregation and manual scraping verification to ensure high delivery rates for direct emails and cell phones. We constantly refresh the {cityName} database.</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-emerald-500/30 transition-colors cursor-default">
                <h4 className="text-xl font-bold text-white mb-3">What if contacts have bounced or moved on?</h4>
                <p className="text-zinc-400 leading-relaxed">We over-deliver on every list (providing 10-15% extra contacts at no charge) specifically to account for any natural business turnover in {formattedLocation}.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Local Insights & Articles (Blog Hub) */}
        <section className="py-24 bg-zinc-950 border-t border-zinc-900 relative">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="container mx-auto px-6 max-w-5xl relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight">Local {cityName} Insights</h2>
                <p className="text-lg text-zinc-400">Strategies, tips, and articles for dominating the {formattedNiche} market in {formattedLocation}.</p>
              </div>
              <Link href="/blog" className="px-6 py-3 bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 text-white rounded-full font-bold text-sm transition-all hover:bg-zinc-800 whitespace-nowrap hidden sm:block shadow-sm">
                View All Articles
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {localBlogs.map((blog: any, i: number) => (
                <Link key={i} href={blog.url} className="group block bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-emerald-500/50 hover:bg-zinc-800/80 transition-all shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/20 group-hover:bg-emerald-500 transition-colors"></div>
                  <span className="text-emerald-500 text-xs font-black uppercase tracking-widest mb-4 block">{blog.date}</span>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors leading-tight">{blog.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">{blog.excerpt}</p>
                  <div className="flex items-center text-xs font-bold text-emerald-500 uppercase tracking-widest group-hover:gap-2 transition-all gap-1">
                    Read Article <ChevronRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
              <Link href="/blog" className="inline-block px-8 py-4 bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 text-white rounded-full font-bold text-sm transition-all">
                View All Articles
              </Link>
            </div>
          </div>
        </section>

        {/* Sibling Cities / Nearby Markets */}
        <section className="py-24 bg-zinc-950 border-t border-zinc-900 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="container mx-auto px-6 relative z-10 max-w-6xl">
            <h2 className="text-3xl font-black text-white mb-10 uppercase tracking-tight text-center">Dominate More {stateAbbr ? `${stateAbbr} ` : ''}Markets</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: "Atlanta, GA", slug: "atlanta-ga" },
                { name: "Dallas, TX", slug: "dallas-tx" },
                { name: "Miami, FL", slug: "miami-fl" },
                { name: "Denver, CO", slug: "denver-co" },
                { name: "Phoenix, AZ", slug: "phoenix-az" },
                { name: "Charlotte, NC", slug: "charlotte-nc" },
                { name: "Austin, TX", slug: "austin-tx" },
                { name: "Seattle, WA", slug: "seattle-wa" }
              ].map((cityItem, i) => (
                <Link 
                  key={i} 
                  href={`/${resolvedParams.niche}/${cityItem.slug}`}
                  className="bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-800 text-zinc-300 hover:text-white px-6 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2 group shadow-sm"
                >
                  <MapPin className="h-4 w-4 text-zinc-600 group-hover:text-emerald-400 transition-colors" /> {formattedNiche} in {cityItem.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 py-20 border-t border-zinc-900 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-16">
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-[12px] overflow-hidden border border-emerald-500/30 flex items-center justify-center bg-zinc-900 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  <Image src="/mascot.png" alt="Lead Monster" width={56} height={56} className="object-cover scale-150" />
                </div>
                <span className="text-2xl font-black tracking-tighter text-white uppercase">Lead<span className="text-emerald-500">Monster</span></span>
              </div>
              <p className="text-zinc-400 max-w-sm mb-6 text-lg font-medium leading-relaxed">
                The leading B2B Data Broker for modern Starter Hustles.
              </p>
            </div>
            
            <div>
              <h4 className="font-black text-white mb-6 uppercase tracking-widest text-sm text-emerald-500">Explore</h4>
              <ul className="space-y-4">
                <li><Link href="/" className="text-zinc-400 hover:text-white transition-colors font-semibold">Home</Link></li>
                <li><Link href="/contact" className="text-zinc-400 hover:text-white transition-colors font-semibold">Support</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6 text-zinc-600 font-bold text-sm">
            <p>&copy; {new Date().getFullYear()} Lead Monster. All rights reserved.</p>
            <p className="uppercase tracking-widest text-emerald-900/40 text-xs sm:text-sm">For Hustlers Who Dominate.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
