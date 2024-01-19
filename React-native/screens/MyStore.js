import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import MyHeader from "../components/MyHeader";
import { useSelector } from "react-redux";
import {
  useDeleteSupplierStoreMutation,
  useGetSupplierStoreQuery,
} from "../redux/services";
import Toast from "react-native-toast-message";
import Loader from "../components/Loader";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import CustomModal from "../components/Modal";
import Colors from "../constants/Colors";

const { width } = Dimensions.get("window");

export default function MyStore({ route }) {
  const { data: store, isLoading: storeLoading } = useGetSupplierStoreQuery();

  // const { store } = route.params;
  const user = useSelector((state) => state.authReducer.activeUser);

  const [deleteStore, { isLoading }] = useDeleteSupplierStoreMutation();

  const [deleteModal, setDeleteModal] = useState(false);

  const navigation = useNavigation();

  function handleDelete() {
    deleteStore(store?._id)
      .then((res) => {
        if (res.error) {
          Toast.show({ type: "error", text1: res.error.data.error });
        } else if (res.data.message) {
          navigation.navigate("SupplierStore");
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
        title="My Store"
        right="more-vertical"
        optionalBtn="shopping-cart"
        onRightPress={() => console.log("right")}
      />
      <SafeAreaView className="flex">
        <View className="flex-row justify-center mt-5">
          <Image
            source={{ uri: user?.image }}
            style={{
              width: 100,
              height: 100,
              marginBottom: 30,
              borderRadius: 50,
              resizeMode: "contain",
            }}
          />
        </View>

        <View className="flex-row justify-center items-center">
          <Text style={{ fontSize: 28, fontWeight: "bold" }}>
            {store?.name}
          </Text>
          {isLoading ? (
            <View className="mt-2">
              <Loader color="#f59e0b" size={20} />
            </View>
          ) : (
            <TouchableOpacity onPress={() => setDeleteModal(true)}>
              <MaterialIcons name="delete-outline" size={30} color="red" />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>

      <View className="flex-row justify-center mt-5">
        <View className="py-3 bg-amber-500 rounded-full w-36">
          <TouchableOpacity
            onPress={() => navigation.navigate("EditStore", { store })}
          >
            <Text className="text-xl font-bold text-center text-gray-700">
              Edit Store
            </Text>
          </TouchableOpacity>
        </View>

        {/* <View className="py-3 ml-5 bg-amber-500 rounded-full w-36">
          <TouchableOpacity
            onPress={() => navigation.navigate("AddItem", { store })}
          >
            <Text className="text-xl font-bold text-center text-gray-700">
              Add Item
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>

      {store?.items?.length > 0 ? (
        <FlatList
          numColumns={2}
          data={store?.items}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EditStoreItems", {
                  item,
                  storeId: store._id,
                })
              }
              style={styles.item}
            >
              <View>
                <Image source={{ uri: item.image }} style={styles.image} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{item?.name}</Text>
                <Text style={[styles.text, { color: Colors.darkGray }]}>
                  {item?.category?.name}
                </Text>
                <Text
                  style={[
                    styles.text,
                    {
                      marginBottom: 10,
                      color: Colors.primaryAmber,
                      fontWeight: "bold",
                    },
                  ]}
                >
                  Rs {item.price}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View
          className="flex items-center p-3 mb-2 mx-2 border-amber-500 "
          style={{
            marginTop: 50,
            height: 200,
            borderWidth: 2,
            borderRadius: 10,
          }}
        >
          <View className="flex-row items-center mt-14">
            <Text style={{ fontSize: 24 }}>You dont have Items</Text>
          </View>
        </View>
      )}

      <CustomModal
        isOpen={deleteModal}
        setIsOpen={setDeleteModal}
        icon={<Octicons name="alert" size={30} color="#f59e0b" />}
        text="Are you sure want to delete ?"
        handleConfirm={handleDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    marginLeft: 10,
    marginRight: 10,
  },
  item: {
    width: width / 2 - 24,
    marginTop: 20,
    marginLeft: 26,
    marginBottom: 16,
    marginLeft: 20,
    borderWidth: 1,
    borderColor: "#f59e0b",
    borderRadius: 10,
  },
  image: {
    height: 130,
    width: 140,
    resizeMode: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 5,
    borderRadius: 10,
  },
  textContainer: {
    // marginVertical: 4,
  },
  text: {
    fontSize: 18,
    // textAlign: "center",
    marginLeft: 30,
  },
});
