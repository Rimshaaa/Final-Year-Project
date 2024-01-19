import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "@react-navigation/native";
import Colors from "../constants/Colors";

const Splash = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView className="bg-white">
      <View className="flex">
        <ScrollView>
          <ImageBackground
            source={require("../assets/images/app-bg.jpg")}
            style={{ height: 900 }}
          >
            <View style={styles.container}>
              <View style={styles.header}>
                <Animatable.Image
                  animation="bounceIn"
                  duraton="1500"
                  source={require("../assets/images/logo4.png")}
                  style={styles.logo}
                  resizeMode="stretch"
                />
              </View>
              <Animatable.View
                style={[styles.footer, {}]}
                animation="fadeInUpBig"
              >
                <Text style={[styles.title]}>
                  Distances will no longer be a hurdle for Quality!
                </Text>

                <View style={styles.button}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("SupplierOrRestaurant")}
                  >
                    <LinearGradient
                      colors={["#A134F6", "#A134F6"]}
                      style={styles.signIn}
                    >
                      <Text style={styles.textSign}>Get Started</Text>
                      <MaterialIcons
                        name="navigate-next"
                        color="#fff"
                        size={24}
                      />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </Animatable.View>
            </View>
          </ImageBackground>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Splash;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: 450,
    height: 450,
  },
  title: {
    color: "#FF9801",
    fontWeight: "400",
    fontWeight: "bold",
    fontSize: 20,
    alignItems: "center",
    marginRight: 50,
    marginLeft: 50,
    textAlign: "center",
  },
  text: {
    fontSize: 20,
    color: "#FF9801",
    marginBottom: 10,
    marginRight: 50,
    marginLeft: 120,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
  button: {
    alignItems: "center",
    marginTop: 10,
    
  },
  signIn: {
    width: 300,
    height: 50,
    marginTop: 0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
