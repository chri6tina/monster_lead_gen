import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, FileText, Settings, LogOut, ArrowLeft } from "lucide-react";
import { logoutAction } from "../login/actions";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-50 flex selection:bg-emerald-500/30">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-zinc-900 bg-zinc-950/80 backdrop-blur-md flex flex-col fixed h-full z-50">
        <div className="h-20 flex items-center px-6 border-b border-zinc-900 shrink-0">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-emerald-500/30 flex items-center justify-center bg-zinc-900 group-hover:border-emerald-500/60 transition-all">
              <Image src="/mascot.png" alt="Lead Monster" width={32} height={32} className="object-cover scale-150 group-hover:scale-[1.6] transition-transform" />
            </div>
            <span className="text-sm font-black tracking-tighter uppercase text-white">
              Admin<span className="text-emerald-500">Panel</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 py-8 px-4 space-y-2">
          {/* We only have Blogs for now, but ready for expansion */}
          <Link href="/admin/blogs" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 text-emerald-400 font-bold text-xs uppercase tracking-widest border border-emerald-500/20">
            <FileText className="w-4 h-4" /> Blogs
          </Link>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-500 font-bold text-xs uppercase tracking-widest opacity-50 cursor-not-allowed">
            <LayoutDashboard className="w-4 h-4" /> Overview (WIP)
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-500 font-bold text-xs uppercase tracking-widest opacity-50 cursor-not-allowed">
            <Settings className="w-4 h-4" /> Settings (WIP)
          </div>
        </nav>

        <div className="p-4 border-t border-zinc-900 shrink-0 space-y-2">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors font-bold text-xs uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Go to Website
          </Link>
          <form action={logoutAction}>
            <button className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-red-500/70 hover:text-red-500 hover:bg-red-500/10 transition-colors font-bold text-xs uppercase tracking-widest">
              <LogOut className="w-4 h-4" /> Log Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 min-h-screen border-l border-zinc-900/50 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
        <div className="relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
