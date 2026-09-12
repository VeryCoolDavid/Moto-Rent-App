"use strict";
async function fetchMotorcycles() {
  const response = await fetch(
    "https://cdn.freecodecamp.org/curriculum/labs/data/motorcycles.json"
  );
  const data = await response.json();
  return data;
}
function renderMotorcycleCard(motorcycle) {
  return `<div class="motorcycle-card">
        <div class="motorcycle-card-image-container">
          <img src="${motorcycle.image_url}" alt="${motorcycle.name}"class="motorcycle-card-image">
          <div class="motorcycle-card-year-badge">
            ${motorcycle.year}
          </div>
        </div>
        <div class="motorcycle-card-content">
          <div class="motorcycle-card-header">
            <div>
              <h3 class="motorcycle-card-title">${motorcycle.name}</h3>
              <p class="motorcycle-card-manufacturer">${motorcycle.manufacturer}</p>
            </div>
            <span class="motorcycle-card-category">
              ${motorcycle.category}
            </span>
          </div>
          <p class="motorcycle-card-description">${motorcycle.description}</p>
          <div class="motorcycle-card-footer">
            <div>
              <p class="motorcycle-card-price">
                  ₹${motorcycle.price}
              </p>
              <p class="motorcycle-card-engine">350cc</p>
            </div>
            <button class="motorcycle-card-button" data-motorcycle-id="${motorcycle.id}">
              View Details
            </button>
          </div>
        </div>
      </div>`;
}
class MotorcycleGalleryApp {
  allMotorcycles = [];
  async loadMotorcycles() {
    this.allMotorcycles = await fetchMotorcycles();
    this.renderMotorcycles();
  }
  renderMotorcycles(motorcycles = this.allMotorcycles) {
    const motorcycleGrid = document.querySelector("#motorcycle-grid");
    const resultsNumber = document.querySelector("#results-number");
    resultsNumber.textContent = `${motorcycles.length}`;
    motorcycleGrid.innerHTML = motorcycles.map(renderMotorcycleCard).join("");
  }
  filter() {
    const nameFilterInput = document.querySelector("#name-filter-input");
    nameFilterInput.addEventListener("input", () => {
      const filterValue = nameFilterInput.value.toLowerCase();
      const filteredMotorcycles = this.allMotorcycles.filter((motorcycle) =>
        motorcycle.name.toLowerCase().includes(filterValue)
      );
      const motorcycleGrid = document.querySelector("#motorcycle-grid");
      const resultsNumber = document.querySelector("#results-number");
      motorcycleGrid.innerHTML = filteredMotorcycles
        .map(renderMotorcycleCard)
        .join("");
      resultsNumber.textContent = `${filteredMotorcycles.length}`;
    });
  }
}
const app = new MotorcycleGalleryApp();
app.loadMotorcycles();
app.filter();
