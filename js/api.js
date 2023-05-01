const apikey = 'o3brnQ5WWiWQtdASLrkRZYq0qRqCImkSfpTJf6hT';
const URL = 'https://api.nasa.gov/planetary/apod?api_key=' + apikey;
const weatUrl = 'https://api.weatherapi.com/v1/current.json?key=2814de38563e48db84c152715232003&q=Portugal&aqi=no';
let easterEgg2 = 'https://cat-fact.herokuapp.com/facts/random?animal_type=cat';
const getPokeUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
const generatePokemonPromises = () => Array(150).fill().map((_, index) =>
    fetch(getPokeUrl(index + 1)).then(response => response.json()));

const generateHTML = pokemons => pokemons.reduce((accumulator, pokemon) => {
    const elementTypes = pokemon.types.map(typeInfo => typeInfo.type.name)

    accumulator += `
        <li class="card ${elementTypes[0]}">
            <a href="pokemon.html?id=${pokemon.id}">
                <img class = "card-image" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" width=auto height="100"/>
                <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                <p class="card-subtitle">${elementTypes.join(' | ')}</p>
            </a>
        </li>
    `
    return accumulator
}, '')


const insertPokemonIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons
}
const pokemonPromises = generatePokemonPromises()

function get_Url(url) {
    let request = new XMLHttpRequest()
    request.open("get", url, false)
    request.send()
    return request.responseText
}

function createRow(planetary) {
    let row = document.createElement("tr")
    let explanationCell = document.createElement("td")
    let titleCell = document.createElement("td")
    let dateCell = document.createElement("td")
    titleCell.innerHTML = planetary.title
    explanationCell.innerHTML = planetary.explanation
    dateCell.innerHTML = planetary.date


    row.appendChild(titleCell)
    row.appendChild(explanationCell)
    row.appendChild(dateCell)


    return row
}

function createWeather(current) {
    let row = document.createElement("tr")
    let is_DayCell = document.createElement("td")
    let nameCell = document.createElement("td")
    let regionCell = document.createElement("td")
    let countryCell = document.createElement("td")
    let latCell = document.createElement("td")
    let lonCell = document.createElement("td")
    let tempCCell = document.createElement("td")
    let localTCell = document.createElement("td")

    is_DayCell.innerHTML = current.current.is_day
    nameCell.innerHTML = current.location.name
    regionCell.innerHTML = current.location.region
    countryCell.innerHTML = current.location.country
    latCell.innerHTML = current.location.lat
    lonCell.innerHTML = current.location.lon
    tempCCell.innerHTML = current.current.temp_c
    localTCell.innerHTML = current.location.localtime

    row.appendChild(is_DayCell)
    row.appendChild(nameCell)
    row.appendChild(regionCell)
    row.appendChild(countryCell)
    row.appendChild(latCell)
    row.appendChild(lonCell)
    row.appendChild(tempCCell)
    row.appendChild(localTCell)

    return row
}

function main() {
    let data = get_Url(URL)
    let planetary = JSON.parse(data)
    let table = document.getElementById("tabela")

    let row = createRow(planetary)
    table.appendChild(row)

}

function weatMain() {
    let data = get_Url(weatUrl)
    let location = JSON.parse(data)
    let table = document.getElementById("weatherId")

    let row = createWeather(location)
    table.appendChild(row)

}






Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonIntoPage)





main()
weatMain()
