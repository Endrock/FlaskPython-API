/***
 * @name validEmail
 * @description
 * return a boolean and receive a string
 * it should are a email address to validate
 */

const validEmail = (email) => {
  if (!email) return;

  // eslint-disable-next-line no-useless-escape
  return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};

export default validEmail;
