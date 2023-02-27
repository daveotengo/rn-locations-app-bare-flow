import React from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	TouchableNativeFeedback,
	Platform
} from 'react-native';
import Card from '../UI/Card';
import Color from '../../constants/Colours'

const PlaceItem = (props) => {
	let TouchableComp = TouchableOpacity;
	if (Platform.OS === 'android' && Platform.Version >= 21) {
		TouchableComp = TouchableNativeFeedback;
	}
	return (
		// <Card style={styles.product}>
			// <View style={styles.touchable}>
				<TouchableComp onPress={props.onSelect}  style={styles.placeItem}>
					<View>
						 <View style={styles.itemContainer}> 
							<Image style={styles.image} source={{ uri: props.image }} />
						
						<View style={styles.infoContainer}>
							<Text style={styles.title}>{props.title}</Text>
							<Text style={styles.address}>{props.address}</Text>
						</View>
						</View>
						 {/* <View style={styles.actions}>
							{props.children}
						</View>  */}
					</View>
				</TouchableComp>
			// </View>
		
	);
};

const styles = StyleSheet.create({
	// product: {
	// 	height: 300, // make it dynamic with Dimensions,
	// 	margin: 20
	// },
	// touchable: {
	// 	overflow: 'hidden',
	// 	borderRadius: 10,
	// },
	image: {
		width: 70,
		height: 70,
		borderRadius: 35,
		backgroundColor: '#ccc',
		borderColor: Color.primaryColor,
		borderWidth: 1
		//overflow: 'hidden'
	},
	// image: {
	// 	width: '100%',
	// 	height: '100%'
	// },
	itemContainer: {
		flexDirection: 'row',
		//alignItems: 'stretch',
	},

	infoContainer: {
		marginLeft: 21,
		width: 250,
		alignItems: 'flex-start',
		justifyContent: 'center'
	},

	title: {
		color: 'black',
		//fontFamily: 'open-sans-bold',
		fontSize: 18,
		marginVertical: 5,
	},
	address: {
		//fontFamily: 'open-sans',
		fontSize: 16,
		color: '#666'
	},
	// actions: {
	// 	flexDirection: 'row',
	// 	justifyContent: 'space-between',
	// 	alignItems: 'center',
	// 	height: '23%',
	// 	paddingHorizontal: 20
	// },
	placeItem:{
		borderBottomColor: '#ccc',
		borderWidth: 1,
		paddingVertical: 15,
		paddingHorizontal: 30,
		flexDirection: 'row',
		alignItems: 'center'
	}
});

export default PlaceItem;
