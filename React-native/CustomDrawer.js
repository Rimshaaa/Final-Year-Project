// CustomDrawer.js

import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { firebase } from "./firebase";
import "firebase/auth";
import "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import StarRating from "react-native-star-rating";
import CustomStarRating from "./Content/StarRating";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const CustomDrawer = ({ navigation }) => {
  //NOT THIS ONE
  const userData = useSelector((state) => state.authReducer.activeUser);
  // const [userData, setUserData] = useState(null);
  // const db = firebase.firestore();
  // const user = firebase.auth().currentUser;
  // const rating = 4; // Assuming the user's rating is 4 out of 5 stars
  // db.collection("ratings")
  //   .add({
  //     userId: user.uid, // The user who provided the ratin
  //     rating: rating, // The user's rating value
  //     // You can add more fields such as timestamp, comments, etc.
  //   })
  //   .then((docRef) => {
  //     console.log("Rating added with ID: ", docRef.id);
  //   })
  //   .catch((error) => {
  //     console.error("Error adding rating: ", error);
  //   });

  // const updateRating = (rating) => {
  //   // Update the user's rating in Firestore
  //   db.collection("users").doc(user.uid).update({ rating: rating });
  // };

  useEffect(() => {
    // const user = firebase.auth().currentUser;
    // if (user) {
    //   const userRef = firebase.firestore().collection("users").doc(user.uid);
    //   // Fetch user data
    //   userRef.get().then((doc) => {
    //     if (doc.exists) {
    //       const data = doc.data();
    //       const username = data.fullname;
    //       setUserData({ username });
    //     } else {
    //       console.log("User document does not exist.");
    //     }
    //   });
    // }
  }, []);

  const logout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <DrawerContentScrollView>
      <View style={{ padding: 16 }}>
        <View style={{ marginBottom: 8, flexDirection: "row" }}>
          {/* User Image */}
          <Image
            source={{
              uri: "data:image/png;base64,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",
            }} // Replace with the user's image URL
            style={{ width: 80, height: 80, borderRadius: 40 }}
          />
          <View style={{ flexDirection: "column", padding: 8 }}>
            {userData ? (
              <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 8 }}>
                {userData.name}
              </Text>
            ) : (
              <Text>Loading...</Text>
            )}
            <CustomStarRating
              initialRating={rating}
              onRatingChange={updateRating}
            />
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

          <TouchableOpacity
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
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SupplierStore");
            }}
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

          <TouchableOpacity
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
          </TouchableOpacity>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        onPress={logout}
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
          <Text style={{ fontSize: 22, color: "white" }}>Logout</Text>
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
