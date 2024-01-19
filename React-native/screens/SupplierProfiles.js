import React from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import MyHeader2 from "../components/MyHeader2";
import { COLOURS } from "../components/items";
import { useGetRatingsQuery } from "../redux/services";
import { useFocusEffect } from "@react-navigation/native";
import { Rating } from "react-native-ratings";




const SupplierProfiles = ({ route, navigation }) => {
  const { _id, name, image, items, storeName } = route.params;
  const {
    data: ratings,
    isLoading: ratingLoading,
    refetch,
  } = useGetRatingsQuery(_id);

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [])
  );

  const renderItems = (data) => {
    return (
      <View key={data._id} className="flex-row" style={{ numColumns: 2 }}>
        <TouchableOpacity
          key={data._id}
          activeOpacity={0.9}
          style={{
            width: "100%",
            height: 150,
            marginLeft: 10,
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onPress={() =>
            navigation.push("DetailsScreen", {
              supplierId: _id,
              supplierName: name,
              supplierImage: image,
              storeName,
              item: {
                _id: data._id,
                name: data.name,
                price: data.price,
                unit: data.unit,
                image: data.image,
                description: data.description,
                inventory_id: data.inventory_id,
              },
            })
          }
        >
          <View
            style={{
              width: "50%",
              height: 140,
              borderColor: "#A134F6",
              borderRadius: 10,
              //borderWidth:1,
              elevation: 4,
              position: "relative",
              padding: 15,
              //flexDirection: 'row',
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ width: 70, height: 70 }}>
              <Image
                source={{ uri: data.image }}
                style={{
                  marginTop: 0,
                  width: "90%",
                  height: "90%",
                  resizeMode: "contain",
                  borderRadius: 10,
                }}
              />
            </View>

            <View className="flex" style={{ marginLeft: 30 }}>
              <Text
                style={{
                  fontSize: 20,
                  color: COLOURS.black,
                }}
              >
                {data.name}
              </Text>

              <Text
                style={{
                  fontSize: 18,
                  color: COLOURS.black,
                }}
              >
                Rs {data.price} / {data.unit}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLOURS.white,
        flexDirection: "column",
      }}
    >
      <MyHeader2
        title="Supplier Profile"
        right="more-vertical"
        optionalBtn="shopping-cart"
        onRightPress={() => console.log("right")}
      />

      <View
        style={{
          marginTop:10,
          marginLeft:10,
          marginRight:10,
          height: 250, 
          borderBottomEndRadius:40,  
          borderBottomStartRadius:40,
          borderRadius:40,
          borderWidth:2,
          borderColor:"#A134F6",
          justifyContent: 'center',          
          backgroundColor: "#fff",
          flexDirection: "column",
        }}
      >
        <View className="flex-row">
          <View
            style={{
              marginTop: 10,
              width: 200,
              height: 200,
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: image }}
              style={{
                width: "70%",
                height: "70%",
                resizeMode: "contain",
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
            }}
          >
            <View style={{ paddingHorizontal: 0,}}>
              <View className="flex-row" style={{ paddingVertical: 0 }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: COLOURS.black,
                    opacity: 0.8,
                  }}
                >
                  Name:
                </Text>
                <TextInput
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 20,
                    color: COLOURS.black,
                    fontWeight: "600",
                  }}
                >
                  {name}
                </TextInput>
              </View>

              {/* <View className="flex-row" style={{ paddingVertical: 0 }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: COLOURS.black,
                    opacity: 0.8,
                  }}
                >
                  ID:
                </Text>
                <TextInput
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 20,
                    color: COLOURS.black,
                    fontWeight: "600",
                    opacity: 0.6,
                  }}
                >
                  {ID}
                </TextInput>
              </View> */}

              <View className="flex-row" style={{ paddingVertical: 0 }}>
                {ratingLoading ? (
                  <Rating
                    showRating
                    imageSize={30}
                    fractions={1}
                    ratingCount={5}
                    startingValue={0}
                    readonly
                    showReadOnlyText={false}
                    ratingTextColor="black"
                    tintColor={COLOURS.resprimary}
                  />
                ) : (
                  <Rating
                    showRating
                    imageSize={30}
                    fractions={1}
                    ratingCount={5}
                    startingValue={
                      ratings && parseFloat(ratings?.averageRating)
                    }
                    readonly
                    showReadOnlyText={false}
                    ratingTextColor="black"
                    tintColor={COLOURS.resprimary}
                  />
                )}
                {/* <TextInput
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 20,
                    color: COLOURS.black,
                    fontWeight: "600",
                    opacity: 0.6,
                  }}
                >
                  {rating}
                </TextInput> */}
              </View>

              <View className="flex-row" style={{ paddingVertical: 0 }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: COLOURS.black,
                    opacity: 0.8,
                  }}
                >
                  {/* Total Orders: */}
                </Text>
                <TextInput
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 20,
                    color: COLOURS.black,
                    fontWeight: "600",
                    opacity: 0.6,
                  }}
                >
                  {/* {ID} */}
                </TextInput>
              </View>
            </View>
          </View>
        </View>
      </View>

    
<ScrollView>


<View style={{
          marginTop:10,
          marginLeft:10,
          marginRight:10, 
          position:"relative",
          borderBottomEndRadius:40,  
          borderBottomStartRadius:40,
          borderRadius:40,
          borderWidth:2,
          borderColor:"#A134F6",
          justifyContent: 'center',          
          backgroundColor: "#fff",
          flexDirection: "column",
        }}>


        <View
          className="bg-purple-500"
          style={{ color: COLOURS.resprimary, height: 70, marginTop:0, borderRadius:40,  justifyContent: 'center',
          alignItems: 'center', }}
        >
          <Text
            style={{
              fontSize: 24,
              color: COLOURS.black,
              fontWeight:"bold",
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >My Store
          </Text>
          <Text
            style={{
              fontSize: 24,
              color: COLOURS.white,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {storeName}
          </Text>
        </View>
    

      <Text
        style={{
          paddingTop: 20,
          paddingHorizontal: 20,
          fontSize: 22,
          fontWeight: "700",
          color: COLOURS.black,
        }}
      >
        Items
      </Text>

      <ScrollView>{items.map(renderItems)}</ScrollView>
    </View>
    </ScrollView>
    </View>
  );
};

export default SupplierProfiles;
