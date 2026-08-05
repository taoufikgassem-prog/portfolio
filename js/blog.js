/* ==========================================================================
   Taoufik GASSEM — Portfolio — blog.js
   Vanilla JavaScript — Blog search & category filters (blog.html only)
   Core article content always remains in static HTML for SEO.
   ========================================================================== */

(function () {
  "use strict";

  var searchInput = document.getElementById("blogSearch");
  var filterButtons = document.querySelectorAll(".filter-btn");
  var cards = document.querySelectorAll("[data-article-card]");
  var emptyState = document.getElementById("blogEmptyState");
  var resultsCount = document.getElementById("blogResultsCount");

  if (!cards.length) return;

  var activeCategory = "all";
  var activeQuery = "";

  function normalize(str) {
    return (str || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function applyFilters() {
    var visibleCount = 0;
    cards.forEach(function (card) {
      var category = card.getAttribute("data-category") || "";
      var searchable = normalize(card.getAttribute("data-search") || card.textContent);
      var matchesCategory = activeCategory === "all" || category === activeCategory;
      var matchesQuery = activeQuery === "" || searchable.indexOf(activeQuery) !== -1;
      var visible = matchesCategory && matchesQuery;
      card.hidden = !visible;
      if (visible) visibleCount++;
    });

    if (emptyState) {
      emptyState.hidden = visibleCount !== 0;
    }
    if (resultsCount) {
      resultsCount.textContent = visibleCount + (visibleCount > 1 ? " articles trouvés" : " article trouvé");
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      activeQuery = normalize(searchInput.value.trim());
      applyFilters();
    });
  }

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterButtons.forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      btn.setAttribute("aria-pressed", "true");
      activeCategory = btn.getAttribute("data-filter") || "all";
      applyFilters();
    });
  });

  applyFilters();
})();
