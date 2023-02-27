import React, { useState, useCallback,useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Color from '../constants/Colours';
import * as placesActions from '../store/actions/places';
import { useDispatch } from 'react-redux';
import ImgPicker from '../components/UI/ImgPicker'
import LocationPicker from "../components/UI/LocationPicker";


const NewPlaceScreen = props => {
 

    const dispatch = useDispatch();

    const [titleValue, setTitleValue] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const [selectedLocation, setSelectedLocation] = useState();



    const imageTakenHandler = imagePath => {

        setSelectedImage(imagePath);
    }

    const titleChangeHandler = text => {
        setTitleValue(text);
    }

    const savePlaceHandler = () => {
        dispatch(placesActions.addPlace(titleValue, selectedImage, selectedLocation));
        props.navigation.goBack();
    }

    const locationPickedHandler = useCallback(location => {

        console.log("==location==");

        console.log(location);

        setSelectedLocation(location);
    }, []);

    return (
        <ScrollView>
            <View style={styles.form} >
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.textInput}
                    onChangeText={titleChangeHandler}
                    value={titleValue}
                />
                <ImgPicker onImageTaken={imageTakenHandler} />
                <LocationPicker
                    navigation={props.navigation}
                    pickedLocation ={props.route.params?props.route.params.pickedLocation:""}
                    onLocationPicked={locationPickedHandler}
                />
                <Button title="Save Place"
                    onPress={savePlaceHandler}
                    color={Color.primaryColor}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    form: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15,

    },

    textInput: {
        borderBottomColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
});

export default NewPlaceScreen;