import { fetchPlaces } from "./supabaseClient.js";
import { initPage } from "./utils.js";

// const places = [ ... ] // Moved to Supabase

(async () => {
    const places = await fetchPlaces("Shillong");
    initPage(places, "Shillong");
})();
