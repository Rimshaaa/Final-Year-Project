import React, { useRef, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useGetNearbySuppliersQuery } from "../redux/services";
import { useEffect } from "react";
import Colors from "../constants/Colors";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

export default function Map({ poi, setPoi, latitude, longitude }) {
  const INITIAL_REGION = {
    latitude: latitude,
    longitude: latitude,
    latitudeDelta: 0.08,
    longitudeDelta: 0.09,
  };

  const { data, error, isError } = useGetNearbySuppliersQuery();
  const [nearby, setNearby] = useState([]);
  const user = useSelector((state) => state.authReducer.activeUser);
  const [init, setInit] = useState(INITIAL_REGION);
  const mapRef = useRef(null);

  const onPoiClick = (e) => {
    const selectedLocation = e.nativeEvent;
    setPoi(selectedLocation);
  };

  useEffect(() => {
    setNearby(data);
  }, [data]);

  // useEffect(() => {

  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      let latitude = parseFloat(user.location.latitude);
      let longitude = parseFloat(user.location.longitude);

      handleZoomToLocation(latitude, longitude);
    }, [])
  );

  function handleZoomToLocation(latitude, longitude) {
    if (mapRef.current) {
      mapRef.current.animateCamera({
        center: {
          latitude,
          longitude,
        },
        zoom: 14,
        altitude: 2000,
      });
    }
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        onPress={onPoiClick}
        onPoiClick={onPoiClick}
        // showsUserLocation={true}
        initialRegion={INITIAL_REGION}
        mapPadding={{ top: 100, right: 0, bottom: 0, left: 0 }}
      >
        {/* {poi && <Marker coordinate={poi.coordinate} draggable />} */}
        {data &&
          data.map((sup) => (
            <Marker
              key={sup._id}
              coordinate={{
                latitude: sup?.location?.latitude,
                longitude: sup?.location?.longitude,
              }}
            >
              <Text
                style={{
                  backgroundColor: Colors.resprimary,
                  color: "white",
                  paddingHorizontal: 5,
                  borderRadius: 5,
                }}
              >
                {sup?.name}
              </Text>
              <View style={{ alignItems: "center" }}>
                <Image
                  source={require("../assets/icons/location-sup.png")}
                  style={{ height: 40, width: 40, position: "relative" }}
                />
                <Image
                  source={{ uri: sup.image }}
                  style={{
                    height: 25,
                    width: 25,
                    position: "absolute",
                    borderRadius: 20,
                    top: 2,
                  }}
                />
              </View>
            </Marker>
          ))}
      </MapView>
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
