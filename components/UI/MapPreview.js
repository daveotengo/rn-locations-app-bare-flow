import React from 'react';
import {View,Text,Image,StyleSheet,TouchableOpacity} from 'react-native';
import WebView from 'react-native-webview';
import ENV from '../../env'
 // &markers=color:blue%7Clabel:S%7C40.702147,-74.015794
    // &markers=color:green%7Clabel:G%7C40.711614,-74.012318
   // &signature=YOUR_SIGNATURE
const MapPreview = props => {

    let  imagePreviewUrl;

    if(props.location){
     imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${
         props.location.lat
    },${
        props.location.lng
    }&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${
        props.location.lat
    },${props.location.lng}&key=${ENV.googleApiKey}`;
    //imagePreviewUrl = "https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=800&height=600&area=rect:-74.04472450744129,40.69366453643252,-73.98100315654642,40.72408084086641&apiKey=d548c5ed24604be6a9dd0d989631f783"
    }
  

    return(

        
        <TouchableOpacity onPress={props.onPress}>

        <View style={{...styles.mapPreview,...props.style}}>
       {props.location? (
        <View style={styles.mapPreview}>

       {/* <WebView
      style={styles.container}
      originWhitelist={['*']}
      source={{ html: '<h1><center>Hello world</center></h1>' }}
    /> */}
    {/* <WebView
      style={styles.container}
      source={{ html: "<iframe width='100%' height='100%'  frameborder='0' style='border:0'src='https://www.google.com/maps/embed/v1/place?key=AIzaSyDhCeNic0l-5-qfboz_JUruMlv-3E636a0&q=Superlock+Technologies+Ltd, Abidjan+Boulevard+Arsene+Usher+Assouan' allowfullscreen></iframe>" }}
    />  */}
  
    {/* <WebView
      style={styles.container}
      source={{ uri: "https://expo.dev" }}
    /> */}
          <Image style={styles.container} source={{uri: imagePreviewUrl}}/>  
         </View> 
       ):(
           props.children
       )}
      </View>
      </TouchableOpacity>
    );
    
}

const styles = StyleSheet.create({
    mapPreview: {
        marginBottom: 10,
        width: "100%",
        height: 150,
        borderWidth: 1,
        borderColor: "#ccc",
        justifyContent: "center",
        //alignItems: "center"
      },
      mapImage:{
          width: 120,
          height: '100%'
      },
      container:{
        width: '100%',
        height: '100%'
    }

});

export default MapPreview;