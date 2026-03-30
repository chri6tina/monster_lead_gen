import { CheckCircle2, X } from "lucide-react";
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
    ? <>Your <span className="text-white">{formattedLocation}</span>{" "}Data Payload</>
    : <>Data Acquisition:<br/><span className="text-white">Directory Infrastructure</span></>;
    
  const subHeadingStr = formattedLocation && formattedNiche
    ? `Select a highly-qualified prospect database tailored for ${formattedNiche} professionals in ${formattedLocation}. Instantly downloadable CSV.`
    : `Select a highly-qualified prospect database tailored to your target city and niche. Bypass gatekeepers instantly with verified contact data.`;

  const btnTextStarter = cityName ? `Acquire 50 ${cityName} Leads` : "Acquire 50 Leads";
  const btnTextGrowth = cityName ? `Acquire 100 ${cityName} Leads` : "Acquire 100 Leads";
  const btnTextDom = cityName ? `Acquire 200 ${cityName} Leads` : "Acquire 200 Leads";

  const featLocalTxt = formattedLocation ? ` ${formattedLocation} Contacts` : ` Decision-Makers`;

  // Prices 
  const PRICE_STARTER = "29";
  const PRICE_GROWTH = "49";
  const PRICE_DOMINATION = "79";

  return (
    <section id="pricing" className="py-32 bg-[#0a0a0a] relative scroll-mt-20 border-t border-white/5">
      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight">{headingHtml}</h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">{subHeadingStr}</p>
        </div>

        {/* Mobile View: Cards */}
        <div className="grid lg:hidden gap-6 max-w-md mx-auto items-center">
          <PricingCard 
            title="Starter"
            leadCount="50"
            price={`$${PRICE_STARTER}`}
            features={[
              `50 Verified${featLocalTxt}`,
              "Gatekeeper Bypass Analytics",
              "Instant CSV Export"
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
              "Gatekeeper Bypass Analytics",
              "Instant CSV Export",
              "B2B Sales Sequence Scripts"
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
              "Gatekeeper Bypass Analytics",
              "Instant CSV Export",
              "B2B Sales Sequence Scripts",
              "30-Day Drip Blueprints",
              "Automated Pipeline Tracker"
            ]}
            ctaText={btnTextDom}
            isPopular={false}
            cityName={cityName}
            formattedNiche={formattedNiche}
          />
        </div>

        {/* Desktop View: Comparison Table */}
        <div className="hidden lg:block w-full mx-auto overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f0f] shadow-2xl relative">
          <div className="grid grid-cols-4 w-full relative z-10">
            {/* Headers Row */}
            <div className="p-8 border-b border-white/5 flex flex-col justify-end bg-[#0a0a0a]">
              <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest pl-1">Matrix Specs {cityName ? `(${cityName})` : ''}</h3>
            </div>
            
            <div className="p-8 border-b border-l border-white/5 text-center bg-[#0a0a0a] flex flex-col items-center justify-center pt-12 hover:bg-white/[0.02] transition-colors">
              <h3 className="text-lg font-bold text-white mb-2 tracking-tight">Starter</h3>
              <div className="flex items-start gap-1 mb-8">
                <span className="text-xl font-bold text-neutral-500 mt-1">$</span>
                <span className="text-5xl font-bold text-white tracking-tighter">{PRICE_STARTER}</span>
              </div>
              <CheckoutModalButton
                planName="Starter"
                priceAmount={PRICE_STARTER}
                leadCount="50"
                cityName={cityName}
                nicheName={formattedNiche}
                ctaText="Initialize"
                buttonClassName="w-full px-4 py-3 rounded-xl border border-white/10 bg-transparent hover:bg-white/5 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
              />
            </div>
            
            <div className="p-8 border-b border-l border-white/5 text-center bg-[#141414] flex flex-col items-center justify-center relative pt-12 group">
              <div className="absolute top-0 inset-x-0 h-1 bg-emerald-500"></div>
              <div className="absolute top-4 left-1/2 -translate-x-1/2 text-emerald-500 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 whitespace-nowrap">Enterprise Standard</div>
              <div className="relative z-10 flex flex-col items-center justify-center w-full mt-4">
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight">Growth</h3>
                <div className="flex items-start gap-1 mb-6">
                  <span className="text-xl font-bold text-neutral-500 mt-1">$</span>
                  <span className="text-5xl font-bold text-white tracking-tighter">{PRICE_GROWTH}</span>
                </div>
                <CheckoutModalButton
                  planName="Growth"
                  priceAmount={PRICE_GROWTH}
                  leadCount="100"
                  cityName={cityName}
                  nicheName={formattedNiche}
                  ctaText="Initialize"
                  buttonClassName="w-full px-4 py-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                />
              </div>
            </div>
            
            <div className="p-8 border-b border-l border-white/5 text-center bg-[#0a0a0a] flex flex-col items-center justify-center pt-12 hover:bg-white/[0.02] transition-colors">
              <h3 className="text-lg font-bold text-white mb-2 tracking-tight">Domination</h3>
              <div className="flex items-start gap-1 mb-8">
                <span className="text-xl font-bold text-neutral-500 mt-1">$</span>
                <span className="text-5xl font-bold text-white tracking-tighter">{PRICE_DOMINATION}</span>
              </div>
              <CheckoutModalButton
                planName="Domination"
                priceAmount={PRICE_DOMINATION}
                leadCount="200"
                cityName={cityName}
                nicheName={formattedNiche}
                ctaText="Initialize"
                buttonClassName="w-full px-4 py-3 rounded-xl border border-white/10 bg-transparent hover:bg-white/5 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
              />
            </div>

            {/* Row 1: Number of Leads */}
            <div className="px-8 py-5 border-b border-white/5 flex flex-col justify-center bg-[#0a0a0a]">
              <h4 className="text-sm font-semibold text-neutral-300 mb-1">Volume Allocation</h4>
              <p className="text-[11px] text-neutral-500 font-medium leading-relaxed">Verified {formattedNiche ? formattedNiche : 'business'} locations.</p>
            </div>
            <div className="px-8 py-5 border-b border-l border-white/5 text-center flex items-center justify-center bg-[#0a0a0a]">
              <span className="text-lg font-semibold text-white">50 Leads</span>
            </div>
            <div className="px-8 py-5 border-b border-l border-white/5 text-center flex items-center justify-center bg-[#111111]">
              <span className="text-lg font-semibold text-white">100 Leads</span>
            </div>
            <div className="px-8 py-5 border-b border-l border-white/5 text-center flex items-center justify-center bg-[#0a0a0a]">
              <span className="text-lg font-semibold text-white">200 Leads</span>
            </div>

            {/* Row 2: Basic Lead Details */}
            <div className="px-8 py-5 border-b border-white/5 flex flex-col justify-center bg-[#0a0a0a]">
              <h4 className="text-sm font-semibold text-neutral-300 mb-1">Contact Vectors</h4>
              <p className="text-[11px] text-neutral-500 font-medium leading-relaxed">Decision-maker emails, verified phone numbers.</p>
            </div>
            <div className="px-8 py-5 border-b border-l border-white/5 flex items-center justify-center text-center bg-[#0a0a0a]">
              <CheckCircle2 className="h-5 w-5 text-neutral-400" />
            </div>
            <div className="px-8 py-5 border-b border-l border-white/5 flex items-center justify-center text-center bg-[#111111]">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            </div>
            <div className="px-8 py-5 border-b border-l border-white/5 flex items-center justify-center text-center bg-[#0a0a0a]">
              <CheckCircle2 className="h-5 w-5 text-neutral-400" />
            </div>

            {/* Row 3: Outreach Process */}
            <div className="px-8 py-5 border-b border-white/5 flex flex-col justify-center bg-[#0a0a0a]">
              <h4 className="text-sm font-semibold text-neutral-300 mb-1">Cold-Outreach Arsenal</h4>
              <p className="text-[11px] text-neutral-500 font-medium leading-relaxed">Plug-and-play sales scripts designed to convert.</p>
            </div>
            <div className="px-8 py-5 border-b border-l border-white/5 flex items-center justify-center text-center text-neutral-700 bg-[#0a0a0a]">
              <X className="h-4 w-4" />
            </div>
            <div className="px-8 py-5 border-b border-l border-white/5 flex items-center justify-center text-center bg-[#111111]">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            </div>
            <div className="px-8 py-5 border-b border-l border-white/5 flex items-center justify-center text-center bg-[#0a0a0a]">
              <CheckCircle2 className="h-5 w-5 text-neutral-400" />
            </div>

            {/* Row 4: Email Tracking & Automation */}
            <div className="px-8 py-6 flex flex-col justify-center bg-[#0a0a0a]">
              <h4 className="text-sm font-semibold text-neutral-300 mb-1">Pipeline Tracking</h4>
              <p className="text-[11px] text-neutral-500 font-medium leading-relaxed">Pre-built 30-day follow-up drips and trackers.</p>
            </div>
            <div className="px-8 py-6 border-l border-white/5 flex items-center justify-center text-center text-neutral-700 bg-[#0a0a0a]">
              <X className="h-4 w-4" />
            </div>
            <div className="px-8 py-6 border-l border-white/5 flex items-center justify-center text-center text-neutral-700 bg-[#111111]">
              <X className="h-4 w-4" />
            </div>
            <div className="px-8 py-6 border-l border-white/5 flex items-center justify-center text-center bg-[#0a0a0a]">
              <CheckCircle2 className="h-5 w-5 text-neutral-400" />
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
    <div className={`bg-[#0f0f0f] border rounded-2xl overflow-hidden transition-all duration-300 flex flex-col relative ${isPopular ? 'border-emerald-500/50 shadow-2xl relative z-10' : 'border-white/10 opacity-80 scale-[0.98]'}`}>
      {isPopular && (
        <div className="absolute top-0 inset-x-0 h-1 bg-emerald-500"></div>
      )}
      
      <div className="p-8 flex-1 flex flex-col">
        {isPopular && <span className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest mb-4 block">Enterprise Standard</span>}
        
        <h3 className="text-lg font-semibold text-white mb-2">
          {title}
        </h3>
        
        <div className="mb-6 flex items-start gap-1">
          <span className="text-xl font-bold text-neutral-500 mt-1">$</span>
          <span className="text-5xl font-bold text-white tracking-tighter">{parsedPrice}</span>
        </div>
        
        <div className="mb-8 p-3 rounded-lg bg-white/5 border border-white/5">
          <span className="text-white font-bold">{leadCount}</span>
          <span className="text-neutral-400 text-sm ml-1">Leads Delivered</span>
        </div>
        
        <div className="mb-10 flex-1">
          <ul className="space-y-4">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2 className={`h-5 w-5 shrink-0 ${isPopular && feature.includes('Scripts') ? 'text-emerald-500' : 'text-neutral-500'}`} />
                <span className="text-sm font-medium text-neutral-300">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-auto">
          <CheckoutModalButton 
            planName={title}
            priceAmount={parsedPrice}
            leadCount={leadCount}
            cityName={cityName}
            nicheName={formattedNiche}
            ctaText={ctaText}
            buttonClassName={`w-full px-6 py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 text-sm ${isPopular ? 'bg-white hover:bg-neutral-200 text-black' : 'bg-transparent border border-white/10 text-white hover:bg-white/5'}`}
          />
        </div>
      </div>
    </div>
  );
}
