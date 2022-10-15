import { closeAll } from "../utils/accordion";
import { $Q, $Qll } from "../utils/query-selector"
import { dataToggle, dataToggleProp } from "../utils/toggle-dataset";
import api from "../services/api";
import { stringToHTML } from "../utils/to-html";

export const openContactMenu = (action, target, event) => {
  $Q(action).addEventListener(event, () => dataToggle($Q(target)));
  if (event === "mouseover") {
    $Q(action).addEventListener('mouseout', () => {
      $Q(target).dataset.active = false
    });
  }
};

const initConctaMenu = (selector) => {
  const listItemsWrap = $Q('.header-contact', selector);
  if (!listItemsWrap) return;

  const items = $Qll('.header-contact__item', listItemsWrap);

  if (!items.length) return;

  items.forEach((item) => {
    const button = $Q('.header-contact__button', item);
    const detail = $Q('.header-contact__detailt', item);
    const buttonBack = $Q('.button-back-js', detail);

    if (button) {
      button.addEventListener('click', () => {
        dataToggle(detail);
      });
    }

    if (!buttonBack) return;

    buttonBack.addEventListener('click', () => {
      console.log(detail);
      dataToggle(detail)
    });
  });

  const backContact = $Q('.header-contact__back', selector);
  const backButton = $Q('.button-contact-back-js', backContact);
  backButton.addEventListener('click', () => {
    dataToggle(selector);
  });
};

export const initContactHeader = async (selector, callback) => {
  const element = $Q(selector);
  const section = await api.renderShopifySection('header-contact');
  const content = stringToHTML(section['header-contact']);
  const headerContact = $Q('.header-contact', content);
  if (!headerContact) return;
  dataToggle(headerContact);
  element.innerHTML = headerContact.outerHTML;

  initConctaMenu(element);

  if (callback) callback();
};

export const toggleMenu = () => {
  const btn = $Q('.header__toggle-menu');
  const sidebar = $Q('.sidebar-menu');
  if (!btn || !sidebar) return;

  btn.addEventListener('click', () => {
    dataToggle(btn);
    dataToggle(sidebar);
    dataToggleProp($Q('body'), 'scroll');
  });
};

export const openSide = () => {
  const mainSide = $Q('#nav-list-js');
  const mainItems = $Qll('.nav-item-js', mainSide);
  const itemsToBack = $Qll('.button-back-js', mainSide);

  if (!mainItems.length) return;

  const match = window.matchMedia('(min-width: 768px)');

  mainItems.forEach((item) => {
    if (match.matches) {
      item.addEventListener('mouseover', (event) => {
        event.preventDefault();
        const btn = item.querySelector('.button-dropdown-js');
        dataToggle(btn);
      });
      item.addEventListener('mouseout', (event) => {
        event.preventDefault();
        const btn = item.querySelector('.button-dropdown-js');
        btn.dataset.active = false;
      });
    } else {
      const btn = $Q('.button-dropdown-js', item);
      const arrow = $Q('.nav-item__arrow', btn);
      arrow.addEventListener('click', () => dataToggle(btn));
    }
  });

  if (itemsToBack.length) {
    itemsToBack.forEach((item) => {
      item.addEventListener('click', () => {
        const parent = item.parentNode.parentNode.parentNode;
        const btn = parent.previousSibling.previousSibling;
        dataToggle(btn);
      });
    });
  }
};

/**
 * DropDown Action - if is not data active true
 * @param {HTMLElement} element - Node to change data active
 */
 function dropDownAction(element) {
  // eslint-disable-next-line no-unused-expressions
  element.dataset.active !== 'true'
    && closeAll('.nav-item-js', $Q('#nav-list-js'));

  dataToggle(element);
}

/**
 * Event dropDown
 * @param {HTMLElement} node - Event target node
 * @param {EventListener} event - Type event
 * @param {HTMLElement} nodeOnAction - Node to change data active
 * @returns Function Event
 */
 function eventDropDown(
  node,
  event,
  nodeOnAction,
) {
  return node.addEventListener(event, () => {
    dropDownAction(nodeOnAction)
  })
}

/**
 * Open dropdown menu - click / mouseentre event
 * To select type event check data-event in node#nav-list-js
 */
export function openDropDown() {
  const { dataset } = $Q('#nav-list-js');

  // eslint-disable-next-line no-undef
  if (dataset.event === 'click' || innerWidth < 800) {
    $Qll('.button-dropdown-js')
      .forEach((item) => (
        eventDropDown(item, 'click', item)
      ))
  } else {
    $Qll('.nav-item-js')
      .forEach((item) => {
        eventDropDown(item, 'mouseenter', item.children[0])
        eventDropDown(item, 'mouseleave', item.children[0])
      })
  }
}
