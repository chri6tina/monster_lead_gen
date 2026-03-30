import { CheckCircle2, ChevronRight, X } from "lucide-react";
import { CheckoutModalButton } from "./CheckoutModalButton";

interface PricingSectionProps {
  cityName?: string;
  formattedLocation?: string;
  formattedNiche?: string;
}

export function PricingSection({
  cityName,
  formattedLocation,
  formattedNiche,
}: PricingSectionProps) {
  const headingHtml = formattedLocation && formattedNiche 
    ? <>Your <span className="text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">{formattedLocation}</span>{" "}Leads Arsenal</>
    : <>Fuel Your New Business:<br/><span className="text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">Choose Your Arsenal</span></>;
    
  const subHeadingStr = formattedLocation && formattedNiche
    ? `Select a highly-qualified prospect database tailored for ${formattedNiche} professionals in ${formattedLocation}. Start dialing today.`
    : `Select a highly-qualified prospect database tailored to your target city and niche. Skip the games. Start dialing today.`;

  const btnTextStarter = cityName ? `Buy 50 ${cityName} Leads` : "Buy 50 Leads";
  const btnTextGrowth = cityName ? `Buy 100 ${cityName} Leads` : "Buy 100 Leads";
  const btnTextDom = cityName ? `Buy 200 ${cityName} Leads` : "Buy 200 Leads";

  const featLocalTxt = formattedLocation ? ` ${formattedLocation} Contacts` : ` Local Decision-Makers`;

  // We are changing the prices to 29 49 79 as per user request!
  const PRICE_STARTER = "29";
  const PRICE_GROWTH = "49";
  const PRICE_DOMINATION = "79";

  return (
    <section id="pricing" className="py-32 bg-zinc-950 relative shadow-inner scroll-mt-20">
      <div className="absolute inset-0 bg-[linear-gradient(wrap...)] bg-opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDM5LjVoNDBtLTM5LjUtNDB2NDAiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">{headingHtml}</h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto font-medium">{subHeadingStr}</p>
        </div>

        {/* Mobile View: Cards */}
        <div className="grid lg:hidden gap-8 max-w-md mx-auto items-center">
          <PricingCard 
            title="Starter"
            leadCount="50"
            price={`$${PRICE_STARTER}`}
            features={[
              `50 Verified${featLocalTxt}`,
              "Bypass Gatekeeper Contact Info",
              "Instant CRM-Ready Download"
            ]}
            ctaText={btnTextStarter}
            isPopular={false}
            cityName={cityName}
            formattedNiche={formattedNiche}
          />
          <PricingCard 
            title="Growth"
            leadCount="100"
            price={`$${PRICE_GROWTH}`}
            features={[
              `100 Verified${featLocalTxt}`,
              "Bypass Gatekeeper Contact Info",
              "Instant CRM-Ready Download",
              "Bonus: High-Converting Sales Scripts"
            ]}
            ctaText={btnTextGrowth}
            isPopular={true}
            cityName={cityName}
            formattedNiche={formattedNiche}
          />
          <PricingCard 
            title="Domination"
            leadCount="200"
            price={`$${PRICE_DOMINATION}`}
            features={[
              `200 Verified${featLocalTxt}`,
              "Bypass Gatekeeper Contact Info",
              "Instant CRM-Ready Download",
              "Bonus: High-Converting Sales Scripts",
              "Bonus: 30-Day Drip Sequence Blueprints",
              "Bonus: Automated Lead Pipeline Tracker"
            ]}
            ctaText={btnTextDom}
            isPopular={false}
            cityName={cityName}
            formattedNiche={formattedNiche}
          />
        </div>

        {/* Desktop View: Comparison Table */}
        <div className="hidden lg:block w-full max-w-5xl mx-auto overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/60 shadow-2xl relative">
          <div className="grid grid-cols-4 w-full relative z-10">
            {/* Headers Row */}
            <div className="p-6 border-b border-zinc-800 flex flex-col justify-end bg-zinc-950/80">
              <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest pl-1">Plan Features {cityName ? `(${cityName})` : ''}</h3>
            </div>
            
            <div className="p-6 border-b border-l border-zinc-800 text-center bg-zinc-950/80 flex flex-col items-center justify-center pt-12">
              <h3 className="text-2xl font-black text-white mb-1 font-serif tracking-tight">Starter</h3>
              <div className="flex items-center gap-1 mb-4">
                <span className="text-lg font-bold text-zinc-500">$</span>
                <span className="text-4xl font-black text-white">{PRICE_STARTER}</span>
              </div>
              <CheckoutModalButton
                planName="Starter"
                priceAmount={PRICE_STARTER}
                leadCount="50"
                cityName={cityName}
                nicheName={formattedNiche}
                ctaText="Select"
                buttonClassName="w-full px-4 py-3 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-white font-black text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-sm"
              />
            </div>
            
            <div className="p-6 border-b border-l border-zinc-800 text-center bg-emerald-950/10 flex flex-col items-center justify-center relative pt-12 group">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-400 text-zinc-950 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)] whitespace-nowrap z-20">Most Popular</div>
              <div className="absolute inset-x-0 inset-y-0 border-x-2 border-emerald-500/50 bg-emerald-500/[0.03] z-0 pointer-events-none"></div>
              <div className="relative z-10 flex flex-col items-center justify-center w-full">
                <h3 className="text-2xl font-black text-emerald-400 mb-1 font-serif tracking-tight">Growth</h3>
                <div className="flex items-center gap-1 mb-4">
                  <span className="text-lg font-bold text-zinc-500">$</span>
                  <span className="text-4xl font-black text-white">{PRICE_GROWTH}</span>
                </div>
                <CheckoutModalButton
                  planName="Growth"
                  priceAmount={PRICE_GROWTH}
                  leadCount="100"
                  cityName={cityName}
                  nicheName={formattedNiche}
                  ctaText="Select"
                  buttonClassName="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 font-black text-xs uppercase tracking-widest transition-all hover:-translate-y-0.5 shadow-[0_0_15px_rgba(16,185,129,0.2)] flex items-center justify-center gap-2"
                />
              </div>
            </div>
            
            <div className="p-6 border-b border-l border-zinc-800 text-center bg-zinc-950/80 flex flex-col items-center justify-center pt-12">
              <h3 className="text-2xl font-black text-white mb-1 font-serif tracking-tight">Domination</h3>
              <div className="flex items-center gap-1 mb-4">
                <span className="text-lg font-bold text-zinc-500">$</span>
                <span className="text-4xl font-black text-white">{PRICE_DOMINATION}</span>
              </div>
              <CheckoutModalButton
                planName="Domination"
                priceAmount={PRICE_DOMINATION}
                leadCount="200"
                cityName={cityName}
                nicheName={formattedNiche}
                ctaText="Select"
                buttonClassName="w-full px-4 py-3 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-white font-black text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-sm"
              />
            </div>

            {/* Row 1: Number of Leads */}
            <div className="px-6 py-5 border-b border-zinc-800 flex flex-col justify-center bg-zinc-950/40">
              <h4 className="text-sm font-bold text-white mb-0.5">Number of Leads</h4>
              <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">Verified {formattedNiche ? formattedNiche : 'business'} locations.</p>
            </div>
            <div className="px-6 py-5 border-b border-l border-zinc-800 text-center flex items-center justify-center bg-zinc-950/40">
              <span className="text-xl font-black text-white tracking-widest">50</span>
            </div>
            <div className="px-6 py-5 border-b border-l-2 border-r-2 border-emerald-500/50 text-center flex items-center justify-center bg-emerald-500/[0.03] relative z-10">
              <span className="text-xl font-black text-emerald-400 tracking-widest text-[1.4rem]">100</span>
            </div>
            <div className="px-6 py-5 border-b border-l border-zinc-800 text-center flex items-center justify-center bg-zinc-950/40">
              <span className="text-xl font-black text-white tracking-widest">200</span>
            </div>

            {/* Row 2: Basic Lead Details */}
            <div className="px-6 py-5 border-b border-zinc-800 flex flex-col justify-center bg-zinc-950/40">
              <h4 className="text-sm font-bold text-white mb-0.5">Gatekeeper Bypass Data</h4>
              <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">Direct decision-maker emails, verified phone numbers, and precise coordinates.</p>
            </div>
            <div className="px-6 py-5 border-b border-l border-zinc-800 flex items-center justify-center text-center bg-zinc-950/40">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" /><span className="ml-2 font-bold text-zinc-300 text-sm">Included</span>
            </div>
            <div className="px-6 py-5 border-b border-l-2 border-r-2 border-emerald-500/50 flex items-center justify-center text-center bg-emerald-500/[0.03] relative z-10">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" /><span className="ml-2 font-bold text-emerald-400 text-sm">Included</span>
            </div>
            <div className="px-6 py-5 border-b border-l border-zinc-800 flex items-center justify-center text-center bg-zinc-950/40">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" /><span className="ml-2 font-bold text-zinc-300 text-sm">Included</span>
            </div>

            {/* Row 3: Outreach Process */}
            <div className="px-6 py-5 border-b border-zinc-800 flex flex-col justify-center bg-zinc-950/40">
              <h4 className="text-sm font-bold text-white mb-0.5">Cold-Outreach Arsenal</h4>
              <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">Plug-and-play sales scripts designed to convert cold B2B prospects.</p>
            </div>
            <div className="px-6 py-5 border-b border-l border-zinc-800 flex items-center justify-center text-center text-zinc-800 bg-zinc-950/40">
              <X className="h-5 w-5" />
            </div>
            <div className="px-6 py-5 border-b border-l-2 border-r-2 border-emerald-500/50 flex items-center justify-center text-center bg-emerald-500/[0.03] relative z-10">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" /><span className="ml-2 font-bold text-emerald-400 text-sm">Included</span>
            </div>
            <div className="px-6 py-5 border-b border-l border-zinc-800 flex items-center justify-center text-center bg-zinc-950/40">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" /><span className="ml-2 font-bold text-zinc-300 text-sm">Included</span>
            </div>

            {/* Row 4: Email Tracking & Automation */}
            <div className="px-6 py-5 border-zinc-800 flex flex-col justify-center bg-zinc-950/40">
              <h4 className="text-sm font-bold text-white mb-0.5">Pipeline Management Systems</h4>
              <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">Pre-built 30-day follow-up drips and pipeline tracking grids.</p>
            </div>
            <div className="px-6 py-5 border-l border-zinc-800 flex items-center justify-center text-center text-zinc-800 bg-zinc-950/40">
              <X className="h-5 w-5" />
            </div>
            <div className="px-6 py-5 border-l-2 border-r-2 border-b-2 rounded-b-3xl border-emerald-500/50 flex items-center justify-center text-center bg-emerald-500/[0.03] relative z-10">
              <X className="h-5 w-5 text-zinc-800" />
            </div>
            <div className="px-6 py-5 border-l border-zinc-800 flex items-center justify-center text-center bg-zinc-950/40">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" /><span className="ml-2 font-bold text-zinc-300 text-sm">Included</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Transactional Pricing Card Component
function PricingCard({ 
  title, 
  leadCount, 
  price, 
  features, 
  ctaText, 
  isPopular,
  cityName,
  formattedNiche 
}: { 
  title: string; 
  leadCount: string; 
  price: string; 
  features: string[]; 
  ctaText: string; 
  isPopular?: boolean; 
  cityName?: string;
  formattedNiche?: string;
}) {
  const parsedPrice = price.replace('$', '');

  return (
    <div className={`bg-zinc-900 border rounded-[2rem] overflow-hidden transition-all duration-300 flex flex-col group relative ${isPopular ? 'border-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.2)] lg:-translate-y-4' : 'border-zinc-800 hover:border-emerald-500/50 hover:shadow-[0_20px_50px_rgba(16,185,129,0.1)]'}`}>
      {isPopular && (
        <div className="absolute top-0 left-0 right-0 text-center py-2 bg-gradient-to-r from-emerald-500 to-teal-400 text-zinc-950 text-xs font-black uppercase tracking-widest z-10">
          Most Popular Arsenal
        </div>
      )}
      
      {!isPopular && <div className="h-2 w-full bg-gradient-to-r from-zinc-800 to-zinc-700 group-hover:from-emerald-500 group-hover:to-teal-400 transition-all"></div>}
      
      <div className={`p-10 flex-1 flex flex-col ${isPopular ? 'pt-14' : ''}`}>
        <h3 className="text-xl font-bold text-zinc-400 mb-2 uppercase tracking-wide">
          {title}
        </h3>
        <div className="flex items-baseline gap-2 mb-6">
          <span className="text-6xl font-black text-white tracking-tighter">{leadCount}</span>
          <span className="text-xl font-bold text-emerald-500">Leads</span>
        </div>
        
        <div className="mb-8">
          <span className="text-4xl font-black text-white">{price}</span>
          <span className="text-zinc-500 text-sm font-bold ml-2">/ one-time</span>
        </div>
        
        <div className="mb-10 flex-1">
          <ul className="space-y-4">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2 className={`h-6 w-6 shrink-0 ${feature.includes('Bonus') ? 'text-teal-400' : 'text-emerald-500'}`} />
                <span className={`text-base leading-tight font-medium ${feature.includes('Bonus') ? 'text-teal-100 font-bold' : 'text-zinc-300'}`}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="pt-8 border-t border-zinc-800 mt-auto">
          <CheckoutModalButton 
            planName={title}
            priceAmount={parsedPrice}
            leadCount={leadCount}
            cityName={cityName}
            nicheName={formattedNiche}
            ctaText={ctaText}
            buttonClassName={`w-full px-8 py-5 rounded-xl font-black transition-all flex items-center justify-center gap-2 uppercase tracking-wider text-sm ${isPopular ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-zinc-950 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:brightness-110' : 'bg-zinc-800 border border-zinc-700 text-white hover:bg-emerald-500 hover:border-emerald-500 hover:text-zinc-950'}`}
          />
        </div>
      </div>
    </div>
  );
}
