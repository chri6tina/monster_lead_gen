"use server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Define strict payload
export type BlogPayload = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  targetNiche?: string;
  targetCity?: string;
  linkedUrl?: string;
};

export async function createBlogPost(data: BlogPayload) {
  if (!supabaseAdmin) throw new Error("Supabase Admin Client not initialized.");
  
  const { error } = await supabaseAdmin.from('blogs').insert([data]);
  
  if (error) {
    console.error("Failed to create blog", error);
    throw new Error(error.message);
  }

  // Revalidate to ensure latest fetching on frontend
  revalidatePath('/blog');
  revalidatePath('/admin/blogs');
  
  redirect('/admin/blogs');
}

export async function updateBlogPost(oldSlug: string, data: BlogPayload) {
  if (!supabaseAdmin) throw new Error("Supabase Admin Client not initialized.");
  
  const { error } = await supabaseAdmin.from('blogs').update(data).eq('slug', oldSlug);
  
  if (error) {
    console.error("Failed to update blog", error);
    throw new Error(error.message);
  }

  revalidatePath('/blog');
  revalidatePath(`/blog/${data.slug}`);
  revalidatePath('/admin/blogs');
  
  redirect('/admin/blogs');
}

export async function deleteBlogPost(slug: string) {
  if (!supabaseAdmin) throw new Error("Supabase Admin Client not initialized.");
  
  const { error } = await supabaseAdmin.from('blogs').delete().eq('slug', slug);
  
  if (error) {
    console.error("Failed to delete blog", error);
    throw new Error(error.message);
  }

  revalidatePath('/blog');
  revalidatePath('/admin/blogs');
}
