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
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import MyHeader from "../components/MyHeader";
import { usePlaceBidMutation } from "../redux/services";
import Toast from "react-native-toast-message";
import Loader from "../components/Loader";

export default function BiddingScreen({ route }) {
  const navigation = useNavigation();
  const { data } = route.params;
  const [price, setPrice] = useState("");

  const [placeBid, { isLoading }] = usePlaceBidMutation();

  let twoButtonAlert = () => {
    Alert.alert("Confirm Bid", "Do you want to place bid", [
      {
        text: "Cancel",
        onPress: () => {
          // navigation.navigate("BidConfirmed");
        },
      },
      {
        text: "OK",
        onPress: () => handlePlaceBid(),
      },
    ]);
  };

  async function handlePlaceBid() {
    if (!price) {
      Toast.show({
        type: "error",
        text1: "Please Enter Your Price",
      });
    } else {
      placeBid({ id: data._id, data: { bid_price: price } })
        .then((res) => {
          if (res.error) {
            Toast.show({ type: "error", text1: res.error.data.error });
          } else if (res.data.message) {
            navigation.navigate("BidConfirmed", { data, price });
          }
        })
        .catch((err) => Toast.show({ type: "error", text1: err.message }));
    }
  }

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
        source={require("../assets/images/food3.jpg")}
        resizeMode="cover"
        style={{ justifyContent: "center" }}
      >
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
          className="flex items-center bg-white p-3 rounded-4xl shadow-2xl mb-2 mx-2"
          style={{
            backgroundColor: themeColors.bg,
            marginTop: 90,
            height: 400,
          }}
        >
          <Text className="text-gray-700 ml-1 text-xl mt-10 mb-10">
            Your Price:
          </Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl w-64"
            placeholder="Enter Your Price"
            keyboardType="number-pad"
            value={price}
            onChangeText={(value) => setPrice(value)}
          />
          <View className="flex-row" style={{ gap: 10 }}>
            <TouchableOpacity
              onPress={twoButtonAlert}
              className="py-3 bg-amber-500 rounded-full w-40 "
              style={{ marginTop: 40 }}
            >
              {isLoading ? (
                <View className="flex items-center justify-center h-7">
                  <Loader />
                </View>
              ) : (
                <Text className="font-xl font-bold text-center text-gray-700 text-xl">
                  Place Bid
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className="py-3 bg-gray-300 rounded-full w-40 "
              style={{ marginTop: 40 }}
              onPress={() => navigation.goBack()}
            >
              <Text className="font-xl font-bold text-center text-gray-700 text-xl">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
