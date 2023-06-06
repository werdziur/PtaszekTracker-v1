import * as model from './model.js';
import {
	renderResult,
	searchResultsContainer,
	mainContainerResults,
	displayAddWindow,
	displaySearchWindow,
	closeWindow,
	searchWindow,
	overlay,
	addBirdWindow,
	buttonSearchSubmit,
	searchBirds,
	showBurgerButon,
	showErrorWindow,
	errorMessage,
	showPosition,
	closeListOfObservations,
	showObservationList,
	addSelectedBird,
	renderSelectedBird,
	observationsContainer,
	renderMarker,
	getBirdToBeRemoved,
	successMessage,
	removeMessage,
	showMoreInformation,
	renderMoreInformation,
	closeMoreInfo,
	showOnTheMap,
	getCoords,
	displayMapView,
	showOverview,
	clickOverview,
	removeAll,
} from './view.js';

let userInput = document.querySelector('.search__input');

const closeResultsButton = document.querySelector('.search-results__close');
const errorWindowText = document.querySelector('.error-window__text');
const closeSearchButton = document.querySelector('.search__close');
const buttonCloseAddWindow = document.querySelector('.add-bird__close');
const navBar = document.querySelector('.navigation__items');
const mainMapContainer = document.querySelector('.main-container');

const renderList = async function () {
	try {
		await model.loadResult(userInput.value);
		const birds = model.state.bird;
		if (birds.length === 0) {
			errorWindowText.innerText = 'No results. Please try again!';
			errorMessage.style.display = 'flex';
		}
		if (userInput.value === '') {
			errorWindowText.innerText = 'This field cannot be empty!';
			errorMessage.style.display = 'flex';
		} else {
			birds.forEach(el => renderResult(el));
		}
		userInput.value = '';
	} catch (err) {
		console.log(err);
		throw err;
	}
};

const updateObservationsList = function (birdName, layer) {
	//filter for a bird
	const [bird] = model.state.bird.filter(el => el.name === birdName.name);
	bird.date = new Date();
	bird.id = Math.random() + '';
	bird.coords = getCoords();
	//take marker data and render marker
	layer = renderMarker(bird.name, bird.date);

	//update state and render bird on the obersvation list
	model.addChosenBirdToObservations(bird, layer);
	model.state.observations.forEach(el => {
		renderSelectedBird(el);
	});
};

const removeBirdElement = function (bird) {
	model.removeBird(bird.id);
};

const getInfoAboutBird = function (birdName) {
	const [bird] = model.state.bird.filter(el => el.name === birdName.name);
	renderMoreInformation(bird);
};

const findBirdToShow = function (birdsId) {
	const [birdId] = model.state.observations.filter(el => el.id === birdsId.id);
	displayMapView(birdId.coords);
};

const overview = function () {
	if (model.state.observations.length === 0) return;
	const coords = model.state.observations.map(el => el.coords);
	const langtitudes = coords.map(el => el[0]);
	const longtitudes = coords.map(el => el[1]);
	showOverview(langtitudes, longtitudes);
};

const removeAllObservations = function () {
	model.removeAllElements();
};

const init = function () {
	removeAll(removeAllObservations);
	clickOverview(overview);
	showOnTheMap(findBirdToShow);
	showMoreInformation(getInfoAboutBird);
	getBirdToBeRemoved(removeBirdElement);
	addSelectedBird(updateObservationsList);
	model.getUserPosition(showPosition);
	showBurgerButon(navBar);
	closeWindow(closeSearchButton, searchWindow);
	closeWindow(overlay, searchWindow);
	closeWindow(overlay, successMessage);
	closeWindow(buttonCloseAddWindow, addBirdWindow);
	closeWindow(overlay, addBirdWindow);
	closeWindow(buttonSearchSubmit, searchWindow);
	closeWindow(overlay, mainContainerResults);
	closeWindow(overlay, errorMessage);
	closeWindow(closeResultsButton, mainContainerResults);
	closeWindow(overlay, removeMessage);
	displayAddWindow();
	searchBirds(renderList);
	showErrorWindow();
	closeListOfObservations();
	showObservationList(navBar);
	closeMoreInfo();
};

init();

//

//1. funkcja pobierajaca dane z inputow w sekcji add bird

//3. funkcja renderujaca nowo dodanego ptaszka do tej listy ptaszkow
//4. dodanie znacznika do mapy + jego opis
