'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

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
// Tabbed component

tabsContainer.addEventListener('click', function (e) {
  // Selects the operations_tab even if a child was clicked
  const target = e.target.closest('.operations__tab');

  if (target?.classList.contains('btn')) {
    // Retrieve the number of the clicked tab
    // const tabNum = target.getAttribute('data-tab'); OR
    const tabNum = target.dataset.tab;

    // Make the current tab's btn "hover"
    // tabs.forEach(function (el) {
    //   if (
    //     el.classList.contains(`operations__tab--${Number.parseInt(tabNum)}`)
    //   ) {
    //     el.classList.add('operations__tab--active');
    //   } else {
    //     el.classList.remove('operations__tab--active');
    //   }
    // });

    // Change the tab content
    // tabsContent.forEach(function (el) {
    //   if (
    //     el.classList.contains(`operations__content--${Number.parseInt(tabNum)}`)
    //     ) {
    //       el.classList.add('operations__content--active');
    //     } else {
    //       el.classList.remove('operations__content--active');
    //     }
    //   });

    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    tabsContent.forEach(c => c.classList.remove('operations__content--active'));

    target.classList.add('operations__tab--active');
    document
      .querySelector(`.operations__content--${Number.parseInt(tabNum)}`)
      .classList.add('operations__content--active');
  }
});

///////////////////////////////////////
// Passing "arguments" to event handlers using .bind

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// Turning the navbar sticky

// // Bad performance because the scroll events fires constantly at every move
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);
// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

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
