/* Rodriguez Wealth Management. No libraries, no trackers. */
(function () {
  "use strict";
  // Paste a Formspree form ID to deliver the contact form by email.
  // Left empty, the form opens the visitor's email app instead.
  var CONFIG = { formspreeId: "", email: "casanovaforsale@gmail.com" };
  var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!calm && "IntersectionObserver" in window) {
    document.documentElement.classList.add("js-reveal");
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("seen"); io.unobserve(e.target); } });
    }, { threshold: 0.18 });
    Array.prototype.forEach.call(document.querySelectorAll(".feat, .browser, .venture, .bcard"), function (el) { io.observe(el); });
  }

  var slides = document.querySelectorAll("#slides img"), dots = document.querySelectorAll(".dots button"), box = document.querySelector(".dots");
  if (slides.length) {
    var at = 0, timer = null;
    var show = function (n) {
      at = (n + slides.length) % slides.length;
      for (var i = 0; i < slides.length; i++) {
        slides[i].classList.toggle("is-on", i === at);
        dots[i].classList.toggle("is-on", i === at);
        dots[i].setAttribute("aria-pressed", i === at ? "true" : "false");
      }
    };
    var start = function () { if (calm) { box.classList.add("paused"); return; } clearInterval(timer); timer = setInterval(function () { show(at + 1); }, 5000); };
    Array.prototype.forEach.call(dots, function (d, i) { d.addEventListener("click", function () { show(i); start(); }); });
    start();
  }

  var form = document.getElementById("contact-form");
  if (form) {
    var status = document.getElementById("form-status");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (form.elements.company.value) return;
      var d = { name: form.elements.name.value, email: form.elements.email.value, phone: form.elements.phone.value, message: form.elements.message.value };
      if (CONFIG.formspreeId) {
        status.textContent = "Sending…";
        fetch("https://formspree.io/f/" + CONFIG.formspreeId, { method: "POST", headers: { "Accept": "application/json", "Content-Type": "application/json" }, body: JSON.stringify(d) })
          .then(function (r) { if (!r.ok) throw 0; form.reset(); status.className = "form-status ok"; status.textContent = "Message Sent"; })
          .catch(function () { status.textContent = "That did not go through. Please call 724-968-8824 or email " + CONFIG.email + "."; });
      } else {
        location.href = "mailto:" + CONFIG.email + "?subject=" + encodeURIComponent("Open House question from " + d.name) + "&body=" + encodeURIComponent("Name: " + d.name + "\nPhone: " + d.phone + "\nEmail: " + d.email + "\n\n" + d.message);
        status.className = "form-status ok";
        status.textContent = "Your email app should open with the message filled in. If it does not, call 724-968-8824.";
      }
    });
  }
  /* Cookie choice. Analytics (if a gaId is set) loads only after Accept. */
  var GA_ID = "";
  var store = {
    get: function (k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { window.localStorage.setItem(k, v); } catch (e) {} }
  };
  var loadAnalytics = function () {
    if (!GA_ID || window.__gaLoaded) return;
    window.__gaLoaded = true;
    var s = document.createElement("script");
    s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date()); window.gtag("config", GA_ID);
  };
  var banner = document.getElementById("cookie"), choice = store.get("cookies");
  if (choice === "yes") loadAnalytics();
  if (banner) {
    if (choice !== "yes" && choice !== "no") banner.hidden = false;
    var decide = function (v) { store.set("cookies", v); banner.hidden = true; if (v === "yes") loadAnalytics(); };
    document.getElementById("cookie-yes").addEventListener("click", function () { decide("yes"); });
    document.getElementById("cookie-no").addEventListener("click", function () { decide("no"); });
    Array.prototype.forEach.call(document.querySelectorAll("[data-cookie-open]"), function (a) {
      a.addEventListener("click", function (e) { e.preventDefault(); banner.hidden = false; });
    });
  }
})();
