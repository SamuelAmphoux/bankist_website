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
const allSections = document.querySelectorAll('.section');
const section1 = document.querySelector('#section--1');
const section2 = document.querySelector('#section--2');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const sliderBtnLeft = document.querySelector('.slider__btn--left');
const sliderBtnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

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

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML =
//   'Wu use cookies for improved functionality and alaytics. <button class="btn btn--close-cookie">Got it!</button>';
// header.append(message);
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();
//   });
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

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

// // Using Intersection Server API

// const obsCallBack = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obsOptions = {
//   // Setting the root to null means watching intersection with viewport
//   root: null,
//   // Percentage visible target needed to trigger
//   // Using two values allows to trigger while entering and when exiting
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(obsCallBack, obsOptions);
// observer.observe(section1);

const stickyNav = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    nav.classList.remove('sticky');
  } else {
    nav.classList.add('sticky');
  }
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  // We compute the navbar's height and make it negative
  // This value serves to shrink each side of the root element's bounding box before computing intersections
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
});

headerObserver.observe(header);

///////////////////////////////////////
// Reveal sections through scroll

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.25,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

///////////////////////////////////////
// Lazy Loading Images

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImage = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  // Replace src attribute with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0.2,
});

imgTargets.forEach(img => imgObserver.observe(img));

///////////////////////////////////////
// Slider
const sliderComponent = function () {
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;
  const maxSlide = slides.length;

  const slideTo = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next Slide
  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    slideTo(currentSlide);
    activateDot(currentSlide);
  };
  // Previous Slide
  const previousSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    slideTo(currentSlide);
    activateDot(currentSlide);
  };

  // Adding dots
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  // Highlighting current dot/slide
  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  sliderBtnRight.addEventListener('click', nextSlide);
  sliderBtnLeft.addEventListener('click', previousSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') previousSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      slideTo(slide);
      activateDot(slide);
    }
  });

  const initSlider = function () {
    // slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
    slideTo(0);
    createDots();
    activateDot(0);
  };
  initSlider();
};

// Activating whole component
sliderComponent();

///////////////////////////////////////
// Lifecycle DOM events

// Wait for the loading of the whole html file
// document.addEventListener('DOMContentLoaded', function (e) {
//   console.log(e);
// });

// Wait for the loading of external resources/css too
// window.addEventListener('load', function (e) {
//   console.log(e);
// });

// Triggers before leaving the page -- Useful in cases where data may be lost
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
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
