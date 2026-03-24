import { BlogForm } from "../BlogForm";
import { updateBlogPost } from "../actions";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { notFound } from "next/navigation";

export default async function EditBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  if (!supabaseAdmin) {
     return <div className="p-10 font-bold text-red-500">Supabase Admin not configured.</div>;
  }

  const { data, error } = await supabaseAdmin.from('blogs').select('*').eq('slug', slug).single();

  if (error || !data) {
    notFound();
  }

  // Bind the old slug so the action knows what to update in case slug changes
  const updateAction = async (payload: any) => {
    "use server";
    await updateBlogPost(slug, payload);
  };

  return (
    <BlogForm 
      initialData={data} 
      action={updateAction} 
      title="Edit Blog Post" 
    />
  );
}
