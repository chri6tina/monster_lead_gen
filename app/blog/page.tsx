import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ChevronRight, ArrowRight, Rss, Calendar, User } from "lucide-react";
import fs from 'fs/promises';
import path from 'path';
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Outbound Strategy & Industry Insights | Lead Monster Blog",
  description: "Learn how to scale your B2B service business using direct outbound marketing, cold outreach scripts, and verified prospect databases.",
};

export const revalidate = 86400; // Force ISR: Cache this page heavily to prevent Supabase bottlenecking

// This function attempts to fetch from Supabase first, falling back to local JSON files
async function getBlogIndex() {
  const blogs = [];

  // 1. Try Supabase
  if (supabase) {
    try {
      const { data, error } = await supabase.from('blogs').select('*').order('date', { ascending: false });
      if (!error && data && data.length > 0) {
        return data;
      }
    } catch (e) {
      console.warn("Supabase fetch failed, falling back to local JSON data...", e);
    }
  }

  // 2. Fallback to Local Files (for testing / before Supabase migration)
  try {
    const blogsDir = path.join(process.cwd(), 'data', 'blogs');
    // Ensure dir exists
    await fs.mkdir(blogsDir, { recursive: true });
    
    // Read all JSON files
    const files = await fs.readdir(blogsDir);
    
    for (const file of files) {
      if (!file.endsWith('.json')) continue;
      
      const fileContents = await fs.readFile(path.join(blogsDir, file), 'utf-8');
      try {
        const data = JSON.parse(fileContents);
        blogs.push({
          slug: file.replace('.json', ''),
          title: data.title || "Untitled Intelligence Report",
          excerpt: data.excerpt || "High-level insights for B2B sector dominance.",
          date: data.date || new Date().toISOString().split('T')[0],
          targetNiche: data.targetNiche || null,
          targetCity: data.targetCity || null
        });
      } catch (e) {
        console.error(`Error parsing blog JSON: ${file}`);
      }
    }
    
    // Sort newest first
    return blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (err) {
    console.error("Error fetching blogs directory", err);
    return [];
  }
}

export default async function BlogIndexPage() {
  const latestBlogs = await getBlogIndex();

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-50 flex flex-col pt-20 selection:bg-emerald-500/30">
      {/* Navbar Drop-in */}
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
            <Link href="/businesses" className="hover:text-emerald-400 transition-colors">Industries</Link>
            <Link href="/blog" className="text-emerald-400 transition-colors">Intelligence</Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Blog Header */}
        <section className="pt-24 pb-16 relative overflow-hidden border-b border-zinc-900">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
          <div className="container mx-auto px-6 max-w-6xl relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-xs sm:text-sm mb-8 uppercase tracking-widest shadow-[0_0_10px_rgba(16,185,129,0.1)]">
              <Rss className="h-4 w-4" /> B2B Outreach Intelligence
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-[1.05] uppercase">
              Actionable Market <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500">Insights</span>.
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed font-medium mb-12">
              Discover exactly how to leverage localized prospect databases, write high-converting outreach sequences, and bypass gatekeepers to close immense commercial contracts.
            </p>
          </div>
        </section>

        {/* Master Blog Grid */}
        <section className="py-24 relative z-10">
          <div className="container mx-auto px-6 max-w-6xl">
            {latestBlogs.length === 0 ? (
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-16 text-center shadow-xl">
                 <Rss className="w-12 h-12 text-zinc-700 mx-auto mb-6" />
                 <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Intelligence Node Initializing</h3>
                 <p className="text-zinc-500 max-w-lg mx-auto leading-relaxed">Our AI research agents are currently compiling hyper-localized B2B outreach strategies. The first transmission of market reports will appear here shortly.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {latestBlogs.map((post, idx) => (
                  <Link 
                    key={idx} 
                    href={`/blog/${post.slug}`} 
                    className="group bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all flex flex-col relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/20 group-hover:bg-emerald-500 transition-colors"></div>
                    
                    {/* Tags for internal SEO routing */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.targetCity && (
                         <span className="px-3 py-1 bg-zinc-950 border border-zinc-800 rounded-full text-xs font-bold text-zinc-400 uppercase tracking-wider">{post.targetCity.replace(/-/g, ' ')}</span>
                      )}
                      {post.targetNiche && (
                         <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-bold text-emerald-400 uppercase tracking-wider">{(post.targetNiche as string).substring(0,20).replace(/-/g, ' ')}</span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-black text-white mb-4 group-hover:text-emerald-400 transition-colors tracking-tight leading-snug">{post.title}</h3>
                    <p className="text-zinc-400 leading-relaxed text-sm mb-8 flex-1">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between border-t border-zinc-800 pt-6 mt-auto">
                      <span className="text-xs font-bold text-zinc-500 uppercase flex items-center gap-1"><Calendar className="w-3 h-3"/> {post.date}</span>
                      <div className="flex items-center gap-1 text-xs font-bold text-emerald-500 uppercase tracking-widest group-hover:gap-2 transition-all">
                        Read <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer Minimal */}
      <footer className="bg-zinc-950 py-12 border-t border-zinc-900 relative">
        <div className="container mx-auto px-6 text-center text-zinc-600 font-bold text-xs uppercase tracking-widest">
           &copy; {new Date().getFullYear()} Lead Monster Intelligence.
        </div>
      </footer>
    </div>
  );
}
