/* CUSTOM CURSOR */

const cursorDot = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');

let mouseX = 0, mouseY = 0;  
let ringX = 0, ringY = 0;    

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function animateRing() {
  ringX = lerp(ringX, mouseX, 0.12);
  ringY = lerp(ringY, mouseY, 0.12);

  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';

  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
});

/* SCROLL ANIMATIONS */

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

/* NAVBAR SCROLL EFFECT */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* HAMBURGER MENU — mobile only */
const hamburger = document.querySelector('.nav-hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});