import Swiper, { Pagination, Navigation } from "swiper";
import { $Q, $Qll } from "../utils/query-selector";

import 'swiper/css/bundle';

const initBestSellerSlider = () => {
  const slider = $Q(".best-sellers");
  const sliderItems = $Qll('.best-sellers__slide');

  if (!slider) return;

  if (sliderItems.length <= 1) return;

  Swiper.use([Pagination, Navigation]);

  // eslint-disable-next-line no-new
  new Swiper(slider, {
    slidesPerView: 1,
    loop: false,
    breakpoints: {
      280: {
        slidesPerView: 1.2756,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 0,
      },
    },
    navigation: {
      nextEl: '.best-sellers--next',
      prevEl: '.best-sellers--prev',
    },
    autoplay: false,
  });
}

export default initBestSellerSlider;
