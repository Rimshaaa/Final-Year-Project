import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { GiftedChat, Bubble, Send } from "react-native-gifted-chat";
import { firebase } from "../firebase";
import { FontAwesome } from "@expo/vector-icons";
import { KeyboardAvoidingView } from "react-native";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Navigation } from "react-native-feather";
import { useNavigation } from "@react-navigation/native";

function ChatScreen() {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const firestore = firebase.firestore();
  const chatRef = firestore.collection("chat");

  useEffect(() => {
    const unsubscribe = chatRef.onSnapshot((querySnapshot) => {
      const messageData = querySnapshot.docs.map((doc) => doc.data());
      setMessages(messageData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const onSend = (newMessages = []) => {
    const message = newMessages[0];
    chatRef.add({
      _id: message._id,
      text: message.text,
      createdAt: Date.parse(new Date()),
      user: message.user,
    });
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "orange", // Your bubble background color
          },
        }}
        textStyle={{
          right: {
            color: "#FFFFFF", // Your text color
          },
        }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={styles.sendButton}>
          <FontAwesome name="send" size={20} color="#fff" />
        </View>
      </Send>
    );
  };
  const onDelete = (messageId) => {
    // Get a reference to the specific message document in Firestore
    const messageDocRef = chatRef.doc(messageId);

    // Delete the message document
    messageDocRef
      .delete()
      .then(() => {
        console.log(`Message with ID ${messageId} deleted successfully.`);
      })
      .catch((error) => {
        console.error(`Error deleting message: ${error}`);
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ height: 70, backgroundColor: "orange", padding: 14 }}>
        <TouchableOpacity style={{ padding: 10 }}>
          <AntDesign name="back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <GiftedChat
          messages={messages}
          onSend={(newMessages) => onSend(newMessages)}
          user={{
            _id: "1",
            name: "user",
          }}
          onLongPress={(messageId) => {
            onDelete(messageId);
          }}
          renderBubble={renderBubble}
          alwaysShowSend
          renderSend={renderSend}
          scrollToBottom
          listViewProps={{
            keyboardShouldPersistTaps: "handled",
          }}
          textInputStyle={styles.textInput}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  sendButton: {
    height: 36,
    width: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    backgroundColor: "orange", // Your send button background color
    marginRight: 5,
    marginBottom: 5,
  },
  textInput: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#D3D3D3", // Your text input border color
    marginRight: 6,
    paddingHorizontal: 12,
  },
});

export default ChatScreen;
