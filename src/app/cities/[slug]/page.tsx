import { createClient } from "@/lib/supabase/server";
import { PlacesList } from "@/components/PlacesList";
import { Place } from "@/lib/supabase/types";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface CityPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cityName = decodeURIComponent(slug);

  return {
    title: `${cityName} Travel List`,
    description: `A curated list of best places to visit in ${cityName}.`,
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { slug } = await params;
  const citySlug = decodeURIComponent(slug);
  const supabase = await createClient();

  // Verify city exists
  const { data: city, error: cityError } = await supabase
    .from("cities")
    .select("*")
    .eq("slug", citySlug)
    .single();

  if (cityError || !city) {
    notFound();
  }

  // Get places for this city
  const { data: places, error: placesError } = await supabase
    .from("places")
    .select("*")
    .eq("city", citySlug);

  if (placesError) {
    console.error("Error loading places:", placesError);
  }

  return (
    <div>
      <header className="max-w-[1200px] mx-auto text-center mb-10">
        <Link
          href="/"
          className="inline-block mb-5 text-gray-500 no-underline text-sm transition-colors hover:text-gray-900"
        >
          ← Back to Map
        </Link>
        <h1 className="text-4xl font-bold tracking-tight mb-2">{city.name}</h1>
        <p className="text-gray-500 text-lg">Travel Itinerary</p>
      </header>

      <PlacesList places={(places as Place[]) || []} citySlug={citySlug} />
    </div>
  );
}
