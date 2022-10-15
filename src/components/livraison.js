import { $Q } from "../utils/query-selector";
import api from "../services/api";
import { stringToHTML } from "../utils/to-html";
import { openAccordion } from "../utils/accordion";
import { initDeliveryDates } from "./delivery";

export const printLivraisonSection = async () => {
  const container = $Q("#livraison");
  if (container != null) {
    const sectionId = $Q(".delivery__dates").dataset.id;
    const response = await api.renderShopifySection(`${sectionId}`);
    const sectionContent = $Q(".delivery__dates", stringToHTML(response[sectionId]));
    container.innerHTML = sectionContent.outerHTML;

    openAccordion(container);
    initDeliveryDates();
  }
}
