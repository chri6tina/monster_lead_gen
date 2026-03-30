"use client";

import { useState, useTransition } from "react";
import { BlogPayload } from "./actions";
import { Save, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface BlogFormProps {
  initialData?: BlogPayload;
  action: (data: BlogPayload) => Promise<void>;
  title: string;
}

export function BlogForm({ initialData, action, title }: BlogFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<BlogPayload>({
    slug: initialData?.slug || "",
    title: initialData?.title || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    author: initialData?.author || "Intelligence Div.",
    date: initialData?.date || new Date().toISOString().split("T")[0],
    targetNiche: initialData?.targetNiche || "",
    targetCity: initialData?.targetCity || "",
    linkedUrl: initialData?.linkedUrl || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      setError(null);
      try {
        await action(formData);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
      }
    });
  };

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <Link href="/admin/blogs" className="inline-flex items-center gap-2 text-zinc-500 hover:text-emerald-500 font-bold uppercase text-xs tracking-widest mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>
      
      <div className="mb-12">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">{title}</h1>
        <p className="text-zinc-500 font-medium">Configure blog post parameters below. The content field accepts HTML for rich formatting.</p>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl font-bold">
          Error: {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest block">URL Slug *</label>
            <input 
              required
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="e.g. standard-cleaning-systems"
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-white placeholder-zinc-700 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest block">Title *</label>
            <input 
              required
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Standard Cleaning Systems"
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-white placeholder-zinc-700 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest block">Author *</label>
            <input 
              required
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-white placeholder-zinc-700 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest block">Date *</label>
            <input 
              required
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-white placeholder-zinc-700 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest block">Target Niche</label>
            <input 
              name="targetNiche"
              value={formData.targetNiche}
              onChange={handleChange}
              placeholder="commercial-cleaning"
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-white placeholder-zinc-700 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest block">Target City</label>
            <input 
              name="targetCity"
              value={formData.targetCity}
              onChange={handleChange}
              placeholder="new-york-ny"
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-white placeholder-zinc-700 outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest block">Excerpt *</label>
          <textarea 
            required
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            rows={2}
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-white placeholder-zinc-700 outline-none transition-all resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center justify-between">
            <span>HTML Content *</span>
            <span className="text-[10px] text-zinc-600">Supports standard HTML tags</span>
          </label>
          <textarea 
            required
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={15}
            className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-4 text-zinc-300 font-mono text-sm placeholder-zinc-800 outline-none transition-all"
            placeholder="<p>Enter HTML here...</p>"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest block">Linked URL Override (Optional)</label>
          <input 
            name="linkedUrl"
            value={formData.linkedUrl}
            onChange={handleChange}
            placeholder="e.g. /commercial-cleaning/new-york-ny (Leave empty for auto-routing)"
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-white placeholder-zinc-700 outline-none transition-all"
          />
        </div>

        <button 
          type="submit"
          disabled={isPending}
          className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black uppercase text-sm tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Transmitting...</>
          ) : (
             <><Save className="w-5 h-5" /> Save Blog Post</>
          )}
        </button>
      </form>
    </div>
  );
}
