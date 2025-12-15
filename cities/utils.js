export function initPage(places, cityName) {
  const grid = document.getElementById("cardGrid");
  const filterButtons = document.querySelectorAll(".filter-btn");

  function renderCards(filterType) {
    grid.innerHTML = "";

    const filteredPlaces =
      filterType === "all"
        ? places
        : places.filter((place) => place.type === filterType);

    filteredPlaces.forEach((place) => {
      const a = document.createElement("a");
      a.className = "card";
      a.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        place.name + " " + cityName
      )}`;
      a.target = "_blank";
      a.rel = "noopener noreferrer";

      a.innerHTML = `
        <div class="card-title">${place.name}</div>
        <div class="card-desc">${place.desc}</div>
        <div class="card-action">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </div>
      `;
      grid.appendChild(a);
    });
  }

  function updateFilterVisibility() {
    const activeTypes = new Set(places.map((p) => p.type));
    filterButtons.forEach((btn) => {
      const type = btn.getAttribute("data-filter");
      if (type !== "all" && !activeTypes.has(type)) {
        btn.style.display = "none";
      }
    });
  }

  // Initial render
  updateFilterVisibility();
  renderCards("all");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderCards(btn.getAttribute("data-filter"));
    });
  });
}
