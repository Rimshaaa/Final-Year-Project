import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon, { Icons } from "../components/Icons";
import MyHeader2 from "../components/MyHeader2";
import Colors from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import {
  useCreateOrderMutation,
  useDeleteStoreItemMutation,
} from "../redux/services";
import CustomModal from "../components/Modal";
import { Octicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import Loader from "../components/Loader";
import { TextInput } from "react-native-paper";
import { addCart } from "../redux/cartSlice";
const { width, height } = Dimensions.get("window");

const Quantity = ({ quantity, setQuantity }) => {
  return (
    <View style={styles.quantity}>
      <TouchableOpacity
        style={styles.qtBtn}
        disabled={quantity === 1}
        onPress={() => setQuantity((prev) => parseInt(prev) - 1)}
      >
        <Icon type={Icons.Entypo} name="minus" />
      </TouchableOpacity>
      <View className="w-[40px] mx-3">
        <TextInput
          underlineColor={Colors.resprimary}
          keyboardType="numeric"
          style={{ backgroundColor: "white", fontWeight: "900", fontSize: 24 }}
          value={quantity.toString()}
          onChangeText={(value) => setQuantity(value)}
        />
      </View>
      <TouchableOpacity
        style={styles.qtBtn}
        onPress={() => setQuantity((prev) => parseInt(prev) + 1)}
      >
        <Icon type={Icons.Entypo} name="plus" />
      </TouchableOpacity>
    </View>
  );
};

const DetailsScreen = ({ route, navigation }) => {
  const { item, storeId, supplierId, supplierName, supplierImage, storeName } =
    route.params;
  const user = useSelector((state) => state.authReducer.activeUser);
  const { cart } = useSelector((state) => state.cartSlice);
  const [deleteItem, { isLoading }] = useDeleteStoreItemMutation();
  const [createOrder, { isLoading: orderLoading }] = useCreateOrderMutation();
  const [quantity, setQuantity] = useState(1);
  const [deleteModal, setDeleteModal] = useState(false);

  const dispatch = useDispatch();

  function handleDelete() {
    deleteItem({ storeId, itemId: item._id })
      .then((res) => {
        if (res.error) {
          Toast.show({ type: "error", text1: res.error.data.error });
        } else if (res.data.message) {
          navigation.navigate("MyStore");
        }
      })
      .catch((err) => Toast.show({ type: "error", text1: err.message }));
  }

  const handleBuyNow = async () => {
    createOrder({
      sender: supplierId,
      receiver: user._id,
      item_name: item.name,
      item_image: item.image,
      price: item.price,
      unit: item.unit,
      qty: quantity,
      unit: item.unit,
      description: item.description,
    })
      .then((res) => {
        if (res.error) {
          Toast.show({ type: "error", text1: res.error });
        } else if (res.data.message) {
          Toast.show({ type: "success", text1: "Order Successfuly Placed" });
          // navigation.navigate("FindSupplier");
        }
      })
      .catch((err) => Toast.show({ type: "error", text1: err.message }));
  };

  const isAlreadyInCart = () => {
    return cart.some((obj) => obj._id === item?._id);
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors.darkGray }]}>
      <MyHeader2
        back
        onPressBack={() => navigation.goBack()}
        right="more-vertical"
        optionalBtn="shopping-cart"
        iconColor={Colors.white}
        onRightPress={() => console.log("right")}
      />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View>
            <Text style={styles.smallText}>{item?.category?.name}</Text>
            <Text style={styles.bigText}>{item?.name}</Text>
          </View>
          <View>
            <Text style={styles.smallText}>Price</Text>
            <Text style={styles.bigText}>
              Rs {item?.price}/{item?.unit}
            </Text>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item?.image }}
            style={styles.image}
            resizeMode="center"
          />
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.variants}></View>
          <View style={styles.descriptionContainer}>
            <Text
              style={{ fontWeight: "bold", marginBottom: 10, fontSize: 24 }}
            >
              Description
            </Text>
            <Text>{item?.description}</Text>
          </View>
          {user?._id !== item?.created_by && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Quantity quantity={quantity} setQuantity={setQuantity} />
              {/* <TouchableOpacity
                style={[styles.favoriteBtn, { backgroundColor: Colors.gray }]}
              >
                <Icon
                  type={Icons.AntDesign}
                  name="heart"
                  size={18}
                  color={Colors.resprimary}
                />
              </TouchableOpacity> */}
            </View>
          )}
          {user?._id !== item?.created_by && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (isAlreadyInCart()) {
                    Toast.show({
                      type: "error",
                      text1: `${item.name} already in Cart`,
                    });
                  } else {
                    dispatch(
                      addCart({
                        _id: item?._id,
                        sender: supplierId,
                        receiver: user._id,
                        item_name: item?.name,
                        item_image: item?.image,
                        unit: item?.unit,
                        qty: parseInt(quantity),
                        price: item.price,
                        description: item?.description,
                        inventory_id: item.inventory_id,
                        storeName,
                        supplierName,
                      })
                    );
                    Toast.show({
                      type: "success",
                      text1: `${item.name} added to Cart`,
                    });
                  }
                }}
                style={[
                  styles.cartBtm,
                  {
                    borderColor: isAlreadyInCart()
                      ? Colors.gray
                      : Colors.resprimary,
                  },
                ]}
              >
                <Image
                  style={{ height: 30, width: 30 }}
                  source={require("../assets/icons/add-to-cart.png")}
                />
              </TouchableOpacity>

              <View className="flex-row">
                <TouchableOpacity
                  //onPress={ handleBuyNow}
                  onPress={() =>
                    navigation.navigate("Checkout", {
                      storeName,
                      supplierName,
                      item: {
                        sender: supplierId,
                        receiver: user._id,
                        item_name: item.name,
                        item_image: item.image,
                        price: item.price,
                        unit: item.unit,
                        qty: quantity,
                        unit: item.unit,
                        description: item.description,
                        inventory_id: item.inventory_id,
                      },
                    })
                  }
                  style={[styles.btn, { backgroundColor: Colors.resprimary }]}
                >
                  {/* {orderLoading ? (
                    <Loader />
                  ) : ( */}
                  <Text style={styles.btnText}>Buy Now</Text>
                  {/* )} */}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ContractForm", {
                      prevScreen: "item",
                      receiptId: supplierId,
                      receiptName: supplierName,
                      receiptImage: supplierImage,
                    })
                  }
                  style={[
                    styles.btn,
                    {
                      backgroundColor: Colors.resprimary,
                      marginLeft: 20,
                      marginRight: 60,
                    },
                  ]}
                >
                  <Text style={styles.btnText}>Make Contract</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {user?._id === item?.created_by && (
            <View style={{ alignItems: "flex-end" }}>
              <TouchableOpacity
                className="py-3 bg-red-500 rounded-md w-36 mt-5 mr-5"
                onPress={() => setDeleteModal(true)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <View className="py-3">
                    <Loader />
                  </View>
                ) : (
                  <Text className="text-lg text-center text-white font-bold">
                    Delete Item
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}
          <CustomModal
            isOpen={deleteModal}
            setIsOpen={setDeleteModal}
            icon={<Octicons name="alert" size={30} color="#f59e0b" />}
            text="Are you sure want to delete ?"
            handleConfirm={handleDelete}
          />
        </View>
      </View>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    height: height / 3,
    padding: 16,
    justifyContent: "space-between",
  },
  bottomContainer: {
    padding: 16,
    flex: 1,
    backgroundColor: Colors.white,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingTop: 50,
  },
  bigText: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.white,
  },
  smallText: {
    fontSize: 18,
    color: Colors.white,
  },
  image: {
    width: width / 2,
    height: width / 2,
    borderRadius: 150,
  },
  imageContainer: {
    position: "absolute",
    zIndex: 999,
    top: 60,
    right: 50,
    alignSelf: "flex-end",
  },
  colorBtn: {
    height: 16,
    width: 16,
    borderRadius: 6,
  },
  outerCircle: {
    height: 24,
    width: 24,
    borderRadius: 6,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  variants: {
    flexDirection: "row",
    // marginVertical: 20,
    justifyContent: "space-between",
  },
  descriptionContainer: {
    marginVertical: 10,
  },
  quantity: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  qtBtn: {
    borderWidth: 2,
    borderColor: Colors.resprimary,
    borderRadius: 8,
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  favoriteBtn: {
    borderRadius: 17,
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBtm: {
    borderRadius: 10,
    width: 50,
    height: 45,
    borderWidth: 2,
    borderColor: Colors.resprimary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  btn: {
    flex: 1,
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.white,
  },
});
