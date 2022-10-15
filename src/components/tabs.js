import { $Q, $Qll } from "../utils/query-selector";

/**
 * Listen when tab title is clicked for exectute tabs actions
 * open or change tab active
 */
export const openTabs = () => {
  const tabsContainer = $Qll(".tabs");

  if (tabsContainer != null) {
    tabsContainer.forEach((tabs) => {
      const tabsButton = $Qll(".tabs__button", tabs);

      tabsButton.forEach((button) => {
        button.addEventListener("click", () => {
          // eslint-disable-next-line no-use-before-define
          tabsActions(button, tabsButton)
        })
      })
    });
  }
}

/**
 * Show tab content if button clicked is not active
 * @param {Node} button -> button clicked
 * @param {array} buttons -> Array all tabs buttons
 */
const tabsActions = (button, buttons) => {
  buttons.forEach((button) => {
    // eslint-disable-next-line no-param-reassign
    button.dataset.active = "false";
  });

  // eslint-disable-next-line no-param-reassign
  button.dataset.active = "true"

  // eslint-disable-next-line no-use-before-define
  showContent(button);
}

/**
 * show tab content form button clicked
 * @param {Node} button -> button clicked
 */
const showContent = (button) => {
  const tabsContents = $Qll(".tabs__content");
  const indexActive = button.getAttribute("tab-index");
  const tabContentActive = $Q(`.tabs__content[tab-index="${ indexActive }"]`);

  tabsContents.forEach((content) => {
    content.classList.add("hidden");
  });

  tabContentActive.classList.toggle("hidden");
}
