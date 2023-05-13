export const state = {
    bird: {}
}

export function getUserPosition() {
	if (navigator.geolocation)
		navigator.geolocation.getCurrentPosition(displayMap, function () {
			alert('Could not get your position. Try again!')
		})
}



export function displayMap(position) {
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


export const loadResult = async function () {
	try {
		const response = await fetch('birds.json')
		const data = await response.json();
		if (userInput.value === '') {
            return (errorMessage.style.display = 'flex')
        } else {
            const bird = data;
            state.bird = bird.filter(el => {
                el.name.slice(0, userInput.value.length) === userInput.value.toLowerCase()
            })
    
            console.log(state.bird)
        }
	} catch (error) {
		console.error(`${error} :(!!`)
	}
}


// const loadSearchList = function (result) {
// 	if (userInput.value === '') {
// 		return (errorMessage.style.display = 'flex')
// 	} else {
// 		result = result.filter(el => {
// 			return el.name.slice(0, userInput.value.length) === userInput.value.toLowerCase()
// 		})

// 		console.log(result)
// 	}
// 	renderList(result)
// }



