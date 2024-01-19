/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SupplierDashboard from '../screens/SupplierDashboard';
import SupplierInventory from '../screens/SupplierInventory';
import Icon from "react-native-vector-icons/Ionicons";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import CustomTabBarButton from "../components/customTabBarButton";
import CustomTabBar from "../components/customTabBar";
import { useNavigation } from "@react-navigation/native";
Icon.loadFont();

const Tab = createBottomTabNavigator();

function BottomTabNavigator(props) {
  const navigation = useNavigation();
  console.log("navigation", props)
  return (
    <Tab.Navigator
      initialRouteName={props.route && props.route.params && props.route.params.params?props.route.params.params:'SupplierDashboard'}
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={(route)=>({
      headerShown:false,
      tabBarShowLabel:false,
      tabBarStyle:styles.tabBarStyle,
      tabBarActiveTintColor:"#B666D2", 
      tabBarInactiveTintColor:"#c1c1c1", 
      tabBarIcon:({color, size, focused})=>{
        let iconName;
        if(route.route.name === "SupplierDashboard"){
          iconName = focused ? "ios-home-sharp" : "ios-home-outline";
        }else if(route.route.name === "Profile"){
          iconName = focused ? "ios-person-circle-sharp" : "ios-person-circle-outline";
        }else if(route.route.name === "Notification"){
          iconName = focused ? "ios-notifications-circle" : "ios-notifications-circle-outline";
        }else if(route.route.name === "Settings"){
          iconName = focused ? "settings-sharp" : "ios-settings-outline";
        }
        return <Icon name={iconName} size={22} color={color} />
      // eslint-disable-next-line comma-dangle
      }
      })}>
      <Tab.Screen name="SupplierDashboard" component={SupplierDashboard} options={{
        tabBarLabel:"Feeds",
        title:"Feed",
        headerShown:true,
        tabBarButton: props => (<CustomTabBarButton route="SupplierDashboard" {...props} />),
        headerLeft:() =>{
          return (
            <TouchableOpacity style={{paddingLeft:10}} onPress={() => navigation.openDrawer()}>
              <Icon name={Platform.OS === 'ios' ? 'ios-menu': 'md-menu'} size={30} color={'#222'} style={{marginRight:10}} />
            </TouchableOpacity>
          )
        }
      }} />
      <Tab.Screen name="SupplierInventory" component={SupplierInventory} options={{
        tabBarLabel:"Profile",
        title:"Profile",
        headerShown:true,
        tabBarButton: props => <CustomTabBarButton {...props} />,
        headerLeft:() =>{
          return (
            <TouchableOpacity style={{paddingLeft:10}} onPress={() => navigation.openDrawer()}>
              <Icon name={Platform.OS === 'ios' ? 'ios-menu': 'md-menu'} size={30} color={'#222'} style={{marginRight:10}} />
            </TouchableOpacity>
          )
        }
      }} />
      <Tab.Screen name="SupplierInventory" component={SupplierInventory} options={{
         tabBarLabel:"Notification",
         title:"Notification",
         headerShown:true,
        tabBarButton: props => <CustomTabBarButton {...props} />,
        headerLeft:() =>{
          return (
            <TouchableOpacity style={{paddingLeft:10}} onPress={() => navigation.openDrawer()}>
              <Icon name={Platform.OS === 'ios' ? 'ios-menu': 'md-menu'} size={30} color={'#222'} style={{marginRight:10}} />
            </TouchableOpacity>
          )
        }
      }} />
      <Tab.Screen name="SupplierInventory" component={SupplierInventory}  options={{
        tabBarLabel: "Settings",
        title:"Settings",
        headerShown:true,
        tabBarButton: props => <CustomTabBarButton {...props} />,
        headerLeft:() =>{
          return (
            <TouchableOpacity style={{paddingLeft:10}} onPress={() => navigation.openDrawer()}>
              <Icon name={Platform.OS === 'ios' ? 'ios-menu': 'md-menu'} size={30} color={'#222'} style={{marginRight:10}} />
            </TouchableOpacity>
          )
        }
      }} />
    </Tab.Navigator>
  );
}
export default BottomTabNavigator;

const styles = StyleSheet.create({

  tabBarStyle:{
    backgroundColor:'transparent',
    position:'absolute',
    borderTopWidth:0,
    bottom:15,
    right:0,
    left:0,
    height:55,
  }

});