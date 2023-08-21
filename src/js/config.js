import { mapEvent } from "./view.js";

export const MAP_ZOOM = 19;
export const MAP_SIZE = 13;

export const getCoords = function () {
	const { lat, lng } = mapEvent.latlng;
	return [lat, lng];
};
