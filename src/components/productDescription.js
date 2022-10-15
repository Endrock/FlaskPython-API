import { $Q } from "../utils/query-selector";

/**
 * Get product description container
 * search break ... in description for break short description
 */
export const readMore = () => {
  const productDescription = $Q(".main-product__description");
  const description = productDescription.innerHTML;

  if (description.includes('<p>...</p>')) {
    // eslint-disable-next-line no-use-before-define
    breackDescription(description, productDescription);
  }
}

/**
 *
 * @param {String} string full description
 * @param {Node} productDescrition description container
 * break description in 2, and show the cta for read more or read less
 */
const breackDescription = (string, productDescrition) => {
  const descriptions = string.split('<p>...</p>');
  const shortDescription = descriptions[0];
  const fullDescription = descriptions[1];
  const readMoreText = $Q('#read-more-text').value;
  const readlessText = $Q('#read-less-text').value;

  // eslint-disable-next-line no-param-reassign
  productDescrition.innerHTML = `
    ${shortDescription}
    <span id="more" class="more">${fullDescription}</span>
    <span id="dots" class="dots">${readMoreText}</span>
  `

  const readMoreButton = $Q("#dots");
  const secondDescription = $Q("#more");
  secondDescription.previousElementSibling.classList.add("inline");

  readMoreButton.addEventListener("click", () => {
    secondDescription.classList.toggle("show-more");

    if (secondDescription.classList.contains('show-more')) {
      readMoreButton.innerText = readlessText;
    } else {
      readMoreButton.innerText = readMoreText;
    }
  })
}
