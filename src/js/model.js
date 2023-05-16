export const state = {
	bird: {},
	observations: [],
}

export const getUserPosition = function (showMap) {
	if (navigator.geolocation)
		navigator.geolocation.getCurrentPosition(showMap, function () {
			alert('Could not get your position. Try again!')
		})
}

export const loadResult = async function (userInput) {
	try {
		const response = await fetch('birds.json')
		const data = await response.json()
		state.bird = data.filter(el => {
			return el.name.slice(0, userInput.length) === userInput.toLowerCase()
		})
	} catch (error) {
		console.error(`${error} :(!!`)
	}
}

export const birdToBeAdded = function (bird) {
	state.observations.push(bird)
	state.bird = {}
}
