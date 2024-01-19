/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from "./bottomTabNavigator";
import Icon from "react-native-vector-icons/Ionicons";
import CustomDrawer from "../components/customDrawer";
import SupplierDashboard from '../screens/SupplierDashboard';
import SupplierInventory from '../screens/SupplierInventory';
import SupplierStore from '../screens/SupplierStore';
import MyProfile from '../screens/MyProfile';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return(
    <Drawer.Navigator 
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#B666D2",
        drawerActiveTintColor: "#FFFFFF",
        drawerLabelStyle: { 
            marginLeft: -20,
        },
        }}>

        <Drawer.Screen name={"SupplierDashboard"} initialParams={{ params: 'SupplierDashboard' }} component={SupplierDashboard} options={{ 
            title:"Feed",
            drawerIcon : ({focused, color, size}) =>(
                <Icon name="home-sharp" size={18} color={color} />
            )
        }} />

        <Drawer.Screen name={"SupplierInventory"}  initialParams={{ params: 'SupplierInventory' }} component={SupplierInventory} options={{
            title:"Profile", 
            drawerIcon : ({focused, color, size}) =>(
                <Icon name="ios-person-circle-sharp" size={18} color={color} />
            )
        }} />

        <Drawer.Screen name={"SupplierStore"} initialParams={{ params: 'SupplierStore' }} component={SupplierStore} options={{
            title:"Notification", 
            drawerIcon : ({focused, color, size}) =>(
                <Icon name="ios-notifications-circle" size={18} color={color} />
            )
        }} />

        <Drawer.Screen name={"MyProfile"} initialParams={{ params: 'MyProfile' }} component={MyProfile} options={{
            title:"Settings", 
            drawerIcon : ({focused, color, size}) =>(
                <Icon name="settings-sharp" size={18} color={color} />
            )
        }} />
        
    </Drawer.Navigator>
    )
}

export default DrawerNavigator;


/*import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Tab ICons...

import SupplierDashboard from '../screens/SupplierDashboard';
import SupplierInventory from '../screens/SupplierInventory';
import SupplierStore from '../screens/SupplierStore';
import MyProfile from '../screens/MyProfile';
import LoginScreen from '../screens/LoginScreen';
// Menu


// Photo


export default function App() {
  const [currentTab, setCurrentTab] = useState("SupplierDashboard");
  // To get the curretn Status of menu ...
  const [showMenu, setShowMenu] = useState(false);

  // Animated Properties...

  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Intially must be One...
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container}>

      <View style={{ justifyContent: 'flex-start', padding: 15 }}>
        <Image source={require('../assets/images/supplieroLogo.png')} style={{
          width: 60,
          height: 60,
          borderRadius: 10,
          marginTop: 8
        }}></Image>

        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'white',
          marginTop: 20
        }}>Jenna Ezarik</Text>

        <TouchableOpacity>
          <Text style={{
            marginTop: 6,
            color: 'white'
          }}>View Profile</Text>
        </TouchableOpacity>

        <View style={{ flexGrow: 1, marginTop: 50 }}>
          {
            // Tab Bar Buttons....
          }

          {TabButton(currentTab, setCurrentTab, "SupplierDashboard", SupplierDashboard)}
          {TabButton(currentTab, setCurrentTab, "SupplierInventory", SupplierInventory)}
          {TabButton(currentTab, setCurrentTab, "SupplierStore", SupplierStore)}
          {TabButton(currentTab, setCurrentTab, "MyProfile", MyProfile)}

        </View>

        <View>
          {TabButton(currentTab, setCurrentTab, "LoginScreen", LoginScreen)}
        </View>

      </View>

      {
        // Over lay View...
      }

      <Animated.View style={{
        flexGrow: 1,
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: showMenu ? 15 : 0,
        // Transforming View...
        transform: [
          { scale: scaleValue },
          { translateX: offsetValue }
        ]
      }}>

        {
          // Menu Button...
        }

        <Animated.View style={{
          transform: [{
            translateY: closeButtonOffset
          }]
        }}>
          <TouchableOpacity onPress={() => {
            // Do Actions Here....
            // Scaling the view...
            Animated.timing(scaleValue, {
              toValue: showMenu ? 1 : 0.88,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            Animated.timing(offsetValue, {
              // YOur Random Value...
              toValue: showMenu ? 0 : 230,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            Animated.timing(closeButtonOffset, {
              // YOur Random Value...
              toValue: !showMenu ? -30 : 0,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            setShowMenu(!showMenu);
          }}>

            <Image source={require('../assets/images/supplieroLogo.png')} style={{
              width: 20,
              height: 20,
              tintColor: 'black',
              marginTop: 40,

            }}></Image>

          </TouchableOpacity>

          <Text style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: 'black',
            paddingTop: 20
          }}>{currentTab}</Text>

          <Image source={require('../assets/images/supplieroLogo.png')} style={{
            width: '100%',
            height: 300,
            borderRadius: 15,
            marginTop: 25
          }}></Image>

          <Text style={{
            fontSize: 20,
            fontWeight: 'bold'
            , paddingTop: 15,
            paddingBottom: 5
          }}>Jenna Ezarik</Text>

          <Text style={{
          }}>Techie, YouTuber, PS Lover, Apple Sheep's Sister</Text>
        </Animated.View>

      </Animated.View>

    </SafeAreaView>
  );
}

// For multiple Buttons...
const TabButton = (currentTab, setCurrentTab, title, image) => {
  return (

    <TouchableOpacity onPress={() => {
      if (title == "LogOut") {
        // Do your Stuff...
      } else {
        setCurrentTab(title)
      }
    }}>
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: currentTab == title ? 'white' : 'transparent',
        paddingLeft: 13,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 15
      }}>

        <Image source={require('../assets/images/supplieroLogo.png')} style={{
          width: 25, height: 25,
          tintColor: currentTab == title ? "#5359D1" : "white"
        }}></Image>

        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          paddingLeft: 15,
          color: currentTab == title ? "#5359D1" : "white"
        }}>{title}</Text>

      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5359D1',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});*/
