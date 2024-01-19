// Supplier.js

import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import {
  api,
  useGetRatingsQuery,
  useGetSupplierStoreQuery,
} from "../redux/services";
import { Rating } from "react-native-ratings";
import { useFocusEffect } from "@react-navigation/native";

const CustomDrawer = ({ navigation }) => {
  const userData = useSelector((state) => state.authReducer.activeUser);

  const {
    data: ratings,
    isLoading: ratingLoading,
    refetch,
  } = useGetRatingsQuery(userData._id);

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [])
  );

  const { data, isLoading } = useGetSupplierStoreQuery();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(api.util.resetApiState());
    navigation.navigate("SupplierOrRestaurant");
  };

  function handleStoreNavigation() {
    if (!isLoading && data && data.name) {
      navigation.navigate("MyStore", { store: data });
    } else if (!isLoading) {
      navigation.navigate("SupplierStore");
    }
  }

  return (
    <DrawerContentScrollView>
      <View style={{ padding: 16 }}>
        <View style={{ marginBottom: 8, flexDirection: "row" }}>
          {/* User Image */}
          <Image
            source={{
              uri: userData?.image,
            }} // Replace with the user's image URL
            style={{ width: 80, height: 80, borderRadius: 40 }}
          />
          <View style={{ flexDirection: "column", padding: 8 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 8 }}>
              {userData.name}
            </Text>
            {ratingLoading ? (
              <Rating
                showRating
                imageSize={30}
                fractions={1}
                ratingCount={5}
                startingValue={0}
                readonly
                showReadOnlyText={false}
                style={{ paddingVertical: 10 }}
              />
            ) : (
              <Rating
                showRating
                imageSize={30}
                fractions={1}
                ratingCount={5}
                startingValue={ratings && parseFloat(ratings?.averageRating)}
                readonly
                showReadOnlyText={false}
                style={{ paddingVertical: 10 }}
              />
            )}
            {/* <CustomStarRating
              initialRating={rating}
              onRatingChange={updateRating}
            /> */}
          </View>
        </View>
        {userData ? (
          <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 8 }}>
            Welcome, {userData.name}
          </Text>
        ) : (
          <Text>Loading...</Text>
        )}
        <View style={{ borderTopColor: "black", borderTopWidth: 2 }}>
          {/* Navigation Links */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Profile");
            }}
            style={{
              marginTop: 16,
              backgroundColor: "orange",
              padding: 6,
              borderRadius: 8,
              flexDirection: "row",
            }}
          >
            <AntDesign name="setting" size={24} color="#FFF" />
            <Text style={{ fontSize: 22, marginLeft: 8, color: "#FFF" }}>
              Settings
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("OrderTracking");
            }}
            style={{
              marginTop: 16,
              backgroundColor: "orange",
              padding: 6,
              borderRadius: 8,
              flexDirection: "row",
            }}
          >
            <MaterialIcons name="my-location" size={24} color="#FFF" />

            <Text style={{ fontSize: 22, marginLeft: 8, color: "#FFF" }}>
              Order Tracking
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={() => {
              navigation.navigate("ContractForm");
            }}
            style={{
              marginTop: 16,
              backgroundColor: "orange",
              padding: 6,
              borderRadius: 8,
              flexDirection: "row",
            }}
          >
            <AntDesign name="form" size={24} color="#FFF" />
            <Text style={{ fontSize: 22, marginLeft: 8, color: "#fff" }}>
              Contract Form
            </Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => handleStoreNavigation()}
            style={{
              marginTop: 16,
              backgroundColor: "orange",
              padding: 6,
              borderRadius: 8,
              flexDirection: "row",
            }}
          >
            <FontAwesome5 name="store" size={24} color="#FFF" />
            <Text style={{ fontSize: 22, marginLeft: 8, color: "#fff" }}>
              Store
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={() => {
              navigation.navigate("RestaurantRequest");
            }}
            style={{
              marginTop: 16,
              backgroundColor: "orange",
              padding: 6,
              borderRadius: 8,
              flexDirection: "row",
            }}
          >
            <MaterialIcons name="request-page" size={24} color="#FFF" />
            <Text style={{ fontSize: 22, marginLeft: 8, color: "#fff" }}>
              Request
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        onPress={() => handleLogout()}
        style={{
          flexDirection: "row",
          marginTop: "auto",
          borderTopWidth: 2,
          borderColor: "black",
          padding: 16,
          backgroundColor: "orange",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 22, color: "white" }}>Logout </Text>
          <AntDesign
            name="logout"
            size={20}
            color="white"
            style={{ marginLeft: 4 }}
          />
        </View>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
