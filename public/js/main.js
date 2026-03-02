(function () {
  'use strict';

  var header = document.querySelector('.header');
  var menuToggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav');

  function onScroll() {
    if (window.scrollY > 20) {
      header && header.classList.add('scrolled');
    } else {
      header && header.classList.remove('scrolled');
    }
  }

  function toggleMenu() {
    if (!menuToggle || !nav) return;
    var expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !expanded);
    nav.classList.toggle('open', !expanded);
    document.body.style.overflow = expanded ? '' : 'hidden';
  }

  function closeMenuOnLink() {
    if (!nav || !nav.classList.contains('open')) return;
    menuToggle && menuToggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
    document.body.style.overflow = '';
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', toggleMenu);
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenuOnLink);
    });
  }
})();
