import { MAP_SIZE, MAP_ZOOM } from './config.js'
let id = Math.random() + ''

export const searchResultsContainer = document.querySelector('.search-results__container')
export const mainContainerResults = document.querySelector('.search-results')
export const searchWindow = document.querySelector('.search')
export const overlay = document.querySelector('.overlay')
export const addBirdWindow = document.querySelector('.add-bird')
export const buttonAddBird = document.querySelector('.search__buttons--add')
export const buttonSearchSubmit = document.querySelector('.search__buttons--submit')
const burgerButton = document.querySelector('.burger-button')
export const errorMessageButton = document.querySelector('.error-window__button')
export const errorMessage = document.querySelector('.error-window')



export const showPosition = function (position) {
	const { latitude } = position.coords
	const { longitude } = position.coords
	const coords = [latitude, longitude]
	let map = L.map('map').setView(coords, MAP_SIZE)
	L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: MAP_ZOOM,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	}).addTo(map)

	map.on('click', displaySearchWindow)
	// const layer = L.marker(coords).addTo(map)
	// layer.addTo(map)
}

export const renderResult = function (result) {
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

export function displaySearchWindow() {
	searchWindow.style.display = 'flex'
	overlay.style.display = 'block'
}

export function displayAddWindow() {
	buttonAddBird.addEventListener('click', () => {
		searchWindow.style.display = 'none'
		addBirdWindow.style.display = 'flex'
		overlay.style.display = 'block'
	})
}

export function closeWindow(el, target) {
	el.addEventListener('click', () => {
		if (el === buttonSearchSubmit) {
			target.style.display = 'none'
		}
		// if (el === errorButton)
		else {
			target.style.display = 'none'
			overlay.style.display = 'none'
			searchResultsContainer.innerHTML = ''
		}
	})
}

export const searchBirds = function (handler) {
	buttonSearchSubmit.addEventListener('click', handler)
}

export const showBurgerButon = function (handler) {
	burgerButton.addEventListener('click', () => handler.classList.toggle('navigation__items--active'))
}

export const showErrorWindow = function () {
	errorMessageButton.addEventListener('click', () => {
		searchWindow.style.display = 'flex'
		errorMessage.style.display = 'none'
	})
}
