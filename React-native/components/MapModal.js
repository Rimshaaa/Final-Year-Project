import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import Modal from "react-native-modal";
import MapView, { Marker } from "react-native-maps";
import Colors from "../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
//import * as Location from "expo-location";

const INITIAL_REGION = {
  latitude: 33.56789207935098,
  longitude: 73.03754154592752,
  latitudeDelta: 0.08,
  longitudeDelta: 0.09,
};

export default function CustomModal({
  isOpen,
  setIsOpen,
  handleConfirm,
  setPoi,
  poi,
  screen,
}) {
  const mapRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  function handlePress() {
    if (!poi) {
      alert("Please Select Location");
    } else {
      handleConfirm();
      setIsOpen(false);
    }
  }
  const onPoiClick = (e) => {
    const selectedLocation = e.nativeEvent;
    setPoi(selectedLocation);
  };

  async function getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }
    const { coords } = await Location.getCurrentPositionAsync({});
    setPoi({
      coordinate: { latitude: coords.latitude, longitude: coords.longitude },
    });
    setCurrentLocation({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
    handleZoomToLocation(coords.latitude, coords.longitude);
  }

  function handleCurrentLocation() {
    if (currentLocation !== null) {
      handleZoomToLocation(currentLocation.latitude, currentLocation.longitude);
    } else {
      getLocationPermission();
    }
  }

  function handleZoomToLocation(latitude, longitude) {
    if (mapRef.current) {
      mapRef.current.animateCamera({
        center: {
          latitude,
          longitude,
        },
        zoom: 14, // Adjust the zoom level as needed
        altitude: 2000, // Optional: You can adjust the altitude (zoom level) as needed
      });
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Modal isVisible={isOpen}>
        <View
          style={{ backgroundColor: "white", height: 500, borderRadius: 10 }}
        >
          <Text className="tracking-wider mt-2 p-2 text-lg ">
            Select Location
          </Text>
          <View
            className="flex items-center rounded-md"
            style={{ height: 400 }}
          >
            <View style={styles.container}>
              <MapView
                style={styles.map}
                onPress={onPoiClick}
                onPoiClick={onPoiClick}
                showsUserLocation={true}
                showsMyLocationButton={false}
                initialRegion={INITIAL_REGION}
                mapPadding={{ top: 100, right: 0, bottom: 0, left: 0 }}
                zoomControlEnabled={true}
                ref={mapRef}
              >
                {poi && <Marker coordinate={poi.coordinate} draggable />}
              </MapView>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  bottom: 100,
                  right: 12,
                  backgroundColor:
                    screen === "res" ? Colors.resprimary : Colors.primaryAmber,
                  padding: 8,
                  borderRadius: 5,
                }}
                onPress={() => handleCurrentLocation()}
              >
                <MaterialIcons name="my-location" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <View
            className="flex-row justify-end pr-3 bg-white pb-3"
            style={{ borderRadius: 10 }}
          >
            <TouchableOpacity
              className="py-1 ml-5 rounded-full w-28 mt-5"
              style={{ borderWidth: 1, borderColor: "#f59e0b" }}
              onPress={() => setIsOpen(false)}
            >
              <Text className="text-lg text-center text-gray-700">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="py-1 ml-5 rounded-full w-28 mt-5"
              onPress={handlePress}
              style={{
                backgroundColor:
                  screen === "res" ? Colors.resprimary : Colors.primaryAmber,
              }}
            >
              <Text className="text-lg text-center text-white">Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
