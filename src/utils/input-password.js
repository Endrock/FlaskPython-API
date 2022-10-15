import { $Q, $Qll } from "./query-selector";
import { dataToggle } from "./toggle-dataset";

const toggleType = (input) => {
    const element = input;
    if (element.type === "password") {
        element.type = "text";
    } else {
        element.type = "password";
    }
};

export const togglePassword = () => {
    const $inputs = $Qll('div[data-password-field="true"]');
    if (!$inputs.length) return;

    $inputs.forEach((item) => {
        const input = $Q('input', item);
        const eye = $Q('.form__textfield-icon-wrapper', item);

        console.log(eye);

        if (!eye) return;

        eye.addEventListener('click', () => {
            dataToggle(eye)
            toggleType(input);
        });
    });
};
