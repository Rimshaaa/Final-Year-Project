import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { themeColors } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import MyHeader2 from "../components/MyHeader2";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { uploadImageToCloudinary } from "../utils";
import Loader from "../components/Loader";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { useUserUpdateMutation } from "../redux/services";
import Entypo from "react-native-vector-icons/Entypo";
import { COLOURS } from "../components/items2";
import { setActiveUser } from "../redux/authSlice";

export default function ResEditProfile() {
  const user = useSelector((state) => state.authReducer.activeUser);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [updateUser] = useUserUpdateMutation();

  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    image: user.image,
    password: undefined,
  });

  const [pickedImage, setPickedImage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setPickedImage(result.assets[0]);
    }
  };

  async function handleUpdate() {
    setIsLoading(true);
    let response;
    if (pickedImage) {
      response = await uploadImageToCloudinary(pickedImage);
    }
    updateUser({
      id: user._id,
      data: {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        image: response,
        password: userData.password,
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.error) {
          Toast.show({ type: "error", text1: res.error.data.error });
          setPickedImage();
        } else if (res.data.message) {
          dispatch(setActiveUser(res.data.data));
          Toast.show({ type: "success", text1: res.data.message });
          navigation.goBack();
        }
      })
      .catch((err) => Toast.show({ type: "error", text1: err.message }));
  }

  return (
    <View className="flex-1 bg-white">
      <MyHeader2
        title="Profile"
        right="more-vertical"
        optionalBtn="shopping-cart"
        onRightPress={() => console.log("right")}
      />

      <SafeAreaView className="flex">
        <View className="flex-row justify-center">
          <TouchableOpacity
            style={{
              marginTop: 40,
              width: 200,
              height: 200,
              alignItems: "center",
            }}
            onPress={pickImage}
          >
            {pickedImage ? (
              <Image
                style={{
                  width: 150,
                  height: 150,
                  marginTop: 30,
                  borderRadius: 80,
                }}
                source={{ uri: pickedImage.uri }}
              />
            ) : (
              <Image
                style={{
                  width: 150,
                  height: 150,
                  marginTop: 30,
                  borderRadius: 80,
                }}
                source={{ uri: userData.image }}
              />
            )}

            <View
              style={{
                width: 50,
                height: 50,
                backgroundColor: COLOURS.lightGray,
                borderTopRightRadius: 100,
                borderBottomLeftRadius: 100,
                borderTopLeftRadius: 100,
                borderBottomRightRadius: 100,
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                bottom: 90,
                top: 130,
                right: 20,
                marginLeft: 400,
              }}
            >
              <Entypo
                name="camera"
                style={{ fontSize: 18, color: COLOURS.black }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View
        className="flex-1 bg-white px-8 pt-8"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <View className="form space-y-2">
          <TextInput
            className="p-3 bg-gray-100 text-gray-700 rounded-2xl"
            value={userData.name}
            onChangeText={(text) => setUserData({ ...userData, name: text })}
          />

          <TextInput
            className="p-3 bg-gray-100 text-gray-700 rounded-2xl"
            value={userData.email}
            onChangeText={(text) => setUserData({ ...userData, email: text })}
          />

          <TextInput
            className="p-3 bg-gray-100 text-gray-700 rounded-2xl"
            value={userData.phone}
            onChangeText={(text) => setUserData({ ...userData, phone: text })}
          />

          <TextInput
            className="p-3 bg-gray-100 text-gray-700 rounded-2xl"
            value={userData.address}
            onChangeText={(text) => setUserData({ ...userData, address: text })}
          />

          <TextInput
            className="p-3 bg-gray-100 text-gray-700 rounded-2xl mb-7"
            secureTextEntry
            placeholder="Enter New Password"
            value={userData.password}
            onChangeText={(text) =>
              setUserData({ ...userData, password: text })
            }
          />

          <TouchableOpacity
            onPress={() => handleUpdate()}
            className="py-3 bg-purple-500 rounded-xl py-4"
          >
            <Text className="font-xl font-bold text-center text-white">
              {isLoading ? <Loader /> : "Save Changes"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
