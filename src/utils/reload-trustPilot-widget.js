export const realoadTrustpilot = (HTMLelement) => {
  if (HTMLelement != null || window.Trustpilot) {
    window.Trustpilot.loadFromElement(HTMLelement);
  }
}
