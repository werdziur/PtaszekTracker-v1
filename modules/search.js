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



const loadFinalSearchList = function (result) {
	result =
		userInput.value === ''
			? alert('Please provide birds name')
			: result.filter(el => {
					return el.name.slice(0, userInput.value.length) === userInput.value.toLowerCase()
                   
			  })
              console.log(result)

	userInput.value = ''
}


// const renderListOfResults = function() {

// }


//1. funkcja pobierajaca dane z inputow w sekcji add bird
//2. funkcja renderujaca liste wyszukanych ptaszkow czyli najpierw musze zbudowac osobny div i w nim umiescic ptaszki
//3. funkcja renderujaca nowo dodanego ptaszka do tej listy ptaszkow
//4. dodanie znacznika do mapy + jego opis
//5.pamietac o generowaniu id i dodawaniu do kazdego ptaszkowego obiektu
