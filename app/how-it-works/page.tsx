import Link from "next/link";
import { 
  Ghost, 
  ArrowRight, 
  ShieldCheck, 
  Database, 
  Network,
  Activity, 
  Target, 
  Binary, 
  Blocks, 
  Search,
  Server,
  Fingerprint
} from "lucide-react";

export const metadata = {
  title: "Platform Architecture | LeadMonster Enterprise",
  description: "Delve into the methodology, purpose, and technical roadmap driving LeadMonster's B2B data extraction infrastructure.",
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans text-neutral-50 flex flex-col pt-14 md:pt-20 selection:bg-emerald-500/30">
      
      {/* Navbar - Inherited from Landing Page */}
      <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 h-14 md:h-16 flex items-center justify-between gap-2 min-w-0">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group min-w-0">
            <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/5 border border-white/10 group-hover:border-emerald-500/50 transition-colors shrink-0">
              <Ghost className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500" strokeWidth={2.5} />
            </div>
            <span className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1 sm:gap-1.5 min-w-0">
              <span className="truncate">LeadMonster</span>
              <span className="hidden sm:inline-flex px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20 shrink-0">Enterprise</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
            <Link href="/how-it-works" className="text-white transition-colors">Platform</Link>
            <Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/#request" className="hover:text-white transition-colors">Custom Data</Link>
          </div>
          <div className="flex items-center shrink-0">
            <Link 
              href="/#pricing" 
              className="bg-white hover:bg-neutral-200 text-black px-3 py-1.5 sm:px-5 sm:py-2 rounded-md sm:rounded-lg font-semibold transition-colors flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
            >
              Get Started <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        
        {/* Page Hero */}
        <section className="relative pt-24 pb-20 border-b border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
          
          <div className="container mx-auto px-6 relative z-10 max-w-5xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400 text-xs font-semibold mb-8 tracking-widest uppercase">
              <Server className="w-3 h-3" /> System Architecture v2.0
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-[1.1]">
              The Engine Behind <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Your Outreach.</span>
            </h1>
            <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed">
              We don&apos;t just scrape the web. We synthesize, verify, and validate highly specific B2B contact matrices, allowing you to bypass gatekeepers and pitch directly to decision-makers.
            </p>
          </div>
        </section>

        {/* The Purpose */}
        <section className="py-24 bg-[#0f0f0f] border-b border-white/5">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">The Ecosystem is Poisoned.</h2>
                <div className="space-y-6 text-neutral-400 text-sm leading-relaxed">
                  <p>
                    For years, commercial service providers (Cleaners, HVAC, Landscapers) have relied on massive, bloated lead databases that return 80% invalid emails, disconnected phone numbers, and furious front-desk receptionists. 
                  </p>
                  <p>
                    The outbound sales ecosystem has been poisoned by low-effort, automated scrapers selling junk data at a premium. 
                  </p>
                  <p className="text-white font-medium pl-4 border-l-2 border-emerald-500">
                    LeadMonster Enterprise exists to kill the junk. We deploy focused extraction nodes to build hyper-accurate, verified lists of the exact people who sign your commercial contracts.
                  </p>
                </div>
              </div>
              <div className="bg-[#141414] border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full group-hover:bg-emerald-500/20 transition-colors duration-700"></div>
                <Target className="w-12 h-12 text-emerald-500 mb-6 relative z-10" />
                <h3 className="text-xl font-bold text-white mb-3 relative z-10">Absolute Precision</h3>
                <p className="text-sm text-neutral-400 relative z-10">We target <span className="text-emerald-400">Facilities Directors</span>, <span className="text-emerald-400">Operations VPS</span>, and <span className="text-emerald-400">Procurement Heads</span>. You never pitch to the "info@company.com" inbox again.</p>
              </div>
            </div>
          </div>
        </section>

        {/* The Methodology / How It Works */}
        <section className="py-32 bg-[#0a0a0a] border-b border-white/5 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-teal-500/5 rounded-[100%] blur-[120px] pointer-events-none"></div>
          
          <div className="container mx-auto px-6 max-w-5xl relative z-10">
            <div className="mb-20 text-center">
              <h2 className="text-4xl font-bold text-white tracking-tight mb-4">Extraction Methodology</h2>
              <p className="text-neutral-400 max-w-2xl mx-auto">How raw geographic data is transformed into a high-conversion sales pipeline.</p>
            </div>

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 md:before:ml-1/2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
              
              {/* Step 1 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-12 h-12 rounded-full border border-emerald-500/30 bg-[#0f0f0f] text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <Database className="w-5 h-5" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 md:p-8 rounded-2xl bg-[#111] border border-white/5 group-hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-emerald-500 font-mono text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">PHASE 01</span>
                    <h3 className="text-xl font-bold text-white">Target Acquisition</h3>
                  </div>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Based on your selected city and niche (e.g., Commercial Cleaning in Miami), our nodes map out all viable commercial entities within that geographic bounding box—filtering out small residential targets and irrelevant properties.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-12 h-12 rounded-full border border-amber-500/30 bg-[#0f0f0f] text-amber-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <Fingerprint className="w-5 h-5" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 md:p-8 rounded-2xl bg-[#111] border border-white/5 group-hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-amber-500 font-mono text-xs font-bold bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">PHASE 02</span>
                    <h3 className="text-xl font-bold text-white">Cross-Referencing</h3>
                  </div>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    We do not guess emails. Once the company is targeted, we scrape corporate registries, LinkedIn, and proprietary databases to identify the *exact* human who manages facility budgets, verifying their direct contact email and phone number.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-12 h-12 rounded-full border border-emerald-500/30 bg-[#0f0f0f] text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <Activity className="w-5 h-5" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 md:p-8 rounded-2xl bg-[#111] border border-white/5 group-hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-emerald-500 font-mono text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">PHASE 03</span>
                    <h3 className="text-xl font-bold text-white">CSV Delivery & Action</h3>
                  </div>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Upon checkout, your custom database is universally formatted into a clean CSV payload. You drag and drop this file instantly into your CRM (Hubspot, Pipedrive, GoHighLevel) and activate our provided cold outreach scripts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Roadmap */}
        <section className="py-24 bg-[#0f0f0f]">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="flex items-center gap-3 mb-10">
              <Blocks className="w-6 h-6 text-white" />
              <h2 className="text-3xl font-bold text-white tracking-tight">Platform Roadmap</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#141414] p-8 rounded-xl border border-white/5 shadow-lg">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 text-emerald-500 font-bold text-xs uppercase">
                  01
                </div>
                <h4 className="text-white font-semibold mb-2 flex items-center gap-2"><Network className="w-4 h-4 text-neutral-500"/> Deep Niche Indexing</h4>
                <p className="text-neutral-500 text-sm">Expanding targeting algorithms to map obscure logistical routing, heavy machinery leasing, and specialized enterprise software procurement.</p>
              </div>

              <div className="bg-[#141414] p-8 rounded-xl border border-white/5 shadow-lg relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 text-emerald-500 font-bold text-xs uppercase">
                  02
                </div>
                <h4 className="text-white font-semibold mb-2 flex items-center gap-2"><Binary className="w-4 h-4 text-neutral-500" /> Webhook API Access</h4>
                <p className="text-neutral-500 text-sm">Enterprise users will gain tokenized endpoint access, allowing CRMs to programmatically request real-time prospect extraction without visiting the dashboard.</p>
              </div>

              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-8 rounded-xl border border-emerald-500/20 shadow-lg relative overflow-hidden">
                <div className="w-10 h-10 rounded-lg bg-emerald-500 border border-emerald-400 flex items-center justify-center mb-6 text-black font-bold text-xs uppercase shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                  03
                </div>
                <h4 className="text-white font-semibold mb-2 flex items-center gap-2">Automated Pipeline Inject</h4>
                <p className="text-neutral-400 text-sm">Bypassing the CSV step completely. LeadMonster will securely OAuth directly into your CRM to instantly assign tasks and queue follow-up emails the microsecond a new lead is verified.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 border-t border-white/5 relative bg-[#0a0a0a]">
          <div className="absolute inset-0 bg-emerald-500/5 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_0%,#000_10%,transparent_100%)]"></div>
          <div className="container mx-auto px-6 relative z-10 text-center max-w-2xl">
            <ShieldCheck className="w-12 h-12 text-emerald-500 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">Stop Wasting Your Outreach.</h2>
            <p className="text-neutral-400 mb-10 text-lg">Every minute your sales reps spend manually digging on LinkedIn is a minute they aren't closing. Secure a directory matrix today.</p>
            <Link 
              href="/#pricing" 
              className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 bg-white hover:bg-neutral-200 text-black rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-colors shadow-lg shadow-white/10"
            >
              Initialize Purchase <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          </div>
        </section>
        
      </main>

      {/* Footer - Inherited */}
      <footer className="bg-[#0a0a0a] py-20 border-t border-white/5 relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-16">
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10">
                  <Ghost className="w-5 h-5 text-emerald-500" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-xl font-bold tracking-tight text-white leading-none">
                    LeadMonster
                  </span>
                  <span className="text-[10px] font-semibold text-neutral-500 mt-1 uppercase tracking-widest">
                    Enterprise Data Node
                  </span>
                </div>
              </div>
              <p className="text-neutral-400 max-w-sm text-sm leading-relaxed">
                The premier B2B Data Infrastructure for outbound sales teams. Skip the gatekeepers. Secure the contract.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-6 text-sm">Platform</h4>
              <ul className="space-y-4 text-sm">
                <li><Link href="/#pricing" className="text-neutral-400 hover:text-white transition-colors">Directory Access</Link></li>
                <li><Link href="/how-it-works" className="text-white transition-colors">Data Integrity</Link></li>
                <li><Link href="/#request" className="text-neutral-400 hover:text-white transition-colors">Custom Builds</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-6 text-sm">Legal & Compliance</h4>
              <ul className="space-y-4 text-sm">
                <li><Link href="/terms" className="text-neutral-400 hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-neutral-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            
            <div className="lg:col-span-1"></div>
          </div>
          
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-neutral-500 text-xs font-medium">
            <p>&copy; {new Date().getFullYear()} LeadMonster Data Systems. All rights reserved.</p>
            <p>System Status: <span className="text-emerald-500">Online & Active</span></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
