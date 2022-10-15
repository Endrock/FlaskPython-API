/**
 * Obtain the for a time zone
 * @param locale
 * @param timeZone
 * @returns Full date
 */
export const getDateByTimezone = (locale = 'fr-FR', timeZone = 'Europe/Paris') => {
  const date = new Date();
  let newDate = date.toLocaleString(locale, {
    timeZone: timeZone,
  });
  newDate = newDate.split('/');
  const hourYear = newDate[2].split(' ');
  return new Date(`${hourYear[0]}-${newDate[1]}-${newDate[0]} ${hourYear[1]}`);
}

/**
 * allows you to replace a pattern in a string with another value.
 * @param strTranlate
 * @param strFind
 * @param replace
 * @returns string
 */
export const transformDate = (strTranlate, strFind, replace) => {
  let str = strTranlate;
  if (strFind.includes('%d') || strFind.includes('%dd')) {
    str = str.replace('%dd', replace);
  }
  return str;
}
