import { $Q } from "../utils/query-selector";
import validEmail from "../utils/validEmail";

export const validateNewsLetter = () => {
  const form = $Q('#ContactFooter');
  const input = $Q('#NewsletterForm--footer');

  if (!form || !input) return;
  form.removeAttribute('action');

  // eslint-disable-next-line no-use-before-define
  readNewsletterInput(form, input);
  // eslint-disable-next-line no-use-before-define
  cleanNewsletterInput(form, input);
};

const cleanNewsletterInput = (form, input) => {
  input.addEventListener('input', () => {
    const notification = $Q('.footer__notification--error');
    if (!notification) return;
    form.removeChild(notification);
  })
}

const onSubmitNewsletter = (e, input, form) => {
  e.preventDefault();
  e.stopPropagation();
  const email = input.value;
  const valid = validEmail(email);

  if (!valid) {
    const email = $Q('.footer__newsletter-email');
    if (!email) return;

    const notification = email.dataset.error;
    const notificationNode = document.createElement('p');
    notificationNode.classList.add('footer__notification', 'footer__notification--error');
    notificationNode.innerText = notification;
    form.appendChild(notificationNode);
    return;
  }

  form.setAttribute('action', '/contact#ContactFooter');
  form.submit();
};

const readNewsletterInput = (form, input) => {
  /**
   * This validation is for when the submit form newsletter,
   * and the email input has already exist,
   * the form let show a message to user, notifying that is subscribed
   * **/
  const searchParams = new URLSearchParams(window.location.search);
  const contactGet = searchParams.get("contact[tags]");
  if (contactGet) {
      const errorExist = input.dataset.errorExists;
      const notificationNode = document.createElement('p');
      notificationNode.classList.add('footer__notification', 'footer__notification--error');
      notificationNode.innerText = errorExist;
      form.appendChild(notificationNode);

      const ContactFooter = document.querySelector("#ContactFooter");
      ContactFooter.scrollIntoView();
  }

  form.addEventListener('submit', (e) => { onSubmitNewsletter(e, input, form) });
}
