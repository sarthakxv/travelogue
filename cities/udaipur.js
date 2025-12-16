import { fetchPlaces } from "./supabaseClient.js";
import { initPage } from "./utils.js";

// const places = [ ... ] // Moved to Supabase

(async () => {
    const places = await fetchPlaces("Udaipur");
    initPage(places, "Udaipur");
})();
