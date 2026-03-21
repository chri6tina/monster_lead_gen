import Link from "next/link";
import Image from "next/image";
import { 
  CheckCircle2, 
  Download, 
  UserCheck, 
  TrendingUp,
  Search,
  ShoppingCart,
  Database,
  Building2,
  ChevronRight,
  MapPin,
  ShieldCheck,
  X
} from "lucide-react";
import { PricingSection } from "@/components/PricingSection";

export default function Home() {
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
            <Link href="#marketplace" className="hover:text-emerald-400 transition-colors uppercase tracking-wide">List Marketplace</Link>
            <Link href="#request" className="hover:text-emerald-400 transition-colors uppercase tracking-wide">Request Custom City</Link>
            <Link href="#how-it-works" className="hover:text-emerald-400 transition-colors uppercase tracking-wide">How it Works</Link>
          </div>
          <div className="flex items-center">
            <Link 
              href="#marketplace" 
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 px-6 py-2.5 rounded-full font-black transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] flex items-center gap-2 uppercase text-sm tracking-wide"
            >
              Shop All Lists <ShoppingCart className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Header/Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden border-b border-zinc-900">
          {/* Cybernetic Green/Teal Glowing Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/20 rounded-full blur-[140px] opacity-50 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-[120px] opacity-40 pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
          
          <div className="container mx-auto px-6 relative z-10 text-center max-w-5xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-xs sm:text-sm mb-8 uppercase tracking-widest shadow-[0_0_10px_rgba(16,185,129,0.1)]">
              <Database className="h-4 w-4" /> B2B Data Broker For Starter Hustles
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-[6rem] font-black text-white tracking-tighter mb-8 leading-[1.05] uppercase">
              Stop Waiting For Leads.<br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500">Start Feeding The Monster.</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              Verified contact info for local decision-makers in Commercial Cleaning, Lawn Care, Logistics, and more. Skip the gatekeepers. Unlock commercial contracts.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                href="#marketplace" 
                className="w-full sm:w-auto px-8 py-5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 rounded-full font-black text-lg transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] flex items-center justify-center gap-3 uppercase tracking-wider hover:-translate-y-1"
              >
                Shop Niche Marketplace <ShoppingCart className="h-6 w-6" />
              </Link>
              <Link 
                href="#request" 
                className="w-full sm:w-auto px-8 py-5 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-500 rounded-full font-bold text-lg text-white transition-all flex items-center justify-center gap-3 backdrop-blur-sm hover:-translate-y-1 uppercase tracking-wider"
              >
                Request Custom Data <Search className="h-6 w-6 text-zinc-400" />
              </Link>
            </div>
          </div>
        </section>

        <PricingSection />

        {/* Why It Works Section */}
        <section id="how-it-works" className="py-32 relative scroll-mt-20 border-t border-zinc-900 bg-zinc-950">
          {/* Decor */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">Why Our Data <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Dominates</span></h2>
              <p className="text-xl text-zinc-400 max-w-3xl mx-auto font-medium">We don&apos;t sell scraped junk. We build precision-targeted lists of the exact people who can sign your commercial contracts.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
              {/* Feature 1 */}
              <div className="text-center group flex flex-col items-center">
                <div className="w-24 h-24 bg-zinc-900 border border-zinc-800 rounded-3xl flex items-center justify-center mb-8 shadow-xl group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <CheckCircle2 className="h-12 w-12 text-emerald-400 group-hover:scale-110 group-hover:text-emerald-300 transition-all relative z-10" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-wide">Fresh, Human-Verified Data</h3>
                <p className="text-zinc-400 text-lg leading-relaxed">No outdated public scraper lists. Every contact is manually scrubbed and verified for high-conversion accuracy.</p>
              </div>

              {/* Feature 2 */}
              <div className="text-center group flex flex-col items-center">
                <div className="w-24 h-24 bg-zinc-900 border border-zinc-800 rounded-3xl flex items-center justify-center mb-8 shadow-xl group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <UserCheck className="h-12 w-12 text-emerald-400 group-hover:scale-110 group-hover:text-emerald-300 transition-all relative z-10" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-wide">Decision-Makers Only</h3>
                <p className="text-zinc-400 text-lg leading-relaxed">Direct Emails and Cell Phones. Stop wasting cold calls and emails pitching to the front-desk secretary.</p>
              </div>

              {/* Feature 3 */}
              <div className="text-center group flex flex-col items-center">
                <div className="w-24 h-24 bg-zinc-900 border border-zinc-800 rounded-3xl flex items-center justify-center mb-8 shadow-xl group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Download className="h-12 w-12 text-emerald-400 group-hover:scale-110 group-hover:text-emerald-300 transition-all relative z-10" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-wide">Instant Download</h3>
                <p className="text-zinc-400 text-lg leading-relaxed">When you buy a territory list, you get the CSV/Excel file immediately upon purchase. No waiting.</p>
              </div>

              {/* Feature 4 */}
              <div className="text-center group flex flex-col items-center">
                <div className="w-24 h-24 bg-zinc-900 border border-zinc-800 rounded-3xl flex items-center justify-center mb-8 shadow-xl group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <TrendingUp className="h-12 w-12 text-emerald-400 group-hover:scale-110 group-hover:text-emerald-300 transition-all relative z-10" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-wide">Unlock Recurring Revenue</h3>
                <p className="text-zinc-400 text-lg leading-relaxed">Our lists are specifically targeted to secure lucrative, long-term commercial B2B contracts for your business.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Top Targeted Markets */}
        <section className="py-32 bg-zinc-950 border-t border-zinc-900 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="container mx-auto px-6 relative z-10 max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter text-center">Top Targeted Markets</h2>
            <p className="text-xl text-zinc-400 font-medium text-center mb-16 max-w-2xl mx-auto">Browse our most popular lead directories by niche and city.</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                  className="bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-800 text-zinc-300 hover:text-white p-6 rounded-2xl font-bold transition-all flex items-center justify-between group shadow-sm text-sm"
                >
                  <span className="truncate mr-3">{link.label}</span>
                  <ChevronRight className="h-5 w-5 text-emerald-500/50 group-hover:text-emerald-400 transition-colors shrink-0" />
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
                The leading B2B Data Broker for modern Starter Hustles. We provide the ammunition, you pull the trigger.
              </p>
            </div>
            
            <div>
              <h4 className="font-black text-white mb-6 uppercase tracking-widest text-sm text-emerald-500">Explore</h4>
              <ul className="space-y-4">
                <li><Link href="#marketplace" className="text-zinc-400 hover:text-white transition-colors font-semibold">List Marketplace</Link></li>
                <li><Link href="#how-it-works" className="text-zinc-400 hover:text-white transition-colors font-semibold">How it Works</Link></li>
                <li><Link href="#request" className="text-zinc-400 hover:text-white transition-colors font-semibold">Custom Orders</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-white mb-6 uppercase tracking-widest text-sm text-emerald-500">Legal</h4>
              <ul className="space-y-4">
                <li><Link href="/terms" className="text-zinc-400 hover:text-white transition-colors font-semibold">Terms of Data Use</Link></li>
                <li><Link href="/privacy" className="text-zinc-400 hover:text-white transition-colors font-semibold">Privacy Policy</Link></li>
              </ul>
            </div>
            
            <div className="lg:col-span-1"></div>
          </div>

          {/* Custom City Request Box */}
          <div id="request" className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 md:p-14 text-center max-w-5xl mx-auto relative overflow-hidden mt-8 shadow-2xl scroll-mt-24">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none -translate-x-1/3 translate-y-1/3"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tighter">Can&apos;t Find Your City or Niche?</h3>
              <p className="text-zinc-400 mb-10 max-w-2xl mx-auto text-xl font-medium">
                We build custom B2B data lists on demand. Tell us your target industry, decision-maker titles, and region.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-3xl mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter Your Email Address" 
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-2xl px-6 py-5 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-medium text-lg shadow-inner"
                />
                <button className="whitespace-nowrap bg-zinc-100 hover:bg-white text-zinc-950 px-8 py-5 rounded-2xl font-black transition-all shadow-xl hover:shadow-white/20 flex items-center justify-center gap-2 uppercase tracking-wide text-lg">
                  Request Custom List <Search className="h-5 w-5" />
                </button>
              </div>
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
