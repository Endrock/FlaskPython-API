/* eslint-disable max-lines-per-function */
import { validateForm } from "../services/sendFormB2B";
import { $Q } from "../utils/query-selector";

const hiddeRegisterForm = (form) => {
  const formVatValidation = $Q("#vat_validation");

  if (formVatValidation != null) {
    form.classList.add("hidden");
    formVatValidation.classList.remove("hidden")
  }

}

const showMessage = (vatValid, response, form) => {
  const message = $Q(".register-message");

  console.log(response)

  if (vatValid === true) {
    if (response.error !== undefined) {
      message.classList.add("error")
      if (response.message[0].message === "External id has already been taken.") {
        const messageVatTaken = $Q("#vat-taken-message").value;
        message.innerText = messageVatTaken;
      } else {
        message.innerText = response.message[0].message;
      }
    } else {
      message.innerText = response.message;
      message.classList.remove("error")
      form.reset();
      hiddeRegisterForm(form);
    }
  } else {
    const vatErrorMessage = $Q("#vat-error-message").value;
    message.classList.add("error");
    message.innerText = vatErrorMessage;
  }

}

const submitForm = async (form) => {

  const companyName = $Q('[name="companyName"]', form).value;
  const companyVat = $Q('[name="companyVat"]', form).value;
  const address1 = $Q('[name="address1"]', form).value;
  const countryCode = $Q('[name="countryCode"]', form).value;
  const city = $Q('[name="city"]', form).value;
  const zip = $Q('[name="zip"]').value;
  const email = $Q('[name="email"]', form).value;
  const firstName = $Q('[name="firstName"]', form).value;
  const lastName = $Q('[name="lastName"]', form).value;
  const billingSameAsShipping = $Q('[name="billingSameAsShipping"]', form).checked;

  const address2 = $Q('[name="address2"]', form).value;
  const recipient = $Q('[name="recipient"]', form).value;
  const zoneCode = $Q('[name="zoneCode"]', form).value;
  const title = $Q('[name="title"]', form).value;

  let shippingData;

  const formData = {
    companyName: companyName,
    companyVat: companyVat,
    billingAddress: {
      address1: address1,
      address2: address2,
      countryCode: countryCode,
      city: city,
      recipient: recipient,
      zip: zip,
      zoneCode: zoneCode,
    },
    billingSameAsShipping: false,
    companyContact: {
      email: email,
      firstName: firstName,
      lastName: lastName,
      title: title,
    },
  }

  if (billingSameAsShipping === false) {
    const address1Shipping = $Q('[name="address1-shipping"]', form).value;
    const address2Shipping = $Q('[name="address2-shipping"]', form).value;
    const countryCodeShipping = $Q('[name="countryCode-shipping"]', form).value;
    const cityShipping = $Q('[name="city-shipping"]', form).value;
    const recipientShipping = $Q('[name="recipient-shipping"]', form).value;
    const zipShipping = $Q('[name="zip-shipping"]').value;
    const zoneCodeShipping = $Q('[name="zoneCode-shipping"]', form).value;

    shippingData = {
      address1: address1Shipping,
      address2: address2Shipping,
      countryCode: countryCodeShipping,
      city: cityShipping,
      recipient: recipientShipping,
      zip: zipShipping,
      zoneCode: zoneCodeShipping,
    }
  } else {
    shippingData = formData.billingAddress;
  }

  formData.shippingAddress = shippingData;

  const validationVAT = await validateForm("/v1/Vat", { "vat": formData.companyVat });

  if (validationVAT.isValid === true) {
    const response = await validateForm("/v1/Company", formData);
    showMessage(validationVAT.isValid, response, form);
  } else {
    showMessage(validationVAT.isValid);
  }

}

const checkBillingAddress = (form) => {
  const checkedInput = $Q("#billingSameAsShipping", form);

  if (checkedInput != null) {
    const billingForm = $Q(".shipping-address-container", form);
    checkedInput.addEventListener("change", () => {

      billingForm.classList.toggle("hidden");

    })
  }
}

export const showRegisterForm = (companyName, companyVat, countryCode) => {
  const registerForm = $Q("#company_register");

  if (registerForm != null) {
    registerForm.classList.remove("hidden");

    $Q("#companyName").value = companyName;
    $Q("#companyVat").value = companyVat;
    $Q("#countryCode").value = countryCode;
    $Q("#countryCode-shipping").value = countryCode;

    checkBillingAddress(registerForm);

    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      submitForm(registerForm);
    })
  }
}
