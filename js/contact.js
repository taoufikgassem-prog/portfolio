/* ==========================================================================
   Taoufik GASSEM — Portfolio — contact.js
   Vanilla JavaScript — Accessible client-side validation for the contact form
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------
     CONFIGURATION — modifiez UNIQUEMENT cette section pour activer
     la réception des messages du formulaire. Voir README.md, section
     "Configurer le formulaire de contact" pour le pas-à-pas complet.
  ------------------------------------------------------------------ */
  window.CONTACT_CONFIG = {
    // 1) Solution recommandée (gratuite, sans code) : créez un formulaire
    //    sur https://formspree.io avec votre adresse Gmail, puis collez ici
    //    l'URL de type "https://formspree.io/f/xxxxxxxx".
    //    Une fois rempli, chaque message envoyé depuis ce formulaire arrive
    //    directement dans votre boîte Gmail.
    FORM_ENDPOINT: "",

    // 2) Solution de secours (fonctionne sans aucun service tiers) :
    //    indiquez votre adresse email ici. Si FORM_ENDPOINT n'est pas
    //    configuré, le site ouvrira automatiquement le logiciel de
    //    messagerie du visiteur avec un message pré-rempli adressé à
    //    cette adresse.
    CONTACT_EMAIL: "",

    // 3) Optionnel : numéro de téléphone affiché comme moyen de contact
    //    alternatif. Laissez vide pour ne pas l'afficher.
    CONTACT_PHONE: ""
  };

  /* ------------------------------------------------------------------
     Affichage conditionnel des moyens de contact alternatifs
     (jamais de lien mort : un bloc ne s'affiche que si configuré)
  ------------------------------------------------------------------ */
  document.querySelectorAll("[data-contact='email']").forEach(function (el) {
    var email = window.CONTACT_CONFIG.CONTACT_EMAIL;
    if (email) {
      el.hidden = false;
      el.querySelectorAll("[data-contact-email-value]").forEach(function (n) { n.textContent = email; });
      el.querySelectorAll("[data-contact-email-href]").forEach(function (n) { n.setAttribute("href", "mailto:" + email); });
    } else {
      el.hidden = true;
    }
  });
  document.querySelectorAll("[data-contact='phone']").forEach(function (el) {
    var phone = window.CONTACT_CONFIG.CONTACT_PHONE;
    if (phone) {
      el.hidden = false;
      el.querySelectorAll("[data-contact-phone-value]").forEach(function (n) { n.textContent = phone; });
      el.querySelectorAll("[data-contact-phone-href]").forEach(function (n) { n.setAttribute("href", "tel:" + phone.replace(/\s+/g, "")); });
    } else {
      el.hidden = true;
    }
  });

  var form = document.getElementById("contactForm");
  if (!form) return;

  var statusBox = document.getElementById("formStatus");

  var validators = {
    name: function (value) {
      return value.trim().length >= 2 ? "" : "Merci d'indiquer votre nom (2 caractères minimum).";
    },
    email: function (value) {
      var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(value.trim()) ? "" : "Merci d'indiquer une adresse email valide.";
    },
    company: function () {
      return ""; // optional field
    },
    subject: function (value) {
      return value.trim().length >= 3 ? "" : "Merci de préciser l'objet de votre message.";
    },
    message: function (value) {
      return value.trim().length >= 20 ? "" : "Votre message doit contenir au moins 20 caractères.";
    },
    consent: function (checked) {
      return checked ? "" : "Merci d'accepter la politique de confidentialité pour envoyer ce message.";
    }
  };

  function showFieldError(field, message) {
    var wrapper = field.closest(".form-field, .checkbox-field");
    if (!wrapper) return;
    var errorEl = wrapper.querySelector(".field-error");
    if (message) {
      wrapper.classList.add("has-error");
      if (errorEl) errorEl.textContent = message;
      field.setAttribute("aria-invalid", "true");
    } else {
      wrapper.classList.remove("has-error");
      if (errorEl) errorEl.textContent = "";
      field.removeAttribute("aria-invalid");
    }
  }

  function validateField(field) {
    var name = field.name;
    if (!validators[name]) return true;
    var value = field.type === "checkbox" ? field.checked : field.value;
    var message = validators[name](value);
    showFieldError(field, message);
    return message === "";
  }

  ["name", "email", "company", "subject", "message", "consent"].forEach(function (fieldName) {
    var field = form.elements[fieldName];
    if (!field) return;
    var eventName = field.type === "checkbox" ? "change" : "blur";
    field.addEventListener(eventName, function () { validateField(field); });
  });

  function setStatus(type, message) {
    if (!statusBox) return;
    statusBox.className = "form-status visible " + type;
    statusBox.innerHTML = message;
    statusBox.setAttribute("role", type === "error" ? "alert" : "status");
  }

  function buildAlternativeContactsHtml(introText) {
    var parts = [introText];
    var links = [];
    links.push('<a href="https://www.linkedin.com/in/taoufik-g-387964129/" target="_blank" rel="noopener noreferrer">me contacter sur LinkedIn</a>');
    if (window.CONTACT_CONFIG.CONTACT_EMAIL) {
      links.push('<a href="mailto:' + window.CONTACT_CONFIG.CONTACT_EMAIL + '">m\'écrire directement par email</a>');
    }
    if (window.CONTACT_CONFIG.CONTACT_PHONE) {
      links.push('<a href="tel:' + window.CONTACT_CONFIG.CONTACT_PHONE.replace(/\s+/g, "") + '">m\'appeler au ' + window.CONTACT_CONFIG.CONTACT_PHONE + '</a>');
    }
    parts.push(" Vous pouvez aussi " + links.join(", ") + ".");
    return parts.join("");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var fieldsToCheck = ["name", "email", "subject", "message", "consent"];
    var isValid = true;
    var firstInvalid = null;

    fieldsToCheck.forEach(function (fieldName) {
      var field = form.elements[fieldName];
      if (!field) return;
      var valid = validateField(field);
      if (!valid && !firstInvalid) firstInvalid = field;
      if (!valid) isValid = false;
    });

    if (!isValid) {
      setStatus("error", "Merci de corriger les champs signalés ci-dessous avant d'envoyer votre message.");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    var endpoint = (window.CONTACT_CONFIG.FORM_ENDPOINT || "").trim();
    var fallbackEmail = (window.CONTACT_CONFIG.CONTACT_EMAIL || "").trim();

    /* --------------------------------------------------------------
       Cas 1 — Un service d'envoi (Formspree ou équivalent) est
       configuré : on envoie réellement le message et on ne confirme
       le succès qu'après une réponse HTTP positive.
    -------------------------------------------------------------- */
    if (endpoint) {
      var submitBtn = form.querySelector("button[type='submit']");
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Envoi en cours…"; }

      var formData = new FormData(form);
      fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          if (response.ok) {
            setStatus("success", "Votre message a bien été envoyé. Merci, je reviendrai vers vous rapidement.");
            form.reset();
          } else {
            setStatus(
              "error",
              buildAlternativeContactsHtml("L'envoi a échoué. Merci de réessayer dans quelques instants.")
            );
          }
        })
        .catch(function () {
          setStatus(
            "error",
            buildAlternativeContactsHtml("L'envoi a échoué en raison d'un problème de connexion.")
          );
        })
        .finally(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "Envoyer le message"; }
        });
      return;
    }

    /* --------------------------------------------------------------
       Cas 2 — Aucun service d'envoi n'est configuré, mais une
       adresse email de secours est renseignée : on ouvre le logiciel
       de messagerie du visiteur avec le message pré-rempli, adressé
       directement à cette adresse.
    -------------------------------------------------------------- */
    if (fallbackEmail) {
      var name = form.elements.name.value.trim();
      var email = form.elements.email.value.trim();
      var company = form.elements.company ? form.elements.company.value.trim() : "";
      var subject = form.elements.subject.value.trim();
      var message = form.elements.message.value.trim();

      var bodyLines = [
        "Nom : " + name,
        "Email : " + email
      ];
      if (company) bodyLines.push("Entreprise : " + company);
      bodyLines.push("");
      bodyLines.push(message);

      var mailtoUrl =
        "mailto:" + encodeURIComponent(fallbackEmail) +
        "?subject=" + encodeURIComponent("[Portfolio] " + subject) +
        "&body=" + encodeURIComponent(bodyLines.join("\n"));

      setStatus(
        "info",
        "Votre logiciel de messagerie va s'ouvrir avec votre message pré-rempli, à destination de Taoufik Gassem. Si rien ne s'ouvre automatiquement, " +
          buildAlternativeContactsHtml("").replace(/^\s*Vous pouvez aussi/, "vous pouvez aussi")
      );
      window.location.href = mailtoUrl;
      return;
    }

    /* --------------------------------------------------------------
       Cas 3 — Aucun service ni adresse email de secours n'est
       configuré : on ne prétend jamais qu'un envoi a fonctionné, et on
       oriente immédiatement vers un canal de contact garanti (LinkedIn),
       sans jamais afficher un message du type "impossible d'envoyer".
    -------------------------------------------------------------- */
    setStatus(
      "info",
      buildAlternativeContactsHtml(
        "Merci pour votre message ! Le formulaire n'est pas encore relié à un service d'envoi automatique."
      )
    );
  });
})();
