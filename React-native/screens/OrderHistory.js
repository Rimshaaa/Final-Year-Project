import { View, ScrollView} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import ResOrderHistory from "../components/ResOrderHistory";
import { orderhistory } from "../constants";
import MyHeader2 from "../components/MyHeader2";
import { useGetOrdersQuery } from "../redux/services";
import Empty from "../components/Empty";
import Loading from "../common/Placeholders/SuppliersList";


export default function OrderHistory(props) {
  const navigation = useNavigation();
  const { data, isFetching } = useGetOrdersQuery(null, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const [activeCategory, setActiveCategory] = useState("Oranges");
  const hasReceivedOrder = data?.some((order) => order.status === "received");

  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bg }}
    >
      <MyHeader2
        title="Order History"
        right="more-vertical"
        optionalBtn="shopping-cart"
        onRightPress={() => console.log("right")}
      />
<ScrollView> 
  <SafeAreaView className="flex-1 flex justify-between mb-32 bg-white">
        <View className="cart mx-5 flex-1">
          <View>
            {isFetching && <Loading />}
            {!isFetching && hasReceivedOrder ? (
              data.map((item, index) => {
                if (item.status === "received") {
                  return (
                    <ResOrderHistory
                      fruit={item}
                      key={item._id}
                      index={index}
                    />
                  );
                }
              })
            ) : (
              <View style={{ marginBottom: 150 }}>
                <Empty text="No Delivered Orders Found" />
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
      </ScrollView>
    </View>
  );
}
