// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, Alert, Linking } from 'react-native';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import {PERMISSIONS} from 'react-native-permissions';
import { checkMultiplePermissions } from './services/permissions'
//import { MapView, Permissions } from 'expo-permissions';
// import MapView from 'react-native-maps';

navigator.geolocation = require('@react-native-community/geolocation');

export default class App extends React.Component {
  state = {
    latitude: null,
    longitude: null
  }

  // Requesting for the Location permission
  static async checkForPermissions() {
    const permissions =
      Platform.OS === 'ios'
        ? [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]
        : [PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION];

    // Call our permission service and check for permissions
    const isPermissionGranted = await checkMultiplePermissions(permissions);
    if (!isPermissionGranted) {
      // Show an alert in case permission was not granted
      Alert.alert(
        'Permission Request',
        'Please allow permission to access the location.',
        [
          {
            text: 'Go to Settings',
            onPress: () => {
              Linking.openSettings();
            },
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        { cancelable: false },
      );
    }
    return isPermissionGranted;
  }

  async componentDidMount() {
    
  }

  

  render() {
    if(App.checkForPermissions()){
      console.log('permissions ok');
      navigator.geolocation.watchPosition(
        ({ coords: { latitude, longitude } }) => {
          this.setState({ latitude, longitude});
          console.log('State:' , this.state);
        },
        (error) => console.log('Error', error),
        {
          enableHighAccuracy: true, timeout: 5000
        }
      )
    }
    console.log('Helo');
    const { latitude, longitude } = this.state
    if (latitude) {
      return (
        <MapView style={styles.map}
          showsMyLocationButton={true}
          showsUserLocation={true}
          followsUserLocation={true}
          loadingEnabled
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
        </MapView>
      );
    }
    return (
      <View style={styles.error_geoloc}>
        <Text style={styles.error_geoloc_txt}>Make sure you enabled your location to use this application</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  map: {
    flex: 1
  },

  error_geoloc: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECF0F1'
  },

  error_geoloc_txt: {
    color: 'black'
  }
});



// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// // import { MapView, Permissions } from 'expo';
// import MapView from 'react-native-maps';

// export default class App extends React.Component {
//   render() {
//     return (
//       <MapView style={styles.map}>

//       </MapView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   map: {
//     flex: 1
//   }
// });