import { createClient } from "@/lib/supabase/server";
import { CityList } from "@/components/CityList";
import { City } from "@/lib/supabase/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Destinations",
  description: "My travel bucket list for India - places to explore.",
};

export default async function HomePage() {
  const supabase = await createClient();

  const { data: cities, error } = await supabase
    .from("cities")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error loading cities:", error);
  }

  return (
    <div className="max-w-[600px] mx-auto">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Destinations</h1>
        <p className="text-gray-500 text-lg">Places to explore</p>
      </header>

      <CityList cities={(cities as City[]) || []} />
    </div>
  );
}
