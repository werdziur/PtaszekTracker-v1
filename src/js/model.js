
export const state = {
	bird: {},
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
