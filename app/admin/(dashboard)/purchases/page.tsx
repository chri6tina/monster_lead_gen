import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { CreditCard, ExternalLink, Calendar, Users, Target } from "lucide-react";

// Revalidate or Force dynamic so it's always fresh
export const dynamic = 'force-dynamic';

export default async function PurchasesDashboard() {
  if (!supabaseAdmin) {
    return (
      <div className="p-8">
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-6 rounded-2xl">
          <h2 className="text-xl font-bold mb-2">Supabase Admin Not Configured</h2>
          <p>Please check your .env.local for SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.</p>
        </div>
      </div>
    );
  }

  // Fetch the latest 50 purchases sorted by newest first
  const { data: purchases, error } = await supabaseAdmin
    .from('purchases')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) {
    console.error("Supabase Error Data:", error);
    throw new Error(`Database Error: ${error.message || 'Unknown error'} (Code: ${error.code || 'N/A'}) - Have you run the SQL script yet?`);
  }

  const paidPurchases = purchases?.filter(p => p.status === 'paid') || [];
  const pendingPurchases = purchases?.filter(p => p.status === 'pending') || [];

  const totalRevenue = paidPurchases.reduce((acc, curr) => acc + Number(curr.price_paid || 0), 0);
  const totalLeadsDelivered = paidPurchases.reduce((acc, curr) => acc + Number(curr.lead_count || 0), 0);

  return (
    <div className="p-8 md:p-12 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Region */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-900 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-emerald-400" />
              </div>
              <h1 className="text-3xl font-black text-white uppercase tracking-tight">Financial Ledger</h1>
            </div>
            <p className="text-sm text-zinc-400 font-medium">Real-time view of Stripe Webhook telemetry and Lead fulfillments.</p>
          </div>
        </header>

        {/* Top-Level Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex flex-col justify-between">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Total Webhook Sales</h3>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-black text-white">{paidPurchases.length}</span>
              <span className="text-sm font-bold text-amber-500/50 mb-1">({pendingPurchases.length} Intents)</span>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex flex-col justify-between">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Gross Revenue (Recent)</h3>
            <div className="text-4xl font-black text-emerald-500">${totalRevenue.toLocaleString()}</div>
          </div>
          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex flex-col justify-between">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Leads Pipelined</h3>
            <div className="text-4xl font-black text-white">{totalLeadsDelivered.toLocaleString()}</div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-zinc-950/50 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-zinc-900/80 border-b border-zinc-800 text-xs font-black uppercase tracking-widest text-zinc-500">
                <tr>
                  <th className="px-6 py-5">Date</th>
                  <th className="px-6 py-5">Buyer Email</th>
                  <th className="px-6 py-5">Target Data</th>
                  <th className="px-6 py-5">Package</th>
                  <th className="px-6 py-5">Revenue</th>
                  <th className="px-6 py-5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {!purchases || purchases.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-zinc-500 font-medium">
                      No purchases have been recorded by the webhook yet.
                    </td>
                  </tr>
                ) : (
                  purchases.map((purchase) => {
                    const date = new Date(purchase.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit"
                    });
                    
                    return (
                      <tr key={purchase.id} className="hover:bg-zinc-900/30 transition-colors">
                        <td className="px-6 py-4 font-medium text-zinc-400">
                          {date}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-white font-bold">{purchase.client_email || 'Direct Sale'}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-emerald-400 font-bold">{purchase.niche_name !== 'N/A' ? purchase.niche_name : 'Global'}</span>
                            <span className="text-xs text-zinc-500">{purchase.city_name !== 'N/A' ? purchase.city_name : 'National'} • {purchase.zip_code}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-zinc-300">{purchase.plan_name}</span>
                          <span className="ml-2 text-xs text-zinc-500">({purchase.lead_count} L)</span>
                        </td>
                        <td className="px-6 py-4 font-black tracking-tight text-white">
                          ${purchase.price_paid?.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          {purchase.status === 'pending' ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-amber-500/10 text-amber-500 border border-amber-500/20">
                              Pending
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              {purchase.status}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
