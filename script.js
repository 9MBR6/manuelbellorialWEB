(function () {
      var defaultConfig = {
        hero: {
          title: "Desarrollo webs, apps y soluciones digitales a medida",
          lead: "Creo paginas web, aplicaciones moviles, software de escritorio, backend y soluciones personalizadas para negocios, autonomos y emprendedores.",
          trust: "Desarrollador Full-Stack / Multiplataforma con experiencia profesional en entornos empresariales."
        },
        pricing: {
          webBasic: 350,
          webPro: 650,
          webCustom: 1200,
          cvOnePage: 95,
          cvPortfolio: 145,
          cvPro: 225
        },
        contact: {
          name: "Manuel Bello Rial",
          email: "ManuelBelloRial96@Gmail.com",
          phoneLabel: "+34 677 785 791",
          phoneRaw: "34677785791",
          linkedinUrl: "https://linkedin.com/in/manuel-bello-rial-938a55259",
          linkedinLabel: "linkedin.com/in/manuel-bello-rial-938a55259",
          whatsappUrl: "https://wa.me/34677785791"
        },
        forms: {
          formspreeEndpoint: ""
        },
        stats: {
          projects: 25,
          responseHours: 24,
          directCare: 100
        }
      };

      var siteConfig = window.SITE_CONFIG || defaultConfig;
      var statsConfig = siteConfig.stats || defaultConfig.stats;

      function setText(id, value) {
        var el = document.getElementById(id);
        if (el && typeof value === "string") el.textContent = value;
      }

      function setLink(id, href, label) {
        var el = document.getElementById(id);
        if (!el) return;
        if (href) el.setAttribute("href", href);
        if (typeof label === "string") el.textContent = label;
      }

      function applySiteConfig() {
        setText("hero-title", siteConfig.hero.title);
        setText("hero-lead", siteConfig.hero.lead);
        setText("hero-trust", siteConfig.hero.trust);

        var priceTargets = document.querySelectorAll("[data-plan]");
        for (var p = 0; p < priceTargets.length; p++) {
          var key = priceTargets[p].getAttribute("data-plan") || "";
          var amount = Number(siteConfig.pricing[key] || 0);
          if (!amount) continue;
          priceTargets[p].textContent = amount.toLocaleString("es-ES");
          if (priceTargets[p].classList.contains("price-value")) {
            priceTargets[p].setAttribute("data-price", String(amount));
          }
        }

        var c = siteConfig.contact;
        setText("contact-name", c.name);
        setLink("contact-email-link", "mailto:" + c.email, c.email);
        setLink("contact-phone-link", "tel:+" + c.phoneRaw, c.phoneLabel);
        setLink("contact-linkedin-link", c.linkedinUrl, c.linkedinLabel);
        setLink("cta-email", "mailto:" + c.email);
        setLink("cta-whatsapp", c.whatsappUrl);
        setLink("cta-linkedin", c.linkedinUrl);

        var form = document.getElementById("contact-form");
        if (form && siteConfig.forms && siteConfig.forms.formspreeEndpoint) {
          form.setAttribute("action", siteConfig.forms.formspreeEndpoint);
        }
      }

      applySiteConfig();

      var prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      var revealItems = document.querySelectorAll("section, .card, .chip, .step, .contact-panel, form");

      for (var i = 0; i < revealItems.length; i++) {
        var el = revealItems[i];
        el.classList.add("reveal");
        if (el.classList.contains("card") || el.classList.contains("chip") || el.classList.contains("step")) {
          el.style.setProperty("--delay", ((i % 10) * 80) + "ms");
        } else {
          el.style.setProperty("--delay", ((i % 6) * 65) + "ms");
        }
      }

      if (!("IntersectionObserver" in window)) {
        for (var j = 0; j < revealItems.length; j++) {
          revealItems[j].classList.add("in-view");
        }
        return;
      }

      function animatePrice(el) {
        if (el.dataset.animated === "true") return;
        el.dataset.animated = "true";

        var target = Number(el.getAttribute("data-price") || "0");
        if (!target || prefersReduced) {
          el.textContent = target.toLocaleString("es-ES");
          return;
        }

        var duration = 900;
        var startTs = null;
        function step(ts) {
          if (!startTs) startTs = ts;
          var progress = Math.min((ts - startTs) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          var value = Math.round(target * eased);
          el.textContent = value.toLocaleString("es-ES");
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      }

      var priceObserver = new IntersectionObserver(function (entries, io) {
        for (var m = 0; m < entries.length; m++) {
          if (entries[m].isIntersecting) {
            animatePrice(entries[m].target);
            io.unobserve(entries[m].target);
          }
        }
      }, {
        threshold: 0.5
      });

      var priceValues = document.querySelectorAll(".price-value");
      for (var n = 0; n < priceValues.length; n++) {
        priceValues[n].textContent = "0";
        priceObserver.observe(priceValues[n]);
      }

      function animateStat(el) {
        if (el.dataset.animated === "true") return;
        el.dataset.animated = "true";

        var key = el.getAttribute("data-stat") || "";
        var suffix = el.getAttribute("data-suffix") || "";
        var target = Number(statsConfig[key] || 0);

        if (!target || prefersReduced) {
          el.textContent = target + suffix;
          return;
        }

        var duration = 900;
        var startTs = null;
        function step(ts) {
          if (!startTs) startTs = ts;
          var progress = Math.min((ts - startTs) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          var value = Math.round(target * eased);
          el.textContent = value + suffix;
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      }

      var statObserver = new IntersectionObserver(function (entries, io) {
        for (var s = 0; s < entries.length; s++) {
          if (entries[s].isIntersecting) {
            animateStat(entries[s].target);
            io.unobserve(entries[s].target);
          }
        }
      }, {
        threshold: 0.55
      });

      var statValues = document.querySelectorAll(".stat-number");
      for (var t = 0; t < statValues.length; t++) {
        var suffixInit = statValues[t].getAttribute("data-suffix") || "";
        statValues[t].textContent = "0" + suffixInit;
        statObserver.observe(statValues[t]);
      }

      var observer = new IntersectionObserver(function (entries, io) {
        for (var k = 0; k < entries.length; k++) {
          if (entries[k].isIntersecting) {
            entries[k].target.classList.add("in-view");
            io.unobserve(entries[k].target);
          }
        }
      }, {
        threshold: 0.12,
        rootMargin: "0px 0px -7% 0px"
      });

      for (var l = 0; l < revealItems.length; l++) {
        observer.observe(revealItems[l]);
      }

      var faqToggles = document.querySelectorAll(".faq-toggle");
      for (var q = 0; q < faqToggles.length; q++) {
        faqToggles[q].addEventListener("click", function () {
          var item = this.closest(".faq-item");
          var expanded = this.getAttribute("aria-expanded") === "true";
          this.setAttribute("aria-expanded", expanded ? "false" : "true");
          if (item) item.classList.toggle("open", !expanded);
        });
      }

      var nextField = document.getElementById("form-next");
      if (nextField) {
        nextField.value = window.location.origin + window.location.pathname + "?sent=1#contacto";
      }

      var params = new URLSearchParams(window.location.search);
      if (params.get("sent") === "1") {
        var toast = document.getElementById("form-toast");
        if (toast) {
          toast.classList.add("show");
          setTimeout(function () {
            toast.classList.remove("show");
          }, 4200);
        }
        if (window.history && window.history.replaceState) {
          window.history.replaceState({}, document.title, window.location.pathname + "#contacto");
        }
      }

      var messageField = document.getElementById("mensaje");
      var msgCount = document.getElementById("msg-count");
      if (messageField) {
        messageField.setAttribute("maxlength", "600");
        var updateCount = function () {
          var len = messageField.value.length;
          if (msgCount) msgCount.textContent = String(len);
        };
        messageField.addEventListener("input", updateCount);
        updateCount();
      }

      var form = document.getElementById("contact-form");
      var submitBtn = document.getElementById("submit-btn");
      var nameInput = document.getElementById("nombre");
      var phoneInput = document.getElementById("telefono");

      if (nameInput) {
        nameInput.addEventListener("input", function () {
          var value = nameInput.value.trim();
          if (!value) {
            nameInput.setCustomValidity("");
            return;
          }
          var nameOk = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s'-]{2,80}$/.test(value);
          nameInput.setCustomValidity(nameOk ? "" : "El nombre solo puede contener letras y espacios.");
        });
      }

      if (phoneInput) {
        phoneInput.addEventListener("input", function () {
          var value = phoneInput.value.trim();
          if (!value) {
            phoneInput.setCustomValidity("");
            return;
          }
          var phoneOk = /^\+?[0-9\s]{9,15}$/.test(value);
          phoneInput.setCustomValidity(phoneOk ? "" : "El telefono debe contener solo numeros (puede incluir + al inicio).");
        });
      }

      if (form && submitBtn) {
        form.addEventListener("submit", function (e) {
          if (nameInput) {
            var nameValue = nameInput.value.trim();
            if (!nameValue || !/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s'-]{2,80}$/.test(nameValue)) {
              nameInput.setCustomValidity("Introduce un nombre valido (solo letras y espacios).");
            } else {
              nameInput.setCustomValidity("");
            }
          }

          if (phoneInput) {
            var phoneValue = phoneInput.value.trim();
            if (phoneValue && !/^\+?[0-9\s]{9,15}$/.test(phoneValue)) {
              phoneInput.setCustomValidity("El telefono debe contener solo numeros (puede incluir + al inicio).");
            } else {
              phoneInput.setCustomValidity("");
            }
          }

          if (!form.checkValidity()) {
            form.reportValidity();
            return;
          }

          var endpoint = (siteConfig.forms && siteConfig.forms.formspreeEndpoint) ? siteConfig.forms.formspreeEndpoint : "";
          submitBtn.disabled = true;
          submitBtn.textContent = "Enviando...";

          if (endpoint) {
            return;
          }

          e.preventDefault();
          if (!endpoint) {
            var name = form.elements["Nombre"] ? form.elements["Nombre"].value : "";
            var email = form.elements["Email"] ? form.elements["Email"].value : "";
            var phone = form.elements["Telefono"] ? form.elements["Telefono"].value : "";
            var project = form.elements["Tipo de proyecto"] ? form.elements["Tipo de proyecto"].value : "";
            var message = form.elements["Mensaje"] ? form.elements["Mensaje"].value : "";
            var body = "Nombre: " + name + "\nEmail: " + email + "\nTelefono: " + phone + "\nTipo de proyecto: " + project + "\n\nMensaje:\n" + message;
            var mailto = "mailto:" + (siteConfig.contact && siteConfig.contact.email ? siteConfig.contact.email : "")
              + "?subject=" + encodeURIComponent("Nueva solicitud desde web Manuel Bello Rial")
              + "&body=" + encodeURIComponent(body);
            window.location.href = mailto;
            submitBtn.disabled = false;
            submitBtn.textContent = "Enviar solicitud";
            return;
          }
        });
      }

      var navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
      var menuToggle = document.getElementById("menu-toggle");
      var mainNav = document.getElementById("main-nav");

      if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", function () {
          var isOpen = mainNav.classList.toggle("open");
          menuToggle.classList.toggle("open", isOpen);
          menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });
      }

      var sectionMap = [];
      for (var r = 0; r < navAnchors.length; r++) {
        var href = navAnchors[r].getAttribute("href");
        if (!href) continue;
        var section = document.querySelector(href);
        if (section) sectionMap.push({ link: navAnchors[r], section: section });
        navAnchors[r].addEventListener("click", function () {
          if (menuToggle && mainNav && mainNav.classList.contains("open")) {
            mainNav.classList.remove("open");
            menuToggle.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
          }
        });
      }

      var markActive = function () {
        var fromTop = window.scrollY + 120;
        for (var u = 0; u < sectionMap.length; u++) {
          sectionMap[u].link.classList.remove("active");
        }
        for (var v = sectionMap.length - 1; v >= 0; v--) {
          if (sectionMap[v].section.offsetTop <= fromTop) {
            sectionMap[v].link.classList.add("active");
            break;
          }
        }
      };

      var backTop = document.getElementById("back-top");
      if (backTop) {
        backTop.addEventListener("click", function () {
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      }

      var onScroll = function () {
        markActive();
        if (backTop) {
          backTop.classList.toggle("show", window.scrollY > 520);
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();

      var messageInput = document.getElementById("mensaje");
      var projectTypeSelect = document.getElementById("contact-project-type");
      var contactPrefillLinks = document.querySelectorAll('a[href="#contacto"][data-prefill], a[href="#contacto"][data-project]');
      var cvWaCtaBtn = document.getElementById("cv-wa-cta");

      for (var y = 0; y < contactPrefillLinks.length; y++) {
        contactPrefillLinks[y].addEventListener("click", function () {
          var project = this.getAttribute("data-project") || "";
          var prefill = this.getAttribute("data-prefill") || "";

          if (projectTypeSelect && project) {
            projectTypeSelect.value = project;
          }

          if (messageInput && prefill) {
            messageInput.value = prefill;
            var prefillEvt = document.createEvent("Event");
            prefillEvt.initEvent("input", true, true);
            messageInput.dispatchEvent(prefillEvt);
          }
        });
      }

      if (cvWaCtaBtn) {
        cvWaCtaBtn.addEventListener("click", function () {
          var msg = "Hola Manuel, quiero una web curriculum. Te puedo enviar mi CV en PDF y, si hace falta, una idea o referencia de estilo.";
          var baseWa = (siteConfig.contact && siteConfig.contact.whatsappUrl) ? siteConfig.contact.whatsappUrl : "https://wa.me/34677785791";
          this.setAttribute("href", baseWa + "?text=" + encodeURIComponent(msg));
        });
      }
    })();
