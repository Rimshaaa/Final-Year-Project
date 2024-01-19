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
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { request } from "../constants";
import MyHeader from "../components/MyHeader";
import Colors from "../constants/Colors";

export default function BidConfirmed({ route }) {
  const navigation = useNavigation();
  const { data = {}, price = "" } = route.params;

  useEffect(() => {
    // Delay navigation by 2000 milliseconds (2 seconds)
    const timeout = setTimeout(() => {
      navigation.navigate("MyBids");
    }, 3000);

    // Cleanup the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, [navigation]);

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
              className="rounded-3xl mb-5"
              style={{ height: 100, width: 100 }}
              source={{ uri: data.created_by.image }}
            />
            <View className="flex flex-1 space-y-3 ">
              <View className="pl-3">
                <Text className="text-2xl mb-2">{data.created_by.name}</Text>
                <Text className="text-gray-700 ml-2 text-lg tracking-wider">
                  I Want{" "}
                  <Text className="font-bold text-amber-500">
                    {data.qty} {data.unit} {data.item_name}
                  </Text>
                </Text>
              </View>
              <View className="flex-row pl-3 justify-between items-center">
                <Text className="text-gray-700 text-lg font-bold"></Text>
              </View>
            </View>
          </View>

          <View
            className="flex items-center p-3  mb-2 mx-2"
            style={{
              // backgroundColor: themeColors.bg,
              marginTop: 10,
              height: 250,
            }}
          ></View>

          <View className="flex-row justify-between px-5 pt-10">
            <View>
              <Text className="text-lg text-gray-700 font-semibold mb-2">
                Your Price : {price}
              </Text>
              <Text className="text-2xl font-extrabold text-gray-700">
                Bid Placed Successfully!
              </Text>
            </View>
            <Image
              className="h-20 w-20 mb-5"
              source={require("../assets/checkmark.png")}
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
              {/* <Image
                style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
                className="w-16 h-16 rounded-full"
                source={require("../assets/images/avatar.png")}
              /> */}
            </View>

            <View className="flex-1 ml-3">
              <Text className="text-lg text-center font-bold text-white">
                Good luck!
              </Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
