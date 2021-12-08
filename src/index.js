import { debounce } from 'lodash';
import Notiflix from 'notiflix';
import './css/styles.css';
import CountryItemTpl from './templates/country-item.hbs';
import CountryCardTpl from './templates/country-card.hbs';

import API from './js/fetchCountries';

const refs = {
    searchForm: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};
const DEBOUNCE_DELAY = 300;

refs.searchForm.addEventListener('input', debounce(fetchCount, DEBOUNCE_DELAY));

function fetchCount() {
    const name = refs.searchForm.value.trim();
    resetMarkup();
    if (!name) {
        return;
    }
    API.fetchCountries(name).then(data => {
        if (data.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        } else if (data.length >= 2 && data.length <= 10) {
            renderCountryItem(data);
        } else if (data.length === 1) {
            renderCountryCard(data);
        }
    });
}

function renderCountryItem(data) {
    const markup = CountryItemTpl(data);
    refs.countryList.innerHTML = markup;
}

function renderCountryCard(data) {
    const markup = CountryCardTpl(data);
    refs.countryInfo.innerHTML = markup;
}

function resetMarkup() {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
}