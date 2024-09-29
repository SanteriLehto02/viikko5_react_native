import Constants from 'expo-constants';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
export default function Map() {

    useEffect(() => {
        (async () => {
            await getUserPosition();
        })();
    }, []);

    const [location, setLocation] = useState({
        latitude: 65.0000,
        longitude: 25.000,
        latitudeDelta: 0.0900,
        longitudeDelta: 0.0400
    })

    const [markers, setMarker] = useState([])

    const showMarker = (e) => {

        const coords = e.nativeEvent.coordinate

        const newMarker = {
            latitude: coords.latitude,
            longitude: coords.longitude,
        };
        setMarker([...markers, newMarker])
    }
const getUserPosition = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync()
    console.log("xd")
    try {
        if (status !== 'granted') {
            console.log("ei toiminu");
            return
        }
        const position = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
        setLocation({
            ...location,
            "latitude": position.coords.latitude,
            "longitude": position.coords.longitude
        });
    } catch (error) {
        console.log(error);
    }
}
  return (
    <SafeAreaView style={styles.container}>
      <MapView
      style={styles.map}
      region={location}
      onLongPress={showMarker}
      >
        {markers.map((marker, index) => (
    <Marker
      key={index}
      coordinate={{
        latitude: marker.latitude,
        longitude: marker.longitude,
      }}
    />
  ))}
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? Constants.statusBarHeight: 0
  },
  map: {
    width: '100%',
    height: '100%',
  },
});