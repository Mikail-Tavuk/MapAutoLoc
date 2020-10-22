import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapView, Permissions } from 'expo-permissions';
// import MapView from 'react-native-maps';

export default class App extends React.Component {
  state = {
    latitude: null,
    longitude: null
  }

  async componentDidMount() {
    const { status } = await  Permissions.getAsync(Permissions.LOCATION)
  

    if (status != 'granted' ) {
      const response = await Permissions.askAsync(Permissions.LOCATION)
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude }}) => this.setState({ latitude, longitude}, () => console.log('State' , this.state)),
      (error) => console.log('Error', error)
    )
  }

  render() {
    const { latitude, longitude } = this.state
    if (latitude) {
      return (
        <MapView style={styles.map}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta:  0.0922,
            longitudeDelta: 0.0421
          }}
        >
        </MapView>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Make shure you enable your location to use this application</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  map: {
    flex: 1
  }
});



// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { MApView, Permissions } from 'expo';
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