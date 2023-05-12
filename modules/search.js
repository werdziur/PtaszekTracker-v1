import { overlay, searchWindow } from './map.js'
import { id } from '../main.js'

export const buttonSearchSubmit = document.querySelector('.search__buttons--submit')
let userInput = document.querySelector('.search__input')
export const searchResultsContainer = document.querySelector('.search-results__container')
export const mainContainerResults = document.querySelector('.search-results')
export const closeResultsButton = document.querySelector('.search-results__close')
export const errorMessage = document.querySelector('.error-window')
const errorMessageButton = document.querySelector('.error-window__button')
const errorWindowText = document.querySelector('.error-window__text')



const loadSearchResults = async function () {
	try {
		const response = await fetch('birds.json')
		const data = await response.json()
		loadFinalSearchList(data)
	} catch (error) {
		console.error(`${error} :(!!`)
	}
}



const loadFinalSearchList = function (result) {
	if (userInput.value === '') {
		return (errorMessage.style.display = 'flex')
	} else {
		result = result.filter(el => {
			return el.name.slice(0, userInput.value.length) === userInput.value.toLowerCase()
		})

		console.log(result)
	}
	renderList(result)
}



const renderList = function (result) {
	if (result.length === 0) {
        errorWindowText.innerText = 'No results. Please try again!'
		errorMessage.style.display = 'flex'
	} else {
		result.forEach(el => renderResult(el))
	}
	userInput.value = ''
}

const renderResult = function (result) {
	let html = ` <div class="search-results__result" data-id="${id}">
<div class="search-results__result--icon"><i class="fa-solid fa-plus" style="color: #418900;"></i></div>
<div class="search-results__heading">
    <img src="${result.photo}" alt="Photo of the bird">
    <p class="search-results__name">${result.name}</p>
</div>
</div>`

	mainContainerResults.style.display = 'flex'
	searchResultsContainer.insertAdjacentHTML('afterbegin', html)
}

buttonSearchSubmit.addEventListener('click', loadSearchResults)
errorMessageButton.addEventListener('click', () => {
    searchWindow.style.display = 'flex'
    errorMessage.style.display = 'none'
})

//1. funkcja pobierajaca dane z inputow w sekcji add bird

//3. funkcja renderujaca nowo dodanego ptaszka do tej listy ptaszkow
//4. dodanie znacznika do mapy + jego opis

