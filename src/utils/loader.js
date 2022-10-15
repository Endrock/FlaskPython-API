import { $Q } from "./query-selector";

export const loaderAction = (parent) => {
  const loader = $Q(".loader", parent);

  loader.classList.toggle("hidden");
}
