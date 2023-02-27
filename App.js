import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button,LogBox ,YellowBox} from 'react-native';
import PlacesNavigator from './navigation/PlacesNavigator';
import ReduxThunk from 'redux-thunk';
import placesReducer from './store/reducers/places';
import * as Font from 'expo-font';
import React, {useState,useEffect,useCallback,createRef} from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {createStore,combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';


import { init } from "./helpers/db";

init()
  .then(() => {
    console.log("Initialized Database");
  })
  .catch(err => {
    console.log("Initializing Database Failed");
    console.log(err);
  });

const rootReducer=combineReducers({
    
  places: placesReducer

});

const store = createStore(rootReducer,applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};


export default function App() {

  

    // const [ fontLoaded, setFontLoaded ] = useState(false);
	// if (!fontLoaded) {
	// 	return <AppLoading startAsync={fetchFonts} 
  //   onFinish={() => setFontLoaded(true)}
  //   onError={(error)=> console.warn(error)}
    
  //    />;
	// }

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await fetchFonts();
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  const containerRef = createRef();
  //ref={containerRef}

  //LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  //LogBox.ignoreAllLogs();//Ignore all log notifications
  LogBox.ignoreLogs(['Sending...']);
  LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);
  // YellowBox.ignoreWarnings([
  //   // See: https://github.com/react-navigation/react-navigation/issues/7839
  //   'Sending \`onAnimatedValueUpdate\` with no listeners registered.',
  // ]);
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <Provider store={store}>
    <View style={styles.container} onLayout={onLayoutRootView}>
    <PlacesNavigator />
    </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
