import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";
import { deleteBlogPost } from "./actions";
import { DeleteForm } from "./DeleteForm";

export default async function AdminBlogsPage() {
  const blogs = await fetchBlogs();

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Blog Posts</h1>
          <p className="text-zinc-500 font-medium">Manage blog posts safely via Supabase.</p>
        </div>
        <Link 
          href="/admin/blogs/new" 
          className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-sm uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:-translate-y-1"
        >
          <Plus className="w-5 h-5" /> Add Blog Post
        </Link>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-950">
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Title & Slug</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest hidden md:table-cell">Author & Date</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest hidden lg:table-cell">Context</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {blogs.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-zinc-500 font-medium">
                  No blog posts detected in the database.
                </td>
              </tr>
            )}
            {blogs.map((blog) => (
              <tr key={blog.slug} className="hover:bg-zinc-800/30 transition-colors group">
                <td className="p-4 align-top">
                  <div className="font-bold text-zinc-100 flex items-center gap-2">
                     {blog.title}
                     <Link href={`/blog/${blog.slug}`} target="_blank" className="opacity-0 group-hover:opacity-100 text-emerald-500 transition-opacity">
                       <ExternalLink className="w-4 h-4" />
                     </Link>
                  </div>
                  <div className="text-xs text-zinc-500 mt-1 uppercase tracking-widest">{blog.slug}</div>
                </td>
                <td className="p-4 align-top hidden md:table-cell">
                  <div className="text-sm font-bold text-zinc-300">{blog.author}</div>
                  <div className="text-xs text-zinc-500 mt-1 uppercase tracking-widest">{blog.date}</div>
                </td>
                <td className="p-4 align-top hidden lg:table-cell">
                  {(blog.targetNiche || blog.targetCity) ? (
                    <div className="flex flex-wrap gap-2">
                       {blog.targetNiche && <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] uppercase font-bold tracking-widest">{blog.targetNiche.replace(/-/g, ' ')}</span>}
                       {blog.targetCity && <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700 text-[10px] uppercase font-bold tracking-widest">{blog.targetCity.replace(/-/g, ' ')}</span>}
                    </div>
                  ) : <span className="text-zinc-600 text-xs italic">General</span>}
                </td>
                <td className="p-4 align-top text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link 
                      href={`/admin/blogs/${blog.slug}`}
                      className="p-2 bg-zinc-800 hover:bg-emerald-500 text-zinc-400 hover:text-zinc-950 rounded border border-zinc-700 hover:border-emerald-500 transition-colors"
                      title="Edit Post"
                    >
                       <Edit className="w-4 h-4" />
                    </Link>
                    
                    <DeleteForm slug={blog.slug} action={deleteBlogPost} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Fetch helper directly fetching from DB
async function fetchBlogs() {
  if (!supabaseAdmin) return [];
  const { data, error } = await supabaseAdmin.from('blogs').select('*').order('date', { ascending: false });
  if (error || !data) return [];
  return data;
}
