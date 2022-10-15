import Swiper, { Navigation } from "swiper";
import { $Q, $Qll } from "../utils/query-selector";

import 'swiper/css/bundle';

const initCategoryIconsSlider = () => {

  const sliderCategory = $Q(".category-icons");
  const sliderItems = $Qll(".category-icon");

  if (sliderItems.length <= 1) return;

  if (!sliderCategory) return;

  Swiper.use([Navigation]);

  // eslint-disable-next-line no-new
  new Swiper(sliderCategory, {
    slidesPerView: 3.3,
    spaceBetween: 0,
    loop: false,
    //centeredSlidesBounds: true,
    //centerInsufficientSlides: true,
    breakpoints: {
      280: {
        slidesPerView: 2.3,
        spaceBetween: 5,
      },
      320: {
        slidesPerView: 3.3,
        spaceBetween: 5,
      },
      768: {
        slidesPerView: 8.2,
        spaceBetween: 15,
        initialSlide: 1.1,
      },
      1536: {
        slidesPerView: 10.3,
        spaceBetween: 15,
      },
    },
    navigation: {
      nextEl: '.category-icons__nav--next',
      prevEl: '.category-icons__nav--prev',
    },
    autoplay: false,
  });
};

export default initCategoryIconsSlider;
