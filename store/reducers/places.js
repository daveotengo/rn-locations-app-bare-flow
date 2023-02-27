import Place from "../../models/Place";
import { ADD_PLACE,REMOVE_PLACE,SET_PLACES } from "../actions/places";
//import CartItem from '../../models/cart-item';



const initialState={
    places: [],
}

export default (state = initialState, action) => {

    switch(action.type){
        case SET_PLACES:
            return {
              places: action.places.map(
                pl =>
                  new Place(
                    pl.id.toString(),
                    pl.title,
                    pl.imageUri,
                    pl.address,
                    pl.lat,
                    pl.lng
                  )
              )
            };
        case ADD_PLACE:
            console.log("printing actions");
            console.log(action);
           const newPlace = new Place(
            action.placeData.id.toString(),
            action.placeData.title,
            action.placeData.image,
            action.placeData.address,
            action.placeData.lat,
            action.placeData.lng
               );
                

            return{
               places: state.places.concat(newPlace)
            }
           
            case REMOVE_PLACE:
                
                return {
                   
                };
            
            
            default:
                return state;

    }
  
}