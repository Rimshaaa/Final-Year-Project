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
import { useUserUpdateMutation } from "../redux/services";
import Toast from "react-native-toast-message";
import Loader from "../components/Loader";

export default function ResResetPassword({ route }) {
  const navigation = useNavigation();
  const { userId } = route.params;

  const [updateUser, { isLoading }] = useUserUpdateMutation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePassword = () => {
    if (password !== confirmPassword) {
      Toast.show({ type: "error", text1: "Passwords Not Matching" });
    } else {
      updateUser({ id: userId, data: { password } })
        .then((res) => {
          if (res.error) {
            Toast.show({ type: "error", text1: res.error.data.error });
          } else if (res.data.message) {
            Toast.show({ type: "success", text1: "Password Has Been Changed" });
            navigation.navigate("ResLogin");
          }
        })
        .catch((err) => Toast.show({ type: "error", text1: err.message }));
    }
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: themeColors.bg }}
    >
      <View className="flex-row justify-center mt-80">
        <Text className="text-purple-500 text-2xl text-center">
          Enter new password
        </Text>
      </View>

      <View
        className="flex-1 bg-white px-8 pt-8"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <View className="form space-y-2">
          <TextInput
            className="p-2 bg-gray-200 text-gray-700 rounded-2xl h-14 pl-5"
            placeholder="Enter Password"
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
          <TextInput
            className="p-2 bg-gray-200 text-gray-700 rounded-2xl h-14 pl-5"
            placeholder="Re-Enter Password"
            value={confirmPassword}
            onChangeText={(value) => setConfirmPassword(value)}
          />
        </View>

        <TouchableOpacity
          onPress={() => handlePassword()}
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
              Reset Password
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
