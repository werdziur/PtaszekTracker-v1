import { MAP_SIZE, MAP_ZOOM } from './config.js'
// let id = Math.random() + ''

const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
]

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
export const listOfObservations = document.querySelector('.birds-list')
export const closeButtonObservations = document.querySelector('.birds-list__close')
export const navigationItemList = document.querySelector('.navigation__item--list')
export const observationsContainer = document.querySelector('.birds-list__container')
export const successMessage = document.querySelector('.success-window')
const successMessageButton = document.querySelector('.success-window__button')
const successMessageText = document.querySelector('.success-window__text')
export const removeMessage = document.querySelector('.remove-window')
export const moreInfo = document.querySelector('.more-information')
export const moreInfoContainer = document.querySelector('.more-information__results')

let map
let mapEvent
let layer
let iconsAddBird

export const showPosition = function (position) {
	//setting the map view
	const { latitude } = position.coords
	const { longitude } = position.coords
	const coords = [latitude, longitude]
	map = L.map('map').setView(coords, MAP_SIZE)
	L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: MAP_ZOOM,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	}).addTo(map)

	//getting coords for bird marker
	map.on('click', mapE => {
		mapEvent = mapE
		displaySearchWindow()
	})
}

export const getCoords = function () {
	const { lat, lng } = mapEvent.latlng
	return [lat, lng]
}

export const renderResult = function (result) {
	const finalName = result.name[0].toUpperCase() + result.name.slice(1)
	let html = `<li class="search-results__result" data-name="${result.name}">
					<div class="search-results__result--divicon">
					<div class="icon-search"><i class="fa-solid fa-plus" style="color: #418900;"></i></div></div>
					<div class="search-results__heading">
    					<img src="${result.photo}" alt="Photo of the bird">
    					<p class="search-results__name">${finalName}</p>
					</div>
					<div class="search-results__more"> <p class ="search-results__more--text">Show more</p></div>
				</li>`

	mainContainerResults.style.display = 'flex'
	searchResultsContainer.insertAdjacentHTML('afterbegin', html)
}

export const displaySearchWindow = () => {
	searchWindow.style.display = 'flex'
	overlay.style.display = 'block'
}
export const displayAddWindow = () => {
	buttonAddBird.addEventListener('click', () => {
		searchWindow.style.display = 'none'
		addBirdWindow.style.display = 'flex'
		overlay.style.display = 'block'
	})
}

const closeSearchResultsContainer = function () {
	mainContainerResults.style.display = 'none'
	overlay.style.display = 'none'
}

export const closeWindow = function (el, target) {
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

export const closeWindowDefault = function (el, target) {
	el.addEventListener('click', () => {
		target.style.display = 'none'
		overlay.style.display = 'none'
	})
}

export const showObservationList = function (handler) {
	navigationItemList.addEventListener('click', () => {
		listOfObservations.style.display = 'flex'
		handler.classList.remove('navigation__items--active')
	})
}

export const closeListOfObservations = function () {
	closeButtonObservations.addEventListener('click', () => {
		listOfObservations.style.display = 'none'
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

export const closeSuccessWindow = function () {
	successMessageButton.addEventListener('click', () => {
		successMessage.style.display = 'none'
		overlay.style.display = 'none'
	})
}

export const displaySuccessWindow = function (text) {
	successMessage.style.display = 'flex'
	overlay.style.display = 'flex'
	successMessageText.innerText = `${text}`
}

const closeRemoveMessage = function () {
	removeMessage.style.display = 'none'
	overlay.style.display = 'none'
}

export const closeMoreInfo = function () {
	const buttonCloseInfo = document.querySelector('.more-information__divicon')
	buttonCloseInfo.addEventListener('click', () => {
		moreInfo.style.display = 'none'
		moreInfoContainer.innerHTML = ''
	})
}

//choose bird from search list and add to the list of observations

export const addSelectedBird = function (handler) {
	searchResultsContainer.addEventListener('click', e => {
		//detect clicked bird container
		const chosenBird = e.target.closest('[data-name]')
		const buttonClicked = e.target.closest('.icon-search')
		if (!chosenBird || !buttonClicked) return

		//close search results container
		closeSearchResultsContainer()
		//show success window

		displaySuccessWindow('The bird has been added to your list.')

		//clear list of observations
		observationsContainer.innerHTML = ''
		searchResultsContainer.innerHTML = ''

		closeSuccessWindow()
		return handler(chosenBird.dataset)
	})
}

export const showMoreInformation = function (handler) {
	searchResultsContainer.addEventListener('click', e => {
		const showMoreButton = e.target.closest('.search-results__more')
		const clickedBird = e.target.closest('[data-name]')
		if (!showMoreButton || !clickedBird) return

		return handler(clickedBird.dataset)
	})
}

export const renderMarker = function (bird, date) {
	const [lat, lng] = getCoords()
	layer = L.marker([lat, lng])
		.addTo(map)
		.bindPopup(
			L.popup({
				maxWidth: 250,
				minWidth: 100,
				autoClose: false,
				closeOnClick: false,
				className: 'popup',
			})
		)
		.setPopupContent(
			`🪶 ${bird.toUpperCase()} on ${
				months[date.getMonth()]
			}, ${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
		)
		.openPopup()
	return layer
}

// export const setMarkerContent = function (bird) {
// 	layer.setPopupContent(`${bird}`).openPopup()
// }

export const renderSelectedBird = function (bird) {
	const finalName = bird.name[0].toUpperCase() + bird.name.slice(1)
	let html = `<div class="birds-list__result" data-name="${bird.name}" data-id="${bird.id}" >
	<div class="birds-list__result--icon">
		<div class="birds-list__result--date">${
			months[bird.date.getMonth()]
		} ${bird.date.getDate()}, ${bird.date.getHours()}:${bird.date.getMinutes()}</div>
		<div class="birds-list__result--emoji"><i class="fa-regular fa-trash-can fa-lg birds-icon" style="color: #CF1020;"></i></div>
	</div>
	<div class="birds-list__heading">
		<img src="${bird.photo}" alt="Photo of the bird">
		<p class="birds-list__name">${finalName}</p>
	</div>
	<div class="birds-list__map"> <p class ="birds-list__map--text">Show on a map</p></div>
</div>`

	observationsContainer.insertAdjacentHTML('afterbegin', html)
}

export const getBirdToBeRemoved = function (handler) {
	let selectedBirdsId
	observationsContainer.addEventListener('click', e => {
		selectedBirdsId = e.target.closest('[data-id]')
		const buttonClicked = e.target.closest('.birds-list__result--emoji')
		if (!selectedBirdsId || !buttonClicked) return

		removeMessage.style.display = 'flex'
		overlay.style.display = 'flex'
	})

	removeMessage.addEventListener('click', e => {
		if (e.target.closest('.remove-window__button--no')) {
			closeRemoveMessage()
			return
		}
		if (e.target.closest('.remove-window__button--yes')) {
			closeRemoveMessage()
			selectedBirdsId.remove()
			displaySuccessWindow('The bird has been removed from your list.')
			return handler(selectedBirdsId.dataset)
		}
	})
}

export const showOnTheMap = function (handler) {
	observationsContainer.addEventListener('click', e => {
		const selectedBirdsId = e.target.closest('[data-id]')
		const buttonClicked = e.target.closest('.birds-list__map')
		if (!buttonClicked || !selectedBirdsId) return

		return handler(selectedBirdsId.dataset)
	})
}

export const displayMapView = function (coords) {
	listOfObservations.style.display = 'none'
	map.setView(coords, MAP_SIZE, {
		animate: true,
		pan: {
			duration: 1,
		},
	})
}

export const renderMoreInformation = function (result) {
	const finalName = result.name[0].toUpperCase() + result.name.slice(1)
	moreInfo.style.display = 'flex'

	let html = `<div class="more-information__result" data-name="${finalName}">
					<div class="more-information__heading">
						<p class="more-information__name">${finalName}</p>
    					<img src="${result.photo}" alt="Photo of the bird">    					
						<p class="more-information__description">${result.description}</p>
					</div>
				</div>`

	mainContainerResults.style.display = 'flex'
	moreInfoContainer.insertAdjacentHTML('beforeend', html)
}

export const clickOverview = function (handler) {
	const buttonOverview = document.querySelector('.birds-list__bottomoptions--overview')
	buttonOverview.addEventListener('click', () => {
		// fit bounds with coordinates
		handler()
	})
}

export const showOverview = function (latitudes, longtitudes) {
	listOfObservations.style.display = 'none'
	const long = longtitudes
	const lat = latitudes
	const minLat = Math.min(...lat)
	const maxLat = Math.max(...lat)
	const minLong = Math.min(...long)
	const maxLong = Math.max(...long)
	map.fitBounds(
		[
			[maxLat, minLong],
			[minLat, maxLong],
		],
		{ padding: [70, 70] }
	)
}

export const clickRemoveAll = function (handler) {
	const buttonRemove = document.querySelector('.birds-list__bottomoptions--remove')
	buttonRemove.addEventListener('click', () => {
		handler()
	})
}

export const removeAll = function() {

}
