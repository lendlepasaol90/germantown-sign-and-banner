// Germantown Sign and Banner — v2 shared behavior + motion
document.addEventListener('DOMContentLoaded', function () {
  // Footer year
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Sticky header shrink on scroll
  var header = document.querySelector('header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 10);
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile menu toggle
  var toggle = document.getElementById('menuToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
  }

  // Mobile services submenu toggle
  var dropdownParent = document.querySelector('.has-dropdown');
  if (dropdownParent) {
    var dropdownLink = dropdownParent.querySelector(':scope > a');
    dropdownLink.addEventListener('click', function (e) {
      if (window.innerWidth <= 760) {
        e.preventDefault();
        dropdownParent.classList.toggle('open');
      }
    });
  }

  // Scroll-reveal via IntersectionObserver
  var revealEls = document.querySelectorAll('.reveal, .reveal-stagger, .process-line-fill');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  // Contact / callback forms: client-side validation + success message, no backend yet
  document.querySelectorAll('form[data-callback-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var successEl = form.parentElement.querySelector('.form-success');
      if (successEl) {
        successEl.classList.add('show');
        successEl.setAttribute('role', 'status');
      }
      form.reset();
    });
  });
});
