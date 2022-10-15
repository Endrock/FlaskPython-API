import api from "../services/api";
import { $Q } from "../utils/query-selector";
import initBestSellerSlider from "./best-sellers";
import { btnAddToCart } from "./cart";
import { priceVat } from "./price-vat";
import { btnShowVariants } from "./product.modal";

export const getProducts = async () => {
  const sectionContainer = $Q("#product-recommedations-id");

  if (sectionContainer != null) {
    const sectionId = sectionContainer.value;
    const productId = $Q("#product-id").value;

    const params = {
      id: productId,
      limit: 8,
      sectionId: sectionId,
    }

    const response = await api.getRecommendedProducts(params);
    // eslint-disable-next-line no-use-before-define
    printProducts(response);
  }
}

const printProducts = (stringHTML) => {
  const section = $Q(".products-recommendations");

  section.innerHTML = stringHTML;

  initBestSellerSlider();
  btnShowVariants('.btn-show-variants-js');
  btnAddToCart('.products-recommendations .add-product-cart');
  btnAddToCart('.add-product-cart-upsell');
  priceVat();
}
