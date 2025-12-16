"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { PlaceType } from "@/lib/supabase/types";

export async function addPlace(
  citySlug: string,
  name: string,
  type: PlaceType,
  description: string
) {
  const supabase = await createClient();

  const { error } = await supabase.from("places").insert([
    {
      city: citySlug,
      name,
      type,
      description,
    },
  ]);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/cities/${citySlug}`);
  return { success: true };
}

export async function deletePlace(id: number, citySlug: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("places").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/cities/${citySlug}`);
  return { success: true };
}
