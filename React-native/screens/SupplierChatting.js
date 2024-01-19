import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import ImageLoading from "../assets/images/image_loading.jpeg";
import { generateRoomId } from "../utils";
import io from "socket.io-client";
import axios from "axios";
import { UPLOAD_PRESET, CLOUD_NAME, SOCKET_URL } from "../config";
import {
  useCreateContractMutation,
  useDeleteMessagesMutation,
  useGetMessagesQuery,
  useMarkReadMessagesMutation,
} from "../redux/services";
import Colors from "../constants/Colors";
import { useSelector } from "react-redux";
import moment from "moment";
import Toast from "react-native-toast-message";
import { DotIndicator } from "react-native-indicators";
import ContractModal from "../components/ContractModal";
import Modal from "react-native-modal";

const ChatMessagesScreen = ({ route }) => {
  const { contractDetails, contractTerms } = useSelector(
    (state) => state.global
  );
  const {
    recepientId,
    recepientName,
    recepientImage,
    prevScreen = "",
    endDate = "",
  } = route.params;
  const [markRead] = useMarkReadMessagesMutation();
  const activeUser = useSelector((state) => state.authReducer.activeUser);

  const userId = activeUser?._id;

  const { data, isLoading } = useGetMessagesQuery(
    {
      userId,
      recepientId: recepientId,
    },
    { refetchOnFocus: true, refetchOnMountOrArgChang: true }
  );
  const [createContract] = useCreateContractMutation();

  const [deleteMessages] = useDeleteMessagesMutation();
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [recepientData, setRecepientData] = useState();
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState("");
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const scrollViewRef = useRef(null);
  const roomId = generateRoomId(userId, recepientId);
  const [sendLoading, setSendLoading] = useState(false);
  const [isContractSent, setIsContractSent] = useState(false);
  const [openContract, setOpenContract] = useState(false);
  const [openReceipt, setOpenReceipt] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      markRead(recepientId);
    }, [])
  );

  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    newSocket.emit("join", roomId);
    setSocket(newSocket);
    newSocket.on("message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  };

  const handleContentSizeChange = () => {
    scrollToBottom();
  };

  useEffect(() => {
    setMessages(data);
  }, [data]);

  async function uploadImageToCloudinary(image) {
    setImageLoading(true);
    try {
      const formData = new FormData();
      const extension = image.uri.split(".").pop();
      const type = `${image.type}/${extension}`;
      const name = image.uri.split("/").pop();
      formData.append("file", {
        uri: image.uri,
        type,
        name,
      });
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("cloud_name", CLOUD_NAME);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (data) =>
            setProgress(Math.round((data.loaded / data.total) * 100)),
        }
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setImageLoading(false);
    }
  }

  async function handleSend(messageType, image) {
    try {
      if (socket) {
        if (messageType === "image") {
          const imageUrl = await uploadImageToCloudinary(image);
          const socketMessage = {
            senderId: userId,
            recepientId: recepientId,
            messageType: "image",
            imageUrl,
          };
          socket.emit("message", roomId, socketMessage);
        } else if (messageType === "text") {
          if (message.length > 0) {
            const socketMessage = {
              senderId: userId,
              recepientId: recepientId,
              messageType,
              messageText: message,
            };
            socket.emit("message", roomId, socketMessage);
            setMessage("");
          }
        }
      }
    } catch (error) {
      console.log("error in sending the message", error);
    }
  }

  async function handleConfirmPress() {
    try {
      if (socket) {
        setIsContractSent(true);
        setSendLoading(true);
        const socketMessage = {
          senderId: userId,
          recepientId: recepientId,
          messageType: "contract",
          messageText: contractDetails,
          messageTerms: contractTerms,
        };
        createContract({
          sender: userId,
          receiver: recepientId,
          details: contractDetails,
          terms: contractTerms,
          res_sign: activeUser?.name.split(" ")[0],
        })
          .then((res) => {
            if (res.error) {
              Toast.show({ type: "error", text1: res.error });
            } else if (res.data.message) {
              socket.emit("message", roomId, socketMessage);
              setSendLoading(false);
            }
          })
          .catch((err) => Toast.show({ type: "error", text1: err.message }));
      }
    } catch (error) {
      console.log("error in sending the message", error);
    }
  }

  const handleDeleteMessages = async (messageIds) => {
    deleteMessages({ messages: messageIds })
      .then((res) => {
        setSelectedMessages((prevSelectedMessages) =>
          prevSelectedMessages.filter((id) => !messageIds.includes(id))
        );
      })
      .catch((err) => console.log(err));
  };

  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });

    if (!result.canceled) {
      handleSend("image", result.assets[0]);
    }
  };

  const handleSelectMessage = (message) => {
    const isSelected = selectedMessages.includes(message._id);

    if (isSelected) {
      setSelectedMessages((previousMessages) =>
        previousMessages.filter((id) => id !== message._id)
      );
    } else {
      setSelectedMessages((previousMessages) => [
        ...previousMessages,
        message._id,
      ]);
    }
  };

  const backAction = () => {
    navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F0F0F0" }}>
      <View
        style={{
          paddingVertical: 12,
          flexDirection: false ? "row-reverse" : "row",
          alignItems: "center",
          backgroundColor: Colors.primaryAmber,
        }}
      >
        <View
          style={{
            flex: 9,
            flexDirection: false ? "row-reverse" : "row",
            marginHorizontal: 20,
          }}
        >
          <TouchableOpacity
            style={{ marginTop: 10 }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name={false ? "arrow-forward" : "arrow-back"}
              size={25}
              color={Colors.white}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 20,
            }}
          >
            <Image
              style={{ height: 50, width: 50, borderRadius: 75 }}
              source={{ uri: recepientImage }}
            />
            <Text
              className="tracking-wider"
              style={{
                fontSize: 18,
                fontWeight: "semibold",
                color: "white",
                marginHorizontal: 20,
              }}
            >
              {recepientName}
            </Text>
          </View>
          {selectedMessages.length > 0 && (
            <TouchableOpacity
              onPress={() => handleDeleteMessages(selectedMessages)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 70,
              }}
            >
              <MaterialIcons name="delete" size={20} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {isLoading && (
        <View className="items-center justify-center mt-5">
          <Text className="bg-white px-5 py-2 tracking-wider text-[15px]">
            Loading Messages...
          </Text>
        </View>
      )}
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1 }}
        onContentSizeChange={handleContentSizeChange}
      >
        {messages?.map((item, index) => {
          const isSelected = selectedMessages.includes(item._id);
          if (item.messageType === "text") {
            return (
              <Pressable
                onLongPress={() => handleSelectMessage(item)}
                delayLongPress={200}
                key={index}
                style={[
                  item?.senderId === userId
                    ? {
                        alignSelf: "flex-end",
                        backgroundColor: "#DCF8C6",
                        padding: 8,
                        maxWidth: "60%",
                        borderRadius: 7,
                        margin: 10,
                      }
                    : {
                        alignSelf: "flex-start",
                        backgroundColor: "white",
                        padding: 8,
                        margin: 10,
                        borderRadius: 7,
                        maxWidth: "60%",
                      },

                  isSelected && { width: "100%", backgroundColor: "#F0FFFF" },
                ]}
              >
                <Text
                  style={{
                    fontSize: 15,
                    textAlign: isSelected ? "right" : "left",
                  }}
                >
                  {item?.message}
                </Text>
                <Text
                  style={{
                    textAlign: "right",
                    fontSize: 12,
                    color: "gray",
                    marginTop: 5,
                  }}
                >
                  {formatTime(item.timeStamp)}
                </Text>
              </Pressable>
            );
          }
          if (item.messageType === "image") {
            return (
              <Pressable
                key={index}
                style={[
                  item?.senderId === userId
                    ? {
                        alignSelf: "flex-end",
                        backgroundColor: "#DCF8C6",
                        padding: 8,
                        maxWidth: "60%",
                        borderRadius: 7,
                        margin: 10,
                      }
                    : {
                        alignSelf: "flex-start",
                        backgroundColor: "white",
                        padding: 8,
                        margin: 10,
                        borderRadius: 7,
                        maxWidth: "60%",
                      },
                ]}
              >
                <View>
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={{ width: 200, height: 200, borderRadius: 7 }}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                    }}
                  >
                    {formatTime(item?.timeStamp)}
                  </Text>
                </View>
              </Pressable>
            );
          }
          if (item.messageType === "contract") {
            return (
              <View
                key={index}
                style={[
                  item?.senderId === userId
                    ? {
                        alignSelf: "flex-end",
                        backgroundColor: "#DCF8C6",
                        padding: 8,
                        borderRadius: 7,
                        margin: 10,
                      }
                    : {
                        alignSelf: "flex-start",
                        backgroundColor: "white",
                        padding: 8,
                        margin: 10,
                        borderRadius: 7,
                      },

                  isSelected && { width: "100%", backgroundColor: "#F0FFFF" },
                ]}
              >
                <TouchableOpacity
                  onPress={() => setOpenContract(true)}
                  className="flex-1 bg-white pt-8  "
                  style={{
                    maxHeight: 130,
                    width: 300,
                    borderRadius: 10,
                  }}
                >
                  <View
                    className="flex-row items-center justify-center"
                    style={{ gap: 10 }}
                  >
                    <Entypo
                      name="text-document"
                      size={30}
                      color="black"
                      style={{ marginBottom: 15 }}
                    />
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                        }}
                        className="text-center text-black tracking-widest"
                      >
                        Contract Document
                      </Text>
                      <View className="flex-row items-center justify-center gap-2 mt-2">
                        <TouchableOpacity
                          onPress={() => setOpenContract(true)}
                          className="p-1 rounded-md"
                          style={{
                            backgroundColor: Colors.primaryAmber,
                            width: 100,
                            height: 40,
                          }}
                        >
                          <Text
                            style={{
                              color: "white",
                              textAlign: "center",
                              marginTop: 3,
                              fontSize: 18,
                            }}
                            className="tracking-wider"
                          >
                            View
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => navigation.navigate("MyContracts")}
                          className="p-1 rounded-md"
                          style={{
                            backgroundColor: Colors.primaryAmber,
                            width: 100,
                            height: 40,
                          }}
                        >
                          <Text
                            style={{
                              color: "white",
                              textAlign: "center",
                              marginTop: 3,
                              fontSize: 18,
                            }}
                            className="tracking-wider"
                          >
                            Action
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  <Text
                    style={{
                      fontSize: 12,
                    }}
                  >
                    {formatTime(item?.timeStamp)}
                  </Text>
                  <ContractModal
                    isOpen={openContract}
                    setIsOpen={setOpenContract}
                    details={item.message}
                    terms={item.terms}
                    resName={
                      activeUser.status === "restaurant"
                        ? activeUser?.name
                        : recepientName
                    }
                    supName={
                      activeUser.status === "supplier"
                        ? recepientName
                        : activeUser?.name
                    }
                    startDate={item?.startDate}
                    endDate={item?.endDate}
                  />
                </TouchableOpacity>
              </View>
            );
          }
          if (item.messageType === "receipt") {
            return (
              <View
                key={index}
                style={[
                  item?.senderId === userId
                    ? {
                        alignSelf: "flex-end",
                        backgroundColor: "#DCF8C6",
                        padding: 8,
                        borderRadius: 7,
                        margin: 10,
                      }
                    : {
                        alignSelf: "flex-start",
                        backgroundColor: "white",
                        padding: 8,
                        margin: 10,
                        borderRadius: 7,
                      },

                  isSelected && { width: "100%", backgroundColor: "#F0FFFF" },
                ]}
              >
                <View
                  className="flex-1 bg-white pt-8  "
                  style={{
                    maxHeight: 130,
                    width: 300,
                    borderRadius: 10,
                  }}
                >
                  <View
                    className="flex-row items-center justify-center"
                    style={{ gap: 10 }}
                  >
                    <AntDesign
                      name="shoppingcart"
                      size={30}
                      color="black"
                      style={{ marginBottom: 15 }}
                    />
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                        }}
                        className="text-center text-black tracking-widest"
                      >
                        Order Receipt
                      </Text>
                      <View className="flex-row items-center justify-center gap-2 mt-2">
                        <TouchableOpacity
                          onPress={() => setOpenReceipt(true)}
                          className="p-1 rounded-md"
                          style={{
                            backgroundColor: Colors.primaryAmber,
                            width: 100,
                            height: 40,
                          }}
                        >
                          <Text
                            style={{
                              color: "white",
                              textAlign: "center",
                              marginTop: 3,
                              fontSize: 18,
                            }}
                            className="tracking-wider"
                          >
                            View
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  <Text
                    style={{
                      fontSize: 12,
                    }}
                  >
                    {formatTime(item?.timeStamp)}
                  </Text>
                  <Modal isVisible={openReceipt}>
                    <TouchableOpacity
                      style={{ position: "relative", left: 420, bottom: 5 }}
                      onPress={() => setOpenReceipt(false)}
                    >
                      <AntDesign name="closecircleo" size={30} color="white" />
                    </TouchableOpacity>
                    <View
                      className="flex-1 bg-white pt-8 mb-20"
                      style={{
                        borderRadius: 10,
                      }}
                    >
                      <Text
                        style={{ fontSize: 26, fontWeight: "bold" }}
                        className="text-center text-black"
                      >
                        Receipt
                      </Text>
                      <Text
                        style={{ fontSize: 16, fontWeight: "bold" }}
                        className="text-center text-black"
                      >
                        Address: {item?.delivery_date}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          marginBottom: 40,
                        }}
                        className="text-center text-black mb-5"
                      >
                        Tel: {item?.order_status}
                      </Text>
                      <Text
                        style={{ fontSize: 16 }}
                        className="text-black ml-12"
                      >
                        - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                        - - - - - - - - - - -
                      </Text>

                      <View className="flex-row" style={{ gap: 10 }}>
                        <Text
                          style={{ fontSize: 16 }}
                          className="text-black ml-12"
                        >
                          Order ID:
                        </Text>
                        <Text>{item?.endDate}</Text>
                      </View>
                      <Text
                        style={{ fontSize: 16 }}
                        className="text-black ml-12"
                      >
                        - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                        - - - - - - - - - - -
                      </Text>
                      <View className="flex-row">
                        <Text
                          style={{ fontSize: 16 }}
                          className="text-black ml-12"
                        >
                          Item Name
                        </Text>
                        <Text
                          style={{ fontSize: 16 }}
                          className="text-black ml-36"
                        >
                          Qty
                        </Text>
                        <Text
                          style={{ fontSize: 16 }}
                          className="text-black ml-12"
                        >
                          Price
                        </Text>
                      </View>

                      <View className="flex-row mt-2">
                        <Text className="ml-12 bg-white text-black text-[16px] w-44">
                          {item?.message}
                        </Text>
                        <Text className="ml-14 bg-white text-black text-[16px]">
                          {String(item?.startDate)}
                        </Text>
                        <Text className="ml-14 bg-white text-black text-[16px]">
                          {item?.terms}
                        </Text>
                      </View>

                      <Text
                        style={{ fontSize: 16 }}
                        className="text-black ml-12"
                      >
                        - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                        - - - - - - - - - - -
                      </Text>
                      <Text
                        style={{ fontSize: 16 }}
                        className="text-black ml-12"
                      >
                        - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                        - - - - - - - - - - -
                      </Text>
                      <View className="flex-row">
                        <Text
                          style={{ fontSize: 20, fontWeight: "bold" }}
                          className="text-black ml-12"
                        >
                          Sub Total:
                        </Text>
                        <Text className="ml-52 bg-white text-black text-[16px]">
                          {Number(item?.startDate) * Number(item?.terms)}
                        </Text>
                      </View>
                    </View>
                  </Modal>
                </View>
              </View>
            );
          }
          if (item.messageType === "dispute") {
            return (
              <Pressable
                // onLongPress={() => handleSelectMessage(item)}
                // delayLongPress={200}
                key={index}
                style={[
                  item?.senderId === userId
                    ? {
                        alignSelf: "flex-end",
                        backgroundColor: "#DCF8C6",
                        padding: 8,
                        maxWidth: "60%",
                        borderRadius: 7,
                        margin: 10,
                      }
                    : {
                        alignSelf: "flex-start",
                        backgroundColor: "white",
                        padding: 8,
                        margin: 10,
                        borderRadius: 7,
                        maxWidth: "60%",
                      },

                  isSelected && { width: "100%", backgroundColor: "#F0FFFF" },
                  { padding: 20 },
                ]}
              >
                <Text
                  style={{
                    fontSize: 18,
                    textAlign: isSelected ? "right" : "left",
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                >
                  File Dispute
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    textAlign: isSelected ? "right" : "left",
                    fontWeight: "bold",
                  }}
                >
                  Description:
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    textAlign: isSelected ? "right" : "left",
                    marginBottom: 10,
                  }}
                >
                  {item?.message}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    textAlign: isSelected ? "right" : "left",
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                >
                  Attachments:
                </Text>
                <View>
                  {item?.dispute_images?.map((file) => (
                    <Image
                      key={file}
                      source={{ uri: file }}
                      style={{
                        width: 250,
                        height: 250,
                        borderRadius: 7,
                        marginBottom: 5,
                      }}
                    />
                  ))}
                </View>
                <Text
                  style={{
                    textAlign: "right",
                    fontSize: 12,
                    color: "gray",
                    marginTop: 5,
                  }}
                >
                  {formatTime(item.timeStamp)}
                </Text>
              </Pressable>
            );
          }
        })}
        {imageLoading && (
          <View
            style={{
              alignSelf: "flex-end",
              backgroundColor: "#DCF8C6",
              padding: 8,
              maxWidth: "60%",
              borderRadius: 7,
              margin: 10,
            }}
          >
            <Image
              style={{
                width: 200,
                height: 200,
                borderRadius: 7,
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
              source={ImageLoading}
            />
            <Text
              style={{
                fontSize: 15,
                color: "white",
                position: "absolute",
                left: "30%",
                top: "50%",
                transform: [{ translateX: -30 }, { translateY: -10 }],
              }}
            >
              Uploading {progress} %
            </Text>
          </View>
        )}
      </ScrollView>
      <View>
        {prevScreen === "contract" && !isContractSent && (
          <View className="flex items-center bg-white py-4 mx-5 mb-2 rounded-md">
            <Text className="text-xl font-semibold text-center ">
              Are you sure want to send contract ?
            </Text>
            <View className="flex-row">
              <TouchableOpacity
                className="py-1 ml-5 rounded-full w-28 mt-5"
                style={{ borderWidth: 1, borderColor: "#f59e0b" }}
                onPress={() => navigation.goBack()}
              >
                <Text className="text-lg text-center text-gray-700">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ backgroundColor: Colors.primaryAmber }}
                className="py-1 ml-5 rounded-full w-28 mt-5"
                onPress={handleConfirmPress}
              >
                <Text className="text-lg text-white text-center">Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderTopWidth: 1,
            borderTopColor: "#dddddd",
            marginBottom: 25,
          }}
        >
          <TextInput
            value={message}
            onChangeText={(text) => setMessage(text)}
            style={{
              flex: 1,
              height: 40,
              borderWidth: 1,
              borderColor: "#dddddd",
              borderRadius: 20,
              paddingHorizontal: 10,
            }}
            placeholder="Type Your message..."
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              marginHorizontal: 8,
            }}
          >
            <TouchableOpacity onPress={pickImage}>
              <Entypo name="camera" size={24} color="gray" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => handleSend("text")}
            style={{
              backgroundColor: Colors.primaryAmber,
              padding: 10,
              borderRadius: 75,
            }}
          >
            {sendLoading ? (
              <DotIndicator color="white" size={3} />
            ) : (
              <Ionicons name="send" size={15} color="white" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatMessagesScreen;

const styles = StyleSheet.create({});
