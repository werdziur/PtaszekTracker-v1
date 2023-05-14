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
	buttonSearchSubmit,
	searchBirds,
	showBurgerButon,
	showErrorWindow,
	errorMessage,
	showPosition
} from './view.js'

let date = new Date()
let userInput = document.querySelector('.search__input')

const closeResultsButton = document.querySelector('.search-results__close')

const errorWindowText = document.querySelector('.error-window__text')
const closeSearchButton = document.querySelector('.search__close')
const buttonCloseAddWindow = document.querySelector('.add-bird__close')
const navBar = document.querySelector('.navigation__items')
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



const init = function () {
	model.getUserPosition(showPosition)
	showBurgerButon(navBar)
	closeWindow(closeSearchButton, searchWindow)
	closeWindow(overlay, searchWindow)
	closeWindow(buttonCloseAddWindow, addBirdWindow)
	closeWindow(overlay, addBirdWindow)
	closeWindow(buttonSearchSubmit, searchWindow)
	closeWindow(overlay, mainContainerResults)
	closeWindow(overlay, errorMessage)
	closeWindow(closeResultsButton, mainContainerResults)
	displayAddWindow()
	searchBirds(renderList)
	showErrorWindow()
}

init()

//

//1. funkcja pobierajaca dane z inputow w sekcji add bird

//3. funkcja renderujaca nowo dodanego ptaszka do tej listy ptaszkow
//4. dodanie znacznika do mapy + jego opis
