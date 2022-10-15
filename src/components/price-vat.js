import { getUserIPData } from "../services/country";
import { barProgress } from "../utils/bar-progress";
import { $Q, $Qll } from "../utils/query-selector";
import { getCountryTax } from "./custom-taxes";

/**
 * show in the front page the new calculated price
 * @param {Node} element -> HTML node price
 * @param {Number} price -> Calculated number
 */
const printPriceVat = (element, price) => {
  const formattedPrice = price.toFixed(2).replace(".", ",");
  // eslint-disable-next-line no-param-reassign
  element.innerText = formattedPrice;
}

const printCartTotalPrice = (price, estimate) => {

  const cartButton = $Qll("#btn_cart_total_price");
  const estimateVat = $Qll("#cart_estimate_vat");

  const formattedPrice = price.toFixed(2).replace(".", ",");
  const formattedEstimate = estimate.toFixed(2).replace(".", ",");

  cartButton.forEach((element, i) => {
    // eslint-disable-next-line no-param-reassign
    element.innerText = formattedPrice
    estimateVat[i].innerText = ` ${formattedEstimate}`;
  });

  barProgress($Q('#progress-bar-data'), price);
}

/**
 * If isEnabledTax is false, hidde this elements
 */
const hiddePriceVat = () => {
  const ttcPrices = $Qll(".ttc_function");

  ttcPrices.forEach((ttcPrice) => {
    ttcPrice.classList.add("hidden");
  });
}

/**
 * Calculate the new price with custom tax
 * @param {Number} vat -> cutom tax for user country
 */
const calculatePriceVat = (vat) => {
  const priceContainer = $Qll(".price-product-js")

  priceContainer.forEach((container) => {
    const ttcPrices = $Qll(".ttc", container);

    ttcPrices.forEach((ttcPrice) => {
      const price = parseFloat(ttcPrice.dataset.price.replace(",", "."));
      const priceWithVat = price + ((vat / 100) * price);

      printPriceVat(ttcPrice, priceWithVat);
    });
  });
}

const calculateTotalPriceVat = (vat) => {
  const cartTotalPrice = $Q(".cartpage-footer__price");

  if (cartTotalPrice != null) {
    const formattedPrice = parseFloat(cartTotalPrice.dataset.price.replace(",", "."));
    const totalPriceWithVat = formattedPrice + ((vat / 100) * formattedPrice);
    const vatEstimate = totalPriceWithVat - formattedPrice;

    printCartTotalPrice(totalPriceWithVat, vatEstimate);
  }
}

/**
 * If the user is logged calculate the custom price
 * with the user direction
 * if the user is not logged calculate the custom price
 * with IP data
 */
export const priceVat = async () => {
  const isEnabledTax = $Q("#custom_tax_function");

  if (isEnabledTax != null) {
    const isEnabled = isEnabledTax.value

    if (isEnabled === "true") {
      const {countryCode} = await getUserIPData();
      const userZone = $Q("#user_zone").value;
      let customTax;

      if (userZone === "user_not_logged") {
        customTax = getCountryTax(countryCode);
      } else {
        customTax = getCountryTax(userZone);
      }

      calculatePriceVat(customTax);
      calculateTotalPriceVat(customTax);
    } else {
      hiddePriceVat();
    }
  }

}
