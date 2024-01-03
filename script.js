'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Cookies warning message

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'Wu use cookies for improved functionality and alaytics. <button class="btn btn--close-cookie">Got it!</button>';
header.append(message);
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

///////////////////////////////////////
// Smooth scrolling

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  // // For older browsers:
  // const s1coords = section1.getBoundingClientRect();
  // window.scrollTo({
  //   left: s1coords.left,
  //   top: s1coords.top + scrollY,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Page nav using event delegation/bubbling

// // What it looks like without event delegation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const sectionId = this.getAttribute('href');
//     console.log(sectionId);
//     document.querySelector(sectionId).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Better performance with event delegation
// 1. Add event listener to common parent element
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy <=> ensure we're processing only clicks targeted at something
  // and not clicks between links
  if (e.target.classList.contains('nav__link')) {
    // 2. Determine what element originated the event
    const sectionId = e.target.getAttribute('href');
    document.querySelector(sectionId).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
// Mouse enter events

// const h1 = document.querySelector('h1');

// // mordern way
// const alerth1 = function (e) {
//   alert('You are hovering the heading!');
//   h1.removeEventListener('mouseenter', alerth1);
// };
// h1.addEventListener('mouseenter', alerth1);

// // older way of listening to events
// h1.onmouseenter = function (e) {
//   alert('hehe');
// };
