import { Navigation, Thumbs, FreeMode } from "swiper";

export const thumbsConfig = (slidesPerView, vertical) => {
  const config = {
    modules: [FreeMode],
    slidesPerView: slidesPerView,
    watchSlidesProgress: true,
    freeMode: true,
  }
  // eslint-disable-next-line no-unused-expressions
  vertical && (config.direction = "vertical");

  return config;
}

export const principalConfig = (thumbnails) => ({
    modules: [Navigation, Thumbs],
    spaceBetween: 10,
    thumbs: {
      swiper: thumbnails,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  })
