import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { 
  Briefcase, 
  Droplets, 
  Leaf, 
  Trash2, 
  Car, 
  Wrench, 
  Paintbrush, 
  Wind, 
  Sparkles,
  Coffee,
  Waves,
  Hammer,
  ChevronRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "Browse Lead Directories By Industry | Lead Monster",
  description: "Explore our B2B lead databases for high-margin, high-demand service businesses. Get direct decision-maker contacts for commercial cleaning, pressure washing, landscaping, and more.",
};

const businessCategories = [
  {
    title: "Commercial Cleaning",
    slug: "commercial-cleaning-leads",
    icon: Sparkles,
    desc: "Offices, warehouses, and corporate facilities needing recurring janitorial contracts.",
    count: "50+ Cities"
  },
  {
    title: "Pressure Washing",
    slug: "pressure-washing-leads",
    icon: Droplets,
    desc: "Commercial plazas, HOAs, and property managers needing exterior soft washing.",
    count: "50+ Cities"
  },
  {
    title: "Landscaping & Lawn",
    slug: "landscaping-leads",
    icon: Leaf,
    desc: "Retail centers and corporate campuses needing weekly grounds maintenance.",
    count: "50+ Cities"
  },
  {
    title: "Junk Removal",
    slug: "junk-removal-leads",
    icon: Trash2,
    desc: "Real estate agents, construction sites, and property managers needing haul-aways.",
    count: "40+ Cities"
  },
  {
    title: "Mobile Auto Detailing",
    slug: "auto-detailing-leads",
    icon: Car,
    desc: "Dealerships, corporate fleets, and executive parking garages needing regular washes.",
    count: "30+ Cities"
  },
  {
    title: "Window Cleaning",
    slug: "window-cleaning-leads",
    icon: Sparkles,
    desc: "Storefronts, mid-rise office buildings, and retail chains needing monthly service.",
    count: "40+ Cities"
  },
  {
    title: "HVAC Services",
    slug: "hvac-leads",
    icon: Wind,
    desc: "Restaurant owners, property managers, and warehouses needing preventive maintenance.",
    count: "50+ Cities"
  },
  {
    title: "Commercial Painting",
    slug: "painting-leads",
    icon: Paintbrush,
    desc: "HOAs, general contractors, and facility managers needing interior/exterior painting.",
    count: "30+ Cities"
  },
  {
    title: "Handyman & Repair",
    slug: "handyman-leads",
    icon: Wrench,
    desc: "Property management firms and retail franchises needing on-call maintenance.",
    count: "50+ Cities"
  },
  {
    title: "Vending Routes",
    slug: "vending-leads",
    icon: Coffee,
    desc: "Warehouses, manufacturing plants, and call centers needing snack and drink machines.",
    count: "25+ Cities"
  },
  {
    title: "Pool Maintenance",
    slug: "pool-cleaning-leads",
    icon: Waves,
    desc: "Hotels, fitness centers, and luxury apartment complexes needing weekly chemical balancing.",
    count: "20+ Cities"
  },
  {
    title: "Roofing & Gutters",
    slug: "roofing-leads",
    icon: Hammer,
    desc: "Commercial property owners and real estate portfolios needing annual inspections.",
    count: "35+ Cities"
  }
];

export default function BusinessesHub() {
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
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <Link href="/businesses" className="text-emerald-400 transition-colors">Industries</Link>
            <Link href="/#marketplace" className="hover:text-emerald-400 transition-colors">Marketplace</Link>
            <Link href="/contact" className="hover:text-emerald-400 transition-colors">Custom Orders</Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Header Section */}
        <section className="pt-24 pb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
          <div className="container mx-auto px-6 max-w-6xl relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-xs sm:text-sm mb-8 uppercase tracking-widest shadow-[0_0_10px_rgba(16,185,129,0.1)]">
              <Briefcase className="h-4 w-4" /> B2B Sector Hub
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-[1.05] uppercase">
              Fuel Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500">Starter Hustle</span>.
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-medium">
              We compile massive B2B contact lists for high-demand, low-barrier service businesses. Skip the homeowner tire-kickers and go straight for lucrative <strong>commercial contracts</strong>.
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16 relative z-10">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {businessCategories.map((category, idx) => {
                const Icon = category.icon;
                return (
                  <Link 
                    key={idx} 
                    href={`/${category.slug}`} 
                    className="group bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all flex flex-col relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/20 group-hover:bg-emerald-500 transition-colors"></div>
                    <div className="w-14 h-14 bg-zinc-950 border border-zinc-800 rounded-full flex items-center justify-center mb-6 shadow-inner text-emerald-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-3 group-hover:text-emerald-400 transition-colors tracking-tight">{category.title}</h3>
                    <p className="text-zinc-400 leading-relaxed text-sm mb-8 flex-1">{category.desc}</p>
                    
                    <div className="flex items-center justify-between border-t border-zinc-800 pt-6 mt-auto">
                      <span className="text-xs font-black text-zinc-500 uppercase tracking-widest group-hover:text-zinc-400">{category.count}</span>
                      <div className="flex items-center gap-1 text-xs font-bold text-emerald-500 uppercase tracking-widest group-hover:gap-2 transition-all">
                        View Markets <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-24 bg-emerald-950/5 border-t border-zinc-900 relative mt-16 text-center">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="container mx-auto px-6 max-w-3xl relative z-10">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">Starting A Niche Not Listed?</h2>
              <p className="text-lg text-zinc-400 leading-relaxed mb-10">
                Our scraping agents run 24/7. Don't see your specific hustle above? We can generate a custom directory of local decision-makers to kickstart your recurring revenue.
              </p>
              <Link href="/contact" className="inline-block px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 rounded-full font-black uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:-translate-y-1 transition-all">
                Request Custom Industry List
              </Link>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 py-20 border-t border-zinc-900 relative">
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
