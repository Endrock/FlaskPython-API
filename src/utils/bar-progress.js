import { $Q } from './query-selector'

/**
 * Update the width of bar progress
 * @param {DOM element} input - input hidde with data
 */
export const barProgress = (input, price) => {
  const totalPrice = price.toFixed(2) * 100
  const limitPrice = input.dataset.limit;
  const progress = $Q(".bar-progress");

  const barWidth = totalPrice / (limitPrice);
  if (barWidth > 100) {
    progress.style.width = "100%";
  } else {
    progress.style.width = `${barWidth}%`;
  }
}
