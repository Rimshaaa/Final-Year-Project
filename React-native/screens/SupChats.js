import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Pressable,
  BackHandler,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useEffect } from "react";
import Loader from "../components/Loader";
import { extractTime } from "../utils";
import Colors from "../constants/Colors";
import { useDeleteChatMutation, useGetChatsQuery } from "../redux/services";
import { useSelector } from "react-redux";
import MessagesPlaceholder from "../common/Placeholders/MessagesPlaceholder";
import { useNavigation } from "@react-navigation/native";
import Empty from "../components/Empty";

const ResChats = ({ route }) => {
  const user = useSelector((state) => state.authReducer.activeUser);
  const userId = user._id;
  const navigation = useNavigation();

  const { prevScreen = "" } = route.params || {};

  const {
    data,
    isLoading: messagesLoading,
    isFetching,
  } = useGetChatsQuery(userId, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const [deleteChat] = useDeleteChatMutation();

  const [selectedMessages, setSelectedMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [messageList, setMessageList] = useState([]);

  const toggleSelectMessage = (message) => {
    const index = selectedMessages.findIndex(
      (selectedMessage) => selectedMessage.key === message.key
    );

    if (index !== -1) {
      const updatedSelectedMessages = selectedMessages.filter(
        (selectedMessage) => selectedMessage.key !== message.key
      );
      setSelectedMessages(updatedSelectedMessages);
    } else {
      setSelectedMessages([...selectedMessages, message]);
    }
  };

  const renderItemMessage = ({ item, index }) => {
    const isEnd = index === 0;
    const isSelected = selectedMessages.some(
      (selectedMessage) => selectedMessage._id === item._id
    );

    return (
      <View
        style={{
          borderTopColor: isEnd ? null : Colors.resprimary,
          borderTopWidth: isEnd ? null : 0.2,
          marginHorizontal: 30,
          marginBottom: 10,
          backgroundColor: Colors.primaryAmber,
          borderRadius: 10,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("SupplierChatting", {
              recepientId:
                item.recepientId._id === userId
                  ? item.senderId._id
                  : item.recepientId._id,
              recepientName:
                item.recepientId._id === userId
                  ? item.senderId.name
                  : item.recepientId.name,
              recepientImage:
                item.recepientId._id === userId
                  ? item.senderId.image
                  : item.recepientId.image,
              senderId: userId,
              prevScreen: prevScreen === "profile" ? "contract" : "",
            })
          }
          onLongPress={() => toggleSelectMessage(item)}
          style={{
            flexDirection: false ? "row-reverse" : "row",
            paddingVertical: 20,
            justifyContent: "center",
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              flex: 8,
              flexDirection: false ? "row-reverse" : "row",
              alignItems: "center",
            }}
          >
            {isSelected && (
              <MaterialIcons
                name="check-circle"
                size={24}
                color={Colors.resprimary}
                style={{ marginHorizontal: 10 }}
              />
            )}
            <Image
              source={{
                uri:
                  item.recepientId._id === userId
                    ? item.senderId.image
                    : item.recepientId.image,
              }}
              style={{ height: 50, width: 50, borderRadius: 25 }}
            />
            <View
              style={{
                marginHorizontal: 15,
                alignItems: false ? "flex-end" : "flex-start",
                justifyContent: "center",
              }}
            >
              <Text
                numberOfLines={1}
                className="tracking-wider text-lg"
                style={{ overflow: "hidden", color: "white" }}
              >
                {item.recepientId._id === userId
                  ? item.senderId.name
                  : item.recepientId.name}
              </Text>
              <Text
                numberOfLines={1}
                className="text-gray-900"
                style={{
                  marginTop: 5,
                  overflow: "hidden",
                  fontSize: 15,
                }}
              >
                {item.messageType === "text"
                  ? item.message
                  : item.messageType === "image"
                  ? "Photo"
                  : item.messageType === "dispute"
                  ? "File Dispute"
                  : item.messageType === "receipt"
                  ? "Receipt"
                  : "Contract"}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 2,
              alignItems: false ? "flex-start" : "flex-end",
              marginTop: 5,
            }}
          >
            <Text
              className="text-white"
              numberOfLines={1}
              style={{ overflow: "hidden" }}
            >
              {item.message === "Empty Chat, Join Now"
                ? ""
                : extractTime(item.timeStamp)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    setMessageList(data);
  }, [data]);

  const renderSelectDeleteBar = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 5,
          backgroundColor: Colors.light,
        }}
      >
        <TouchableOpacity onPress={handleDeleteMessages}>
          <Ionicons name="trash" size={24} color={Colors.red} />
        </TouchableOpacity>
        <Text style={{ color: "black" }}>Selected</Text>
        <View style={{ width: 24 }} />
      </View>
    );
  };

  const handleDeleteMessages = async () => {
    deleteChat({
      senderId: selectedMessages[0].senderId._id,
      recepientId: selectedMessages[0].recepientId._id,
    })
      .then((res) => setSelectedMessages([]))
      .catch((err) => alert(err.message));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoading && <Loader />}
      <View
        style={{
          paddingVertical: 30,
          flexDirection: false ? "row-reverse" : "row",
          alignItems: "center",
          backgroundColor: Colors.primaryAmber,
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name={false ? "arrow-forward" : "arrow-back"}
            size={25}
            color={Colors.white}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: "white",
            marginHorizontal: 12,
            marginRight: 225,
            fontSize: 20,
          }}
        >
          Messages
        </Text>
      </View>

      {selectedMessages.length > 0 && renderSelectDeleteBar()}
      {messagesLoading ? (
        <MessagesPlaceholder />
      ) : messageList && messageList.length === 0 ? (
        <Empty text="No Messages Yet" />
      ) : (
        <FlatList
          ListHeaderComponent={
            <Text
              style={{
                top: 23,
                left: 20,
                fontSize: 23,
                fontWeight: 900,
                marginBottom: 30,
              }}
            >
              Chats
            </Text>
          }
          data={messageList}
          renderItem={renderItemMessage}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default ResChats;
