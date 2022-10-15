import api from "../services/api";
import { $Qll, $Q } from "../utils/query-selector";
import { dataToggle, toggleDataActive } from "../utils/toggle-dataset";
import {
  updateCartItems,
  updatetotalPrice,
  updateUpsell,
  updateCartbutton,
  updatePriceItem,
  updateCartCounter,
} from "./update-cart";

import { sliderUpsell } from "./slider-swiper";
import { closeProductModal } from "./product.modal";

const CART_SECTION = "side-cart,cart-page";

sliderUpsell();

/**
 * Listen if add to cart form is submited
 * if add to cart form is submited add products in cart
 *
 * @param {string} formQuery - className reference in form add-to-cart
 *
 * To active this feature - ADD className 'add-product-cart' in form product
 * */
export const btnAddToCart = (formQuery) => {
  const addForms = $Qll(formQuery);

  if (addForms != null) {
    addForms.forEach(
      (form) => {
        // eslint-disable-next-line no-use-before-define
        submitForm(form);
      },
    )
  }
}

// eslint-disable-next-line arrow-body-style
const submitForm = (form) => {
  return form.addEventListener(
    "submit",
    (e) => {
      e.preventDefault();
      // eslint-disable-next-line no-use-before-define
      addProducts(e);

      // eslint-disable-next-line no-unused-expressions
      e.target.dataset.form !== "upsell"
       && dataToggle($Q("#shopify-section-side-cart"), true);
    },
  )
}

/**
 * Add products in cart
 * @param {event} event -Event submit from add to cart form
 */
const addProducts = async (event) => {
  let itemId = 0;
  let quantity = 1;

  for (const input of event.target) {
    if (input.name === "id") {
      itemId = input.value;
    }

    if (input.name === "quantity-selector") {
      quantity = input.value;
    }
  }

  const cartParams = {
    items: [
      {
        id: itemId,
        quantity: quantity,
      },
    ],
    sections: CART_SECTION,
  };

  const { sections } = await api.addToCart(cartParams);

  updateCartItems(sections["side-cart"]);
  updateCartbutton(sections["side-cart"]);
  updatetotalPrice(sections["side-cart"]);
  updateUpsell(sections["side-cart"]);
  updateCartCounter(sections["side-cart"]);
  closeProductModal(true);
}

/**
 * Event onChange in the cart item
 */
export const onChangeItemCart = () => {
  $Qll('.item-cart-js').forEach(
    (input) => {
      input.addEventListener(
        'change',
        // eslint-disable-next-line func-names
        function () {
          // eslint-disable-next-line no-use-before-define
          updateCart(this.id, this.value);
        },
      )
    },
  )
}

/**
 * Update quantity for each item in cart
 * @param {number} id Product ID
 * @param {number} quantity new quantity
 */
export const updateCart = async (id, quantity) => {

  const cartParams = {
    id: id,
    quantity: quantity,
    sections: CART_SECTION,
  }

  const { sections } = await api.updateCart(cartParams);

  if (quantity === 0) {
    updateCartItems(sections["side-cart"]);
    updateCartbutton(sections["side-cart"]);
    updatetotalPrice(sections["side-cart"]);
    updateUpsell(sections["side-cart"]);
    updateCartCounter(sections["side-cart"]);
  } else {
    updatePriceItem(sections["side-cart"], id);
    updateCartbutton(sections["side-cart"]);
    updatetotalPrice(sections["side-cart"]);
  }
}

/**
 * Delete item in cart
 * listen if delete button is clicked
 * if is clicked, update cart with quantity 0
 */
export const deleteItem = () => {
  const deleteIcon = $Qll(".item-delete");

  if (deleteIcon) {
    deleteIcon.forEach(
      (element) => {
        element.addEventListener(
          "click",
          () => {
            updateCart(element.dataset.id, 0)
          },
        )
      },
    );
  }
}

/**
* Open and close side cart with various buttons
*/
export const openCloseCart = () => {
  const cartContainer = $Q(".cart");
  cartContainer.setAttribute("data-active", "false");

  toggleDataActive(
    ".cart-close",
    "#shopify-section-side-cart",
    { overlay: true },
  )

  toggleDataActive(
    ".button-cart",
    "#shopify-section-side-cart",
    { overlay: true },
  )
}
