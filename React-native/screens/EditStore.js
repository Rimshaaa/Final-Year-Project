import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { themeColors } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import MyHeader from "../components/MyHeader";
import { useUpdateSupplierStoreMutation } from "../redux/services";
import Toast from "react-native-toast-message";
import Loader from "../components/Loader";

// subscribe for more videos like this :)
export default function EditStore({ route }) {
  const { store } = route.params;
  const [formData, setFormData] = useState({
    storeName: store.name,
    storeDescription: store.description,
    storeType: store.store_type,
    Address: store.address,
  });
  const [updateStore, { isLoading }] = useUpdateSupplierStoreMutation();

  const navigation = useNavigation();

  function handleCreateStore() {
    updateStore({
      id: store._id,
      data: {
        name: formData.storeName,
        description: formData.storeDescription,
        store_type: formData.storeType,
        address: formData.Address,
      },
    })
      .then((res) => {
        if (res.error) {
          Toast.show({ type: "error", text1: res.error.data.error });
        } else if (res.data.message) {
          navigation.navigate("MyStore", { store: res.data.store });
        }
      })
      .catch((err) => Toast.show({ type: "error", text1: err.message }));
  }

  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bg }}
    >
      <MyHeader
        back
        onPressBack={() => navigation.goBack()}
        title="My store"
        right="more-vertical"
        optionalBtn="shopping-cart"
        onRightPress={() => console.log("right")}
      />

      <SafeAreaView className="flex">
        <View className="flex-row justify-start"></View>

        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/shopIcon.jpg")}
            style={{ width: 80, height: 80 }}
          />
        </View>
      </SafeAreaView>
      <View
        className="flex-1 bg-white px-8 pt-8"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-1">Store Name</Text>
          <TextInput
            className="p-2 bg-gray-100 text-gray-700 rounded-2xl"
            placeholder="Enter Name"
            value={formData.storeName}
            onChangeText={(value) =>
              setFormData({ ...formData, storeName: value })
            }
          />
          <Text className="text-gray-700 ml-1">Store description</Text>
          <TextInput
            className="p-2 bg-gray-100 text-gray-700 rounded-2xl"
            placeholder="Enter Description"
            value={formData.storeDescription}
            onChangeText={(value) =>
              setFormData({ ...formData, storeDescription: value })
            }
          />
          <Text className="text-gray-700 ml-1">Store type</Text>
          <TextInput
            className="p-2 bg-gray-100 text-gray-700 rounded-2xl"
            placeholder="Grocery Store"
            value={formData.storeType}
            onChangeText={(value) =>
              setFormData({ ...formData, storeType: value })
            }
          />
          <Text className="text-gray-700 ml-1">Address</Text>
          <TextInput
            className="p-2 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Enter your store address"
            value={formData.Address}
            onChangeText={(value) =>
              setFormData({ ...formData, Address: value })
            }
          />

          {/* <Text className="text-gray-700 ml-1">Password</Text>
          <TextInput
            className="p-2 bg-gray-100 text-gray-700 rounded-2xl"
            placeholder="Enter Password"
          />
          <Text className="text-gray-700 ml-1">Re-enter Password</Text>
          <TextInput
            className="p-2 bg-gray-100 text-gray-700 rounded-2xl mb-5"
            placeholder="Enter Password"
          /> */}
          <TouchableOpacity
            className="py-3 bg-amber-500 rounded-full"
            onPress={() => handleCreateStore()}
          >
            <Text className="font-x2 font-bold text-center text-gray-700">
              {isLoading ? (
                <View className="flex justify-center align-center">
                  <Loader color="white" size={26} />
                </View>
              ) : (
                "Update"
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
