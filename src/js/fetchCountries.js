import Notiflix from 'notiflix';

const BASE_URL = 'https://restcountries.com/v3.1/name';

function fetchCountries(name) {
    return fetch(`${BASE_URL}/${name}?fields=name,capital,population,flags,languages`).then(
        response => {
            if (response.status === 404) {
                Notiflix.Notify.failure('Oops, there is no country with that name');
            }
            return response.json();
        },
    );
}

export default { fetchCountries };