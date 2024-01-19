import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
import { UIActivityIndicator } from "react-native-indicators";
import Toast from "react-native-toast-message";
import { useLoginMutation } from "../redux/services";
import { useDispatch } from "react-redux";
import { setActiveUser, setToken } from "../redux/authSlice";
export default function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useDispatch();

  const loginUser = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Please Fill All Fields",
      });
    } else {
      login({
        email,
        password,
      })
        .then((res) => {
          if (res.error) {
            Toast.show({ type: "error", text1: res.error.data.error });
          } else if (res.data.message) {
            if (res.data.user.role === "restaurant") {
              Toast.show({ type: "error", text1: "Invalid Email or Password" });
              return;
            } else if (
              res.data.user.is_approved === false &&
              res.data.user.is_rejected === false
            ) {
              Toast.show({
                type: "pending",
                text2: "Your Account is pending for approvel",
              });
            } else if (
              res.data.user.is_approved === false &&
              res.data.user.is_rejected === true
            ) {
              Toast.show({
                type: "error",
                text1: "Your Account is rejected",
              });
            } else {
              dispatch(setActiveUser(res.data.user));
              dispatch(setToken(res.data.token));
              navigation.navigate("Drawer");
            }
          }
        })
        .catch((err) => Toast.show({ type: "error", text1: err.message }));
    }
  };

  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bg }}
    >
      <ScrollView>
        <SafeAreaView className="flex ">
          <View className="flex-row justify-center">
            <Image
              source={require("../assets/images/logo4.png")}
              style={{ width: 300, height: 300 }}
            />
          </View>
        </SafeAreaView>
        <View
          style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
          className="flex-1 bg-white px-8 pt-8"
        >
          <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">Email Address</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              placeholder="Enter Your Email"
              value={email}
              onChangeText={(value) => setEmail(value)}
            />
            <Text className="text-gray-700 ml-4">Password</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
              secureTextEntry
              placeholder="Enter Your Password"
              value={password}
              onChangeText={(value) => setPassword(value)}
            />

            <TouchableOpacity
              onPress={() => navigation.navigate("ForgetPassword")}
              className="flex items-end"
            >
              <Text className="text-gray-700 mb-5">Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="py-3 bg-amber-500 rounded-full"
              onPress={() => loginUser()}
            >
              {isLoading ? (
                <View className="flex items-center justify-center">
                  <UIActivityIndicator color="white" size={30} />
                </View>
              ) : (
                <Text className="font-xl font-bold text-xl text-center">
                  Login
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* <Text className="text-xl text-gray-700 font-bold text-center py-5">
            Or
          </Text>
          <View className="flex-row justify-center space-x-12">
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image
                source={require("../assets/icons/google.png")}
                className="w-10 h-10"
              />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image
                source={require("../assets/icons/apple.png")}
                className="w-10 h-10"
              />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image
                source={require("../assets/icons/facebook.png")}
                className="w-10 h-10"
              />
            </TouchableOpacity>
          </View> */}
          <View className="flex-row justify-center mt-7">
            <Text className="text-gray-500 font-semibold">
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text className="font-semibold text-amber-500"> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
