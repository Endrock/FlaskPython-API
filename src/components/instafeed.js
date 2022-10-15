import Swiper, { Navigation } from 'swiper';
import { $Q, $Qll } from '../utils/query-selector';
import { dataToggle } from '../utils/toggle-dataset';

/**
 * @name initSwiper
 * @description This function init swiper instance to instagram feed
 *
 */

// eslint-disable-next-line arrow-body-style
const initSwiper = (slider) => {
  return new Swiper(slider, {
    modules: [Navigation],
    slidesPerView: 1.4,
    slidesPerGroup: 1,
    spaceBetween: 10,
    centeredSlides: true,
    centeredSlidesBounds: true,
    initialSlide: 1,
    navigation: {
      nextEl: '.insta-feed__next',
      prevEl: '.insta-feed__prev',
    },
    breakpoints: {
      769: {
        spaceBetween: 10,
        slidesPerView: 4.1,
      },
    },
    on: {
      // eslint-disable-next-line func-names
      init: function () {
        // eslint-disable-next-line no-use-before-define
        setArrowsPosition();
      },
    },
  });
};

/**
 * @name initInstaFeedSlider
 * @description This function detect on load instagram app and verify
 * when load items using mutationObserver, then call function initSwiper()
 *
 */

const initInstaFeedSlider = () => {
  const slider = $Q('.instafeed-slider');
  if (!slider) return;
  const config = {
    attributes: false,
    childList: true,
    characterData: true,
    subtree: true,
  };
  const target = $Q('#insta-feed');
  const observer = new MutationObserver((mutationList) => {
    // eslint-disable-next-line no-use-before-define
    const hasLink = getLinks(mutationList);
    if (hasLink) {
      const ligthBoxItems = $Qll('.instafeed-lightbox', slider);
      const items = $Qll('.instafeed-container', slider);
      const swiperWrapper = document.createElement('div');
      const ligthBoxWraper = document.createElement('div');
      swiperWrapper.classList.add("swiper-wrapper");
      swiperWrapper.classList.add("insta-feed__wrapper");
      items.forEach((item) => {
        let slideItem = null;
        if (item.parentNode.tagName.toLowerCase() === 'a') {
          slideItem = item.parentNode;
        } else {
          const anchor = document.createElement('a');
          anchor.appendChild(item);
          slideItem = anchor;
        }
        slideItem.classList.add('swiper-slide');
        swiperWrapper.appendChild(slideItem);
      });
      if (ligthBoxItems.length) {
        ligthBoxItems.forEach((item) => {
          ligthBoxWraper.appendChild(item);
        });
        slider.appendChild(ligthBoxWraper);
      }
      slider.appendChild(swiperWrapper);
      initSwiper(slider);
      observer.disconnect();
    }
  });
  observer.observe(target, config);
};

/**
 * @name setArrowsPosition
 * @description This function set arrows position
 * on load instagra slider and toggle visibility
 */

 const setArrowsPosition = () => {
  const arrows = $Qll('.insta-feed__jsnav');
  const instagramJs = $Q(".instagram-js");
  const instagramSlider = $Q("#insta-feed", instagramJs);
  if (!arrows || !instagramJs) return;

  const instagramEl = instagramSlider.getBoundingClientRect();
  const instagramElHeight = (instagramEl.height / 2) - 30.5;

  arrows.forEach((item) => {
    // eslint-disable-next-line no-param-reassign
    item.style.bottom = `${instagramElHeight}px`;
    dataToggle(item, false);
  });
};

const getLinks = (mutationList) => {
  const hasLink = mutationList
  .map((item) => item.addedNodes)
  .map((item) => Array.from(item.values()))
  .flat()
  .some((item) => {
    if (!item.classList.contains('instafeed-container')) {
      return item.tagName.toLowerCase() === 'a';
    }
    return item.classList.contains('instafeed-container');
  });
  return hasLink;
}

export default initInstaFeedSlider;
