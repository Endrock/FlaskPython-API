import { stringToHTML } from '../utils/to-html';
import { $Q, $Qll } from '../utils/query-selector';
import { setQuantity } from "../utils/input-quantity";
import { btnAddToCart, deleteItem, onChangeItemCart } from "./cart";
import { sliderUpsell } from './slider-swiper';
import { priceVat } from './price-vat';

/**
 * Update cart items section in sidecart
 * @param {string} str - String HTML of section rendeirng
 */
export const updateCartItems = (str) => {
  $Qll('.cartitems-js')
    .forEach(
      (element) => {
        // eslint-disable-next-line no-param-reassign
        element.innerHTML = $Q(
          '#cart-items',
          stringToHTML(str),
        ).outerHTML;
      },
    )

  setQuantity();
  deleteItem();
  onChangeItemCart();
}

/**
 * Update checkout button section in sidecart
 * @param {string} str - String HTML of section rendeirng
 */
export const updateCartbutton = (str) => {
  const btnContainer = $Q('.cartpage-footer__btn--btn', stringToHTML(str));
  const domBtnContainer = $Qll('.cartpage-footer__btn--btn');

  domBtnContainer.forEach((element) => {
    // eslint-disable-next-line no-param-reassign
    element.innerHTML = btnContainer.innerHTML;
  })

}

/**
 * Update price item for each item in cart items section
 * @param {string} str - String HTML of section rendeirng
 * @param {number} id - Product ID
 */
export const updatePriceItem = (str, id) => {
  const {
    dataset,
    outerText,
  } = $Q(`#price-${id}`, stringToHTML(str));

  $Qll(`.price-${id}`).forEach(
    // eslint-disable-next-line max-len
    // eslint-disable-next-line arrow-parens, no-param-reassign, no-return-assign
    element => element.innerHTML = outerText,
  )

  // eslint-disable-next-line no-unused-expressions, no-use-before-define
  $Q('#cart-page') && updateOnCartPage(id, dataset.quantity);
}

/**
 * Chance all input value only cart page
 *
 * @param {String} id - Variant id item cart
 * @param {String} quantity - Quantity variant by item cart
 */
const updateOnCartPage = (id, quantity) => {
  $Qll(`.item-cart-js[id="${id}"]`).forEach(
    // eslint-disable-next-line max-len
    // eslint-disable-next-line arrow-parens, no-param-reassign, no-return-assign
    element => element.value = quantity,
  )
}

/**
 * Update total price in cart page
 * @param {string} str - String HTML of section rendeirng
 */
 export const updatetotalPrice = (str) => {
  const totalPriceContainer = $Q('.cartpage-footer__total-text', stringToHTML(str));
  const domTotalPriceContainer = $Qll('.cartpage-footer__total-text');

  domTotalPriceContainer.forEach((element) => {
    // eslint-disable-next-line no-param-reassign
    element.innerHTML = totalPriceContainer.innerHTML;
  })

  priceVat();
}

/**
 * Update upsell section in sidecart
 * @param {string} str - String HTML of section rendeirng
 */
export const updateUpsell = (str) => {
  $Q('#upsell-js').innerHTML = $Q(
    '#cart-upsell-slider',
    stringToHTML(str),
  ).outerHTML;

  btnAddToCart(".add-product-cart-upsell");
  sliderUpsell();
}

export const updateCartCounter = (str) => {
  const cartQuantity = $Q(".cartitems-js", stringToHTML(str)).dataset.counter;
  const cartCounter = $Q(".button-cart-counter");

  cartCounter.innerText = cartQuantity;
}
