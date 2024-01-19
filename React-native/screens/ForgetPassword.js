import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";
import Toast from "react-native-toast-message";
import Loader from "../components/Loader";
import { useSendOTPMutation } from "../redux/services";

export default function ForgetPassword() {
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
              prev: "Supplier",
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
        <Text className="text-amber-500 text-2xl text-center">
          Enter email to reset Password
        </Text>
      </View>

      <View
        className="flex-1 bg-white px-8 pt-8"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <View className="form space-y-2">
          <TextInput
            className="p-2 bg-gray-200 text-gray-700 rounded-2xl h-14"
            //value="john snow"
            placeholder="Enter email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <TouchableOpacity
          onPress={() => handleSendOTP()}
          className="py-3 bg-amber-500 mx-7"
          style={{ borderRadius: 90, marginTop: 40 }}
        >
          {isLoading ? (
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 30,
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
