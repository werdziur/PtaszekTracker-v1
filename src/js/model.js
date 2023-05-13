export let userInput = document.querySelector('.search__input')
const errorMessage = document.querySelector('.error-window')

export const state = {
	bird: {},
}

export const loadResult = async function () {
	try {
		const response = await fetch('birds.json');
		const data = await response.json();
		if (userInput.value === '') {
			return (errorMessage.style.display = 'flex')
		} else {
			state.bird = data.filter(el => {
				return el.name.slice(0, userInput.value.length) === userInput.value.toLowerCase()
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
