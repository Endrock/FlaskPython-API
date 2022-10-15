import { $Qll } from "../utils/query-selector";

/**
 * read the range price filter and
 * define the new range depends of the input change
 */

export function sliderPrice() {
  const rangein = $Qll(".range-in input");
  const pricein = $Qll(".price-in input");
  const progress = $Qll('.slider-filter .pro');
  const priceGap = 0;

  rangein.forEach((input) => {
    let minVal = rangein[0].value,
    maxVal = rangein[1].value;

    // eslint-disable-next-line no-use-before-define
    stylingProgressBar(minVal, maxVal, progress[0], rangein)

    input.addEventListener("input", (e) => {
      // eslint-disable-next-line no-unused-expressions
      minVal = rangein[0].value,
      maxVal = rangein[1].value;
      if (maxVal - minVal < priceGap) {
        if (e.target.className === "range-min") {
          rangein[0].value = maxVal - priceGap;
        } else {
          rangein[1].value = minVal + priceGap;
        }
      } else {
        pricein[0].value = minVal;
        pricein[1].value = maxVal;
        // eslint-disable-next-line no-use-before-define
        stylingProgressBar(minVal, maxVal, progress[0], rangein)
      }
    });
  });
}

/**
 * update the price range slide for css elements
 *
 * @param {number} minVal - value of the min range element
 * @param {number} maxVal - value of the max range element
 * @param {node} progress - element where should styling the range
 * @param {node} rangein - node of the initial range from the param of the price
 */

// eslint-disable-next-line max-params
function stylingProgressBar(minVal, maxVal, progress, rangein) {
  // eslint-disable-next-line prefer-template, no-param-reassign
  progress.style.left = (minVal / rangein[0].max) * 100 + "%";
  // eslint-disable-next-line prefer-template, no-param-reassign
  progress.style.right = 100 - (maxVal / rangein[1].max) * 100 + "%";
}
