import { $Q, $Qll } from '../utils/query-selector'
import Swiper, { Autoplay } from "swiper";

const initTopbarSlider = () => {
    const slider = $Q('.top-bar');
    const slides = $Qll('top-bar__block');

    if (!slider) return;
    if (slides.length === 1) return;

    let dataAutoplay = slider.dataset.autoplay;
    if (!dataAutoplay) {
      dataAutoplay = false;
    }

    const isAutoplay = JSON.parse(dataAutoplay);
    let autoPlay = false;
    if (isAutoplay) {
        autoPlay = {
            delay: 5000,
        };
    }

    return new Swiper(slider, {
        modules: [Autoplay],
        slidesPerView: 1,
        centeredSlides: true,
        autoplay: autoPlay,
    });
};

export default initTopbarSlider;
