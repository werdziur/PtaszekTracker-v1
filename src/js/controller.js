
import * as model from './model.js'
import {
	renderResult,
	searchResultsContainer,
	mainContainerResults,
	displayAddWindow,
	displaySearchWindow,
	closeWindow,
	searchWindow,
	overlay,
	addBirdWindow,
	buttonSearchSubmit,getUserPosition
} from './view.js'

let date = new Date()
let userInput = document.querySelector('.search__input')

const closeResultsButton = document.querySelector('.search-results__close')
const errorMessage = document.querySelector('.error-window')
const errorMessageButton = document.querySelector('.error-window__button')
const errorWindowText = document.querySelector('.error-window__text')
const closeSearchButton = document.querySelector('.search__close')
const buttonCloseAddWindow = document.querySelector('.add-bird__close')
const navBar = document.querySelector('.navigation__items')
const burgerButton = document.querySelector('.burger-button')
const mainMapContainer = document.querySelector('.main-container')



const renderList = async function () {
	try {
		await model.loadResult(userInput.value)
		const birds = model.state.bird
		if (birds.length === 0) {
			errorWindowText.innerText = 'No results. Please try again!'
			errorMessage.style.display = 'flex'
		}
		if (userInput.value === '') {
			return (errorMessage.style.display = 'flex')
		} else {
			birds.forEach(el => renderResult(el))
		}
		userInput.value = ''
	} catch (err) {
		console.log(err)
		throw err
	}
}

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

//

//1. funkcja pobierajaca dane z inputow w sekcji add bird

//3. funkcja renderujaca nowo dodanego ptaszka do tej listy ptaszkow
//4. dodanie znacznika do mapy + jego opis
