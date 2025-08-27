// Utilidades de navegação
const nav = document.querySelector('.nav');
const navLinks = document.getElementById('navLinks');
const menuBtn = document.getElementById('menuBtn');
const toTopBtn = document.getElementById('toTop');
const activeClass = 'active';

// Ano no footer
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Menu mobile
menuBtn?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
});

// Fechar menu ao clicar em link
navLinks?.addEventListener('click', (e) => {
  const t = e.target;
  if (t.matches('a')) navLinks.classList.remove('open');
});

// Smooth scroll (links com data-link)
function smoothScrollTo(hash){
  const el = document.querySelector(hash);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.pageYOffset - (nav?.offsetHeight || 0) + 6;
  window.scrollTo({top:y, behavior:'smooth'});
}

document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-link]');
  if (!t) return;
  const href = t.getAttribute('href');
  if (href?.startsWith('#')) { e.preventDefault(); smoothScrollTo(href); }
});

// Realce do link ativo conforme a seção visível
const sections = [...document.querySelectorAll('section[id]')];
const links = [...document.querySelectorAll('.nav__links a')];
const byId = (id) => links.find(a => a.getAttribute('href') === `#${id}`);

const spy = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.id;
    const link = byId(id ? id : '');
    if (!link) return;
    if (entry.isIntersecting) {
      links.forEach(a => a.classList.remove(activeClass));
      link.classList.add(activeClass);
    }
  });
}, {rootMargin: '-50% 0px -40% 0px', threshold: 0});

sections.forEach(s => spy.observe(s));

// Scroll reveal (anima elementos com data-reveal)
const revealEls = document.querySelectorAll('[data-reveal]');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObs.unobserve(entry.target);
    }
  });
}, {threshold: .2});
revealEls.forEach(el => revealObs.observe(el));

// Botão voltar ao topo
window.addEventListener('scroll', () => {
  const show = window.scrollY > 600;
  toTopBtn?.classList.toggle('show', show);
});

toTopBtn?.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

// Pequena interação no Hero (brilho ao mover o mouse)
const orb = document.querySelector('.orb__core');
if (orb) {
  window.addEventListener('mousemove', (e) => {
    const { innerWidth:w, innerHeight:h } = window;
    const x = (e.clientX - w/2) / (w/2);
    const y = (e.clientY - h/2) / (h/2);
    orb.style.filter = `drop-shadow(${x*10}px ${y*10}px 40px rgba(0,210,255,.35))`;
  });
}