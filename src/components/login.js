import { $Q, $Qll } from "../utils/query-selector";
import { dataToggle } from "../utils/toggle-dataset";

const setScrollPosition = ($recover) => {
    let current = "#login";

    if ($recover.dataset.active === "true") {
        current = "#recover";
    }

    window.location.hash = current;
    setTimeout(() => window.scrollTo(0, 0), 100);

};

const toggleLoginForm = () => {
    const loginForm = $Q('.login-form');
    const recoveryForm = $Q('.recover-form');

    if (!loginForm || !recoveryForm) return;

    const recoveryToggle = $Qll('.login__toggle');

    if (!recoveryToggle.length) return;

    recoveryToggle.forEach((item) => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            dataToggle(recoveryForm);
            dataToggle(loginForm);
            setScrollPosition(recoveryForm);
        });
    });

    if (window.location.hash === "#recover") {
        dataToggle(recoveryForm);
        dataToggle(loginForm);
    }
}

export { toggleLoginForm };
