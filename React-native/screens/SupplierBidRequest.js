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
import { Bidrequest } from "../constants";
import BidRequest from "../components/BidRequest";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { useGetBiddersQuery } from "../redux/services";
import Empty from "../components/Empty";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import Loader from "../components/Loader";

export default function SupplierBidRequest({ route }) {
  const { item: post = {} } = route.params;
  const { data, isLoading, isFetching, refetch } = useGetBiddersQuery(post._id);

  const navigation = useNavigation();
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
                marginBottom: 10,
              }}
            >
              <Text
                style={{ fontSize: 25, fontWeight: "bold", marginLeft: 20 }}
              >
                Bid Requests
              </Text>
              <TouchableOpacity onPress={() => refetch()} className="mr-5">
                {isFetching ? (
                  <Loader size={28} color={Colors.resprimary} />
                ) : (
                  <Feather
                    name="refresh-cw"
                    size={28}
                    color={Colors.resprimary}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginBottom: 10, gap: 10 }}>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <BidRequest
                  post={post}
                  req={item}
                  key={index}
                  postLocation={post.location}
                />
              ))
            ) : (
              <Empty />
            )}
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}
