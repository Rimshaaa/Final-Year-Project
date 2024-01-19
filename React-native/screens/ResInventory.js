import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { COLOURS } from "../components/items2";
import MyHeader2 from "../components/MyHeader2";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import {
  useDeleteInventoryItemMutation,
  useGetInventoryQuery,
} from "../redux/services";
import Empty from "../components/Empty";
import Loader from "../components/Loader";
import Colors from "../constants/Colors";
import { useSelector } from "react-redux";
import DropdownMenu2 from "../Dropdown/DropdownMenu2";
import LoadingPlaceholder from "../common/Placeholders/InventoryPlacehoder";

const ResInventory = ({ navigation }) => {
  const [currentSelected, setCurrentSelected] = useState(0);
  const { data: InventoryItems, isLoading, refetch } = useGetInventoryQuery();
  const [selectedCategory, setSelectedCategory] = useState();
  const user = useSelector((state) => state.authReducer.activeUser);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [deleteItemId, setDeleteItem] = useState("");
  const [isFirst, setIsFirst] = useState(true);
  const [deleteItem, { isLoading: deleteLoading }] =
    useDeleteInventoryItemMutation();

  useEffect(() => {
    if (isFirst) {
      if (InventoryItems && InventoryItems.length > 0) {
        setSelectedCategory(InventoryItems[0]._id);
        setIsFirst(false);
      }
    }
  }, [InventoryItems]);

  useEffect(() => {
    refetch();
  }, [user]);

  const handleDelete = () => {
    deleteItem({ inventoryId: selectedCategory, itemId: deleteItemId })
      .then((res) => {
        if (res.error) {
          setDropdownVisible(false);
          Toast.show({ type: "error", text1: res.error.data.error });
        } else if (res.data.message) {
          setDropdownVisible(false);
        }
      })
      .catch((err) => Toast.show({ type: "error", text1: err.message }));
  };

  const handleOpenDropdown = () => {
    setDropdownVisible(true);
  };

  const handleCloseDropdown = () => {
    setDropdownVisible(false);
  };

  const renderCategories = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          setCurrentSelected(index);
          setSelectedCategory(item._id);
        }}
      >
        <View
          style={{
            width: 120,
            height: 180,
            justifyContent: "space-evenly",
            alignItems: "center",
            backgroundColor:
              currentSelected == index ? COLOURS.resprimary : COLOURS.white,
            borderRadius: 20,
            margin: 10,
            elevation: 5,
          }}
        >
          <View style={{ width: 60, height: 60 }}>
            <Image
              source={{ uri: item.image }}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "center",
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 16,
              color: COLOURS.black,
              fontWeight: "600",
            }}
          >
            {item.name}
          </Text>
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 100,
              backgroundColor:
                currentSelected == index ? COLOURS.white : COLOURS.resprimary,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome
              name="angle-right"
              style={{
                fontSize: 12,
                color: currentSelected == index ? COLOURS.black : COLOURS.white,
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

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
          navigation.navigate("details", {
            name: data.name,
            price: data.price,
            image: data.image,
            size: data.size,
            item_id: data._id,
            category_id: selectedCategory,
            qty: data.qty,
            crust: data.crust,
            delivery: data.delivery,
            ingredients: data.ingredients,
            isTopOfTheWeek: data.isTopOfTheWeek,
            prevScreen: "ResInventory",
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
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{}}>
            <View className="flex-row">
              <View style={{ width: 70, height: 70, marginRight: -45 }}>
                <Image
                  source={{ uri: data.image }}
                  style={{
                    marginTop: 20,
                    width: "100%",
                    height: "100%",
                    borderRadius: 10,
                    resizeMode: "contain",
                  }}
                />
              </View>
<View className="flex-row">
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    color: COLOURS.black,
                    fontWeight: "bold",
                    paddingTop: 10,
                    marginLeft: 100,
                  }}
                >
                  {data.name}
                </Text>

                {/* <Text
                  style={{
                    fontSize: 18,
                    color: COLOURS.black,
                    opacity: 0.5,
                    marginLeft: 100,
                  }}
                >
                  {" "}
                  ID:
                  {data._id}
                </Text> */}
                <Text
                  style={{
                    fontSize: 18,
                    color: COLOURS.black,
                    opacity: 0.5,
                    marginLeft: 100,
                  }}
                >
                  {" "}
                  Qty:
                  {data.qty}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: COLOURS.black,
                    opacity: 0.5,
                    marginLeft: 100,
                  }}
                >
                  {" "}
                  Price:
                  {data.price}
                </Text>
              </View>
<View>
              <TouchableOpacity
                onPress={() => {
                  setDeleteItem(data._id);
                  handleOpenDropdown();
                }}
              >
                <Entypo
                  name="dots-three-vertical"
                  style={{
                    fontSize: 18,
                    color: COLOURS.black,
                    alignSelf: "flex-end",
                    flexDirection: "row",
                    marginLeft:100,
                    marginTop: 20,
                  }}
                />
              </TouchableOpacity>
  </View>  

  </View>   
            </View>
            <DropdownMenu2
              isVisible={isDropdownVisible}
              // onEdit={handleEdit}
              onDelete={handleDelete}
              onClose={handleCloseDropdown}
              isLoading={deleteLoading}
            />
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
      <SafeAreaView className="flex-1 flex justify-between mb-32 bg-white">
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
            title="Inventory"
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
              }}
            >
              Categories
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("ResAddCategory")}
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  paddingTop: 20,
                  paddingHorizontal: 20,
                  fontSize: 14,
                  fontWeight: "100",
                  color: COLOURS.black,
                  letterSpacing: 1,
                  color: COLOURS.resprimary,
                  flexDirection: 'row',
                  //marginLeft: 190,
                  alignSelf: 'flex-end',
                }}
              >
                Add Category
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            horizontal={true}
            data={InventoryItems}
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
            {InventoryItems && InventoryItems.length > 0 && "Items"}
          </Text>
          {isLoading && <LoadingPlaceholder />}
          {InventoryItems && InventoryItems.length > 0
            ? InventoryItems[currentSelected].items.map(renderItems)
            : !isLoading && <Empty />}
        </View>
      </ScrollView>
      {InventoryItems && InventoryItems.length > 0 && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ResAddInventoryItems", {
              CategoryId: selectedCategory,
              Categories: InventoryItems,
            })
          }
          style={{
            width: 50,
            height: 50,
            backgroundColor: COLOURS.resprimary,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
            borderTopLeftRadius: 20,
            borderBottomRightRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 0,
            right: 20,
            marginLeft: 400,
            marginBottom: 0,
          }}
        >
          <Entypo name="plus" style={{ fontSize: 18, color: COLOURS.black }} />
        </TouchableOpacity>
      )}
       </SafeAreaView>
    </View>
  
  
  );
};

export default ResInventory;
