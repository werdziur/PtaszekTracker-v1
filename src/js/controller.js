import * as model from './model.js'
let date = new Date()
let id = Math.random() + ''

const buttonSearchSubmit = document.querySelector('.search__buttons--submit')
let userInput = document.querySelector('.search__input')
const searchResultsContainer = document.querySelector('.search-results__container')
const mainContainerResults = document.querySelector('.search-results')
const closeResultsButton = document.querySelector('.search-results__close')
const errorMessage = document.querySelector('.error-window')
const errorMessageButton = document.querySelector('.error-window__button')
const errorWindowText = document.querySelector('.error-window__text')
const mainMapContainer = document.querySelector('.main-container')
const searchWindow = document.querySelector('.search')
const overlay = document.querySelector('.overlay')
const closeSearchButton = document.querySelector('.search__close')
const addBirdWindow = document.querySelector('.add-bird')
const buttonAddBird = document.querySelector('.search__buttons--add')
const buttonCloseAddWindow = document.querySelector('.add-bird__close')

//navigation

const navBar = document.querySelector('.navigation__items')
const burgerButton = document.querySelector('.burger-button')

burgerButton.addEventListener('click', () => navBar.classList.toggle('navigation__items--active'))

//
model.getUserPosition()

const renderList = async function () {
	try {
		await model.loadResult()
		const bird = model.state.bird;
		if (result.length === 0) {
			errorWindowText.innerText = 'No results. Please try again!'
			errorMessage.style.display = 'flex'
		} else {
			result.forEach(el => renderResult(el))
		}
		userInput.value = ''
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

closeWindow(closeSearchButton, searchWindow)
closeWindow(overlay, searchWindow)
closeWindow(buttonCloseAddWindow, addBirdWindow)
closeWindow(overlay, addBirdWindow)
closeWindow(buttonSearchSubmit, searchWindow)
closeWindow(overlay, mainContainerResults)
closeWindow(overlay, errorMessage)
closeWindow(closeResultsButton, mainContainerResults)
displayAddWindow()

//

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

buttonSearchSubmit.addEventListener('click', model.loadResult)
errorMessageButton.addEventListener('click', () => {
	searchWindow.style.display = 'flex'
	errorMessage.style.display = 'none'
})

//1. funkcja pobierajaca dane z inputow w sekcji add bird

//3. funkcja renderujaca nowo dodanego ptaszka do tej listy ptaszkow
//4. dodanie znacznika do mapy + jego opis
