import Swiper from "swiper";
import { $Q, $Qll } from "../utils/query-selector";

const initLeBlogSlider = () => {
  const sliderEl = $Q(".le-blog");
  const sliderItems = $Qll(".le-blog__item");

  if (!sliderEl) return;

  if (sliderItems.length <= 1) return;

  // eslint-disable-next-line no-new
  new Swiper(sliderEl, {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: false,
    centeredSlidesBounds: true,
    watchOverflow: true,
    pagination: {
      el: '.le-blog__pagination',
      clickable: true,
    },
    breakpoints: {
      280: {
        slidesPerView: 1.3,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
    autoplay: false,
  });
};

export default initLeBlogSlider;
