import {View,Text,StyleSheet,Button,Image,Alert,TouchableOpacity} from 'react-native';
import Colors from '../../constants/Colours';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import React, { useEffect, useState, useCallback,useRef } from 'react';
import { Camera,CameraType } from 'expo-camera';
import {Ionicons} from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';



const ImgPicker = props => {
    const [isPreview, setIsPreview] = useState(false);
    const [isCameraReady, setIsCameraReady] = useState(false);
    
    const cameraRef = useRef();
    //const [type, setType] = useState(CameraType.back);
    const [cameraType, setCameraType] = useState(Camera.back);

    const [permission, requestPermissionCamera] = Camera.useCameraPermissions();
    requestPermissionCamera();

//   function toggleCameraType() {
//     setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
//   }

  const switchCamera = () => {
      console.log("switch");
    if (isPreview) {
      return;
    }
    console.log("switched");

    setCameraType(prevCameraType =>
      prevCameraType === CameraType.back
        ? CameraType.front
        : CameraType.back
    );
  };

    const [image, setImage] = useState(null);

    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
    //requestPermission();
    const verifyPermissions =async()=> {
        console.log(status);
        
        console.log(status.status);
        if(status.status!='granted'){
            console.log("you need to grant permission");

            Alert.alert(
            'Insufficient Permissions',
            'You need to grant your camera permissions',
            [{text: 'Okay'}]
            );
           

            return false;
        }
        return true;
    }

    const verifyPermissionsCamera =async()=> {
        console.log(permission);
        
        console.log(permission.status);
        if(permission.status!='granted'){
            console.log("you need to grant permission");

            Alert.alert(
            'Insufficient Permissions',
            'You need to grant your camera permissions',
            [{text: 'Okay'}]
            );
           

            return false;
        }
        return true;
    }
   

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        const hasPermission = await verifyPermissions()
        if(!hasPermission){
            return
        }
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        //console.log(result);
    
        if (!result.canceled) {
            const image =result.assets[0];
          setImage(image.uri);
          props.onImageTaken(image.uri)
        }
      };
      const onCameraReady = () => {
          console.log("onCameraReady");
        setIsCameraReady(true);
      };
      const onPictureSaved = photo => {
        console.log(photo);
        } ;


        const takePhoto=async()=>{       
            console.log('Button Pressed');
            if (cameraRef) {
               console.log('Taking photo');
               const options = { quality: 1, base64: true, fixOrientation: true, 
               exif: true};
               await cameraRef.current.takePictureAsync(options).then(photo => {
                  photo.exif.Orientation = 1;            
                   console.log(photo);            
                   });     
             }
            }
      const takePicture = async () => {
          setIsPreview(false);
        // No permissions request is necessary for launching the image library
        const hasPermission = await verifyPermissionsCamera()
        if(!hasPermission){
            return
        }
        

        const options = {
            quality: 0.5,
           // onPictureSaved: this.onPictureSaved
        };
        const result = await cameraRef.current.takePictureAsync(options);
        console.log(result.uri);
        //console.log(result);
    
        if (!result.canceled) {
            //const image =result.assets[0];
          setImage(result.uri);
          props.onImageTaken(result.uri)
        }
      };

    return(
        <ScrollView>
        <View style={styles.container}>
        <View style={styles.imagePreview} >
            {!image?<Text >No Image Picked Yet</Text>:
            <Image source={{ uri: image }} style={styles.image} />}
        </View>
        <Button 
            title="Take Image" 
            color={Colors.primaryColor} 
            onPress={pickImage}
        />

        <Camera
                ref={cameraRef}
                style={{ width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc'}}
                type={cameraType}
                onCameraReady={onCameraReady}
            />
            <View style={styles.container}>
    {!isPreview && (
      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
          <Ionicons name='menu' size={28} color='white' />
        </TouchableOpacity>
      </View>
    )}
  </View>
        <Button 
            title="Take Picture" 
            color={Colors.primaryColor} 
            onPress={takePicture}
        />

        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    imagePicker:{
    
        alignItems: 'center',
    },
    imagePreview:{
        width: '100%',
        height: 150,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc'
    }, 
    image:{
       height: '100%',
       width: '100%'
    },
    bottomButtonsContainer: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: 28,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
      },

      container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    text:{
        height: 50,
        width:"100%",
       
    }
      
});

export default ImgPicker;