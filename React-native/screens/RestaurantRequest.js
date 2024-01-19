import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import MyHeader from "../components/MyHeader";
import { request } from "../constants";
import Request from "../components/Request";
import { useGetSupplierOrdersQuery } from "../redux/services";
import LoadingPlacholder from "../common/Placeholders/SuppliersList";
import Empty from "../components/Empty";

export default function RestaurantRequest() {
  const { data, isFetching } = useGetSupplierOrdersQuery();

  const hasRequest = data?.some((order) => order.status === "pending");

  const navigation = useNavigation();
  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bg }}
    >
      <MyHeader
        back
        onPressBack={() => navigation.goBack()}
        title="Requests"
        right="more-vertical"
        optionalBtn="shopping-cart"
        onRightPress={() => console.log("right")}
      />

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
              <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                Restaurant Request
              </Text>
            </View>
          </View>

          <View>
            {isFetching && <LoadingPlacholder />}
            {!isFetching && hasRequest ? (
              data.map((item) => {
                if (item.status === "pending") {
                  return <Request req={item} key={item._id} />;
                }
              })
            ) : (
              <Empty />
            )}
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}
