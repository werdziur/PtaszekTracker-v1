import * as model from './model.js'
import { renderResult, searchResultsContainer, mainContainerResults } from './view.js'
let date = new Date()

const buttonSearchSubmit = document.querySelector('.search__buttons--submit')

const closeResultsButton = document.querySelector('.search-results__close')
const errorMessage = document.querySelector('.error-window')
const errorMessageButton = document.querySelector('.error-window__button')
const errorWindowText = document.querySelector('.error-window__text')
const searchWindow = document.querySelector('.search')
const overlay = document.querySelector('.overlay')
const closeSearchButton = document.querySelector('.search__close')
const addBirdWindow = document.querySelector('.add-bird')
const buttonAddBird = document.querySelector('.search__buttons--add')
const buttonCloseAddWindow = document.querySelector('.add-bird__close')
const navBar = document.querySelector('.navigation__items')
const burgerButton = document.querySelector('.burger-button')
const mainMapContainer = document.querySelector('.main-container')

function getUserPosition() {
	if (navigator.geolocation)
		navigator.geolocation.getCurrentPosition(displayMap, function () {
			alert('Could not get your position. Try again!')
		})
}

function displayMap(position) {
	const { latitude } = position.coords
	const { longitude } = position.coords

	const coords = [latitude, longitude]

	let map = L.map('map').setView(coords, 13)
	L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	}).addTo(map)

	map.on('click', displaySearchWindow)

	// const layer = L.marker(coords).addTo(map)
	// layer.addTo(map)
}

const renderList = async function () {
	try {
		await model.loadResult()
		const birds = model.state.bird
		if (birds.length === 0) {
			errorWindowText.innerText = 'No results. Please try again!'
			errorMessage.style.display = 'flex'
		} else {
			birds.forEach(el => renderResult(el))
		}
		model.userInput.value = ''
	} catch (err) {
		console.log(err)
	}
}

//from map.js

function displaySearchWindow() {
	searchWindow.style.display = 'flex'
	overlay.style.display = 'block'
}

function displayAddWindow() {
	buttonAddBird.addEventListener('click', () => {
		searchWindow.style.display = 'none'
		addBirdWindow.style.display = 'flex'
		overlay.style.display = 'block'
	})
}

function closeWindow(el, target) {
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

//

//1. funkcja pobierajaca dane z inputow w sekcji add bird

//3. funkcja renderujaca nowo dodanego ptaszka do tej listy ptaszkow
//4. dodanie znacznika do mapy + jego opis

function init() {
	getUserPosition()
	burgerButton.addEventListener('click', () => navBar.classList.toggle('navigation__items--active'))
	closeWindow(closeSearchButton, searchWindow)
	closeWindow(overlay, searchWindow)
	closeWindow(buttonCloseAddWindow, addBirdWindow)
	closeWindow(overlay, addBirdWindow)
	closeWindow(buttonSearchSubmit, searchWindow)
	closeWindow(overlay, mainContainerResults)
	closeWindow(overlay, errorMessage)
	closeWindow(closeResultsButton, mainContainerResults)
	displayAddWindow()
	buttonSearchSubmit.addEventListener('click', renderList)
	errorMessageButton.addEventListener('click', () => {
		searchWindow.style.display = 'flex'
		errorMessage.style.display = 'none'
	})
}

init()
