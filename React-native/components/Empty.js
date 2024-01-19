import { Text, View, Image } from "react-native";
import React from "react";

export default function Empty({ text = "Empty" }) {
  return (
    <View
      style={{
        padding: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 300,
      }}
    >
      <Image
        source={require("../assets/empty.png")}
        style={{ width: 100, height: 100, opacity: 0.5 }}
      />
      <Text style={{ fontSize: 20, marginTop: 10, fontWeight: "semibold" }}>
        {text}
      </Text>
    </View>
  );
}
