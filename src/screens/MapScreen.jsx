import MapView, { Marker } from "react-native-maps";
import { View, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";

const MapScreen = ({ route }) => {
  const { locationGeo } = route.params;
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (locationGeo && locationGeo.geo) {
      setLocation({
        latitude: locationGeo.geo.latitude,
        longitude: locationGeo.geo.longitude,
      });
    } else {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }
        let userLocation = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        });
      })();
    }
  }, [locationGeo]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude: location ? location.latitude : 37.78825,
          longitude: location ? location.longitude : -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        mapType="standard"
        minZoomLevel={15}
      >
        {location && (
          <Marker
            title="Місцезнаходження"
            description="Тут знаходиться маркер"
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          />
        )}
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: "100%",
    height: "100%",
  },
});
