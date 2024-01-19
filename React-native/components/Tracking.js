import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { themeColors } from "../theme";
import { getOrderStatusColor } from "../utils";

export default function Tracking({ track }) {
  return (
    <View className="flex">
      <View className="flex-row justify-between items-center space-x-5 mb-4 h-20 bg-gray-200 rounded-full">
        <View className="flex-1 ml-10">
          <Text
            style={{ color: themeColors.text }}
            className=" text-base font-bold"
          >
            {`${track.qty} ${track.unit || ""} ${track.item_name} From ${
              track.receiver.name
            }  `}
          </Text>
        </View>
        <View className="flex-row mr-5">
          <View
            className="p-2 h-10 w-24 items-center rounded-lg"
            style={getOrderStatusColor(track.status)}
          >
            <Text>
              <Text
                className="text-black-500 font-semibold"
                style={{ textTransform: "capitalize" }}
              >
                {track.status}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
