import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";
import { themeColors } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import MyHeader2 from "../components/MyHeader2";
import Colors from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { api } from "../redux/services";

export default function Profile() {
  const user = useSelector((state) => state.authReducer.activeUser);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bg }}
    >
      <MyHeader2
        Sidebar
        right="more-vertical"
        title="Profile"
        optionalBtn="shopping-cart"
        onRightPress={() => console.log("right")}
      />
      <View style={{ backgroundColor: Colors.gray }}>
        <View className="flex-row">
          <Image
            source={{ uri: user?.image }}
            style={{
              width: 165,
              height: 150,
              marginBottom: 20,
              marginTop: 50,
              marginLeft: 20,
              resizeMode: "contain",
              borderRadius: 70,
            }}
          />
          <View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: Colors.black,
                marginTop: 70,
                marginLeft: 20,
              }}
            >
              {user?.name}
            </Text>
            <Text style={{ fontSize: 16, color: Colors.black, marginLeft: 20 }}>
              Best taste with best quality
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate("ResEditProfile")}
              className=" bg-purple-500 rounded-xl items-center"
              style={{
                marginTop: 20,
                marginBottom: 20,
                marginLeft: 20,
                width: 150,
              }}
            >
              <Text className="font-xl font-bold text-center text-black mt-2 mb-2">
                Edit Profiles
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView>
        <SafeAreaView className="flex mb-60">
          <View
            className="flex-1 bg-white px-8 pt-8"
            style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
          >
            <View className="form space-y-2">
              {/* <TouchableOpacity
                className="py-3 bg-gray-300 mt-12"
                style={{ marginTop: 10, marginBottom: 20, height: 60 }}
              >
                <Text
                  className="font-4xl font-bold text-center text-black"
                  style={{ fontSize: 24 }}
                >
                  View more options
                </Text>
              </TouchableOpacity> */}

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ResBids", { prevScreen: "profile" })
                }
                className="py-3 bg-purple-500 rounded-xl"
                style={{ marginTop: 40, height: 60 }}
              >
                <Text
                  className="font-xl text-center text-black"
                  style={{ fontSize: 18 }}
                >
                  Bid Requests
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("ResOrderTracking")}
                className="py-3 bg-purple-500 rounded-xl"
                style={{ marginTop: 40, height: 60 }}
              >
                <Text
                  className="font-xl text-center text-black"
                  style={{ fontSize: 18 }}
                >
                  Order Tracking
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ContractForm", { prevScreen: "profile" })
                }
                className="py-3 bg-purple-500 rounded-xl"
                style={{ marginTop: 40, height: 60 }}
              >
                <Text
                  className="font-xl text-center text-black"
                  style={{ fontSize: 18 }}
                >
                  Contract Form
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("FeedbackScreen")
                }
                className="py-3 bg-purple-500 rounded-xl"
                style={{ marginTop: 40, height: 60 }}
              >
                <Text
                  className="font-xl text-center text-black"
                  style={{ fontSize: 18 }}
                >
                  File Dispute
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  dispatch(logout());
                  dispatch(api.util.resetApiState());
                  navigation.navigate("SupplierOrRestaurant");
                }}
                className="py-3 bg-purple-500 rounded-xl"
                style={{ marginTop: 40, height: 60 }}
              >
                <Text
                  className="font-xl text-center text-black"
                  style={{ fontSize: 18 }}
                >
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}
