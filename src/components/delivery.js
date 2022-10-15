import momentBusiness from "moment-business-days";
import * as moment from "moment";
import 'moment-timezone';
import { getDateByTimezone, transformDate } from "../utils/dates";
import { $Qll } from "../utils/query-selector";

const zone = 'Europe/Paris';
const format = 'YYYY-MM-DD HH:mm:ss';
let holidayList = [];
let hourForCheck = '15:30:00';

/**
 * read all elements according to the selector
 * @param strSelector
 */
// eslint-disable-next-line complexity
export const initDeliveryDates = (strSelector = '.delivery__dates') => {
  const containers = $Qll(strSelector);
  for (const element of containers) {
    holidayList = element.dataset.holidays.trim().replaceAll('\n', '').split(";") || [];

    // eslint-disable-next-line no-use-before-define
    initMomentHolidays();

    const listItems = element.querySelectorAll('.delivery--days');
    for (const subItem of listItems) {
      if (subItem.classList.contains('delivery__item-header')) {
        hourForCheck = `${subItem.dataset.hourClose.trim()}:00`;
      }
      const days = Math.abs(Number(subItem.dataset.addDay)) || 0
      // eslint-disable-next-line no-use-before-define
      renderDate(subItem, Number(days));
    }
  }
}

/**
 * render dates on preset elements
 * @param element
 * @param days
 */
const renderDate = (element, days) => {
  // eslint-disable-next-line no-use-before-define
  const dateToRender = processNextBusinessDate(days);
  let strTranlate = element.dataset.tranlate;
  if (days && element.querySelector('.render-data')) {
    strTranlate = transformDate(strTranlate, '%dd', `${dateToRender.str}`);
    // eslint-disable-next-line no-param-reassign
    element.querySelector('.render-data').innerHTML = `${strTranlate}`;
  }
}

/**
 * The date is processed for the next business day
 * @param days
 * @returns object date
 */
const processNextBusinessDate = (days) => {
  const currentDate = getDateByTimezone();
  // eslint-disable-next-line no-use-before-define
  const currentHour = getCurrentHour();
  const newNDays = currentHour > hourForCheck ? days + 1 : days;
  // eslint-disable-next-line no-use-before-define
  const nextDate = nextBusinessDate(currentDate, newNDays);
  return {
    obj: new Date(nextDate),
    str: momentBusiness(nextDate).format('DD-MM'),
  };
}

/**
 * starting the moment business
 * @returns object
 */
// eslint-disable-next-line arrow-body-style
const initMomentHolidays = () => {
  // eslint-disable-next-line no-undef
  return momentBusiness.updateLocale(theme.lang, {
    holidays: holidayList,
    holidayFormat: 'MM-DD',
  });
};

/**
 * get the time
 * @returns string
 */
// eslint-disable-next-line arrow-body-style
const getCurrentHour = () => {
  return momentBusiness(getDateByTimezone()).format('HH:mm:ss');
}

/**
 * next date
 * @param currentDate
 * @param addDays
 * @returns date
 */
// eslint-disable-next-line arrow-body-style
const nextBusinessDate = (currentDate, addDays) => {
  // eslint-disable-next-line no-underscore-dangle
  return momentBusiness(currentDate, format).businessAdd(addDays)._d;
}
/**
 * return the name of the month according to the language of the topic
 * @param date
 * @returns string
 */
// eslint-disable-next-line no-unused-vars
const getMonthString = (date = '') => {
  if (date) {
    // eslint-disable-next-line no-undef
    return moment(date).tz(zone).locale(theme.lang).format('MMMM');
  }
  // eslint-disable-next-line no-undef
  return moment.tz(zone).locale(theme.lang).format('MMMM');
}
