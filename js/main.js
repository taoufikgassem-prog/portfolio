/* ==========================================================================
   Taoufik GASSEM — Portfolio — main.js
   Vanilla JavaScript — Navigation, accessibility, UX utilities
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------
     Configuration flags — update these once the real files are added.
     See README.md for instructions.
  ------------------------------------------------------------------ */
  window.SITE_CONFIG = {
    CV_AVAILABLE: true, // assets/documents/cv-taoufik-gassem.pdf must exist at this path on the published site
    CSA_CERTIFICATE_AVAILABLE: true // assets/documents/certifications/servicenow-csa.pdf must exist at this path on the published site
  };

  /* ------------------------------------------------------------------
     Theme (light / dark) — persisted in localStorage, respects system
     preference on first visit. Injected on every page automatically.
  ------------------------------------------------------------------ */
  var THEME_KEY = "tg-theme";

  function getPreferredTheme() {
    try {
      var stored = window.localStorage.getItem(THEME_KEY);
      if (stored === "light" || stored === "dark") return stored;
    } catch (e) { /* localStorage unavailable — ignore */ }
    var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    var toggle = document.querySelector(".theme-toggle");
    if (toggle) {
      toggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      toggle.setAttribute("aria-label", theme === "dark" ? "Activer le thème clair" : "Activer le thème sombre");
    }
  }

  applyTheme(getPreferredTheme());

  function injectThemeToggle() {
    var headerActions = document.querySelector(".header-actions");
    if (!headerActions || headerActions.querySelector(".theme-toggle")) return;

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "theme-toggle";
    btn.setAttribute("aria-pressed", document.documentElement.getAttribute("data-theme") === "dark" ? "true" : "false");
    btn.setAttribute("aria-label", "Activer le thème sombre");
    btn.innerHTML =
      '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">' +
      '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>' +
      "</svg>" +
      '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>' +
      "</svg>";

    btn.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
      var next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      try { window.localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignore */ }
    });

    var navToggleBtn = headerActions.querySelector(".nav-toggle");
    if (navToggleBtn) {
      headerActions.insertBefore(btn, navToggleBtn);
    } else {
      headerActions.appendChild(btn);
    }
  }
  injectThemeToggle();

  /* ------------------------------------------------------------------
     Scroll-reveal animations (subtle fade + rise), respects
     prefers-reduced-motion and degrades gracefully without IntersectionObserver.
  ------------------------------------------------------------------ */
  (function setupScrollReveal() {
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) return;

    var selector = ".card, .article-card, .cert-card, .timeline-item, .expertise-group, .progress-step, .featured-article, .section-header, .timeline-card";
    var elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    elements.forEach(function (el, index) {
      el.classList.add("reveal");
      el.style.transitionDelay = (Math.min(index % 6, 6) * 70) + "ms";
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach(function (el) { observer.observe(el); });
  })();

  /* ------------------------------------------------------------------
     Footer year
  ------------------------------------------------------------------ */
  document.querySelectorAll("[data-current-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ------------------------------------------------------------------
     Mobile navigation — accessible, keyboard trap, escape to close
  ------------------------------------------------------------------ */
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("main-nav");
  var navBackdrop = document.querySelector(".nav-backdrop");
  var lastFocusedElement = null;

  function getFocusableElements(container) {
    return Array.prototype.slice.call(
      container.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])')
    );
  }

  function openNav() {
    if (!mainNav) return;
    lastFocusedElement = document.activeElement;
    document.body.classList.add("nav-open");
    navToggle.setAttribute("aria-expanded", "true");
    var focusables = getFocusableElements(mainNav);
    if (focusables.length) focusables[0].focus();
    document.addEventListener("keydown", handleNavKeydown);
  }

  function closeNav() {
    if (!mainNav) return;
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
    document.removeEventListener("keydown", handleNavKeydown);
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  function handleNavKeydown(e) {
    if (e.key === "Escape") {
      closeNav();
      return;
    }
    if (e.key === "Tab") {
      var focusables = getFocusableElements(mainNav);
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = document.body.classList.contains("nav-open");
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });
  }

  if (navBackdrop) {
    navBackdrop.addEventListener("click", closeNav);
  }

  // Close mobile nav automatically when resizing to desktop width
  window.addEventListener("resize", function () {
    if (window.innerWidth > 900 && document.body.classList.contains("nav-open")) {
      closeNav();
    }
  });

  /* ------------------------------------------------------------------
     Active navigation state (aria-current)
  ------------------------------------------------------------------ */
  (function setActiveNav() {
    var links = document.querySelectorAll(".main-nav a[data-nav]");
    var current = document.body.getAttribute("data-page");
    links.forEach(function (link) {
      if (link.getAttribute("data-nav") === current) {
        link.setAttribute("aria-current", "page");
      }
    });
  })();

  /* ------------------------------------------------------------------
     Back to top button
  ------------------------------------------------------------------ */
  var backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    window.addEventListener(
      "scroll",
      function () {
        if (window.scrollY > 480) {
          backToTop.classList.add("visible");
        } else {
          backToTop.classList.remove("visible");
        }
      },
      { passive: true }
    );
    backToTop.addEventListener("click", function () {
      var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ------------------------------------------------------------------
     Reading progress bar (article pages)
  ------------------------------------------------------------------ */
  var progressBar = document.querySelector(".reading-progress");
  var articleBody = document.querySelector(".article-body");
  if (progressBar && articleBody) {
    window.addEventListener(
      "scroll",
      function () {
        var rect = articleBody.getBoundingClientRect();
        var total = articleBody.offsetHeight - window.innerHeight;
        var scrolled = window.scrollY - (articleBody.offsetTop - window.innerHeight * 0.2);
        var pct = 0;
        if (total > 0) {
          pct = Math.min(Math.max((window.scrollY + window.innerHeight - articleBody.offsetTop) / (articleBody.offsetHeight + window.innerHeight), 0), 1);
        }
        progressBar.style.width = (pct * 100) + "%";
      },
      { passive: true }
    );
  }

  /* ------------------------------------------------------------------
     Copy article link button
  ------------------------------------------------------------------ */
  document.querySelectorAll("[data-copy-link]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var url = window.location.href;
      var originalLabel = btn.textContent;
      function done(success) {
        btn.textContent = success ? "Lien copié ✓" : "Impossible de copier";
        setTimeout(function () { btn.textContent = originalLabel; }, 2200);
      }
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url).then(function () { done(true); }, function () { done(false); });
      } else {
        try {
          var temp = document.createElement("textarea");
          temp.value = url;
          temp.style.position = "fixed";
          temp.style.opacity = "0";
          document.body.appendChild(temp);
          temp.focus();
          temp.select();
          var ok = document.execCommand("copy");
          document.body.removeChild(temp);
          done(ok);
        } catch (err) {
          done(false);
        }
      }
    });
  });

  /* ------------------------------------------------------------------
     CV / Certificate conditional display (avoid broken links)
  ------------------------------------------------------------------ */
  document.querySelectorAll("[data-requires='cv']").forEach(function (el) {
    if (!window.SITE_CONFIG.CV_AVAILABLE) {
      el.setAttribute("hidden", "hidden");
    }
  });
  document.querySelectorAll("[data-fallback='cv']").forEach(function (el) {
    if (window.SITE_CONFIG.CV_AVAILABLE) {
      el.setAttribute("hidden", "hidden");
    }
  });
  document.querySelectorAll("[data-requires='csa']").forEach(function (el) {
    if (!window.SITE_CONFIG.CSA_CERTIFICATE_AVAILABLE) {
      el.setAttribute("hidden", "hidden");
    }
  });
  document.querySelectorAll("[data-fallback='csa']").forEach(function (el) {
    if (window.SITE_CONFIG.CSA_CERTIFICATE_AVAILABLE) {
      el.setAttribute("hidden", "hidden");
    }
  });

})();
