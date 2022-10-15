import { $Q } from "../utils/query-selector";

Shopify.queryParams = {};

/**
 * Update sort_by query parameter on select change
 */
export const defultSortBy = () => {
  $Q('.collection_custom-select')
  .addEventListener(
    'change',
    function({ target }) {
      console.log("changed")
      Shopify.queryParams.sort_by = target.value;
      location.search = new URLSearchParams(Shopify.queryParams).toString();
  });
}
