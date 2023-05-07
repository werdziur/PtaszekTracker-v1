const buttonSearchSubmit = document.querySelector('.search__buttons--submit')
let userInput = document.querySelector('.search__input')

const loadSearchResults = async function () {
	try {
		const response = await fetch('birds.json')
		const data = await response.json()
		const result =
			userInput.value === ''
				? alert('Please provide birds name')
				: data.filter(el => el.name === userInput.value.toLowerCase())
		userInput.value = ''
		console.log(result)
	} catch (error) {
		console.error(`${error}!!`)
	}
}

buttonSearchSubmit.addEventListener('click', loadSearchResults)

// const renderListOfResults = function() {

// }
