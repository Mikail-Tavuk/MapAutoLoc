import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MApView, Permissions } from 'expo';
import MapView from 'react-native-maps';

export default class App extends React.Component {
  render() {
    return (
      <MapView style={styles.map}>

      </MapView>
    );
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
