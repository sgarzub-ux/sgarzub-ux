/* shared.js — CARCARE */

// ── NAV SCROLL STATE
(function() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ── ACTIVE NAV LINK
(function() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a => {
    const href = a.getAttribute('href').split('/').pop().split('#')[0];
    if (href === path) a.classList.add('active');
  });
})();

// ── MOBILE MENU
(function() {
  const btn = document.getElementById('navHamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  });
  const closeBtn = document.getElementById('mobileMenuClose');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      btn.classList.remove('open');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

// ── REVEAL ON SCROLL
(function() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); } });
  }, { threshold: 0.08 });
  els.forEach(el => io.observe(el));
})();

// ── PAGE ENTER ANIMATION
document.body.classList.add('page-enter');

// ── SMOOTH ANCHOR NAVIGATION WITH PAGE TRANSITION
document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');

  if (
    !href ||
    href.startsWith('#') ||
    href.startsWith('http') ||
    href.startsWith('mailto') ||
    href.startsWith('tel') ||
    link.closest('#mobileMenu') // 🔥 ESTA LÍNEA LO ARREGLA TODO
  ) return;

  link.addEventListener('click', e => {
    e.preventDefault();
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s';
    setTimeout(() => { window.location.href = href; }, 280);
  });
});