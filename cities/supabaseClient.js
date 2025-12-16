import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

// Initialize the Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Fetch places for a specific city from Supabase
 * @param {string} cityName - The name of the city to filter by (e.g., "Kochi", "Udaipur")
 * @returns {Promise<Array>} - Array of place objects
 */
export async function fetchPlaces(cityName) {
  try {
    const { data, error } = await supabase
      .from('places')
      .select('*')
      .eq('city', cityName);

    if (error) {
      console.error(`Error fetching data for ${cityName}:`, error);
      return [];
    }

    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    return [];
  }
}

export { supabase }; // Export client just in case
