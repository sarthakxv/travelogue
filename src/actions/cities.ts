"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addCity(name: string) {
  const supabase = await createClient();
  const slug = name;

  const { error } = await supabase.from("cities").insert([{ name, slug }]);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  return { success: true };
}
