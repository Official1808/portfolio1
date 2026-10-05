(function () {
  var root = document.documentElement;
  root.classList.add('js');
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile menu
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');
  function closeMenu() { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', 'Open menu'); }
  burger.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') closeMenu(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  // Scroll reveal
  var items = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else { items.forEach(function (el) { el.classList.add('in'); }); }

  // Active nav link
  var links = {};
  document.querySelectorAll('.menu a').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
  if ('IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          Object.keys(links).forEach(function (k) { links[k].classList.toggle('on', k === e.target.id); });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(links).forEach(function (k) { var s = document.getElementById(k); if (s) so.observe(s); });
  }

  // Terminal typing
  var L = [
    '<span class="k">class</span> <span class="f">Developer</span>:',
    '    name = <span class="s">"Sagar Meena"</span>',
    '    focus = [<span class="s">"Python"</span>, <span class="s">"AI"</span>, <span class="s">"APIs"</span>]',
    '    building = <span class="s">"Full Stack"</span>',
    '    automation = <span class="b">True</span>',
    '',
    '<span class="k">print</span>(Developer.name)'
  ];
  var pre = document.getElementById('code');
  var caret = '<span class="caret"></span>';
  if (reduce) { pre.innerHTML = L.join('\n') + '\n' + caret; }
  else {
    var i = 0;
    (function step() {
      pre.innerHTML = L.slice(0, i + 1).join('\n') + caret;
      if (++i < L.length) setTimeout(step, 480);
    })();
  }

  // Scroll progress bar
  var bar = document.getElementById('bar');
  function prog() { var h = root.scrollHeight - innerHeight; bar.style.width = (h > 0 ? scrollY / h * 100 : 0) + '%'; }
  addEventListener('scroll', prog, { passive: true }); prog();

  // Cursor spotlight on cards
  document.querySelectorAll('.card,.proj,.edu').forEach(function (el) {
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  // Gentle terminal tilt (mouse devices only)
  var term = document.querySelector('.term');
  if (term && !reduce && matchMedia('(hover: hover)').matches) {
    var hero = document.querySelector('.hero');
    hero.addEventListener('pointermove', function (e) {
      var r = term.getBoundingClientRect();
      var x = (e.clientX - (r.left + r.width / 2)) / innerWidth;
      var y = (e.clientY - (r.top + r.height / 2)) / innerHeight;
      term.style.transform = 'perspective(900px) rotateY(' + (x * 8) + 'deg) rotateX(' + (-y * 8) + 'deg)';
    });
    hero.addEventListener('pointerleave', function () { term.style.transform = ''; });
  }

  // Copy email
  var copy = document.getElementById('copy');
  if (copy) copy.addEventListener('click', function () {
    var done = function () { copy.textContent = 'Copied!'; setTimeout(function () { copy.textContent = 'Copy email'; }, 1800); };
    if (navigator.clipboard) navigator.clipboard.writeText('mesagarmeena@gmail.com').then(done, function () { copy.textContent = 'mesagarmeena@gmail.com'; });
    else copy.textContent = 'mesagarmeena@gmail.com';
  });

  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
