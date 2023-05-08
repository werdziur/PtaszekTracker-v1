const buttonSearchSubmit = document.querySelector('.search__buttons--submit')
let userInput = document.querySelector('.search__input')

const loadSearchResults = async function () {
	try {
		const response = await fetch('birds.json')
		const data = await response.json()
		loadFinalSearchList(data)
	} catch (error) {
		console.error(`${error} :(!!`)
	}
}

buttonSearchSubmit.addEventListener('click', loadSearchResults)

// const renderListOfResults = function() {

// }

const loadFinalSearchList = function (result) {
	result =
		userInput.value === ''
			? alert('Please provide birds name')
			: result.filter(el => {
					return el.name.slice(0, userInput.value.length) === userInput.value.toLowerCase()
			  })

	userInput.value = ''
}
