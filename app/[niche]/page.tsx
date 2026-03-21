import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { 
  Building2, 
  MapPin, 
  ChevronRight, 
  Target, 
  TrendingUp, 
  ShieldCheck,
  Search,
  CheckCircle2
} from "lucide-react";
import { PricingSection } from "@/components/PricingSection";

export async function generateMetadata({ params }: { params: Promise<{ niche: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  let decodedNiche = decodeURIComponent(resolvedParams.niche || "");
  const rawNiche = decodedNiche.toLowerCase().replace(/-leads$/, '').replace(/-/g, ' ').replace(/[^a-z0-9 ]/g, '').trim();
  const formattedNiche = rawNiche.split(' ').filter(Boolean).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return {
    title: `Buy ${formattedNiche} Leads | Nationwide B2B Databases`,
    description: `Stop competing for residential scraps. Download direct commercial ${formattedNiche.toLowerCase()} leads and scale your recurring B2B revenue. Explore our nationwide directory.`,
  };
}

// A standard list of states to jumpstart the location hub
const US_STATES = [
  { name: "Alabama", abbr: "al" }, { name: "Alaska", abbr: "ak" }, { name: "Arizona", abbr: "az" },
  { name: "Arkansas", abbr: "ar" }, { name: "California", abbr: "ca" }, { name: "Colorado", abbr: "co" },
  { name: "Connecticut", abbr: "ct" }, { name: "Delaware", abbr: "de" }, { name: "Florida", abbr: "fl" },
  { name: "Georgia", abbr: "ga" }, { name: "Hawaii", abbr: "hi" }, { name: "Idaho", abbr: "id" },
  { name: "Illinois", abbr: "il" }, { name: "Indiana", abbr: "in" }, { name: "Iowa", abbr: "ia" },
  { name: "Kansas", abbr: "ks" }, { name: "Kentucky", abbr: "ky" }, { name: "Louisiana", abbr: "la" },
  { name: "Maine", abbr: "me" }, { name: "Maryland", abbr: "md" }, { name: "Massachusetts", abbr: "ma" },
  { name: "Michigan", abbr: "mi" }, { name: "Minnesota", abbr: "mn" }, { name: "Mississippi", abbr: "ms" },
  { name: "Missouri", abbr: "mo" }, { name: "Montana", abbr: "mt" }, { name: "Nebraska", abbr: "ne" },
  { name: "Nevada", abbr: "nv" }, { name: "New Hampshire", abbr: "nh" }, { name: "New Jersey", abbr: "nj" },
  { name: "New Mexico", abbr: "nm" }, { name: "New York", abbr: "ny" }, { name: "North Carolina", abbr: "nc" },
  { name: "North Dakota", abbr: "nd" }, { name: "Ohio", abbr: "oh" }, { name: "Oklahoma", abbr: "ok" },
  { name: "Oregon", abbr: "or" }, { name: "Pennsylvania", abbr: "pa" }, { name: "Rhode Island", abbr: "ri" },
  { name: "South Carolina", abbr: "sc" }, { name: "South Dakota", abbr: "sd" }, { name: "Tennessee", abbr: "tn" },
  { name: "Texas", abbr: "tx" }, { name: "Utah", abbr: "ut" }, { name: "Vermont", abbr: "vt" },
  { name: "Virginia", abbr: "va" }, { name: "Washington", abbr: "wa" }, { name: "West Virginia", abbr: "wv" },
  { name: "Wisconsin", abbr: "wi" }, { name: "Wyoming", abbr: "wy" }
];

export default async function NicheHubPage({ params }: { params: Promise<{ niche: string }> }) {
  const resolvedParams = await params;
  
  let decodedNiche = decodeURIComponent(resolvedParams.niche || "");
  const rawNiche = decodedNiche.toLowerCase().replace(/-leads$/, '').replace(/-/g, ' ').replace(/[^a-z0-9 ]/g, '').trim();
  const formattedNiche = rawNiche.split(' ').filter(Boolean).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-50 flex flex-col pt-20 selection:bg-emerald-500/30">
      {/* Navbar Minimal */}
      <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-[10px] overflow-hidden border border-emerald-500/30 flex items-center justify-center bg-zinc-900 shadow-[0_0_10px_rgba(16,185,129,0.2)] group-hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all">
              <Image src="/mascot.png" alt="Lead Monster" width={48} height={48} className="object-cover scale-150 group-hover:scale-[1.6] transition-transform" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase text-white group-hover:opacity-90 transition-opacity">
              Lead<span className="text-emerald-500">Monster</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-zinc-400">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <Link href="/businesses" className="text-emerald-400 transition-colors">Industries</Link>
            <Link href="/contact" className="hover:text-emerald-400 transition-colors">Custom Orders</Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Industry Hero */}
        <section className="pt-24 pb-20 relative overflow-hidden border-b border-zinc-900">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
          <div className="container mx-auto px-6 max-w-6xl relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-xs sm:text-sm mb-8 uppercase tracking-widest shadow-[0_0_10px_rgba(16,185,129,0.1)]">
              <Building2 className="h-4 w-4" /> B2B Sector Operations
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-white tracking-tighter mb-8 leading-[1.05] uppercase">
              Scale Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500">{formattedNiche}</span><br /> Business Fast.
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl leading-relaxed font-medium mb-12">
              Skip the residential tire-kickers and low-margin home jobs. Step into the commercial arena where facility managers and corporate decision-makers sign <strong>high-ticket recurring contracts</strong>.
            </p>
          </div>
        </section>

        {/* Confidence & Success Section */}
        <section className="py-24 bg-zinc-950 relative">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight text-center">Stop Relying on Inbound Hope</h2>
            <p className="text-lg text-zinc-400 text-center max-w-2xl mx-auto leading-relaxed mb-16">
              Most {formattedNiche.toLowerCase()} businesses fail because they sit back and wait for customers to find them via expensive Ads or word-of-mouth. Dominate your state by taking control of your outreach.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl hover:border-emerald-500/30 transition-all shadow-lg relative cursor-default">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/20 rounded-l-3xl"></div>
                <Target className="w-10 h-10 text-emerald-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">1. Precision Targeting</h3>
                <p className="text-zinc-400 leading-relaxed text-sm">
                  We aggressively scrape public and private data to isolate the exact facility managers, property owners, and corporate decision-makers who actually hold the checkbook for {formattedNiche.toLowerCase()} contracts.
                </p>
              </div>
              
              <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl hover:border-emerald-500/30 transition-all shadow-lg relative cursor-default">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/20 rounded-l-3xl"></div>
                <ShieldCheck className="w-10 h-10 text-emerald-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">2. Gain Vendor Confidence</h3>
                <p className="text-zinc-400 leading-relaxed text-sm">
                  You don't need a massive agency to close commercial work. Armed with direct phone numbers and emails, you bypass the front desk entirely. Pitch yourself directly to the boss with absolute confidence.
                </p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl hover:border-emerald-500/30 transition-all shadow-lg relative cursor-default">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/20 rounded-l-3xl"></div>
                <TrendingUp className="w-10 h-10 text-emerald-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">3. Recurring B2B Revenue</h3>
                <p className="text-zinc-400 leading-relaxed text-sm">
                  One $3,000/month commercial {formattedNiche.toLowerCase()} contract is worth hundreds of tiny residential requests. By acquiring a verified prospect database, you fill your pipeline with 100% B2B intent.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Universal Pricing Section */}
        <PricingSection formattedNiche={formattedNiche} />

        {/* Content Expansion: The Opportunity Section */}
        <section className="py-24 bg-zinc-950 border-t border-zinc-900 relative">
          <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="container mx-auto px-6 max-w-5xl relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">Stop Wasting Time on <span className="text-emerald-500">Inbound Hope</span></h2>
                <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
                  Most {formattedNiche.toLowerCase()} businesses fail because they sit back and wait for customers to find them via expensive Ads or word-of-mouth. Dominate your state by taking control of your outreach proactively. By acquiring a clean, structured database of relevant decision makers, you can completely bypass local competitors who are fighting over expensive Google Search clicks.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                    <p className="text-zinc-300"><strong>Guaranteed Cost structure:</strong> Ads drain your budget daily. Our static {formattedNiche} lists cost money exactly once.</p>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                    <p className="text-zinc-300"><strong>Outbound Predictability:</strong> If you know that 100 outreach emails generate 1 meeting, a 500-contact list gives you a mathematical roadmap to 5 new contracts.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 relative overflow-hidden h-full flex flex-col justify-center shadow-xl">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]"></div>
                 <h3 className="text-2xl font-black text-white mb-4 z-10 tracking-tight">Gain Vendor Confidence</h3>
                 <p className="text-zinc-400 z-10 leading-relaxed text-sm lg:text-base">
                   You don't need a massive agency to close commercial work. Armed with direct phone numbers and emails, you bypass the front desk entirely. You pitch your {formattedNiche.toLowerCase()} services directly to the owner, site manager, or key decision maker with absolute confidence.
                 </p>
              </div>
            </div>
          </div>
        </section>

        {/* Deep FAQ for Niche Page */}
        <section className="py-24 bg-emerald-950/5 border-t border-zinc-900 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="container mx-auto px-6 max-w-4xl relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">{formattedNiche} Prospecting FAQ</h2>
              <p className="text-lg text-zinc-400">Everything you need to know about rapidly deploying your B2B {formattedNiche.toLowerCase()} data.</p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-emerald-500/30 transition-colors shadow-sm">
                <h4 className="text-xl font-bold text-white mb-3">Where do these {formattedNiche.toLowerCase()} prospects come from?</h4>
                <p className="text-zinc-400 leading-relaxed">Our infrastructure aggressively scrapes publicly available corporate registries, local chamber endpoints, massive proprietary B2B databases, and networking sites to compile and verify accurate facility and corporate decision-maker data.</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-emerald-500/30 transition-colors shadow-sm">
                <h4 className="text-xl font-bold text-white mb-3">Are these shared leads? Will I be competing?</h4>
                <p className="text-zinc-400 leading-relaxed">No. We sell static databases. Just like a physical phonebook, the massive compilation of {formattedNiche} decision-makers belongs entirely to you upon download. It is up to you to dial the phones and establish the relationship.</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-emerald-500/30 transition-colors shadow-sm">
                <h4 className="text-xl font-bold text-white mb-3">What happens if an email bounces?</h4>
                <p className="text-zinc-400 leading-relaxed">We naturally over-deliver on every purchased package. If you buy a 100-lead package, you will routinely find 110-120 entries specifically to mathematically cancel out any natural staff churn or soft-bounces related to the target market.</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-emerald-500/30 transition-colors shadow-sm">
                <h4 className="text-xl font-bold text-white mb-3">Is this data compliant with outreach laws?</h4>
                <p className="text-zinc-400 leading-relaxed">Yes. Our records focus strictly on Business-to-Business (B2B) targets. Direct phone and email outreach to businesses is legal in the US (under CAN-SPAM laws) provided you honor opt-out requests and represent your {formattedNiche.toLowerCase()} business honestly.</p>
              </div>
            </div>
          </div>
        </section>

        {/* The Mega State Directory Hub */}
        <section className="py-24 bg-emerald-950/5 border-t border-zinc-900 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="container mx-auto px-6 max-w-6xl relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">Nationwide Location Hub</h2>
              <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                We pull data for over <strong>10,000 local cities and zip codes</strong>. Select your state below to drill down into our localized {formattedNiche.toLowerCase()} prospect databases.
              </p>
            </div>

            {/* State Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {US_STATES.map((state, i) => (
                <Link 
                  key={i} 
                  href={`/${resolvedParams.niche}/${state.name.toLowerCase().replace(/ /g, '-')}-${state.abbr}`}
                  className="bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-800 text-zinc-300 hover:text-white px-4 py-4 rounded-xl font-bold transition-all flex flex-col justify-center items-center text-center group shadow-sm"
                >
                  <MapPin className="h-5 w-5 mb-2 text-zinc-600 group-hover:text-emerald-400 transition-colors" />
                  <span className="text-sm tracking-wide">{state.name}</span>
                </Link>
              ))}
            </div>

            {/* Agent Cron-Job Disclaimer */}
            <div className="mt-16 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-3xl mx-auto text-center">
              <Search className="w-8 h-8 text-emerald-500 mx-auto mb-4" />
              <h4 className="text-white font-bold text-xl mb-2">Can't Find Your Specific Micro-City?</h4>
              <p className="text-zinc-400 text-sm">
                Our AI agents and scrapers generate new hyper-local {formattedNiche} databases constantly. If you need a rural county or specific zip code dialed in, use our search bar or request a custom territory list.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 py-20 border-t border-zinc-900 relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-zinc-600 font-bold text-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-emerald-500/30 flex items-center justify-center bg-zinc-900">
                <Image src="/mascot.png" alt="Lead Monster" width={32} height={32} className="object-cover scale-150" />
              </div>
              <p>&copy; {new Date().getFullYear()} Lead Monster. All rights reserved.</p>
            </div>
            <p className="uppercase tracking-widest text-emerald-900/40 text-xs sm:text-sm">For Hustlers Who Dominate.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
