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
import MyHeader2 from "../components/MyHeader2";
import Colors from "../constants/Colors";
import { StarIcon } from "react-native-heroicons/solid";
import Loader from "../components/Loader";
import {
  useCreateOrderMutation,
  useUpdateBidMutation,
} from "../redux/services";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";

export default function AcceptBid({ route }) {
  const { item = {}, time, post } = route.params;
  const user = useSelector((state) => state.authReducer.activeUser);
  const navigation = useNavigation();
  const [createOrder, { isLoading: orderLoading }] = useCreateOrderMutation();
  const [updateBid, { isLoading: updateLoading }] = useUpdateBidMutation();

  function splitTimeRange(text) {
    const match = text.match(/(\d+)-(\d+)(\D+)/);
    if (match) {
      let start = parseInt(match[1]);
      let end = parseInt(match[2]);
      let unit = match[3];
      return {
        start: start,
        end: end,
        unit: unit,
      };
    } else {
      return null;
    }
  }

  const handleBuyNow = async () => {
    createOrder({
      sender: item.bid_by._id,
      receiver: user._id,
      item_name: post.item_name,
      price: item.bid_price,
      qty: post.qty,
      unit: post.unit,
      description: post.details,
    })
      .then((res) => {
        if (res.error) {
          Toast.show({ type: "error", text1: res.error });
        } else if (res.data.message) {
          updateBid({ id: post._id, data: { status: "completed" } });
          Toast.show({ type: "success", text1: "Order Successfuly Placed" });
          navigation.navigate("ResBids", { prevScreen: "" });
        }
      })
      .catch((err) => Toast.show({ type: "error", text1: err.message }));
  };

  return (
    <View className="flex-1 ">
      <MyHeader2
        back
        onPressBack={() => navigation.goBack()}
        right="more-vertical"
        optionalBtn="shopping-cart"
        onRightPress={() => console.log("right")}
      />

      <ScrollView>
        <View
          className="flex-row bg-white p-3 rounded-3xl shadow-2xl mb-2 mx-2"
          style={{
            backgroundColor: themeColors.bg,
            marginTop: 60,
            height: 250,
          }}
        >
          <Image
            className="rounded-3xl"
            style={{ height: 100, width: 100 }}
            source={{ uri: item.bid_by.image }}
          />
          <View className="flex flex-1 space-y-3 ">
            <View className="pl-3">
              <Text className="text-xl mb-2">{item.bid_by.name}</Text>

              <View className="flex-row mb-2">
                <StarIcon size="15" color="yellow" />
                <StarIcon size="15" color="yellow" />
                <StarIcon size="15" color="yellow" />
                <StarIcon size="15" color="yellow" />
                <StarIcon size="15" color="yellow" />
              </View>

              <Text className="text-purple-700 font-bold">Supplier</Text>
              <Text className="text-black mt-2">
                Description: In business, a supplier is a person or an entity
                who delivers top-notch services and goods from manufacturers at
                reasonable costs to retailers or distributors for sale.
              </Text>
              <Text className="text-black mt-3 font-semibold">
                Bid Price: {item.bid_price}
              </Text>
            </View>
            <View className="flex-row pl-3 justify-between items-center">
              <Text className="text-gray-700 text-lg font-bold"></Text>
            </View>
          </View>
        </View>

        <View className="flex-row justify-between px-5 pt-10 mt-32">
          <View>
            <Text className="text-lg text-black font-semibold">
              Delivered in
            </Text>
            <Text className="text-3xl font-extrabold text-black">
              {splitTimeRange(time).start + "-" + splitTimeRange(time).end}{" "}
              {splitTimeRange(time).unit === "min" ? "Minutes" : "Hours"}
            </Text>
          </View>
          <Image
            className="h-24 w-24"
            source={require("../assets/images/bikeGuy2.gif")}
          />
        </View>

        <View
          style={{ backgroundColor: Colors.resprimary, marginTop: 10 }}
          className="p-2 flex-row justify-between items-center rounded-full my-5 mx-2"
        >
          <View
            style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
            className="p-1 rounded-full"
          >
            <Image
              style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
              className="w-16 h-16 rounded-full"
              source={{ uri: item.bid_by.image }}
            />
          </View>

          <View className="flex-1 ml-3">
            <Text className="text-lg font-bold text-white">
              {item.bid_by.name}
            </Text>
            <Text className="text-white font-semibold">Your Supplier</Text>
          </View>
          <View className="flex-row items-center space-x-3 mr-3">
            <TouchableOpacity
              className="bg-white py-2 px-6 rounded-full"
              onPress={handleBuyNow}
            >
              {/* <Icon.Phone
                fill={Colors.resprimary}
                stroke={Colors.resprimary}
                strokeWidth="1"
              /> */}
              {orderLoading ? (
                <Loader color={Colors.resprimary} />
              ) : (
                <Text className="text-lg font-semibold">Place Order</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ChattingScreen", {
                  recepientId: item.bid_by._id,
                  recepientName: item.bid_by.name,
                  recepientImage: item.bid_by.image,
                })
              }
              className="bg-white p-2 rounded-full"
            >
              <Icon.MessageSquare
                fill={Colors.resprimary}
                stroke={Colors.resprimary}
                strokeWidth="5"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
