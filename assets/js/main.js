const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Carregando...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];


        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonName.innerHTML = 'Pokemon not found';
        pokemonNumber.innerHTML = '';
        pokemonImage.src = './assets/img/favicon-16x16.png';
    }

}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    renderPokemon(input.value.toLowerCase());
})

btnPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
})

btnNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
})

renderPokemon(searchPokemon)