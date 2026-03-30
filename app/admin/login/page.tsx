"use client";

import { useState, useTransition } from "react";
import { loginAction } from "./actions";
import { Loader2, ArrowRight, Ghost } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      setError(null);
      const res = await loginAction(password);
      if (res?.error) {
        setError(res.error);
      }
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 selection:bg-emerald-500/30">
      <div className="absolute top-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-xl overflow-hidden border border-emerald-500/30 flex items-center justify-center bg-zinc-900 shadow-[0_0_20px_rgba(16,185,129,0.2)] mb-4 group">
            <Ghost className="w-8 h-8 text-emerald-500 group-hover:text-emerald-400 group-hover:scale-110 transition-all duration-300" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-black tracking-tighter uppercase text-white">
            Lead<span className="text-emerald-500">Monster</span> Admin
          </h1>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs mt-2">Restricted Access Portal</p>
        </div>

        <form onSubmit={handleLogin} className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 p-8 rounded-3xl shadow-2xl">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold rounded-xl text-center uppercase tracking-widest">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest block">Admin Passkey</label>
              <input 
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-4 text-white placeholder-zinc-700 outline-none transition-all text-center tracking-widest"
              />
            </div>

            <button 
              type="submit"
              disabled={isPending}
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black uppercase text-sm tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex justify-center items-center gap-2"
            >
              {isPending ? <><Loader2 className="w-5 h-5 animate-spin" /> Authenticating...</> : <>Enter Systems <ArrowRight className="w-5 h-5" /></>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
