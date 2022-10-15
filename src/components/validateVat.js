import { validateForm } from "../services/sendFormB2B";
import { $Q } from "../utils/query-selector";
import { showRegisterForm } from "./registerCompany";

const validateCountry = (country) => {
  const countriesInput = $Q('[name="countries_ue"]');
  let data;

  if (countriesInput != null) {
    const countriesCode = countriesInput.value.split(";");

    // eslint-disable-next-line array-callback-return
    const result = countriesCode.filter((element) => {
      const elementCountry = element.split(":");

      if (elementCountry[0] === country) {
        return element;
      }
    });

    if (result.length > 0) {
      const code = result[0].split(":")[1];
      data = {
        isUE: true,
        coutryCode: code,
      }
    } else {
      data = {
        isUE: false,
      }
    }

    return data;
  }
}

const showError = (custom) => {

  const error = $Q(".error-section");
  error.classList.remove("hidden");
  if (custom === true) {
    const newMessage = $Q("#ue-error-message").value

    error.innerHTML = newMessage;
  }
}

// eslint-disable-next-line complexity
const submitForm = async (event, form) => {
  let formData;
  let companyVat;
  let country

  for (const input of event.target) {
    if (input.name === "vat_number_1") {
      companyVat = input.value
      formData = {
        "vat": companyVat,
      }
    }

    if (input.name === "country") {
      country = input.value
    }
  }
  const response = await validateForm("/v1/Vat", formData);
  const isEurope = validateCountry(country);

  if (response.isValid === true && isEurope.isUE === true) {
    form.classList.add("hidden");
    showRegisterForm(response.name, companyVat, isEurope.coutryCode);
    $Q(".error-section").classList.add("hidden");
  } else if (isEurope.isUE === false) {
    showError(true);
  } else {
    showError(false);
  }
}

export const formVAT = () => {
  const form = $Q("#vat_validation");

  if (form != null) {

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      submitForm(e, form);
    })
  }
}
