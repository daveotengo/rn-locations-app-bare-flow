import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Colors from '../constants/Colours';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import PlaceListScreen from '../screens/PlaceListScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import MapScreen from '../screens/MapScreen';
import React, { useState, useEffect } from 'react';
//import { useSelector, useDispatch } from 'react-redux';
// import ShopDrawer from '../navigation/ShopDrawer';
// import EditProductScreen from '../screens/user/EditProductScreen';
//import AuthNavigator from '../navigation/AuthNavigator';

// import StartUpScreen from '../screens/StartUpScreen';
import {pageTitle} from '../screens/PlaceListScreen'

const Stack = createStackNavigator();

function PlacesNavigator() {

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const token = useSelector((state) => state.auth.token);
  
  // console.log("printing token");
  // console.log(token);
  // if(token!=null){
  //   setIsLoggedIn(true)
  // }

  return (
    <NavigationContainer>
    <Stack.Navigator>
        <Stack.Group>

        {/* <Stack.Screen name="StartUp"
          component={StartUpScreen}
          //initialRouteName="ShopDrawer"
          options={{
            headerTintColor: 'black',
            //headerStyle: { backgroundColor: Colors.cyan },
            headerShown: false,

          }}
        /> */}

        {/* <Stack.Screen name="Auth"
          component={AuthNavigator}
          //initialRouteName="ShopDrawer"
          options={{
            headerTintColor: 'black',
            //headerStyle: { backgroundColor: Colors.cyan },
            headerShown: false,

          }}
        /> */}

        


{/* <Stack.Screen name="Shop"
  component={ShopDrawer}
  //initialRouteName="ShopDrawer"
  options={{
    headerTintColor: 'black',
    //headerStyle: { backgroundColor: Colors.cyan },
    headerShown: false,

  }}
/> */}
</Stack.Group>
      {/* ) :
        ( */}
          <Stack.Group>

             {/* <Stack.Screen name="Shop"
              component={ShopDrawer}
              //initialRouteName="ShopDrawer"
              options={{
                headerTintColor: 'black',
                //headerStyle: { backgroundColor: Colors.cyan },
                headerShown: false,

              }}
            />  */}



            <Stack.Screen name={pageTitle}
              component={PlaceListScreen}
              //initialRouteName="Categories"
              options={{
                headerTintColor: 'black',
                // headerStyle: { backgroundColor: Colors.cyan },
                //headerShown: false
              }}
            />


            <Stack.Screen name="PlaceDetail"
              component={PlaceDetailScreen}
              //initialRouteName="Categories"
              options={{
                headerTintColor: 'black',
                // headerStyle: { backgroundColor: Colors.cyan },
                //headerShown: false
              }}
            />


            <Stack.Screen name="NewPlace"
              component={NewPlaceScreen}
              //initialRouteName="ProductDetail"
              options={{
                headerTintColor: 'black',
                //headerStyle: { backgroundColor: Colors.cyan },
              }}
            />

            <Stack.Screen name="Map"
              component={MapScreen}
              //initialRouteName="Cart*"
              options={{
                headerTintColor: Colors.primaryColor,
                //headerStyle: { backgroundColor: Colors.cyan },
              }}
            />

          </Stack.Group>
        {/* )} */}



      {/* <Stack.Group screenOptions={{ presentation: 'modal' }}>

        <Stack.Screen name="ProductOverview"
          component={ProductOverviewScreen}
          //initialRouteName="Categories"
          options={{
            headerTintColor: 'black',
            //headerStyle: { backgroundColor: Colors.cyan },
            //headerShown: false
          }}
        />


      </Stack.Group> */}

    </Stack.Navigator>
</NavigationContainer>
  );
}


export default PlacesNavigator;