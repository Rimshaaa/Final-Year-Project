import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import MyHeader from "../components/MyHeader";
import { Bidrequest } from "../constants";
import BidRequest from "../components/BidRequest";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { useGetUserBidsQuery, useUpdateBidMutation } from "../redux/services";
import Empty from "../components/Empty";
import Toast from "react-native-toast-message";
import Loader from "../components/Loader";
import SkeletonLoader from "../common/Placeholders/SuppliersList";
import { BackHandler } from "react-native";

export default function ResBids({ route }) {
  const { prevScreen = "" } = route.params;
  const navigation = useNavigation();
  const { data, isLoading, refetch, isFetching } = useGetUserBidsQuery();
  const [selectedBid, setSelectedBid] = useState("");
  const [updateBid, { isLoading: updateLoading }] = useUpdateBidMutation();

  let twoButtonAlert = (id) => {
    Alert.alert("Confirm", "Are you sure want to delete ?", [
      {
        text: "Cancel",
        onPress: () => {},
      },
      {
        text: "Yes",
        onPress: () => handleUpdateBid(id),
      },
    ]);
  };

  function handleUpdateBid(id) {
    updateBid({ id, data: { status: "cancelled" } })
      .then((res) => {
        if (res.error) {
          Toast.show({ type: "error", text1: res.error.data.error });
        } else if (res.message) {
          Toast.show({ type: "success", text1: "Update Success" });
          refetch();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const backAction = () => {
    if (prevScreen === "create") {
      navigation.navigate("BottomNavigation2");
    } else {
      navigation.goBack();
    }
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <View
      className="flex-1 flex bg-white"
      style={{ backgroundColor: themeColors.bg }}
    >
      <View className="flex-row justify-start mx-5 mt-12">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="border border-purple-500 rounded-xl"
        >
          <ChevronLeftIcon size="30" color="purple" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <SafeAreaView
          style={{
            backgroundColor: "#fff",
            flex: 1,
            paddingHorizontal: 20,
          }}
        >
          <View style={{ marginTop: 20 }}>
            <View
              style={{
                paddingVertical: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  marginLeft: 20,
                  marginBottom: 10,
                }}
              >
                My Requests
              </Text>
            </View>
          </View>

          <View>
            {isFetching && <SkeletonLoader />}
            {!isFetching &&
              data &&
              data.length > 0 &&
              data.map((req) => (
                <TouchableOpacity
                  onPress={() =>
                    req.status === "open" &&
                    navigation.navigate("SupplierBidRequest", { item: req })
                  }
                  key={req._id}
                  className="flex-row items-center bg-white p-3 rounded-3xl shadow-xl mb-4 mx-2"
                  style={{
                    backgroundColor:
                      req.status === "open"
                        ? "#CF9FFF"
                        : req.status === "cancelled"
                        ? "#fda4af"
                        : req.status === "completed"
                        ? "#7dd3fc"
                        : "",
                  }}
                >
                  <View className="flex flex-1 space-y-3 ">
                    <View className="pl-3">
                      <Text className="text-2xl font-semibold">
                        {req.item_name}
                      </Text>
                      <Text className="text-gray-600 mt-3 text-xl">
                        {req.category.name}
                      </Text>
                    </View>
                    <View className="flex-row pl-3 justify-between items-center">
                      <Text className="text-gray-700 text-lg font-bold"></Text>
                      <View className="flex-row gap-2 items-center">
                        <Text className="text-black capitalize text-lg tracking-wider mr-3">
                          {req.status === "open" ? "In-Progress" : req.status}
                        </Text>
                        {req.status === "open" && (
                          <TouchableOpacity
                            onPress={() => {
                              setSelectedBid(req._id);
                              twoButtonAlert(req._id);
                            }}
                            className="p-1"
                            style={{
                              borderWidth: 1,
                              backgroundColor: "red",
                              borderColor: "red",
                              width: 150,
                              height: 42,
                              borderRadius: 20,
                            }}
                          >
                            <Text
                              style={{
                                textAlign: "center",
                                marginTop: 3,
                                fontSize: 18,
                                color: "white",
                              }}
                              className="tracking-wider"
                            >
                              {updateLoading && selectedBid === req._id ? (
                                <Loader />
                              ) : (
                                "Cancel Bid"
                              )}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}
