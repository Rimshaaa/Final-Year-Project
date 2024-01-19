import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import OTPTextView from "react-native-otp-textinput";
import { useSelector } from "react-redux";
import { useVerifyOTPMutation } from "../redux/services";
import Loader from "../components/Loader";
import { COLOURS } from "../components/items2";
import Toast from "react-native-toast-message";
import Colors from "../constants/Colors";

export default function ResOTPInput({ route }) {
  const navigation = useNavigation();
  const { userId, prev } = route.params;

  const [verifOTP, { isLoading }] = useVerifyOTPMutation();

  const handleVerify = (otp) => {
    verifOTP({
      resetCode: otp,
      _id: userId,
    })
      .then((res) => {
        if (res.error) {
          Toast.show({ type: "error", text1: res.error.data.error });
        } else if (res.data.message) {
          navigation.navigate("ResResetPassword", { userId });
        }
      })
      .catch((err) => Toast.show({ type: "error", text1: err.message }));
  };
  const handleTextChange = (otp) => {
    if (otp.length === 4) {
      return handleVerify(otp);
    }
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: themeColors.bg }}
    >
      <View className="flex-col justify-center mt-80">
        <Text className="text-black text-2xl text-center">
          Please enter the 4 digit-code sent to your email address
        </Text>
        <OTPTextView
          containerStyle={{
            marginVertical: 40,
            marginHorizontal: 100,
          }}
          textInputStyle={{
            marginHorizontal: 10,
            borderBottomWidth: 2,
          }}
          tintColor={
            prev === "Supplier" ? Colors.primaryAmber : COLOURS.resprimary
          }
          offTintColor={
            prev === "Supplier" ? Colors.primaryAmber : COLOURS.resprimary
          }
          inputCount={4}
          keyboardType="numeric"
          handleTextChange={handleTextChange}
        />
        <View className="flex items-center mt-10">
          {isLoading && (
            <Loader
              color={
                prev === "Supplier" ? Colors.primaryAmber : COLOURS.resprimary
              }
              size={40}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
});
