import { $Q } from "../utils/query-selector";

/**
 * Create objects with custom zones taxes
 * @returns Json with custom zone taxes
 */
const getZones = () => {
  const content = $Q("#price-zones");
  const zones = JSON.parse(content.content.textContent);

  return zones;
}

/**
 *
 * @param {String} country -> User country code
 * @returns custom tax for user country
 * if the user country dont have custom tax, take default tax
 */
export const getCountryTax = (country = "FR") => {
  const zones = getZones();
  const defaultTax = $Q("#default_zone").value;

  const countryZone = zones.filter((zone) => zone.countries.includes(country));

  if (countryZone.length === 0) {
    return parseInt(defaultTax, 10);
  }
  const countryTax = countryZone[0].taxes
  return countryTax;
}
