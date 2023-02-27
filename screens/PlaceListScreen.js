import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import IoniconsHeaderButton from '../components/UI/HeaderButton';
import { HeaderButton, Item, HeaderButtons } from 'react-navigation-header-buttons';
import Colors from '../constants/Colours';
import PlaceItem from '../components/place/PlaceItem';
import { useSelector, useDispatch } from "react-redux";
import * as placesAction from "../store/actions/places";

export const pageTitle = "All Places";

const PlaceListScreen = props => {

    const places = useSelector(state=> state.places.places)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(placesAction.loadPlaces());
      }, [dispatch]);

    useEffect(() => {
        props.navigation.setOptions({
            title: pageTitle,
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
            },

            headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,

            headerRight: () => (<HeaderButtons HeaderButtonComponent={IoniconsHeaderButton} >
                <Item title="save" iconName={Platform.OS === "ios" ? "ios-add" : "md-add"} onPress={() => {
                    //props.route.params.save()
                    props.navigation.navigate({
                        name: 'NewPlace',
                        // params: {
                        //     mealId: itemData.item.id,
                        //     mealTitle: itemData.item.title,
                        //     isFav: isFavorite
                        // }

                    });


                }} />

            </HeaderButtons>)

        });
    }, []);
    return (
        // <View style={styles.screen} >
            <FlatList data={places} keyExtractor={item => item.id}
                renderItem={
                    itemData => <PlaceItem
                        image={itemData.item.imageUri}
                        title={itemData.item.title}
                        address={itemData.item.address}
                        onSelect={() => {
                            props.navigation.navigate('PlaceDetail',
                                {
                                    placeTitle: itemData.item.title,
                                    placeId: itemData.item.id,
                                    
                                }
                            )
                        }}
                    />

                } />
        // </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default PlaceListScreen;