"use client";

import { useState, useEffect } from "react";
import { ChevronRight, X, Mail, MapPin } from "lucide-react";
import { createCheckoutSession } from "@/app/actions/checkout";

interface CheckoutModalButtonProps {
  planName: string;
  priceAmount: string;
  leadCount: string;
  cityName?: string;
  nicheName?: string;
  ctaText: string;
  buttonClassName: string;
}

export function CheckoutModalButton({
  planName,
  priceAmount,
  leadCount,
  cityName,
  nicheName,
  ctaText,
  buttonClassName
}: CheckoutModalButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    // Capture the exact referral page dynamically strictly on the client side
    setCurrentUrl(window.location.href);
  }, []);

  return (
    <>
      <button 
        type="button" 
        onClick={() => setIsOpen(true)}
        className={buttonClassName}
      >
        {ctaText} <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <div 
            className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Main Form Box */}
          <div className="relative bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-md p-8 shadow-2xl overflow-hidden shadow-emerald-500/10">
            {/* Glowing Effects */}
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-teal-500/10 rounded-full blur-[60px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-8 relative z-10">
              <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Secure Your Targets</h3>
              <p className="text-sm text-zinc-400 font-medium">We need your contact information to deliver your {leadCount} B2B Leads instantly after purchase.</p>
            </div>

            <form action={createCheckoutSession} className="relative z-10 flex flex-col gap-4">
              {/* HIDDEN PAYLOAD INJECTION */}
              <input type="hidden" name="planName" value={planName} />
              <input type="hidden" name="priceAmount" value={priceAmount} />
              <input type="hidden" name="leadCount" value={leadCount} />
              <input type="hidden" name="cityName" value={cityName || ""} />
              <input type="hidden" name="nicheName" value={nicheName || ""} />
              <input type="hidden" name="sourceUrl" value={currentUrl} /> {/* Custom Tracker! */}

              <div>
                <label className="block text-[11px] font-black text-zinc-500 uppercase tracking-widest mb-1.5 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input 
                    type="email" 
                    name="clientEmail"
                    required
                    placeholder="Where should we send the data?" 
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-medium text-sm shadow-inner"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-black text-zinc-500 uppercase tracking-widest mb-1.5 ml-1">Target Zip Code</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input 
                    type="text" 
                    name="zipCode"
                    required
                    placeholder="Enter your target service zip code" 
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-medium text-sm shadow-inner"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full mt-4 px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 font-black transition-all flex items-center justify-center gap-2 uppercase tracking-wider text-sm shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]"
              >
                Proceed to Checkout
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
