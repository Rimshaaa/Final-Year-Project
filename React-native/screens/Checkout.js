import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MyHeader2 from "../components/MyHeader2";
import { SelectList } from "react-native-dropdown-select-list";
import { countries } from "../constants/countries";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";

export default function Checkout({ route }) {
  const {
    item = {},
    items = [],
    storeName = "",
    supplierName = "",
  } = route.params;
  const navigation = useNavigation();
  const user = useSelector((state) => state.authReducer.activeUser);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });
  const [country, setCountry] = useState("");

  function handleContinue() {
    if (
      !formData.email ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.address ||
      !formData.city ||
      !formData.postalCode ||
      !formData.phone ||
      !country
    ) {
      Toast.show({ type: "error", text1: "Please fill all fields" });
    } else {
      navigation.navigate("Receipt", {
        item,
        items,
        formData,
        storeName,
        supplierName,
      });
    }
  }

  return (
    <View className="flex-1 bg-white">
      <MyHeader2
        back
        onPressBack={() => navigation.goBack()}
        title="Checkout"
        right="more-vertical"
        optionalBtn="shopping-cart"
        onRightPress={() => console.log("right")}
      />
      <ScrollView>
        <View
          className="flex-1 bg-white px-8 pt-8"
          style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        >
          <View className="form space-y-2 mb-24">
            <Text className="text-black ml-1" style={{ fontSize: 18 }}>
              Contact
            </Text>
            <TextInput
              className="p-2 text-gray-700 rounded-xl pl-6 mb-12"
              style={{ borderWidth: 1 }}
              placeholder="Email"
              value={formData.email}
              onChangeText={(value) =>
                setFormData({ ...formData, email: value })
              }
            />

            <Text className="text-black ml-1 mb-3" style={{ fontSize: 18 }}>
              Shipping address
            </Text>

            <SelectList
              setSelected={(key) => setCountry(key)}
              data={countries}
              save="value"
              placeholder="Select Country"
              boxStyles={{ backgroundColor: "#f3f4f6" }}
              //inputStyles={{ color: selected ? "#000" : "#a0a1a3" }}
              searchPlaceholder="Search"
            />

            <TextInput
              className="p-2 bg-gray-100 text-gray-700 rounded-2xl pl-6"
              placeholder="First name"
              value={formData.firstName}
              onChangeText={(value) =>
                setFormData({ ...formData, firstName: value })
              }
            />
            <TextInput
              className="p-2 bg-gray-100 text-gray-700 rounded-2xl pl-6 mb-2"
              placeholder="Last name"
              value={formData.lastName}
              onChangeText={(value) =>
                setFormData({ ...formData, lastName: value })
              }
            />
            <TextInput
              className="p-2 bg-gray-100 text-gray-700 rounded-2xl pl-6 mb-2"
              placeholder="Address"
              value={formData.address}
              onChangeText={(value) =>
                setFormData({ ...formData, address: value })
              }
            />
            <TextInput
              className="p-2 bg-gray-100 text-gray-700 rounded-2xl pl-6 mb-2"
              placeholder="City"
              value={formData.city}
              onChangeText={(value) =>
                setFormData({ ...formData, city: value })
              }
            />
            <TextInput
              className="p-2 bg-gray-100 text-gray-700 rounded-2xl pl-6 mb-2"
              placeholder="Postal code"
              keyboardType="number-pad"
              value={formData.postalCode}
              onChangeText={(value) =>
                setFormData({ ...formData, postalCode: value })
              }
            />
            <TextInput
              className="p-2 bg-gray-100 text-gray-700 rounded-2xl pl-6 mb-2"
              placeholder="Phone"
              keyboardType="phone-pad"
              value={formData.phone}
              onChangeText={(value) =>
                setFormData({ ...formData, phone: value })
              }
            />

            <TouchableOpacity
              onPress={() => handleContinue()}
              className="py-3 bg-purple-500 rounded-xl"
              //onPress={handleAdd}
            >
              <Text
                style={{ fontSize: 18 }}
                className="font-xl font-bold text-center text-black"
              >
                Continue to shipping
              </Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              onPressBack={() => navigation.goBack()}
              className="py-3  rounded-xl"
              //onPress={handleAdd}
            >
              <Text
                style={{ fontSize: 18 }}
                className="font-xl text-center text-black"
              >
                Return to cart
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
