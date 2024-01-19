import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { themeColors } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
import { UIActivityIndicator } from "react-native-indicators";
import { useRegisterMutation } from "../redux/services";
import Toast from "react-native-toast-message";
import { DEFAULT_SUPPLIER_IMAGE } from "../config";
import MapModal from "../components/MapModal";

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mapOpen, setMapOpen] = useState(false);
  const [poi, setPoi] = useState();

  const [register, { isLoading }] = useRegisterMutation();

  const handleRegister = () => {
    if (!fullName.trim || !email.trim || !phone.trim || !address.trim || !password.trim) {
      Toast.show({
        type: "error",
        text1: "Please Fill All Fields",
      });
    } else if (password.length < 6) {
      Toast.show({
        type: "error",
        text1: "Password Must Be At Least 6 Characters",
      });
    } else if (password !== confirmPassword) {
      Toast.show({ type: "error", text1: "Passwords Must Be Matching" });
    } else {
      setMapOpen(true);
    }
  };

  function handleRegisterApi() {
    register({
      name: fullName,
      email,
      phone,
      address,
      password,
      role: "supplier",
      image: DEFAULT_SUPPLIER_IMAGE,
      registration_method: "Email",
      location: {
        latitude: poi.coordinate.latitude,
        longitude: poi.coordinate.longitude,
      },
    })
      .then((res) => {
        if (res.error) {
          Toast.show({ type: "error", text1: res.error.data.error });
        } else if (res.data.message) {
          Toast.show({ type: "success", text1: "Registration Success!" });
          navigation.navigate("Login");
          Toast.show({
            type: "success",
            text1: "Thank you for registering!",
            text2: "Your account is pending for approval.",
          });
        }
      })
      .catch((err) => Toast.show({ type: "error", text1: err.message }));
  }

  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bg }}
    >
      <ScrollView>
        <SafeAreaView className="flex">
          <View className="flex-row justify-center">
            <Image
              source={require("../assets/images/logo4.png")}
              style={{ width: 150, height: 150, marginTop: 10 }}
            />
          </View>
        </SafeAreaView>

        <View
          className="flex-1 bg-white px-8 pt-8"
          style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        >
          <View className="form space-y-2">
            <Text className="text-gray-700 ml-1">Full Name</Text>
            <TextInput
              className="p-2 bg-gray-100 text-gray-700 rounded-2xl pl-4"
              value={fullName}
              onChangeText={(value) => setFullName(value)}
              placeholder="Enter Supplier Name"
            />
            <Text className="text-gray-700 ml-1">Email Address</Text>
            <TextInput
              className="p-2 bg-gray-100 text-gray-700 rounded-2xl pl-4"
              value={email}
              onChangeText={(value) => setEmail(value)}
              placeholder="Enter Email"
            />
            <Text className="text-gray-700 ml-1">Enter Phone number</Text>
            <TextInput
              className="p-2 bg-gray-100 text-gray-700 rounded-2xl pl-4"
              value={phone}
              onChangeText={(value) => setPhone(value)}
              placeholder="Enter contact number"
            />
            <Text className="text-gray-700 ml-1">Enter Address</Text>
            <TextInput
              className="p-2 bg-gray-100 text-gray-700 rounded-2xl pl-4"
              value={address}
              onChangeText={(value) => setAddress(value)}
              placeholder="Enter your house address"
            />

            <Text className="text-gray-700 ml-1">Password</Text>
            <TextInput
              className="p-2 bg-gray-100 text-gray-700 rounded-2xl pl-4"
              secureTextEntry
              value={password}
              onChangeText={(value) => setPassword(value)}
              placeholder="Enter Password"
            />
            <Text className="text-gray-700 ml-1">Re-enter Password</Text>
            <TextInput
              className="p-2 bg-gray-100 text-gray-700 rounded-2xl pl-4 mb-5"
              secureTextEntry
              value={confirmPassword}
              onChangeText={(value) => setConfirmPassword(value)}
              placeholder="Enter Password"
            />

            <TouchableOpacity
              onPress={() => handleRegister()}
              className="py-3 bg-amber-500 rounded-full"
            >
              {isLoading ? (
                <View className="flex items-center justify-center">
                  <UIActivityIndicator color="white" size={30} />
                </View>
              ) : (
                <Text className="font-xl font-bold text-xl text-center text-black">
                  Sign Up
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <Text className="text-xl text-gray-700 font-bold text-center py-2">
            Or
          </Text>
          <View className="flex-row justify-center ">
            <Text className="text-gray-500 text-lg font-bold">
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text className="font-bold text-lg text-amber-500"> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <MapModal
        isOpen={mapOpen}
        setIsOpen={setMapOpen}
        poi={poi}
        setPoi={setPoi}
        handleConfirm={handleRegisterApi}
        screen="sup"
      />
    </View>
  );
}
