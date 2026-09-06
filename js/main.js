/* Groundglass site — scroll reveal + screenshot lightbox. No dependencies,
   no analytics: the site collects nothing, same as the app. */
(function () {
  'use strict';

  var reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    for (var i = 0; i < reveals.length; i++) reveals[i].classList.add('in');
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  var box = document.getElementById('lightbox');
  if (!box) return;
  var full = box.querySelector('img');

  document.querySelectorAll('.rail img').forEach(function (img) {
    img.addEventListener('click', function () {
      full.src = img.currentSrc || img.src;
      full.alt = img.alt;
      box.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function close() {
    box.classList.remove('open');
    document.body.style.overflow = '';
    full.removeAttribute('src');   // stop a big frame sitting decoded in memory
  }
  box.addEventListener('click', close);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && box.classList.contains('open')) close();
  });
})();
