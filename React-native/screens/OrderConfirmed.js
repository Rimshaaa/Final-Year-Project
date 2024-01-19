import {
  ImageBackground,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { request } from "../constants";
import MyHeader from "../components/MyHeader";
import Colors from "../constants/Colors";

export default function BidConfirmed() {
  const navigation = useNavigation();
  const req = request;

  return (
    <View className="flex-1 ">
      <MyHeader
        back
        onPressBack={() => navigation.goBack()}
        title="Bidding"
        right="more-vertical"
        optionalBtn="shopping-cart"
        onRightPress={() => console.log("right")}
      />
      <ImageBackground
        source={require("../assets/images/1.png")}
        resizeMode="cover"
        style={{ justifyContent: "center" }}
      >
        <ScrollView>
          <View
            className="flex-row items-center bg-white p-3 rounded-3xl shadow-2xl mb-2 mx-2"
            style={{
              backgroundColor: themeColors.bg,
              marginTop: 20,
              height: 250,
            }}
          >
            <Image
              className="rounded-3xl"
              style={{ height: 100, width: 100 }}
              source={require("../assets/images/avatar.png")}
            />
            <View className="flex flex-1 space-y-3 ">
              <View className="pl-3">
                <Text className="text-xl">Rice Restaurant</Text>
                <Text className="text-gray-700">I want 10 kg rice</Text>
              </View>
              <View className="flex-row pl-3 justify-between items-center">
                <Text className="text-gray-700 text-lg font-bold"></Text>
              </View>
            </View>
          </View>

          <View
            className="flex items-center bg-white p-3 rounded-4xl shadow-2xl mb-2 mx-2"
            style={{
              backgroundColor: themeColors.bg,
              marginTop: 10,
              height: 250,
            }}
          >
            <Text
              className="text-gray-700 ml-1 text-xl"
              style={{ marginTop: 50 }}
            >
              Estimated Delivery time
            </Text>
            <TextInput
              className="p-2 bg-gray-100 text-gray-700 rounded-2xl w-64"
              placeholder="Enter Name"
            />
            <Text className="text-gray-700 ml-1 text-xl">Price</Text>
            <TextInput
              className="p-2 bg-gray-100 text-gray-700 rounded-2xl w-64"
              //value="john@gmail.com"
              placeholder="Enter Email"
            />
            <View className="flex-row"></View>
          </View>

          <View className="flex-row justify-between px-5 pt-10">
            <View>
              <Text className="text-lg text-gray-700 font-semibold">
                Delivered in
              </Text>
              <Text className="text-3xl font-extrabold text-gray-700">
                20-30 Minutes
              </Text>
            </View>
            <Image
              className="h-24 w-24"
              source={require("../assets/images/bikeGuy2.gif")}
            />
          </View>

          <View
            style={{ backgroundColor: Colors.primary, marginTop: 1 }}
            className="p-2 flex-row justify-between items-center rounded-full my-5 mx-2"
          >
            <View
              style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
              className="p-1 rounded-full"
            >
              <Image
                style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
                className="w-16 h-16 rounded-full"
                source={require("../assets/images/avatar.png")}
              />
            </View>

            <View className="flex-1 ml-3">
              <Text className="text-lg font-bold text-white">Syed Noman</Text>
              <Text className="text-white font-semibold">Your Client</Text>
            </View>
            <View className="flex-row items-center space-x-3 mr-3">
              <TouchableOpacity className="bg-white p-2 rounded-full">
                <Icon.Phone
                  fill={themeColors.bgColor(1)}
                  stroke={themeColors.bgColor(1)}
                  strokeWidth="1"
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("PersonalChat")}
                className="bg-white p-2 rounded-full"
              >
                <Icon.MessageSquare
                  fill={themeColors.bgColor(1)}
                  stroke={themeColors.bgColor(1)}
                  strokeWidth="5"
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
