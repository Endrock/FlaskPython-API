import api from "../services/api";
import { loaderAction } from "../utils/loader";
import { productQuantitySelector } from "../utils/product-input-quantity";
import { $Q, $Qll } from "../utils/query-selector";
import { realoadTrustpilot } from "../utils/reload-trustPilot-widget";
import { stringToHTML } from "../utils/to-html";
import { dataToggle } from "../utils/toggle-dataset";
import { btnAddToCart } from "./cart";
import { setupCustomSelect } from "./custom-select";
import { priceVat } from "./price-vat";
import { variantOnChange } from "./variants-product";

/**
 *
 * detect when button is clicked for show product modal
 *
 * @param {String} variantsButtonQuery - query selector for buttons
 * @returns
 */
 export const btnShowVariants = (variantsButtonQuery) => {
  const showVariantsButtons = $Qll(variantsButtonQuery);

  if (!showVariantsButtons) return;

  showVariantsButtons.forEach(
    (variantButton) => {
      variantButton.addEventListener('click', () => {
        const productHadle = variantButton.dataset.handle;
        // eslint-disable-next-line no-use-before-define
        openProductModal();
        // eslint-disable-next-line no-use-before-define
        renderModalSection(productHadle, "product-modal");
      })
    },
  );
}

/**
 * change data active to "true" when button is clicked
 */
const openProductModal = () => {
  const productModal = $Q("#productModal");

  loaderAction(productModal);
  dataToggle(productModal);
  // eslint-disable-next-line no-undef
  document.body.classList.add("block-scroll")
}

/**
 * Change data active to "false" when close button is clicked
 */
export const closeProductModal = (cartAction) => {
  const closebutton = $Q(".modal__close");
  const productModal = $Q("#productModal");

  if (cartAction === true) {
    if (productModal.dataset.active === "true") {
      dataToggle(productModal);
      // eslint-disable-next-line no-undef
      document.body.classList.remove("block-scroll")
    }
  } else {
    closebutton.addEventListener("click", () => {
      dataToggle(productModal);
      // eslint-disable-next-line no-undef
      document.body.classList.remove("block-scroll")
    })
  }
}

const renderModalSection = async (handle, sectionId) => {

  const base = `/products/${handle}`;

  const response = await api.shopifySectionByUrl(base, sectionId);

  // eslint-disable-next-line no-use-before-define
  updateContentModal(response);
}

const updateContentModal = (stringHTML) => {
  const modalContent = $Q(".modal__content", stringToHTML(stringHTML));
  const modalContentDom = $Q(".modal__content");

  loaderAction(modalContentDom);
  modalContentDom.innerHTML = modalContent.innerHTML;

  const modalWidget = $Q(".main-product__star-rating .trustpilot-widget");

  realoadTrustpilot(modalWidget);
  variantOnChange('.variants');
  productQuantitySelector(modalContentDom);
  btnAddToCart('.modal__content .add-product-cart');
  closeProductModal(false);
  setupCustomSelect();
  priceVat();
}
