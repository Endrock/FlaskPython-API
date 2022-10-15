import { $Q } from "./query-selector";

export const productQuantitySelector = (parent) => {
  // eslint-disable-next-line no-unused-expressions, no-unneeded-ternary
  parent ? parent : document
  const quantityContainer = $Q('.quantity__container', parent);

  if (quantityContainer) {
    const quantityInput = $Q('input', quantityContainer);

    quantityContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-plus")) {
        // eslint-disable-next-line space-unary-ops
        quantityInput.value ++;
      } else if (e.target.classList.contains("btn-less") && quantityInput.value > 1) {
        // eslint-disable-next-line space-unary-ops
        quantityInput.value --;
      }
    })
  }
}
