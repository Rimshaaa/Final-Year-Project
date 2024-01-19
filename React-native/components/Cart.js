import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { themeColors } from "../theme";
import { MinusIcon, PlusIcon } from "react-native-heroicons/solid";
import { useDispatch } from "react-redux";
import { decQuantity, incQuantity, removeItem } from "../redux/cartSlice";
import Colors from "../constants/Colors";
import { AntDesign } from "@expo/vector-icons";

export default function Cart({ cart }) {
  const dispatch = useDispatch();

  return (
    <View className="flex-row items-center">
      <View
        className="flex-row justify-between items-center mb-2 mt-2 py-2"
        style={{
          backgroundColor: Colors.resprimary,
          borderRadius: 10,
          width: 400,
        }}
      >
        <View className="ml-5">
          <TouchableOpacity className="flex-row justify-center -ml-10 shadow-lg z-20">
            <Image
              source={{ uri: cart.item_image }}
              style={{
                height: 70,
                width: 70,
                marginLeft: 30,
                // shadowColor: cart.shadow,
                overflow: "visible",
                shadowRadius: 15,
                shadowOffset: { width: 0, height: 20 },
                shadowOpacity: 0.4,
                resizeMode: "contain",
                borderRadius: 10,
              }}
            />
          </TouchableOpacity>
        </View>
        <View className="flex-1 space-y-1">
          <Text
            style={{ color: "white" }}
            className="text-base text-white font-bold tracking-wider ml-5"
          >
            {cart.item_name}
          </Text>
          <Text className="text-white font-extrabold ml-5">
            Rs {cart.price}
          </Text>
        </View>
        <View className="flex-row items-center space-x-4 mr-2">
          <TouchableOpacity
            onPress={() => dispatch(decQuantity(cart._id))}
            className="bg-white p-1 rounded-lg"
          >
            <MinusIcon
              size="17"
              color={Colors.resprimary}
              stroke={Colors.resprimary}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, color: "white" }}>{cart.qty}</Text>
          <TouchableOpacity
            onPress={() => dispatch(incQuantity(cart._id))}
            className="bg-white p-1 rounded-lg"
          >
            <PlusIcon
              size="17"
              color={Colors.resprimary}
              stroke={Colors.resprimary}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        className="ml-3"
        onPress={() => dispatch(removeItem(cart._id))}
      >
        <AntDesign name="closecircleo" size={30} color="red" />
      </TouchableOpacity>
    </View>
  );
}
