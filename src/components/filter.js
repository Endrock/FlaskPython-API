import { $Qll, $Q } from '../utils/query-selector'
import { stringToHTML } from '../utils/to-html'
import api from '../services/api'

export const filter = () => {
  $Qll('.filter-input').forEach(
    (input) => {
      input.addEventListener(
        'change',
        // eslint-disable-next-line no-use-before-define
        changeFilter,
      )
    },
  )
}

async function changeFilter(e) {
  // eslint-disable-next-line camelcase, no-undef
  if (!url_collection) return null;
  // eslint-disable-next-line camelcase, no-undef
  const url = `${url_collection}/${e.target.value}`;
  const newFilter = await api.shopifySectionByUrl(url, 'collection-products');
  const listOfProducts = $Q('#list-products', stringToHTML(newFilter));

  $Q('.shopify-section.collection').innerHTML = listOfProducts.outerHTML;
}
