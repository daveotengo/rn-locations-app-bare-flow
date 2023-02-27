import React,{useEffect} from 'react';
import {View,Text,StyleSheet,Platform,ScrollView,Image} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import Colors from '../constants/Colours';
import MapPreview from '../components/UI/MapPreview';

const PlaceDetailScreen = props => {

    console.log("printing props PlaceDetailScreen");
    console.log(props);

    const placeId = props.route.params.placeId;
    const selectedPlace = useSelector((state) => state.places.places.find(place => place.id === placeId));
    console.log("printing placeId");
    console.log(placeId);

    console.log("printing selectedPlace");
    console.log(selectedPlace);


    const selectedLocation = {lat:selectedPlace.lat, lng: selectedPlace.lng}

    const showMapHandler = () =>{
      props.navigation.navigate('Map', {readonly: true, initialLocation: selectedLocation});
    }


    useEffect(() => {
        props.navigation.setOptions({
            title: selectedPlace.title,
            // headerStyle: {
            //     backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white'
            // },

            headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,

        });
    }, [selectedPlace.title])
    const dispatch = useDispatch();

    return(
        <ScrollView contentContainerStyle={styles.scrollView}>
        <Image source={{ uri: selectedPlace.imageUri }} style={styles.image} />
        <View style={styles.locationContainer}>
          <View style={styles.addressContainer}>
            <Text style={styles.address}>{selectedPlace.address}</Text> 
            <MapPreview onPress={showMapHandler} style={styles.mapPreview} location={selectedLocation}/> 
          </View>
        </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
        height: "35%",
        minHeight: 300,
        width: "100%",
        backgroundColor: "#ccc"
      },
      locationContainer: {
        marginVertical: 20,
        width: "100%",
        maxWidth: 350,
        justifyContent: "center",
        //alignItems: "center",
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: "white",
        borderRadius: 10
      },
      addressContainer: {
        //padding: 20
      },
      address: {
        color: Colors.chocolate,
        textAlign: "center",
        fontSize: 20
      },
      mapPreview: {
        marginTop: 10,
        width: '100%',
        height: 150,
        // borderWidth: 1,
        // borderColor: "#ccc",
        // justifyContent: "center",
        //alignItems: "center"
      },
      scrollView: { 
        alignItems: "center"
      }
});

export default PlaceDetailScreen;