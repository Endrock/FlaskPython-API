class PredictiveSearch extends HTMLElement {
  constructor() {
    super();

    this.input = this.querySelector('#Search');
    this.predictiveSearchResults = this.querySelector('#predictive-search');
    this.buttonOpen = this.querySelector(".search-form__button");
    this.buttonClose = this.querySelector(".search-form__button--close");
    this.searchForm = this.querySelector(".search-form");
    this.allResult = null;

    this.input.addEventListener('input', this.debounce((event) => {
      this.onChange(event);
    }, 300).bind(this));

    if (!this.buttonOpen) return;

    this.buttonOpen.addEventListener('click', () => {
      this.onOpenSearch();
    });

    if (!this.buttonClose) return;

    this.buttonClose.addEventListener('click', () => {
      this.onCloseSearch();
    });
  }

  onOpenSearch() {
    this.searchForm.dataset.active = "true";
  }

  onCloseSearch() {
    this.searchForm.dataset.active = "false";
  }

  onChange() {
    const searchTerm = this.input.value.trim();

    if (!searchTerm.length) {
      this.close();
      return;
    }

    this.getSearchResults(searchTerm);
  }

  getSearchResults(searchTerm) {
    fetch(`/search/suggest?q=${searchTerm}&resources[type]=product&resources[limit]=5&section_id=predictive-search`)
      .then((response) => {
        if (!response.ok) {
          const error = new Error(response.status);
          this.close();
          throw error;
        }

        return response.text();
      })
      .then((text) => {
        const resultsMarkup = new DOMParser().parseFromString(text, 'text/html').querySelector('#shopify-section-predictive-search').innerHTML;
        this.predictiveSearchResults.innerHTML = resultsMarkup;
        this.open();
        this.onSubmitSearch();
      })
      .catch((error) => {
        this.close();
        throw error;
      });
  }

  open() {
    this.predictiveSearchResults.style.display = 'block';
  }

  close() {
    this.predictiveSearchResults.style.display = 'none';
  }

  onSubmitSearch() {
    this.allResult = this.querySelector('.predictive-search__allresult');

    if (!this.allResult) return;

    this.allResult.addEventListener('click', () => {
      this.searchForm.submit();
    });
  }

  debounce(fn, wait) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }
}

customElements.define('predictive-search', PredictiveSearch);
