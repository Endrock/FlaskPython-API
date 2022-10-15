import Swiper, { Pagination, Navigation } from "swiper";
import { $Q, $Qll } from "../utils/query-selector";

import 'swiper/css/bundle';

const setupHeroSlider = () => {
  const sliderHero = $Q(".hero");
  const sliderItems = $Qll(".hero-item");

  if (sliderItems.length <= 1) return;

  if (!sliderHero) return;

  Swiper.use([Pagination, Navigation]);

  // eslint-disable-next-line no-new
  new Swiper(sliderHero, {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: false,
    pagination: {
      el: '.hero__pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.hero__arrow--next',
      prevEl: '.hero__arrow--prev',
    },
    autoplay: false,
  });
};

export default setupHeroSlider;
