import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ backgroundColor: themeColors.bg, flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <ScrollView>
        
          <Image
            source={require("../assets/images/logo4.png")}
            style={{ marginTop: 70, width:350, height:350 }}
          />
      
          <Text
            className=" text-purple-500 text-2xl text-center"
            style={{ marginTop: 150, position: "relative"  }}
          >
            Getting Started!
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("ResWelcomeScreen")}
            className="py-3 bg-amber-500"
            style={{ borderRadius: 90, width: 350, marginTop:20, position: "relative" }}
          >
            <Text className="text-xl  text-center text-black">Restaurant</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Welcome")}
            className="py-3 bg-amber-500 "
            style={{ borderRadius: 90, width: 350, marginTop:20, position: "relative" }}
          >
            <Text className="text-xl text-center text-black">Supplier</Text>
          </TouchableOpacity>
     
      
      </ScrollView>
      </View>
  );
}
