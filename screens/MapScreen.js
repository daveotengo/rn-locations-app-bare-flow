import React, { useState, useEffect, useCallback } from "react";
import { TouchableOpacity, Text, StyleSheet, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Colors from "../constants/Colours";
export const mapPageTitle = "Map";

const MapScreen = props => {

  let initialLocation;
  let readonly;
  
  if(props.route.params){
    initialLocation = props.route.params.initialLocation;
    readonly = props.route.params.readonly;
  }

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const mapRegion = {
    latitude: initialLocation? initialLocation.lat: 37.78,
    longitude: initialLocation? initialLocation.lng: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };



  const selectLocationHandler = event => {
    if(readonly){
      return;
    }

    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude
    });
    
  };

  const savePickedLocationHandler = useCallback(() => {

    console.log("savePickedLocationHandler called")

    if (!selectedLocation) {
      return;
    }

    console.log("calling navigation")

    props.navigation.navigate("NewPlace", { pickedLocation: selectedLocation });

  }, [selectedLocation]);

  useEffect(() => {
    props.navigation.setParams({ saveLocation: savePickedLocationHandler });
  }, [savePickedLocationHandler]);


  useEffect(() => {
    
    props.navigation.setOptions({
        title: mapPageTitle,
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
        },

        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,

        headerRight: () => ( 
        !readonly?<TouchableOpacity style={styles.headerButton} onPress={()=>{
          if(props.route.params!=undefined){
              props.route.params.saveLocation()
          }
        }
          //saveLocation 
          }>
          <Text style={styles.headerButtonText}>Save</Text>
        </TouchableOpacity>:"")

    });
}, [props.route.params]);


  let markerCoordinates;
  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    };
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Picker Location" coordinate={markerCoordinates}></Marker>
      )}
    </MapView>
  );
};

MapScreen.navigationOptions = navData => {
  const saveLocation = navData.navigation.getParam("saveLocation");
  return {
    headerRight: () => {
      return (
        <TouchableOpacity style={styles.headerButton} onPress={saveLocation}>
          <Text style={styles.headerButtonText}>Save</Text>
        </TouchableOpacity>
      );
    }
  };
};

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  headerButton: {
    marginHorizontal: 20
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === "android" ? "white" : Colors.primary
  }
});

export default MapScreen;
