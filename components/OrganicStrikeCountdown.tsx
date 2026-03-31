"use client";

import { useEffect, useState } from "react";
import { Crosshair, Activity, Cpu, Radar } from "lucide-react";

export function OrganicStrikeCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Assumed 45-day mark from formal Vercel Bot Initialization (May 14, 2026)
  const targetDate = new Date("2026-05-14T00:00:00Z").getTime();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Immediately calculate so we don't have a 1 second delay of 00:00:00
    const calculateTime = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };
    
    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Hydration guard
  if (!isClient) return <div className="animate-pulse bg-zinc-900 rounded-3xl h-64 col-span-1 md:col-span-2 lg:col-span-3"></div>;

  return (
    <div className="bg-[#0a0a0a] border border-emerald-500/20 p-8 md:p-12 rounded-3xl relative overflow-hidden group col-span-1 md:col-span-2 lg:col-span-3 shadow-[0_0_50px_rgba(16,185,129,0.05)]">
      
      {/* Background Radar Effect */}
      <div className="absolute -right-20 -top-20 opacity-10 text-emerald-500 animate-[spin_10s_linear_infinite]">
        <Radar className="w-96 h-96" />
      </div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Target Info */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30">
              <Crosshair className="w-5 h-5 text-emerald-500 animate-pulse" />
            </div>
            <h2 className="text-xl font-bold text-white uppercase tracking-widest">Organic Strike Window</h2>
          </div>
          
          <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4 leading-tight">
            Anticipated <span className="text-emerald-500">First Sale.</span>
          </h3>
          <p className="text-zinc-400 font-medium mb-8 leading-relaxed max-w-md">
            The Bot Army is actively flooding the Google Index. This dashboard indicates the mathematical lifting of the organic "Sandbox" penalty, signaling our first highly-probable $29 B2B purchase.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-[#111] border border-white/5 py-3 px-5 rounded-xl w-max">
              <Activity className="w-4 h-4 text-amber-500 animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-zinc-300 font-bold">System Status: <span className="text-amber-500">Crawlers Indexing</span></span>
            </div>
            <div className="flex items-center gap-3 bg-[#111] border border-white/5 py-3 px-5 rounded-xl w-max">
              <Cpu className="w-4 h-4 text-emerald-500" />
              <span className="text-xs uppercase tracking-widest text-zinc-300 font-bold">Target Yield: <span className="text-emerald-500">$29.00 USD</span></span>
            </div>
          </div>
        </div>

        {/* Right Timer Matrix */}
        <div className="bg-[#111] border border-white/10 rounded-2xl p-8 relative">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
          
          <div className="grid grid-cols-4 gap-4 text-center">
            {/* Days */}
            <div className="bg-[#0a0a0a] rounded-xl p-4 border border-white/5">
              <div className="text-4xl lg:text-5xl font-black text-emerald-400 tracking-tighter mb-2 tabular-nums">
                {String(timeLeft.days).padStart(2, '0')}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Days</div>
            </div>
            
            {/* Hours */}
            <div className="bg-[#0a0a0a] rounded-xl p-4 border border-white/5">
              <div className="text-4xl lg:text-5xl font-black text-white tracking-tighter mb-2 tabular-nums">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Hours</div>
            </div>
            
            {/* Minutes */}
            <div className="bg-[#0a0a0a] rounded-xl p-4 border border-white/5">
              <div className="text-4xl lg:text-5xl font-black text-white tracking-tighter mb-2 tabular-nums">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Minutes</div>
            </div>
            
            {/* Seconds */}
            <div className="bg-[#0a0a0a] rounded-xl p-4 border border-white/5 relative overflow-hidden group-hover:border-emerald-500/30 transition-colors">
              <div className="text-4xl lg:text-5xl font-black text-emerald-500 tracking-tighter mb-2 tabular-nums">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Seconds</div>
            </div>
          </div>
          
          <div className="mt-8 text-center text-xs text-zinc-500 uppercase tracking-widest font-bold flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Awaiting Inbound Payload
          </div>
        </div>
      </div>
      
    </div>
  );
}
