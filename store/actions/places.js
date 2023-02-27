import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces } from "../../helpers/db";
import ENV from '../../env'

export const ADD_PLACE ="ADD_PLACE";
export const REMOVE_PLACE ="REMOVE_PLACE";
export const SET_PLACES = "SET_PLACES";


export const addPlace = (title,image, location) => {
	return async dispatch => {
		const fileName = image.split("/").pop();
		const newPath = FileSystem.documentDirectory + fileName;
		let address;
		//const address = "Dummy Address";
		console.log("===location===");
		console.log(location);

		try {
			//https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY
			const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey2}`);
			
			if(!response.ok){
				throw new Error("Something went wrong!!");
			}
			
			const json = await response.json();

			console.log("===json===");
			console.log(json);
			address=json.results[0]?.formatted_address

		
			console.log( json?.results[0])
			console.log(address);
			// return json.movies;
		  } catch (error) {
			console.error(error);
		  }

		try {
		  await FileSystem.moveAsync({
			from: image,
			to: newPath
		  });
	
		  const dbResult = await insertPlace(
			title,
			newPath,
			address,
			location.lat,
			location.lng
		  );
	
		  console.log(dbResult);

		  dispatch({
			type: ADD_PLACE,
			placeData: {
			  id: dbResult.insertId,
			  title: title,
			  image: newPath,
			  address: address,
			  lat: location.lat,
			  lng: location.lng
			}
		  });
		} catch (err) {
		  console.log(err);
		  throw err;
		}
	  };
};

export const removePlace = (placeId) => {
	return {
		type: REMOVE_PLACE,
		pid: placeId
	};
};

export const loadPlaces = () => {
	return async dispatch => {
	  try {
		const dbResult = await fetchPlaces();
		dispatch({ type: SET_PLACES, places: dbResult.rows._array });
	  } catch (err) {
		throw err;
	  }
	};
  };
  