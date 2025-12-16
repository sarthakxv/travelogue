import { supabase } from './supabaseClient.js';

const allPlaces = [
  // Kochi
  { city: "Kochi", name: "Qissa Cafe", type: "food", description: "Cozy art cafe famous for breakfast and coffee." },
  { city: "Kochi", name: "Koder House", type: "hotel", description: "Heritage boutique hotel with rich history." },
  { city: "Kochi", name: "Loafers Corner House", type: "food", description: "Laid-back hangout with great street views." },
  { city: "Kochi", name: "Seagull Bar", type: "bar", description: "Waterfront dining with a view of the harbor." },
  { city: "Kochi", name: "Brunton Boatyard", type: "hotel", description: "Colonial-style luxury hotel on the waterfront." },
  { city: "Kochi", name: "Hortus Bar", type: "bar", description: "Relaxed lounge setting for evening drinks." },
  { city: "Kochi", name: "Velocity Bar", type: "bar", description: "Lively spot for nightlife and music." },
  { city: "Kochi", name: "Jew Street", type: "shopping", description: "Antique shops, spices, and heritage walks." },
  { city: "Kochi", name: "Mattancherry Palace", type: "sightseeing", description: "The 'Dutch Palace' featuring ancient murals." },
  { city: "Kochi", name: "Trident", type: "hotel", description: "Upscale stay located on Willingdon Island." },
  { city: "Kochi", name: "Karthiyani Restaurant", type: "food", description: "Authentic local Kerala meals." },
  { city: "Kochi", name: "Gokul Ootupura", type: "food", description: "Popular spot for crispy South Indian Dosas." },
  { city: "Kochi", name: "Cherai Beach", type: "beach", description: "Golden sands and calm waters for swimming." },

  // Udaipur
  { city: "Udaipur", name: "City Palace", type: "sightseeing", description: "A monumental complex of 11 palaces, courtyards and gardens." },
  { city: "Udaipur", name: "Lake Pichola", type: "sightseeing", description: "Artificial fresh water lake, created in the year 1362 AD." },
  { city: "Udaipur", name: "Ambrai Ghat", type: "sightseeing", description: "A beautiful ghat at the lakeside." },

  // Jaisalmer
  { city: "Jaisalmer", name: "Jaisalmer Fort", type: "sightseeing", description: "A living fort made of yellow sandstone." },
  { city: "Jaisalmer", name: "Patwon Ki Haveli", type: "sightseeing", description: "A cluster of five havelis of unique architecture." },
  { city: "Jaisalmer", name: "Sam Sand Dunes", type: "sightseeing", description: "Desert dunes perfect for camel safaris." },

  // Shillong
  { city: "Shillong", name: "Umiam Lake", type: "sightseeing", description: "A mesmerizing man-made reservoir." },
  { city: "Shillong", name: "Elephant Falls", type: "sightseeing", description: "Three-tiered waterfall surrounded by greenery." },
  { city: "Shillong", name: "Shillong Peak", type: "sightseeing", description: "Highest point in Shillong offering panoramic views." },

  // Gangtok
  { city: "Gangtok", name: "Tsomgo Lake", type: "sightseeing", description: "Glacial lake associated with many myths." },
  { city: "Gangtok", name: "MG Marg", type: "shopping", description: "The main street of Gangtok, great for walk and food." },
  { city: "Gangtok", name: "Rumtek Monastery", type: "sightseeing", description: "One of the largest and most significant monasteries." }
];

const allCities = [
  { name: "Kochi", slug: "Kochi" },
  { name: "Udaipur", slug: "Udaipur" },
  { name: "Jaisalmer", slug: "Jaisalmer" },
  { name: "Shillong", slug: "Shillong" },
  { name: "Gangtok", slug: "Gangtok" }
];

export async function seedData() {
  console.log("Starting data seed for Places and Cities...");
  
  // 1. Seed Cities
  const { error: cityError } = await supabase
    .from('cities')
    .upsert(allCities, { onConflict: 'name' }); // Use upsert to prevent duplicates if re-running

  if (cityError) console.error("Error seeding cities:", cityError);
  else console.log("Cities seeded successfully.");

  // 2. Seed Places
  const { error: placeError } = await supabase
    .from('places')
    .insert(allPlaces);

  if (placeError) console.error("Error seeding places:", placeError);
  else console.log("Places seeded successfully.");
}

// Attach to window so it can be called from console
window.seedData = seedData;
