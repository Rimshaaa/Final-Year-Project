import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { COLOURS } from "../components/items";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import MyHeader from "../components/MyHeader";
import { color } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useUserUpdateMutation } from "../redux/services";
import Loader from "../components/Loader";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import { uploadImageToCloudinary } from "../utils";
import { setActiveUser } from "../redux/authSlice";

const Profile = ({ route }) => {
  const user = useSelector((state) => state.authReducer.activeUser);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [updateUser] = useUserUpdateMutation();

  const [pickedImage, setPickedImage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    image: user.image,
  });

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
          // navigation.goBack();
        }
      })
      .catch((err) => Toast.show({ type: "error", text1: err.message }));
  }

  return (
    <ScrollView>
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: COLOURS.white,
          flexDirection: "column",
        }}
      >
        <MyHeader
          Sidebar
          title="Profile"
          right="more-vertical"
          optionalBtn="shopping-cart"
          onRightPress={() => console.log("right")}
        />
        <View
          style={{
            marginTop: 10,
            width: 150,
            height: 150,
            alignItems: "center",
            marginLeft: 170,
            borderWidth: 2,
            borderColor: COLOURS.lightGray,
            borderBottomLeftRadius: 200,
            borderBottomRightRadius: 200,
            borderTopLeftRadius: 200,
            borderTopRightRadius: 200,
          }}
        >
          <TouchableOpacity
            style={{
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
                  borderRadius: 80,
                }}
                source={{ uri: pickedImage.uri }}
              />
            ) : (
              <Image
                style={{
                  width: 150,
                  height: 150,
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
                top: 100,
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

        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ paddingVertical: 20 }}>
            <Text
              style={{
                fontSize: 16,
                color: COLOURS.black,
                opacity: 0.6,
              }}
            >
              Name
            </Text>
            <TextInput
              style={{
                fontSize: 20,
                borderBottomWidth: 2,
                width: 440,
                height: 50,
                borderColor: COLOURS.lightGray,
                color: COLOURS.black,
                fontWeight: "600",
                opacity: 0.8,
              }}
              value={userData.name}
              onChangeText={(text) => setUserData({ ...userData, name: text })}
            />
          </View>

          <View style={{ paddingVertical: 20 }}>
            <Text
              style={{
                fontSize: 16,
                color: COLOURS.black,
                opacity: 0.6,
              }}
            >
              Email{" "}
            </Text>
            <TextInput
              style={{
                fontSize: 20,
                borderBottomWidth: 2,
                width: 440,
                height: 50,
                borderColor: COLOURS.lightGray,
                color: COLOURS.black,
                fontWeight: "600",
                opacity: 0.8,
              }}
              keyboardType="email-address"
              value={userData.email}
              onChangeText={(value) =>
                setUserData({ ...userData, email: value })
              }
            />
          </View>

          <View style={{ paddingVertical: 20 }}>
            <Text
              style={{
                fontSize: 16,
                color: COLOURS.black,
                opacity: 0.6,
              }}
            >
              Contact Number
            </Text>
            <TextInput
              style={{
                fontSize: 20,
                borderBottomWidth: 2,
                width: 440,
                height: 50,
                borderColor: COLOURS.lightGray,
                color: COLOURS.black,
                fontWeight: "600",
                opacity: 0.8,
              }}
              keyboardType="phone-pad"
              value={userData.phone}
              onChangeText={(value) =>
                setUserData({ ...userData, phone: value })
              }
            />
          </View>

          <View style={{ paddingVertical: 20 }}>
            <Text
              style={{
                fontSize: 16,
                color: COLOURS.black,
                opacity: 0.6,
              }}
            >
              Address
            </Text>
            <TextInput
              style={{
                fontSize: 20,
                borderBottomWidth: 2,
                width: 440,
                height: 50,
                borderColor: COLOURS.lightGray,
                color: COLOURS.black,
                fontWeight: "600",
                opacity: 0.8,
              }}
              value={userData.address}
              onChangeText={(value) =>
                setUserData({ ...userData, address: value })
              }
            />
          </View>
        </View>

        <View
          style={{
            position: "relative",
            width: "100%",
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={handleUpdate}
            style={{
              width: 450,
              height: 50,
              backgroundColor: COLOURS.accent,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              marginTop: 20,
              marginBottom: 90,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: COLOURS.black,
                letterSpacing: 1,
                marginRight: 10,
              }}
            >
              {isLoading ? <Loader /> : "Save Changes"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
