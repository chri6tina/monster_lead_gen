import { Activity, LayoutDashboard, Rss, ArrowRight } from "lucide-react";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { OrganicStrikeCountdown } from "@/components/OrganicStrikeCountdown";

export default async function AdminDashboardOverview() {
  const blogCount = await getBlogCount();

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Command Center</h1>
        <p className="text-zinc-500 font-medium">System overview and blog management.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Intelligence Log Stats */}
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 text-emerald-500/10 group-hover:scale-125 transition-transform">
             <Rss className="w-24 h-24" />
           </div>
           
           <h3 className="text-zinc-400 font-bold uppercase tracking-widest text-xs mb-8">Blog Posts</h3>
           <div className="text-6xl font-black text-white tracking-tighter mb-8">{blogCount}</div>
           
           <Link href="/admin/blogs" className="flex items-center gap-2 text-emerald-500 uppercase tracking-widest text-xs font-bold hover:text-emerald-400 transition-colors">
              Manage Blogs <ArrowRight className="w-4 h-4" />
           </Link>
        </div>

        {/* Dummy Metrics placeholders for the user to understand what goes here */}
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl relative overflow-hidden">
           <h3 className="text-zinc-400 font-bold uppercase tracking-widest text-xs mb-8">Active Vending Leads</h3>
           <div className="text-6xl font-black text-white tracking-tighter mb-8 opacity-50">--</div>
           
           <div className="flex items-center gap-2 text-zinc-600 uppercase tracking-widest text-xs font-bold w-max cursor-not-allowed">
              Incoming Soon <Activity className="w-4 h-4" />
           </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl relative overflow-hidden">
           <h3 className="text-zinc-400 font-bold uppercase tracking-widest text-xs mb-8">Total Platform Visits</h3>
           <div className="text-6xl font-black text-white tracking-tighter mb-8 opacity-50">--</div>
           
           <div className="flex items-center gap-2 text-zinc-600 uppercase tracking-widest text-xs font-bold w-max cursor-not-allowed">
              Awaiting Analytics <LayoutDashboard className="w-4 h-4" />
           </div>
        </div>

        {/* The Live Radar Module */}
        <OrganicStrikeCountdown />

      </div>
    </div>
  );
}

async function getBlogCount() {
  if (!supabaseAdmin) return 0;
  try {
    const { count } = await supabaseAdmin.from('blogs').select('*', { count: 'exact', head: true });
    return count || 0;
  } catch (e) {
    return 0;
  }
}
