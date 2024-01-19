import { View } from "react-native";
import React from "react";
import { UIActivityIndicator } from "react-native-indicators";

export default function Loader({ size = 30, color = "white" }) {
  return (
    <View className="flex items-center justify-center">
      <UIActivityIndicator color={color} size={size} />
    </View>
  );
}
