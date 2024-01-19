import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import React, { useRef, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import MyHeader2 from "../components/MyHeader2";
import { SelectList } from "react-native-dropdown-select-list";
import Map from "../components/Map";
import Toast from "react-native-toast-message";
import { UNITS } from "../constants";
import {
  useCreateBidItemMutation,
  useGetNearbySuppliersQuery,
  useGetSuppliersQuery,
} from "../redux/services";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import Colors from "../constants/Colors";

const INITIAL_REGION = {
  latitude: 33.56789207935098,
  longitude: 73.03754154592752,
  latitudeDelta: 0.08,
  longitudeDelta: 0.09,
};

export default function GenerateRequest({ route }) {
  const navigation = useNavigation();
  const user = useSelector((state) => state.authReducer.activeUser);
  const { data, error, isError } = useGetNearbySuppliersQuery();
  const mapRef = useRef(null);

  const [createBid, { isLoading }] = useCreateBidItemMutation();

  const { supCategories = [] } = route.params;
  const [selected, setSelected] = useState("");
  const [unit, setUnit] = useState("");
  const [poi, setPoi] = useState();
  const [formData, setFormData] = useState({
    itemName: "",
    Quantity: "",
    Details: "",
  });

  function handlePlaceOrder() {
    if (!selected || !formData.itemName || !unit) {
      Toast.show({ type: "error", text1: "Please Fill All Fields" });
    } else {
      createBid({
        category: selected,
        // location: {
        //   latitude: poi.coordinate.latitude,
        //   longitude: poi.coordinate.longitude,
        // },
        item_name: formData.itemName,
        qty: formData.Quantity,
        unit,
        details: formData.Details,
      })
        .then((res) => {
          if (res.error) {
            Toast.show({ type: "error", text1: res.error.data.error });
          } else if (res.data.message) {
            navigation.navigate("ResBids", { prevScreen: "create" });
          }
        })
        .catch((err) => Toast.show({ type: "error", text1: err.message }));
    }
  }

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
    <View className="flex-1">
      <MyHeader2
        title="Request Generation"
        right="more-vertical"
        optionalBtn="shopping-cart"
        onRightPress={() => console.log("right")}
      />
      <View style={{ height: 400 }}>
        <View style={styles.container}>
          <MapView
            ref={mapRef}
            style={styles.map}
            // onPress={onPoiClick}
            // onPoiClick={onPoiClick}
            // showsUserLocation={true}
            initialRegion={INITIAL_REGION}
            mapPadding={{ top: 100, right: 0, bottom: 0, left: 0 }}
          >
            <>
              <Marker
                coordinate={{
                  latitude: parseFloat(user.location.latitude),
                  longitude: parseFloat(user.location.longitude),
                }}
                style={{ zIndex: 999 }}
              ></Marker>
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
            </>
          </MapView>
        </View>
      </View>
      <ScrollView>
        <View
          className="flex-1 bg-white px-8 pt-8"
          style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        >
          <View className="mb-32">
            <Text className="text-black ml-1" style={{ fontSize: 16 }}>
              Category Name
            </Text>
            <SelectList
              setSelected={(key) => setSelected(key)}
              data={supCategories}
              save="key"
              placeholder="Select Category"
              boxStyles={{
                borderColor: "white",
                backgroundColor: "#e6e6e6",
                marginTop: 10,
                borderRadius: 20,
              }}
              inputStyles={{ padding: 1, color: selected ? "#000" : "#a0a1a3" }}
              searchPlaceholder="Search"
            />

            <View>
              <Text
                className="text-black ml-1"
                style={{ marginTop: 20, fontSize: 16 }}
              >
                Item Name
              </Text>
              <TextInput
                className="p-2 bg-gray-100 text-black rounded-2xl pl-5"
                placeholder="Enter Name"
                style={{
                  backgroundColor: "#e6e6e6",
                  borderWidth: 0,
                  marginTop: 10,
                }}
                value={formData.itemName}
                onChangeText={(value) =>
                  setFormData({ ...formData, itemName: value })
                }
              />
            </View>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <View style={{ width: 200 }}>
                <Text
                  className="text-black ml-1"
                  style={{ marginTop: 20, fontSize: 16 }}
                >
                  Quantity
                </Text>
                <TextInput
                  className="p-2 bg-gray-100 text-black rounded-2xl pl-5"
                  placeholder="Enter Quantity"
                  style={{
                    backgroundColor: "#e6e6e6",
                    borderWidth: 0,
                    marginTop: 10,
                  }}
                  value={formData.Quantity}
                  onChangeText={(value) =>
                    setFormData({ ...formData, Quantity: value })
                  }
                />
              </View>
              <View style={{ width: 200 }}>
                <Text
                  className="text-black ml-1"
                  style={{ marginTop: 20, fontSize: 16 }}
                >
                  Unit
                </Text>
                <SelectList
                  setSelected={(value) => setUnit(value)}
                  data={UNITS}
                  save="value"
                  placeholder="Select Unit"
                  boxStyles={{
                    borderColor: "white",
                    backgroundColor: "#e6e6e6",
                    marginTop: 10,
                    borderRadius: 20,
                  }}
                  inputStyles={{
                    padding: 1,
                    color: unit ? "#000" : "#a0a1a3",
                  }}
                  searchPlaceholder="Search"
                />
              </View>
            </View>

            <Text
              className="text-black ml-1"
              style={{ marginTop: 20, fontSize: 16 }}
            >
              Enter Details (optional)
            </Text>
            <TextInput
              numberOfLines={7}
              className="p-2 bg-gray-100 text-black rounded-2xl"
              style={{
                backgroundColor: "#e6e6e6",
                borderWidth: 0,
                marginTop: 10,
                marginBottom: 20,
              }}
              value={formData.Details}
              onChangeText={(value) =>
                setFormData({ ...formData, Details: value })
              }
            />

            <TouchableOpacity
              onPress={() => handlePlaceOrder()}
              className="py-3 bg-purple-500 rounded-full mt-10"
            >
              {isLoading ? (
                <View>
                  <Loader color="white" size={26} />
                </View>
              ) : (
                <Text className="font-xl font-bold text-xl text-center text-black">
                  Place Order
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              className="py-3 bg-gray-300 rounded-full mt-5"
              onPress={() => navigation.goBack()}
            >
              <Text className="font-xl font-bold text-xl text-center text-black">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
