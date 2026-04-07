import Link from "next/link";
import { 
  CheckCircle2, 
  Download, 
  UserCheck, 
  TrendingUp,
  Search,
  Database,
  Building2,
  ChevronRight,
  ShieldCheck,
  Ghost,
  Mail,
  Phone,
  ArrowRight,
  Star
} from "lucide-react";
import { PricingSection } from "@/components/PricingSection";
import { LivePurchasersCounter } from "@/components/LivePurchasersCounter";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans text-neutral-50 flex flex-col pt-14 md:pt-20 selection:bg-emerald-500/30">
      
      {/* Navbar - Sleek and Professional */}
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
            <Link href="/how-it-works" className="hover:text-white transition-colors">Platform</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="#request" className="hover:text-white transition-colors">Custom Data</Link>
          </div>
          <div className="flex items-center shrink-0">
            <Link 
              href="#pricing" 
              className="bg-white hover:bg-neutral-200 text-black px-3 py-1.5 sm:px-5 sm:py-2 rounded-md sm:rounded-lg font-semibold transition-colors flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
            >
              Get Started <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 overflow-hidden border-b border-white/5">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
              <div className="mb-6">
                <LivePurchasersCounter />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-[1.1]">
                Precision B2B Data <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Infrastructure.</span>
              </h1>
              <p className="text-lg md:text-xl text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                Accelerate your outbound pipeline with verified decision-maker contact data. No scraping, no guessing. Just accurate CRM-ready CSVs delivered instantly.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none mx-auto">
                <Link 
                  href="#pricing" 
                  className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-3.5 bg-white hover:bg-neutral-200 text-black rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  View Pricing <ArrowRight className="w-4 h-4 shrink-0" />
                </Link>
                <Link 
                  href="/how-it-works" 
                  className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-3.5 bg-[#0a0a0a] border border-white/10 hover:bg-[#111] text-white rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  How It Works
                </Link>
              </div>

              {/* Trust Signal */}
              <div className="mt-10 pt-8 border-t border-white/5 w-full max-w-lg mx-auto flex flex-col items-center justify-center gap-2">
                <div className="flex items-center gap-1 text-emerald-500 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-emerald-500" />
                  ))}
                </div>
                <p className="text-sm font-medium text-neutral-400">
                  Trusted by <span className="text-white font-bold">11,437+</span> B2B Revenue Teams
                </p>
              </div>
            </div>

            {/* Premium Data Table Mockup */}
            <div className="max-w-5xl mx-auto relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-[#0f0f0f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex items-center gap-4 px-3 sm:px-4 py-3 border-b border-white/10 bg-[#141414]">
                  <div className="flex gap-1.5 shrink-0">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/20 border border-amber-500/50"></div>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50"></div>
                  </div>
                  <div className="flex-1 flex justify-center sm:-ml-12 overflow-hidden">
                    <div className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold text-neutral-500 bg-black/50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md border border-white/5 w-auto max-w-[180px] sm:max-w-none">
                      <Database className="w-3 h-3 shrink-0" /> 
                      <span className="truncate">lead_monster_extraction_v2.csv</span>
                    </div>
                  </div>
                </div>
                {/* Desktop View: Wide Grid */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-[#141414] border-b border-white/5 text-xs text-neutral-400">
                      <tr>
                        <th className="px-6 py-3 font-semibold">Company</th>
                        <th className="px-6 py-3 font-semibold">Decision Maker</th>
                        <th className="px-6 py-3 font-semibold">Title</th>
                        <th className="px-6 py-3 font-semibold">Direct Email</th>
                        <th className="px-6 py-3 font-semibold">Phone</th>
                        <th className="px-6 py-3 font-semibold">Location</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-neutral-300">
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 flex items-center gap-2"><Building2 className="w-4 h-4 text-neutral-500" /> Omni Corporate Towers</td>
                        <td className="px-6 py-4 font-medium text-white">Michael R.</td>
                        <td className="px-6 py-4 text-emerald-400">Facilities Director</td>
                        <td className="px-6 py-4 flex items-center gap-2"><Mail className="w-4 h-4 text-neutral-500" /> m.r***@omnicorp.com</td>
                        <td className="px-6 py-4 flex items-center gap-2"><Phone className="w-4 h-4 text-neutral-500" /> (214) 555-01**</td>
                        <td className="px-6 py-4">Dallas, TX (75201)</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02] transition-colors bg-white/[0.01]">
                        <td className="px-6 py-4 flex items-center gap-2"><Building2 className="w-4 h-4 text-neutral-500" /> Prologis Distribution Center</td>
                        <td className="px-6 py-4 font-medium text-white">Sarah Jenkins</td>
                        <td className="px-6 py-4 text-emerald-400">Regional Plant Manager</td>
                        <td className="px-6 py-4 flex items-center gap-2"><Mail className="w-4 h-4 text-neutral-500" /> s.jenkins@prolo***.com</td>
                        <td className="px-6 py-4 flex items-center gap-2"><Phone className="w-4 h-4 text-neutral-500" /> (512) 555-01**</td>
                        <td className="px-6 py-4">Austin, TX (78701)</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 flex items-center gap-2"><Building2 className="w-4 h-4 text-neutral-500" /> Highland Medical Campus</td>
                        <td className="px-6 py-4 font-medium text-white">David Chen</td>
                        <td className="px-6 py-4 text-emerald-400">Operations VP</td>
                        <td className="px-6 py-4 flex items-center gap-2"><Mail className="w-4 h-4 text-neutral-500" /> dchen@highland***.com</td>
                        <td className="px-6 py-4 flex items-center gap-2"><Phone className="w-4 h-4 text-neutral-500" /> (404) 555-01**</td>
                        <td className="px-6 py-4">Atlanta, GA (30303)</td>
                      </tr>
                      {/* Fading bottom row */}
                      <tr className="relative">
                        <td className="px-6 py-4 flex items-center gap-2 text-neutral-600"><Building2 className="w-4 h-4" /> Elite Property Mgt</td>
                        <td className="px-6 py-4 font-medium text-neutral-600">Robert Vance</td>
                        <td className="px-6 py-4 text-emerald-900">Head of Procurement</td>
                        <td className="px-6 py-4 flex items-center gap-2 text-neutral-600"><Mail className="w-4 h-4 text-neutral-700" /> r.vance@elite***.com</td>
                        <td className="px-6 py-4 flex items-center gap-2 text-neutral-600"><Phone className="w-4 h-4 text-neutral-700" /> (305) 555-01**</td>
                        <td className="px-6 py-4 text-neutral-600">Miami, FL (33101)</td>
                        {/* Gradient Fade overlay */}
                        <td colSpan={6} className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/80 to-transparent pointer-events-none"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Mobile View: Vertical Data Cards */}
                <div className="block sm:hidden p-4 bg-[#0f0f0f] space-y-3">
                  <div className="p-4 rounded-xl bg-[#141414] border border-white/5 relative">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="text-white font-semibold text-sm">Michael R.</div>
                        <div className="text-emerald-400 text-xs">Facilities Director</div>
                      </div>
                      <div className="flex bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded text-[9px] text-emerald-500 uppercase font-bold tracking-widest items-center">
                        <ShieldCheck className="w-3 h-3 mr-1" /> Verified
                      </div>
                    </div>
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-3 text-xs text-neutral-400"><Building2 className="w-4 h-4 text-neutral-500" /> Omni Corporate Towers</div>
                      <div className="flex items-center gap-3 text-xs text-neutral-400"><Mail className="w-4 h-4 text-neutral-500" /> m.r***@omnicorp.com</div>
                      <div className="flex items-center gap-3 text-xs text-neutral-400"><Phone className="w-4 h-4 text-neutral-500" /> (214) 555-01**</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#141414] border border-white/5 relative opacity-50 scale-95 origin-top">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="text-white font-semibold text-sm">Sarah Jenkins</div>
                        <div className="text-emerald-400 text-xs">Regional Plant Manager</div>
                      </div>
                    </div>
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-3 text-xs text-neutral-400"><Building2 className="w-4 h-4 text-neutral-500" /> Prologis Distribution</div>
                    </div>
                    {/* Fade overlay for second mobile card */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/80 to-transparent pointer-events-none rounded-xl"></div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f] to-transparent">
                  <span className="text-xs font-semibold text-emerald-500 flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 backdrop-blur-md">
                    <ShieldCheck className="w-4 h-4" /> 100% Downloadable CSV Format
                  </span>
                </div>
              </div>
            </div>
            
          </div>
        </section>

        <PricingSection />

        {/* Why It Works Section */}
        <section id="how-it-works" className="py-32 relative border-t border-white/5 bg-[#0a0a0a]">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Enterprise-Grade <br/> Data Integrity.</h2>
              <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed">We don&apos;t sell scraped junk. Our infrastructure is built to deliver precision-targeted lists of the exact people who sign commercial contracts.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Feature 1 */}
              <div className="p-8 bg-[#111111] border border-white/5 rounded-2xl hover:bg-[#141414] transition-colors group">
                <CheckCircle2 className="h-8 w-8 text-emerald-500 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-white mb-3">Verified Accuracy</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">No outdated public scrapers. Every contact is manually scrubbed and verified for high-conversion accuracy.</p>
              </div>

              {/* Feature 2 */}
              <div className="p-8 bg-[#111111] border border-white/5 rounded-2xl hover:bg-[#141414] transition-colors group">
                <UserCheck className="h-8 w-8 text-emerald-500 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-white mb-3">Decision-Makers</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">Direct emails and phone numbers. Stop wasting outreach efforts pitching to the front-desk gatekeepers.</p>
              </div>

              {/* Feature 3 */}
              <div className="p-8 bg-[#111111] border border-white/5 rounded-2xl hover:bg-[#141414] transition-colors group">
                <Download className="h-8 w-8 text-emerald-500 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-white mb-3">Instant Delivery</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">When you purchase a geographic territory, your securely formatted CSV payload arrives immediately.</p>
              </div>

              {/* Feature 4 */}
              <div className="p-8 bg-[#111111] border border-white/5 rounded-2xl hover:bg-[#141414] transition-colors group">
                <TrendingUp className="h-8 w-8 text-emerald-500 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-white mb-3">Recurring Revenue</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">Our infrastructure targets the exact B2B demographics needed to secure lucrative, long-term commercial contracts.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Top Targeted Markets */}
        <section className="py-24 bg-[#0a0a0a] border-t border-white/5 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="container mx-auto px-6 relative z-10 max-w-6xl">
            <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Geographic Directories</h2>
            <p className="text-neutral-400 mb-12">Browse our most popular lead databases organized by sector and region.</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[
                { label: "Commercial Cleaning in Jax, FL", path: "/commercial-cleaning-leads/jacksonville-fl" },
                { label: "Commercial Cleaning in Miami", path: "/commercial-cleaning-leads/miami-fl" },
                { label: "Landscaping in Atlanta, GA", path: "/landscaping-leads/atlanta-ga" },
                { label: "Landscaping in Charlotte", path: "/landscaping-leads/charlotte-nc" },
                { label: "HVAC in Dallas, TX", path: "/hvac-leads/dallas-tx" },
                { label: "HVAC in Austin, TX", path: "/hvac-leads/austin-tx" },
                { label: "Plumbing in Denver, CO", path: "/plumbing-leads/denver-co" },
                { label: "Plumbing in Phoenix, AZ", path: "/plumbing-leads/phoenix-az" }
              ].map((link, i) => (
                <Link 
                  key={i} 
                  href={link.path}
                  className="bg-[#111111] border border-white/5 hover:border-white/20 text-neutral-300 hover:text-white p-5 rounded-xl font-medium transition-all flex items-center justify-between group shadow-sm text-sm"
                >
                  <span className="truncate mr-3">{link.label}</span>
                  <ChevronRight className="h-4 w-4 text-neutral-600 group-hover:text-white transition-colors shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
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
                <li><Link href="#pricing" className="text-neutral-400 hover:text-white transition-colors">Directory Access</Link></li>
                <li><Link href="/how-it-works" className="text-neutral-400 hover:text-white transition-colors">Data Integrity</Link></li>
                <li><Link href="#request" className="text-neutral-400 hover:text-white transition-colors">Custom Builds</Link></li>
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

          {/* Custom City Request Box */}
          <div id="request" className="bg-[#111111] border border-white/5 rounded-2xl p-10 md:p-12 max-w-4xl mx-auto relative overflow-hidden mt-8">
            <div className="relative z-10 text-center">
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Require Custom Architecture?</h3>
              <p className="text-neutral-400 mb-8 max-w-2xl mx-auto text-sm">
                We synthesize custom B2B matrices on demand. Specify your targeted sector, executive titles, and geographic constraints below.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-2xl mx-auto">
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="w-full bg-black border border-white/10 rounded-lg sm:rounded-xl px-4 py-3 sm:px-5 sm:py-3.5 text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
                />
                <button type="button" className="whitespace-nowrap bg-white hover:bg-neutral-200 text-black px-5 py-3 sm:px-6 sm:py-3.5 rounded-lg sm:rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 text-sm">
                  Initialize Request <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-neutral-500 text-xs font-medium">
            <p>&copy; {new Date().getFullYear()} LeadMonster Data Systems. All rights reserved.</p>
            <p>System Status: <span className="text-emerald-500">Online & Active</span></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
