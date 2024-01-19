import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Bids, COLOURS } from "../components/items";
import MyHeader from "../components/MyHeader";
import { useGetBidsQuery } from "../redux/services";
import SuppliersList from "../common/Placeholders/SuppliersList";
import Empty from "../components/Empty";

const MyBids = ({ navigation, route }) => {
  const { data, isLoading } = useGetBidsQuery();
  const [currentSelected, setCurrentSelected] = useState(0);
  const [statusCounts, setStatusCounts] = useState({
    open: 0,
    completed: 0,
  });

  useEffect(() => {
    const countStatus = () => {
      let openCount = 0;
      let completedCount = 0;
      data &&
        data.forEach((item) => {
          switch (item.status) {
            case "open":
              openCount += 1;
              break;
            case "completed":
              completedCount += 1;
              break;
            default:
              break;
          }
        });
      return {
        open: openCount,
        completed: completedCount,
      };
    };
    setStatusCounts(countStatus());
  }, [data]);

  const renderCategories = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setCurrentSelected(index)}
      >
        <View
          style={{
            width: 140,
            height: 50,
            justifyContent: "space-evenly",
            alignItems: "center",
            backgroundColor:
              currentSelected == index ? COLOURS.accent : COLOURS.white,
            borderRadius: 20,
            margin: 10,
            marginLeft: 10,
            elevation: 5,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: COLOURS.black,
              fontWeight: "600",
            }}
          >
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItems = (data, index) => {
    if (currentSelected === 0) {
      if (data.status === "open") {
        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.9}
            style={{
              width: "100%",
              height: 150,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("BiddingScreen", { data })}
          >
            <View
              style={{
                width: "90%",
                height: 120,
                backgroundColor: COLOURS.white,
                borderRadius: 10,
                elevation: 4,
                position: "relative",
                padding: 15,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{}}>
                <View className="flex-row">
                  <View style={{ width: 70, height: 70, marginRight: -45 }}>
                    <Image
                      source={{ uri: data.created_by.image }}
                      style={{
                        marginTop: 20,
                        width: "100%",
                        height: "100%",
                        resizeMode: "contain",
                      }}
                    />
                  </View>

                  <View className="flex">
                    <Text
                      style={{
                        fontSize: 20,
                        color: COLOURS.black,
                        fontWeight: "bold",
                        paddingTop: 10,
                        marginLeft: 100,
                      }}
                    >
                      {data.created_by.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        color: COLOURS.black,
                        opacity: 0.5,
                        marginLeft: 100,
                        marginTop: 5,
                      }}
                    >
                      Item: {data.item_name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        color: COLOURS.black,
                        opacity: 0.5,
                        marginLeft: 100,
                        marginTop: 5,
                      }}
                    >
                      Qty: {data.qty} {data.unit}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      }
    }
    if (currentSelected === 1) {
      if (data.status === "completed") {
        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.9}
            style={{
              width: "100%",
              height: 150,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "90%",
                height: 120,
                backgroundColor: COLOURS.white,
                borderRadius: 10,
                elevation: 4,
                position: "relative",
                padding: 15,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{}}>
                <View className="flex-row">
                  <View style={{ width: 70, height: 70, marginRight: -45 }}>
                    <Image
                      source={{ uri: data.created_by.image }}
                      style={{
                        marginTop: 20,
                        width: "100%",
                        height: "100%",
                        resizeMode: "contain",
                      }}
                    />
                  </View>

                  <View className="flex">
                    <Text
                      style={{
                        fontSize: 20,
                        color: COLOURS.black,
                        fontWeight: "bold",
                        paddingTop: 10,
                        marginLeft: 100,
                      }}
                    >
                      {data.created_by.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        color: COLOURS.black,
                        opacity: 0.5,
                        marginLeft: 100,
                        marginTop: 5,
                      }}
                    >
                      Item: {data.item_name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        color: COLOURS.black,
                        opacity: 0.5,
                        marginLeft: 100,
                        marginTop: 5,
                      }}
                    >
                      Qty: {data.qty} {data.unit}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      }
    }
  };

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLOURS.white,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: COLOURS.white,
            position: "relative",
          }}
        >
          <MyHeader
            // Sidebar
            onPressBack={() => navigation.goBack()}
            back
            title="Bids"
            right="more-vertical"
            optionalBtn="shopping-cart"
            onRightPress={() => console.log("right")}
          />

          <View style={{ alignItems: "center" }}>
            <FlatList
              className="mt-10"
              horizontal={true}
              data={Bids}
              renderItem={renderCategories}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          {isLoading ? (
            <SuppliersList />
          ) : data && data.length > 0 ? (
            data.map(renderItems)
          ) : (
            <Empty />
          )}
          {!isLoading && currentSelected === 0 && statusCounts.open === 0 && (
            <Empty text="No Bidding Yet" />
          )}
          {!isLoading &&
            currentSelected === 1 &&
            statusCounts.completed === 0 && <Empty />}
        </View>
      </ScrollView>
    </View>
  );
};

export default MyBids;
