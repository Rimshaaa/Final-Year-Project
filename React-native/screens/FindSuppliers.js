import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { COLOURS } from "../components/items2";
import MyHeader2 from "../components/MyHeader2";
import { useGetSuppliersQuery } from "../redux/services";
import SuppliersList from "../common/Placeholders/SuppliersList";
import Empty from "../components/Empty";
import { AntDesign } from "@expo/vector-icons";

const FindSuppliers = ({ navigation, route }) => {
  const { supCategories = [] } = route.params;
  const [currentSelected, setCurrentSelected] = useState([0]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data, isLoading, isFetching } = useGetSuppliersQuery(
    selectedCategory,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (supCategories) {
      setSelectedCategory(supCategories[0]?.key);
    }
  }, [supCategories]);
  const renderCategories = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          setCurrentSelected(index);
          setSelectedCategory(item.key);
        }}
      >
        <View
          style={{
            width: 120,
            height: 40,
            justifyContent: "space-evenly",
            alignItems: "center",
            backgroundColor:
              currentSelected == index ? COLOURS.resprimary : COLOURS.white,
            borderRadius: 20,
            margin: 10,
            elevation: 5,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: currentSelected == index ? COLOURS.white : COLOURS.black,
              fontWeight: "600",
            }}
          >
            {item.value}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  function calculateRating(ratings) {
    if (!ratings || ratings.length === 0) {
      return 0;
    }
    const ratingsCount = ratings.map((r) => r.rating);
    const averageRating =
      ratings.length > 0
        ? (
            ratingsCount.reduce((sum, rating) => sum + rating, 0) /
            ratings.length
          ).toFixed(1)
        : 0;

    return averageRating;
  }

  const renderItems = (data, index) => {
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
        onPress={() =>
          navigation.push("SupplierProfiles", {
            _id: data.created_by[0]._id,
            name: data.created_by[0].name,
            image: data.created_by[0].image,
            storeName: data.name,
            items: data.items,
            rating: calculateRating(data?.created_by[0]?.ratings),
          })
        }
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
            paddingBottom: 50,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View className="flex-row">
            <View style={{ width: 70, height: 70, marginRight: -45 }}>
              <Image
                source={{ uri: data.created_by[0].image }}
                style={{
                  marginTop: 20,
                  width: "100%",
                  height: "100%",
                  borderRadius: 10,
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
                  marginBottom: 3,
                }}
              >
                {data.created_by[0].name}
              </Text>

              <Text
                style={{
                  fontSize: 18,
                  color: COLOURS.black,
                  opacity: 0.5,
                  marginLeft: 100,
                }}
              >
                Phone:
                {data?.created_by[0].phone}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: COLOURS.black,
                  opacity: 0.5,
                  marginLeft: 100,
                  //marginBottom: 2,
                }}
              >
                <AntDesign name="star" size={24} color="orange" />
                Ratings: {calculateRating(data?.created_by[0]?.ratings)} / 5
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
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
          <MyHeader2
            right="more-vertical"
            optionalBtn="shopping-cart"
            onRightPress={() => console.log("right")}
          />

          <View className="flex-row">
            <Text
              style={{
                paddingTop: 20,
                paddingHorizontal: 20,
                fontSize: 18,
                fontWeight: "700",
                color: COLOURS.black,
                letterSpacing: 1,
                marginBottom: 10,
              }}
            >
              Supplier Categories
            </Text>
          </View>
          <FlatList
            horizontal={true}
            data={supCategories && supCategories}
            renderItem={renderCategories}
            showsHorizontalScrollIndicator={false}
          />
          <Text
            style={{
              paddingTop: 20,
              paddingHorizontal: 20,
              fontSize: 18,
              fontWeight: "700",
              color: COLOURS.black,
            }}
          >
            Suppliers List
          </Text>
          {isFetching && <SuppliersList />}
          {!isFetching && data && data.length > 0
            ? data.map(renderItems)
            : !isFetching && !isLoading && <Empty />}
        </View>
      </ScrollView>
    </View>
  );
};

export default FindSuppliers;
