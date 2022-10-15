import { $Q, $Qll } from "../utils/query-selector";
import { dataToggle } from "../utils/toggle-dataset";

/**
* Load click event into custom selects
*/
function onClickCustomSelect() {
  const selects = $Qll('.custom-select__fire-event');
  // eslint-disable-next-line func-names, prefer-arrow-callback
  selects.forEach(function (item) {
    // eslint-disable-next-line prefer-arrow-callback, func-names
    item.addEventListener('click', function () {
      const closestCustomSelect = item.closest('.custom-select');
      dataToggle(closestCustomSelect, false);
      // eslint-disable-next-line no-use-before-define
      onClickOutsideSelect(closestCustomSelect);
    });
  });
}

/**
 * Process outside clicks
 * @param {HTMLElement} select select event fire
 * @param {HTMLElement} closestCustomSelect main wrapper custom select
 * @returns void
 */
function onClickOutsideSelect(closestCustomSelect) {
  document.addEventListener("click", function onClickOutsideEvent(e) {

    if (!closestCustomSelect.contains(e.target) && closestCustomSelect.dataset.active === "true") {
      dataToggle(closestCustomSelect, false);
      document.removeEventListener('click', onClickOutsideEvent);
    }
  })
}

/**
* Load click event into custom selects options
*/
function onClickSelectItem() {
  const selectItems = $Qll('.custom-select__option');

  // eslint-disable-next-line func-names, prefer-arrow-callback
  selectItems.forEach(function (item) {
    // eslint-disable-next-line func-names, prefer-arrow-callback
    item.addEventListener('click', function () {
      // eslint-disable-next-line no-use-before-define
      setValueCustomSelect(item);
    });
  });
}

function setValueCustomSelect(item) {
  const closestCustomSelect = item.closest('.custom-select');
  const labelSelected = closestCustomSelect.querySelector(
    '.custom-select__selected',
  );
  const inputSelected = $Q("input", item)
  labelSelected.innerHTML = inputSelected.value;
  closestCustomSelect.dataset.active = 'false';
}

/**
* Init events
*/
export function setupCustomSelect() {
  onClickCustomSelect();
  onClickSelectItem();
}
