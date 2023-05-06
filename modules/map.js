const mainMapContainer = document.querySelector('.main-container')
const searchWindow = document.querySelector('.search')
const overlay = document.querySelector('.overlay')
const closeSearchButton = document.querySelector('.search__close')
const addBirdWindow = document.querySelector('.add-bird')
const buttonAddBird = document.querySelector('.search__buttons--add')
const buttonCloseAddWindow = document.querySelector('.add-bird__close')

function getUserPosition() {
	if (navigator.geolocation)
		navigator.geolocation.getCurrentPosition(displayMap, function () {
			alert('Could not get your position. Try again!')
		})
}

getUserPosition()

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

function closeSearchWindow(el, target) {
	el.addEventListener('click', () => {
		target.style.display = 'none'
		overlay.style.display = 'none'
	})
}

closeSearchWindow(closeSearchButton, searchWindow)
closeSearchWindow(overlay, searchWindow)
closeSearchWindow(buttonCloseAddWindow, addBirdWindow)
closeSearchWindow(overlay, addBirdWindow)
displayAddWindow()
