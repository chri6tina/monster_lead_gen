"use client";

import { useState, useEffect } from 'react';

export function LivePurchasersCounter() {
  const [count, setCount] = useState(124);

  useEffect(() => {
    // Every 3 to 7 seconds, dynamically jitter the number of concurrent purchasers
    // Bounded strictly between 101 and 145 based on user request.
    const runPulse = () => {
      const isUp = Math.random() > 0.4; // Slightly biased towards increasing
      const changeAmount = Math.floor(Math.random() * 4) + 1; // Moves by 1 to 4 people at a time
      
      setCount(prev => {
        let newCount = isUp ? prev + changeAmount : prev - changeAmount;
        
        // Safety checks to ensure it perfectly stays inside the 101-145 boundaries
        if (newCount < 101) newCount = 101 + Math.floor(Math.random() * 3);
        if (newCount > 145) newCount = 145 - Math.floor(Math.random() * 3);
        
        return newCount;
      });
    };

    const intervalId = setInterval(runPulse, 4000); // Ticks every 4 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-xs mb-6 sm:mb-8 uppercase tracking-widest shadow-[0_0_10px_rgba(16,185,129,0.1)] transition-colors duration-500 hover:bg-emerald-500/20">
      {/* Live Flashing Pulse Green Dot */}
      <div className="relative flex h-3 w-3 mr-1">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
      </div>
      {count} Hustlers Purchasing Live
    </div>
  );
}
