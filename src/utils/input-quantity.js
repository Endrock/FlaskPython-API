import { $Q, $Qll } from "./query-selector";

/**
  * Set quantity
  * Set item quantity with custom input,
  * Execute updateCart function
* @author Cristian Velasco
*/
// eslint-disable-next-line arrow-body-style
export const setQuantity = () => {
  return $Qll(".quantity-label").forEach(
    (labelParent) => $Qll('button', labelParent)
      .forEach((btn) => {
        btn.addEventListener(
          'click',
          // eslint-disable-next-line no-use-before-define
          updateQuantity,
        )
      }),
  )
}

/**
 * add or subtract input value
 * @author Cristian Velasco
 */
function updateQuantity() {
  const input = $Q('input', this.parentElement)

  if (this.dataset.action === "subtr") {
    // eslint-disable-next-line no-unused-expressions
    input.value > 0 && input.value--
  } else {
    input.value++
  }

  return input.dispatchEvent(new Event("change"));
}
