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

  // Derive contextual URLs if tags exist
  const derivedLink = data.targetCity && data.targetNiche 
    ? `/${data.targetNiche}/${data.targetCity}` 
    : (data.targetNiche ? `/${data.targetNiche}` : '/businesses');

  const ctaLink = data.linkedUrl || derivedLink;

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-50 flex flex-col pt-20 selection:bg-emerald-500/30">
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
          <div className="container mx-auto px-6 max-w-3xl">
            {/* The actual HTML injected by the AI Agent */}
            <article 
              className="prose prose-invert prose-emerald max-w-none prose-headings:font-black prose-headings:tracking-tight prose-headings:uppercase prose-p:text-zinc-400 prose-p:leading-relaxed prose-p:text-lg prose-a:text-emerald-400 prose-li:text-zinc-400 prose-strong:text-zinc-200"
              dangerouslySetInnerHTML={{ __html: data.content }} 
            />
            
            {/* In-Line CTA matching exact Niche/City mappings */}
            <div className="mt-20 pt-16 border-t border-zinc-900 flex flex-col items-center justify-center text-center">
               <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center mb-6 shadow-xl text-emerald-400">
                  <ArrowRight className="w-8 h-8" />
               </div>
               <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">Ready to Deploy This Strategy?</h3>
               <p className="text-zinc-400 max-w-md mx-auto mb-8">Stop researching and start dialing. We have hundreds of verified Outbound B2B databases ready for immediate download.</p>
               <Link href={ctaLink} className="inline-block px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 rounded-full font-black uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:-translate-y-1 transition-all">
                 View {data.targetCity ? 'Local' : 'Available'} Prospects
               </Link>
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
