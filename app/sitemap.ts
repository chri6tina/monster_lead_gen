import { MetadataRoute } from 'next';
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.leadmonster.com';

  // 1. Global Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/businesses`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // 2. Heavy Dynamic Routes (Blogs)
  let blogRoutes: MetadataRoute.Sitemap = [];
  
  if (supabaseAdmin) {
    try {
      const { data } = await supabaseAdmin.from('blogs').select('slug, date');
      if (data) {
        blogRoutes = data.map((blog) => ({
          url: `${baseUrl}/blog/${blog.slug}`,
          lastModified: new Date(blog.date),
          changeFrequency: 'weekly',
          priority: 0.8,
        }));
      }
    } catch(e) {
      console.error("Failed generating sitemap for blogs", e);
    }
  }

  return [...staticRoutes, ...blogRoutes];
}
