import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import MyHeader from "../components/MyHeader";

export default function SupplierStore() {
  const navigation = useNavigation();
  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bg }}
    >
      <MyHeader
        back
        onPressBack={() => navigation.goBack()}
        title="My store"
        right="more-vertical"
        optionalBtn="shopping-cart"
        onRightPress={() => console.log("right")}
      />

      <SafeAreaView className="flex ">
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/shopIcon.jpg")}
            style={{
              width: 200,
              height: 200,
              marginTop: 100,
              marginBottom: 50,
            }}
          />
        </View>
      </SafeAreaView>
      <View
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        className="flex-1 bg-white px-8 pt-8"
      >
        <View className="form space-y-2">
          <TouchableOpacity
            className="py-3 bg-amber-500 rounded-full"
            onPress={() => navigation.navigate("CreateStore")}
          >
            <Text className="text-xl font-bold text-center text-gray-700">
              Create Store
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
