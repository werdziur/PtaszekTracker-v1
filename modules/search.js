import { overlay, searchWindow } from './map.js'
import { id } from '../main.js'

export const buttonSearchSubmit = document.querySelector('.search__buttons--submit')
let userInput = document.querySelector('.search__input')
export const searchResultsContainer = document.querySelector('.search-results__container')
export const mainContainerResults = document.querySelector('.search-results')
export const closeResultsButton = document.querySelector('.search-results__close')

const loadSearchResults = async function () {
	try {
		const response = await fetch('birds.json')
		const data = await response.json()
		loadFinalSearchList(data)
	} catch (error) {
		console.error(`${error} :(!!`)
	}
}

buttonSearchSubmit.addEventListener('click', loadSearchResults)

const loadFinalSearchList = function (result) {
	result =
		userInput.value === ''
			? alert('Please provide birds name')
			: result.filter(el => {
					return el.name.slice(0, userInput.value.length) === userInput.value.toLowerCase()
			  })
	console.log(result)
	userInput.value = ''
	result.forEach(el => renderResult(el))
}

const renderResult = function (result) {
	let html = ` <div class="search-results__result" data-id="${result.id}">
<div class="search-results__result--icon"><i class="fa-solid fa-plus" style="color: #418900;"></i></div>
<div class="search-results__heading">
    <img src="${result.photo}" alt="Photo of the bird">
    <p class="search-results__name">${result.name}</p>
</div>
</div>`

	mainContainerResults.style.display = 'flex'
	searchResultsContainer.insertAdjacentHTML('afterbegin', html)
}

//1. funkcja pobierajaca dane z inputow w sekcji add bird
//2. funkcja renderujaca liste wyszukanych ptaszkow czyli najpierw musze zbudowac osobny div i w nim umiescic ptaszki
//3. funkcja renderujaca nowo dodanego ptaszka do tej listy ptaszkow
//4. dodanie znacznika do mapy + jego opis
//5.pamietac o generowaniu id i dodawaniu do kazdego ptaszkowego obiektu
