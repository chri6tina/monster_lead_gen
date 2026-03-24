"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(password: string) {
  // Use env var or default back to a safe fallback
  const expectedPassword = process.env.ADMIN_SECRET_TOKEN || "monsteradmin123";

  if (password === expectedPassword) {
    // Set cookie, valid for 7 days
    const cookieStore = await cookies();
    cookieStore.set("admin_token", "authenticated", { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 7 });
  } else {
    return { error: "Invalid Credentials" };
  }

  // Redirect on success
  redirect("/admin");
}
export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
  redirect("/admin/login");
}
