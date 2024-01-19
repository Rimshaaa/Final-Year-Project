import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView
} from "react-native";
import { COLOURS } from "../components/items";
import MyHeader from "../components/MyHeader";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import DropdownMenu from "../Dropdown/DropdownMenu";
import {
  useAddStoreItemMutation,
  useDeleteInventoryItemMutation,
  useGetInventoryQuery,
  useGetSupplierCategoriesOrQuery,
} from "../redux/services";
import Empty from "../components/Empty";
import Toast from "react-native-toast-message";
import LoadingPlaceholder from "../common/Placeholders/InventoryPlacehoder";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import LowItemsModal from "../components/LowItemsModal";

const SupplierInventory = ({ navigation }) => {
  const user = useSelector((state) => state.authReducer.activeUser);

  const [currentSelected, setCurrentSelected] = useState(0);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [deleteItemId, setDeleteItem] = useState("");
  const [selectedItem, setSelectedItem] = useState({});
  const [lowQtyItems, setLowQtyItems] = useState([]);
  const [openlqm, setOpenlqm] = useState(false);

  const { data: Categories, isLoading, refetch } = useGetInventoryQuery();
  const { data: supCategories } = useGetSupplierCategoriesOrQuery();

  useEffect(() => {
    let itemsWithLowQty = [];
    Categories?.forEach((category) => {
      category.items.forEach((item) => {
        if (parseInt(item.qty) <= 5) {
          itemsWithLowQty.push(item);
        }
      });
    });
    setLowQtyItems(itemsWithLowQty);
  }, [Categories]);

  const [deleteItem, { isLoading: deleteLoading }] =
    useDeleteInventoryItemMutation();
  const [addItem, { isLoading: addLoading }] = useAddStoreItemMutation();

  const handleEdit = () => {
    Alert.alert("Edit", "Item will be edited.");
    setDropdownVisible(false);
  };

  function handleAddItemToStore() {
    addItem({
      storeId: user?._id,
      data: {
        inventory_id: selectedCategory,
        name: selectedItem?.name,
        image: selectedItem?.image,
        price: selectedItem?.price,
        unit: selectedItem?.unit,
        qty: selectedItem?.qty,
        category: selectedItem?.category_id,
        created_by: user._id,
      },
    })
      .then((res) => {
        if (res.error) {
          setDropdownVisible(false);
          Toast.show({ type: "error", text1: res.error.data.error });
        } else if (res.data.message) {
          Toast.show({ type: "success", text1: "Item added to store" });
          setDropdownVisible(false);
        }
      })
      .catch((err) => Toast.show({ type: "error", text1: err.message }));
  }

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

  useEffect(() => {
    if (Categories && Categories.length > 0) {
      setSelectedCategory(Categories[0]._id);
    }
  }, [Categories]);

  useEffect(() => {
    refetch();
  }, [user]);

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
              currentSelected == index ? COLOURS.accent : COLOURS.white,
            borderRadius: 20,
            margin: 10,
            elevation: 5,
          }}
        >
          <View style={{ width: 100, height: 100 }}>
            <Image
              source={{ uri: item.image }}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "center",
                borderRadius: 10,
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
                currentSelected == index ? COLOURS.white : COLOURS.accentRed,
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
          navigation.push("details", {
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
            prevScreen: "supplierInventory",
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
                    resizeMode: "contain",
                    borderRadius: 10,
                  }}
                />
              </View>

              <View className="flex" style={{ padding: 2 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: COLOURS.black,
                      fontWeight: "bold",
                      paddingTop: 15,
                      paddingHorizontal: 10,
                      marginLeft: 90,
                      marginRight:90
                    }}
                  >
                    {data.name}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setDeleteItem(data._id);
                      setSelectedItem(data);
                      handleOpenDropdown();
                    }}
                  >
                    <Entypo
                      name="dots-three-vertical"
                      style={{
                        fontSize: 18,
                        color: COLOURS.black,
                        position: "relative",
                        alignSelf: "flex-end",
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <DropdownMenu
                  isVisible={isDropdownVisible}
                  handleAddItemToStore={handleAddItemToStore}
                  onDelete={handleDelete}
                  onClose={handleCloseDropdown}
                  isLoading={deleteLoading}
                  addLoading={addLoading}
                />

                <Text
                  style={{
                    fontSize: 18,
                    color: COLOURS.black,
                    opacity: 0.5,
                    marginLeft: 100,
                  }}
                >
                  Qty: {data.qty}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: COLOURS.black,
                    opacity: 0.5,
                    marginLeft: 100,
                    marginBottom: 10,
                  }}
                >
                  Price: {data.price}
                </Text>
              </View>
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
          <MyHeader
            Sidebar
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
              onPress={() =>
                navigation.navigate("AddCategory", { supCategories })
              }
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  paddingTop: 20,
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  fontSize: 14,
                  fontWeight: "100",
                  color: COLOURS.black,
                  letterSpacing: 1,
                  color: COLOURS.accent,
                  //marginLeft: 200,
                  alignSelf: 'flex-end'
                }}
              >
                Add Category
              </Text>
            </TouchableOpacity>
          </View>


          <FlatList
            horizontal={true}
            data={Categories}
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
            {Categories && Categories.length > 0 && "Items"}
          </Text>
          {isLoading && <LoadingPlaceholder />}
          {Categories && Categories.length > 0
            ? Categories[currentSelected].items?.map(renderItems)
            : !isLoading && <Empty />}
        </View>
      </ScrollView>

      
      {Categories && Categories.length > 0 && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AddInventoryItems", {
              CategoryId: selectedCategory,
              Categories,
            })
          }
          style={{
            width: 50,
            height: 50,
            backgroundColor: COLOURS.accent,
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
      {lowQtyItems?.length > 0 && (
        <TouchableOpacity
          onPress={() => setOpenlqm(true)}
          style={{
            width: 50,
            height: 50,
            backgroundColor: "red",
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
            borderTopLeftRadius: 20,
            borderBottomRightRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 50,
            right: 20,
            marginLeft: 400,
            marginBottom: 20,
          }}
        >
          <AntDesign name="warning" size={24} color="white" />
        </TouchableOpacity>
      )}
      <LowItemsModal
        isOpen={openlqm}
        data={lowQtyItems}
        setIsOpen={() => setOpenlqm(false)}
      />

</SafeAreaView>
</View>
 
  );
};

export default SupplierInventory;
