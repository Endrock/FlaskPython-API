import { $Qll } from "./query-selector";
import { dataToggle } from "./toggle-dataset";

export function openAccordion(parent) {
  $Qll(".accordion-item__button", parent || document).forEach((item) => {
    // eslint-disable-next-line no-unused-vars
    item.addEventListener("click", (e) => {
      const parent = item.closest(".accordions");
      if (!parent.classList.contains("accordions")) {
        return;
      }
      const isToggle = JSON.parse(parent.dataset.toggle);
      if (isToggle) {
        // eslint-disable-next-line no-use-before-define
        closeAll(".accordion-item", parent);
        // eslint-disable-next-line no-use-before-define
        closeElement(item, true);
        return;
      }
      dataToggle(item, false);
    })
  })
}
function closeElement(ele, state = false) {
  ele.setAttribute("data-active", state);
}
/**
 * Accordion Action
 * This function change the dataset
 * active in button element accordion (on click event)
 *
 * @param {HTMLElement} element - Button to change data active
 * @param {NodeListOf} accordions - All accordions in DOM
 */
// eslint-disable-next-line no-unused-vars
function accordionAction(element, accordions) {
  if (accordions.dataset.toggle === "true") {
    // eslint-disable-next-line no-use-before-define
    closeAll(".accordion-item", accordions);
  }
  if (element.dataset.active === "true") {
    closeElement(element, false)
  } else {
    closeElement(element, true)
  }
}
/**
 * Loop to change all dataset active in button accordions
 *
 * @param {String} nodeAll - Reference to search in parent element
 * @param {HTMLElement} parent - Parent to valuate
 * @returns Action to change dataset active to ‘false" at all buttons
 */
export function closeAll(nodeAll, parent) {
  return $Qll(nodeAll, parent)
    // eslint-disable-next-line no-return-assign
    .forEach((node) => (
      // eslint-disable-next-line no-param-reassign
      node.children[0].dataset.active = "false"
    ),
  )
}
