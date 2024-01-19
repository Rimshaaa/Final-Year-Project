import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { useSendOTPMutation } from "../redux/services";
import Toast from "react-native-toast-message";
import Loader from "../components/Loader";

export default function ResForgetPassword() {
  const [email, setEmail] = useState("");

  const navigation = useNavigation();
  const [sendOTP, { isLoading }] = useSendOTPMutation();

  function handleSendOTP() {
    if (!email) {
      Toast.show({
        type: "error",
        text1: "Please Enter Email",
      });
    } else {
      sendOTP({
        email,
      })
        .then((res) => {
          if (res.error) {
            Toast.show({ type: "error", text1: res.error.data.error });
          } else if (res.data.message) {
            navigation.navigate("ResOTPInput", {
              userId: res.data.user._id,
              prev: "Restaurant",
            });
          }
        })
        .catch((err) => Toast.show({ type: "error", text1: err.message }));
    }
  }

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: themeColors.bg }}
    >
      <View className="flex-row justify-center mt-80">
        <Text className="text-purple-500 text-2xl text-center">
          Enter email to reset Password
        </Text>
      </View>

      <View
        className="flex-1 bg-white px-8 pt-8"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <View className="form space-y-2">
          <TextInput
            className="p-2 bg-gray-200 text-gray-700 rounded-2xl h-14 pl-5"
            placeholder="Enter Your Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <TouchableOpacity
          onPress={() => handleSendOTP()}
          className="py-3 bg-purple-500 mx-7"
          style={{ borderRadius: 90, marginTop: 40 }}
        >
          {isLoading ? (
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 25,
              }}
            >
              <Loader />
            </View>
          ) : (
            <Text className="text-xl text-center text-black">
              <Text className="font-xl font-bold text-xl text-center">
                Continue
              </Text>
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
