import { BlogForm } from "../BlogForm";
import { createBlogPost } from "../actions";

export default function NewBlogPage() {
  return (
    <BlogForm 
      action={createBlogPost} 
      title="Create New Blog Post" 
    />
  );
}
