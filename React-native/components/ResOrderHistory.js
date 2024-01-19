import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { themeColors } from "../theme";
import { MinusIcon, PlusIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { ORDER_PLACEHOLDER_IMAGE } from "../config";
import { useCreateOrderMutation } from "../redux/services";
import Toast from "react-native-toast-message";
import Loader from "./Loader";

export default function ResOrderHistory({ fruit, index }) {
  const navigation = useNavigation();
  const [createOrder, { isLoading: orderLoading }] = useCreateOrderMutation();

  const handleOrderAgain = async (item) => {
    createOrder({
      sender: item.sender,
      receiver: item.receiver,
      item_name: item.item_name,
      item_image: item.item_mage,
      price: item.price,
      qty: item.qty,
      unit: item.unit,
      description: item.description,
      inventory_id: item.inventory_id,
    })
      .then((res) => {
        if (res.error) {
          Toast.show({ type: "error", text1: res.error });
        } else if (res.data.message) {
          Toast.show({ type: "success", text1: "Order Placed Again" });
        }
      })
      .catch((err) => Toast.show({ type: "error", text1: err.message }));
  };
  return (
    <View className="flex-row justify-between items-center space-x-5 mb-4 mt-10">
      <View className="ml-5">
        <TouchableOpacity className="flex-row justify-center -mb-10 -ml-10 shadow-lg z-20">
          <Image
            source={{
              uri: fruit?.item_image
                ? fruit.item_image
                : ORDER_PLACEHOLDER_IMAGE,
            }}
            style={{
              height: 65,
              width: 65,
              shadowColor: fruit.shadow,
              overflow: "visible",
              shadowRadius: 15,
              shadowOffset: { width: 0, height: 20 },
              shadowOpacity: 0.4,
              borderRadius: 10,
            }}
          />
        </TouchableOpacity>

        <View
          style={{ height: 60, width: 60 }}
          className={` rounded-3xl flex justify-end items-center`}
        ></View>
      </View>
      <View className="flex-1 space-y-1">
        <Text
          style={{ color: themeColors.text }}
          className=" text-base font-bold"
        >
          Order ID : {fruit._id.slice(0, 10)}
        </Text>
        <Text
          style={{ color: themeColors.text }}
          className=" text-base font-bold"
        >
          Name : {fruit.item_name}
        </Text>
        <Text
          style={{ color: themeColors.text }}
          className=" text-base font-bold"
        >
          Quantity : {fruit.qty}
        </Text>
        <Text className="text-black font-extrabold">
          Total: Rs {parseInt(fruit.qty) * parseInt(fruit.price)}
        </Text>
      </View>
      <View className="flex-row items-center space-x-2">
        <TouchableOpacity
          className="bg-purple-500 px-5 py-2 rounded-lg"
          onPress={() => handleOrderAgain(fruit)}
        >
          {orderLoading ? (
            <View className="px-5 py-2">
              <Loader />
            </View>
          ) : (
            <Text className="text-white">Order Again</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
