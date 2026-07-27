(function () {
  var menuToggle = document.getElementById("menu-toggle");
  var mainNav = document.getElementById("main-nav");
  var navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
  var backTop = document.getElementById("back-top");
  var revealItems = document.querySelectorAll(".reveal");

  for (var d = 0; d < revealItems.length; d++) {
    revealItems[d].style.setProperty("--reveal-delay", ((d % 6) * 70) + "ms");
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("open");
      menuToggle.classList.toggle("open", isOpen);
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  var sectionMap = [];
  for (var i = 0; i < navAnchors.length; i++) {
    var href = navAnchors[i].getAttribute("href");
    var section = href ? document.querySelector(href) : null;
    if (section) sectionMap.push({ link: navAnchors[i], section: section });

    navAnchors[i].addEventListener("click", function () {
      if (menuToggle && mainNav && mainNav.classList.contains("open")) {
        mainNav.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  function markActive() {
    var fromTop = window.scrollY + 130;
    for (var i = 0; i < sectionMap.length; i++) {
      sectionMap[i].link.classList.remove("active");
    }
    for (var j = sectionMap.length - 1; j >= 0; j--) {
      if (sectionMap[j].section.offsetTop <= fromTop) {
        sectionMap[j].link.classList.add("active");
        break;
      }
    }
  }

  if (backTop) {
    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function handleScroll() {
    markActive();
    if (backTop) backTop.classList.toggle("show", window.scrollY > 520);
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  if (!("IntersectionObserver" in window)) {
    for (var r = 0; r < revealItems.length; r++) revealItems[r].classList.add("in-view");
    return;
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
    rootMargin: "0px 0px -8% 0px"
  });

  for (var n = 0; n < revealItems.length; n++) observer.observe(revealItems[n]);
}());
