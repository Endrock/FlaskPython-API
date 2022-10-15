import Swiper, { Pagination } from "swiper";
import { $Q, $Qll } from "../utils/query-selector";

import 'swiper/css/bundle';

const nosMarquesSlider = () => {
  const sliderNosMarques = $Q(".nos-marques");
  const sliderItems = $Qll(".nos-marques__item");

  if (!sliderNosMarques) return;

  if (sliderItems.length <= 1) return;

  // eslint-disable-next-line radix
  const quantityMobile = parseInt(sliderNosMarques.dataset.quantityMobile);
  // eslint-disable-next-line radix
  const quantityDesktop = parseInt(sliderNosMarques.dataset.quantityDesktop);

  Swiper.use([Pagination]);

  // eslint-disable-next-line no-new
  new Swiper(sliderNosMarques, {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: false,
    pagination: {
      el: '.nos-marques__pagination',
      clickable: true,
    },
    breakpoints: {
      280: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      320: {
        slidesPerView: quantityMobile,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: quantityDesktop,
        spaceBetween: 10,
      },
    },
    autoplay: false,
  });
};

export default nosMarquesSlider;
