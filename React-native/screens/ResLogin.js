import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { useLoginMutation } from "../redux/services";
import { UIActivityIndicator } from "react-native-indicators";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { setActiveUser, setToken } from "../redux/authSlice";

export default function ResLogin() {
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
            if (res.data.user.role === "supplier") {
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
              navigation.navigate("BottomNavigation2");
            }
          }
        })
        .catch((err) => Toast.show({ type: "error", text1: err.message }));
    }
  };

  const navigation = useNavigation();
  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bg }}
    >
      <ScrollView>
        <SafeAreaView className="flex ">
          {/*  <View className="flex-row justify-start">
          <TouchableOpacity onPress={()=> navigation.goBack()}
          className="bg-purple-500 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
  </View>*/}
          <View className="flex-row justify-center">
            <Image
              source={require("../assets/images/supplieroLogo.png")}
              style={{ width: 300, height: 300 }}
            />
          </View>
        </SafeAreaView>
        <View
          style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
          className="flex-1 bg-white px-4 "
        >
          <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">Email Address</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value={email}
              placeholder="Enter email"
              onChangeText={(email) => setEmail(email)}
            />

            <Text className="text-gray-700 ml-4">Password</Text>
            <TextInput
              xs
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
              secureTextEntry
              value={password}
              placeholder="Enter Password"
              onChangeText={(password) => setPassword(password)}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("ResForgetPassword")}
              className="flex items-end"
            >
              <Text className="text-gray-700 mb-5">Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="py-3 bg-purple-500 rounded-full"
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
          <View
            className="flex-row justify-center mt-8"
            style={{ marginBottom: 20 }}
          >
            <Text className="text-gray-500 font-semibold">
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("ResSignUp")}>
              <Text className="font-bold text-purple-500"> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
