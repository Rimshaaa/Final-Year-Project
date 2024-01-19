import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { StatusBar } from "expo-status-bar";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import MyHeader2 from "../components/MyHeader2";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";
import { useGetSupplierCategoriesQuery } from "../redux/services";
import Toast from "react-native-toast-message";
import { BASE_URL } from "../config";
import axios from "axios";
import * as Icon from "react-native-feather";
import Loader from "../components/Loader";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { BackHandler } from "react-native";


export default function RestaurantDashboard() {
  const user = useSelector((state) => state.authReducer.activeUser);
  const navigation = useNavigation();
  const { data: supCategories } = useGetSupplierCategoriesQuery();

  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showResult, setShowResult] = useState(false);
 

  const searchUsers = async () => {
    if (query.length === 0) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}user_search?name=${query}&role=supplier`
      );
      const users = response.data || [];
      setSearchResults(users);
      setIsLoading(false);
      setShowResult(true);
    } catch (error) {
      setIsLoading(false);
      Toast.show({ type: "error", text1: error.message });
    }
  };

  useEffect(() => {
    if (query.length === 0) {
      setShowResult(false);
    }
  }, [query]);

  return (
    <View className="flex-1 bg-white" style={{ flex: 1, flexDirection: 'column' }}>
      <StatusBar />

      <Image
        source={require("../assets/images/bgpic.jpg")}
        style={{ height: 200 }}
        className="w-full absolute -top-5 opacity-10"
      />

      <MyHeader2
        title="Restaurant Dashboard"
        right="more-vertical"
        optionalBtn="shopping-cart"
        onRightPress={() => console.log("right")}
      />
      <SafeAreaView className="flex-1" style={{ flex: 1, flexDirection: 'column' }}>
        <View className="flex items-center">
          <Text style={{ fontSize: 24, fontWeight: "bold" }}></Text>
        </View>

        {/* search bar */}
        <View className="mx-5 shadow" style={{ position: "relative" }}>
          <View className="flex-row items-center rounded-full p-1 bg-[#e6e6e6]">
            <TextInput
              placeholder="Search Suppliers"
              className="p-4 flex-1 font-semibold text-gray-700"
              value={query}
              onChangeText={(text) => setQuery(text)}
            />
            <TouchableOpacity
              className="rounded-full p-2 mr-2"
              style={{ backgroundColor: themeColors.resbg }}
              onPress={() => searchUsers()}
            >
              <MagnifyingGlassIcon size="25" strokeWidth={2} color="white" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              position: "absolute",
              width: "100%",
              top: 75,
              borderRadius: 10,
            }}
          >
            {isLoading ? (
              <Loader color={Colors.resprimary} />
            ) : showResult && searchResults.length > 0 ? (
              <FlatList
                style={{
                  backgroundColor: "#e6e6e6",
                  zIndex: 1,
                  borderRadius: 10,
                }}
                data={searchResults && searchResults}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <View
                    style={{
                      backgroundColor: Colors.resprimary,
                      marginTop: 10,
                      borderRadius: 10,
                    }}
                    className="p-2 flex-row justify-between items-center my-5 mx-2"
                  >
                    <View
                      style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
                      className="p-1 rounded-full"
                    >
                      <Image
                        style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
                        className="w-16 h-16 rounded-full"
                        source={{ uri: item?.image }}
                      />
                    </View>

                    <View className="flex-1 ml-3">
                      <Text className="text-lg font-bold text-white">
                        {item?.name}
                      </Text>
                      <View className="flex-row mt-2 item-center">
                        <Text className="mr-2">
                          <FontAwesome5
                            name="phone-alt"
                            size={15}
                            color="white"
                          />
                        </Text>
                        <Text className="text-white font-semibold">
                          {item.phone}
                        </Text>
                      </View>
                    </View>
                    <View className="flex-row items-center space-x-3 mr-3">
                      <TouchableOpacity
                        onPress={() => {
                          setShowResult(false);
                          setQuery(" ");
                          navigation.navigate("ChattingScreen", {
                            recepientId: item?._id,
                            recepientName: item?.name,
                            recepientImage: item?.image,
                          });
                        }}
                        className="bg-white p-2 rounded-full"
                      >
                        <Icon.MessageSquare
                          fill={Colors.resprimary}
                          stroke={Colors.resprimary}
                          strokeWidth="5"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            ) : (
              showResult &&
              searchResults.length === 0 && (
                <Text
                  className="text-lg text-center bg-gray-200 py-5"
                  style={{ borderRadius: 10 }}
                >
                  No Supplier Found
                </Text>
              )
            )}
          </View>
        </View>

        <View style={{ zIndex: -1}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("GenerateRequest", { supCategories })
            }
          >
            <View
              className="flex-row items-center p-3 mb-2 mt-20 bg-purple-500"
              style={{
                position: "relative",
                marginLeft: 10,
                marginRight:10,
                borderRadius: 40,
                borderWidth: 1,
              }}
            >
              <Image
                source={require("../assets/images/supplier.png")}
                style={{ width: 180, height: 180 }}
              />
              <View>
                <Text
                  style={{
                    position: "relative",
                    fontSize: 20,
                    marginLeft: 20,
                    marginBottom: 10,
                    marginTop: 20,
                    fontWeight: "bold",
                    color: Colors.black,
                  }}
                >
                 Find Supplier
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("FindSuppliers", { supCategories })
            }
          >
            <View
              className="flex-row items-center p-3 mb-2 mx-2 ml-14 bg-purple-500 "
              style={{
                position: "relative",
                marginLeft: 10,
                marginRight:10,
                borderRadius: 40,
                borderWidth: 1,
              }}
            >
              <Image
                source={require("../assets/images/explore.png")}
                style={{ width: 160, height: 150 }}
              />
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    position: "relative",
                    marginLeft: 20,
                    marginTop: 20,
                    fontWeight: "bold",
                    color: Colors.black,
                  }}
                >
                  Direct Purchase
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
