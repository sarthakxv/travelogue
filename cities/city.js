import { fetchPlaces, supabase } from "./supabaseClient.js";
import { initAdminMode } from "../admin/admin.js";

const urlParams = new URLSearchParams(window.location.search);
const citySlug = urlParams.get("id"); // e.g. 'Kochi'

if (!citySlug) {
    document.getElementById("cityName").textContent = "City Not Found";
} else {
    document.title = `${citySlug} Travel List`;
    document.getElementById("cityName").textContent = citySlug;
    loadCityData(citySlug);
    initAdminMode(renderPage); // Re-render when admin mode toggled
}

let currentPlaces = [];

async function loadCityData(city) {
    currentPlaces = await fetchPlaces(city);
    renderPage();
}

const grid = document.getElementById("cardGrid");
const filterButtons = document.querySelectorAll(".filter-btn");

function renderPage() {
    renderCards("all");
    updateFilterVisibility();
}

function renderCards(filterType) {
    grid.innerHTML = "";
    
    // Admin: Add "+" Card
    if (document.body.classList.contains("admin-mode")) {
        const addCard = document.createElement("div");
        addCard.className = "card add-card";
        addCard.innerHTML = `<span class="add-icon">+</span>`;
        addCard.onclick = () => {
            document.getElementById("addPlaceModal").classList.add("active");
        };
        grid.appendChild(addCard);
    }

    const filteredPlaces =
      filterType === "all"
        ? currentPlaces
        : currentPlaces.filter((place) => place.type === filterType);

    filteredPlaces.forEach((place) => {
        const a = document.createElement("div"); // Changed to div for easier button nesting
        a.className = "card";
        a.style.position = "relative"; // For delete button positioning

        // Delete Button (Admin Only)
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.innerHTML = "×";
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            openDeleteModal(place);
        };
        a.appendChild(deleteBtn);

        // Content Wrapper (Link behavior)
        const content = document.createElement("a");
        content.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            place.name + " " + citySlug
        )}`;
        content.target = "_blank";
        content.rel = "noopener noreferrer";
        content.style.textDecoration = "none";
        content.style.color = "inherit";
        content.style.display = "block";
        content.style.height = "100%";
        
        content.innerHTML = `
            <div class="card-title">${place.name}</div>
            <div class="card-desc">${place.description || place.desc}</div>
            <div class="card-action">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
            </div>
        `;
        
        a.appendChild(content);
        grid.appendChild(a);
    });
}

function updateFilterVisibility() {
    const activeTypes = new Set(currentPlaces.map((p) => p.type));
    filterButtons.forEach((btn) => {
        const type = btn.getAttribute("data-filter");
        if (type !== "all" && !activeTypes.has(type)) {
            btn.style.display = "none";
        } else {
            btn.style.display = "inline-block";
        }
    });
}

// Filter Logic
filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderCards(btn.getAttribute("data-filter"));
    });
});

// Admin Features implementation
let placeToDelete = null;

function openDeleteModal(place) {
    placeToDelete = place;
    document.getElementById("deletePlaceName").textContent = place.name;
    document.getElementById("deleteConfirmModal").classList.add("active");
}

document.getElementById("confirmDeleteBtn").addEventListener("click", async () => {
    if (!placeToDelete) return;
    
    // Call Supabase Delete
    const { error } = await supabase.from('places').delete().eq('id', placeToDelete.id);
    
    if (error) {
        alert("Error deleting place: " + error.message);
    } else {
        // Refresh data
        document.getElementById("deleteConfirmModal").classList.remove("active");
        loadCityData(citySlug);
    }
});

document.getElementById("savePlaceBtn").addEventListener("click", async () => {
    const name = document.getElementById("newPlaceName").value;
    const type = document.getElementById("newPlaceType").value;
    const desc = document.getElementById("newPlaceDesc").value;

    if (!name || !desc) {
        alert("Please fill in all fields");
        return;
    }

    const { error } = await supabase.from('places').insert([{
        city: citySlug,
        name: name,
        type: type,
        description: desc
    }]);

    if (error) {
        alert("Error adding place: " + error.message);
    } else {
        // Clear form and refresh
        document.getElementById("newPlaceName").value = "";
        document.getElementById("newPlaceDesc").value = "";
        document.getElementById("addPlaceModal").classList.remove("active");
        loadCityData(citySlug);
    }
});
