import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { themeColors } from "../theme";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useRegisterMutation } from "../redux/services";
import { UIActivityIndicator } from "react-native-indicators";
import { DEFAULT_RESTAURANT_IMAGE } from "../config";
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

  const registerValidation = () => {
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

  const handleRegister = async () => {
    if (!fullName || !email || !phone || !address || !password) {
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
      register({
        name: fullName,
        email,
        phone,
        address,
        password,
        role: "restaurant",
        image: DEFAULT_RESTAURANT_IMAGE,
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
            navigation.navigate("ResLogin");
            Toast.show({
              type: "success",
              text1: "Thank you for registering!",
              text2: "Your account is pending for approval.",
            });
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
        <SafeAreaView className="flex">
          <View className="flex-row justify-center">
            <Image
              source={require("../assets/images/logo4.png")}
              style={{ width: 250, height: 250, marginTop: 4 }}
            />
          </View>
        </SafeAreaView>

        <View
          className="flex-1 bg-white px-4 pt-4"
          style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
        >
          <View className="form space-y-2">
            <Text className="text-gray-700 ml-1">Restaurant Name</Text>
            <TextInput
              className="p-2 bg-gray-100 text-gray-700 rounded-2xl"
              onChangeText={(text) => setFullName(text)}
              value={fullName}
              placeholder="Enter Name"
            />
            <Text className="text-gray-700 ml-1">Email Address</Text>
            <TextInput
              className="p-2 bg-gray-100 text-gray-700 rounded-2xl"
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="Enter Email"
              keyboardType="email-address"
            />
            <Text className="text-gray-700 ml-1">Enter Phone number</Text>
            <TextInput
              className="p-2 bg-gray-100 text-gray-700 rounded-2xl"
              onChangeText={(text) => setPhone(text)}
              value={phone}
              placeholder="Enter contact number"
              keyboardType="phone-pad"
            />
            <Text className="text-gray-700 ml-1">Enter Address</Text>
            <TextInput
              className="p-2 bg-gray-100 text-gray-700 rounded-2xl"
              onChangeText={(text) => setAddress(text)}
              value={address}
              placeholder="Enter your house address"
            />

            <Text className="text-gray-700 ml-1">Password</Text>
            <TextInput
              className="p-2 bg-gray-100 text-gray-700 rounded-2xl"
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
              value={password}
              placeholder="Enter Password"
            />
            <Text className="text-gray-700 ml-1">Re-enter Password</Text>
            <TextInput
              className="p-2 bg-gray-100 text-gray-700 rounded-2xl mb-5"
              secureTextEntry
              placeholder="Enter Password"
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
            />
            <TouchableOpacity
              onPress={() => registerValidation()}
              className="py-3 bg-purple-500 rounded-full"
            >
              {isLoading ? (
                <View className="flex items-center justify-center">
                  <UIActivityIndicator color="white" size={30} />
                </View>
              ) : (
                <Text className="font-xl font-bold text-xl text-center">
                  Sign Up
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <Text className="text-xl text-gray-700 font-bold text-center py-2">
            Or
          </Text>
          <View
            className="flex-row justify-center "
            style={{ marginBottom: 10 }}
          >
            <Text className="text-gray-500 text-lg font-bold">
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("ResLogin")}>
              <Text className="font-bold text-lg text-purple-500"> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <MapModal
        isOpen={mapOpen}
        setIsOpen={setMapOpen}
        poi={poi}
        setPoi={setPoi}
        handleConfirm={handleRegister}
        screen="res"
      />
    </View>
  );
}
