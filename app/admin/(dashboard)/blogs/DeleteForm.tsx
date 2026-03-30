"use client";

import { Trash2 } from "lucide-react";

export function DeleteForm({ slug, action }: { slug: string; action: (slug: string) => Promise<void> }) {
  return (
    <form action={() => action(slug)}>
      <button 
        type="submit"
        className="p-2 bg-zinc-800 hover:bg-red-500 text-zinc-400 hover:text-white rounded border border-zinc-700 hover:border-red-500 transition-colors"
        title="Delete Post"
        onClick={(e) => {
          if (!window.confirm("Are you sure you want to delete this blog post? This cannot be undone.")) {
            e.preventDefault();
          }
        }}
      >
         <Trash2 className="w-4 h-4" />
      </button>
    </form>
  );
}
