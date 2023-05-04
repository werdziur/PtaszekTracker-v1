const mainMapContainer = document.querySelector('.main-container')

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
	console.log(coords)

	let map = L.map('map').setView(coords, 13)
	L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	}).addTo(map)

	const layer = L.marker(coords).addTo(map)
	layer.addTo(map)
}
