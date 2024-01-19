//import { View, Text } from 'react-native'
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
//import { createAppContainer } from 'react-navigation';
import { createNativeStackNavigator, CardStyleInterpolators } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Image } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SupplierOrRestaurant from '../screens/SupplierOrRestaurant';
import SplashScreen from '../screens/SplashScreen';
import Dashboard from '../screens/Dashboard';
import SupplierDashboard from '../screens/SupplierDashboard';
import SupplierInventory from '../screens/SupplierInventory';
import SupplierStore from '../screens/SupplierStore';
import CreateStore from '../screens/CreateStore';
import EditStore from '../screens/EditStore';
import MyStore from '../screens/MyStore';
import MyProfile from '../screens/MyProfile';
import Profile from '../screens/Profile';
import RestaurantRequest from '../screens/RestaurantRequest';
import BiddingScreen from '../screens/BiddingScreen';
import BidConfirmed from '../screens/BidConfirmed';
import ResBids from '../screens/ResBids';
import Chats from '../screens/Chats';
import PersonalChat from '../screens/PersonalChat';
import AddItem from '../screens/AddItem';
import ProductsList from '../screens/ProductsList';
import DetailsScreen from '../screens/DetailsScreen';
import SupplierCatalog from '../screens/SupplierCatalog';
import ResLogin from '../screens/ResLogin';
import ResSignUp from '../screens/ResSignUp';
import RestaurantDashboard from '../screens/RestaurantDashboard';
import ResProfile from '../screens/ResProfile';
import OrderHistory from '../screens/OrderHistory';
import SearchSupplier from '../screens/SearchSupplier';
import CartScreen from '../screens/CartScreen';
import OrderTracking from '../screens/OrderTracking';
import MyContracts from '../screens/MyContracts';
import BottomTabNavigator from '../navigation/bottomTabNavigator';
import drawerNavigator from '../navigation/drawerNavigator';
import AnimTab2 from '../BottomTab/AnimTab2';
import AnimTab3 from '../BottomTab/AnimTab3';
import Splash from '../screens/Splash';
import Store from '../screens/Store';
import MyBids from '../screens/MyBids';
import CreateInventory from '../screens/CreateInventory';
import UploadPortfolio from '../screens/UploadPortfolio';
import Portfolio from '../screens/Portfolio';
import ContractForm from '../screens/ContractForm';
import GenerateRequest from '../screens/GenerateRequest';
import VegList from '../screens/VegList';
import ResInventory from '../screens/ResInventory';
import SupplierBidRequest from '../screens/SupplierBidRequest';
import AcceptBid from '../screens/AcceptBid';
import ResEditProfile from '../screens/ResEditProfile';
import ResOrderTracking from '../screens/ResOrderTracking';
import CreateResInventory from '../screens/CreateResInventory';
import ResAddItem from '../screens/ResAddItem';
import ResWelcomeScreen from '../screens/ResWelcomeScreen';
import ForgetPassword from '../screens/ForgetPassword';
import ResForgetPassword from '../screens/ResForgetPassword';
import ResetPassword from '../screens/ResetPassword';
import ResResetPassword from '../screens/ResResetPassword';
import FruitList from '../screens/FruitList';
import MeatList from '../screens/MeatList';
import DairyProductList from '../screens/DairyProductList';
import SpicesList from '../screens/SpicesList';
import SeaFoodList from '../screens/SeaFoodList';
import { firebase } from '../firebase';
import Chat from '../Chat/Chat';
import DrawerScreen from '../navigation/DrawerScreen';
import Details from '../screens/Details';
import AddCategory from '../screens/AddCategory';
import AddInventoryItems from '../screens/AddInventoryItems';
import CustomDrawer from '../Content/CustomDrawer';
import StarRating from '../Content/StarRating';
import FindSuppliers from '../screens/FindSuppliers';
import ResAddCategory from '../screens/ResAddCategory';
import ResAddInventoryItems from '../screens/ResAddInventoryItem';
import ResDetails from '../screens/ResDetails';
import Dropdown from '../Dropdown/DropdownMenu';
import SupplierProfiles from '../screens/SupplierProfiles'
import ResOTPInput from '../screens/ResOTPInput'
import ChattingScreen from '../screens/ChattingScreen'
import SupplierChatting from '../screens/SupplierChatting'
import ResChats from '../screens/ResChats'
import supChats from '../screens/SupChats'
import Checkout from '../screens/Checkout';
import Receipt from '../screens/Receipt';
import FeedbackScreen from '../screens/FeedbackScreen';
import EditStoreItems from '../screens/EditStoreItems';
import { useSelector } from 'react-redux';
import SupResetPassword from '../screens/SupResetPassword';
const Stack = createNativeStackNavigator();


export default function AppNavigation() {
 const user = useSelector(state => state.authReducer.activeUser)
  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Splash' screenOptions={{ title: null, headerStyle: { elevation: 0 } }}>
          <Stack.Screen name="Splash" options={{ headerShown: false }} component={Splash} />
          <Stack.Screen name="SplashScreen" options={{ headerShown: false }} component={SplashScreen} />
          <Stack.Screen name="SupplierOrRestaurant" options={{ headerShown: false }} component={SupplierOrRestaurant} />
          <Stack.Screen name="Welcome" options={{ headerShown: false }} component={WelcomeScreen} />
          <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
          <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
          <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUpScreen} />
          <Stack.Screen name="ResWelcomeScreen" options={{ headerShown: false }} component={ResWelcomeScreen} />
          <Stack.Screen name="ResLogin" options={{ headerShown: false }} component={ResLogin} />
          <Stack.Screen name="ResSignUp" options={{ headerShown: false }} component={ResSignUp} />
          <Stack.Screen name="BottomNavigation2" options={{ headerShown: false }} component={AnimTab3} />
          <Stack.Screen name="FindSuppliers" options={{ headerShown: false }} component={FindSuppliers} />
          <Stack.Screen name="ResAddCategory" options={{ headerShown: false }} component={ResAddCategory} />
          <Stack.Screen name="ResAddInventoryItems" options={{ headerShown: false }} component={ResAddInventoryItems} />
          <Stack.Screen name="details" options={{ headerShown: false }} component={ResDetails} />
          <Stack.Screen name="SupplierBidRequest" options={{ headerShown: false }} component={SupplierBidRequest} />
          <Stack.Screen name="AcceptBid" options={{ headerShown: false }} component={AcceptBid} />
          <Stack.Screen name="SupplierProfiles" options={{ headerShown: false }} component={SupplierProfiles} />
          <Stack.Screen name="DetailsScreen" options={{ headerShown: false }} component={DetailsScreen} />
          <Stack.Screen name="ContractForm" options={{ headerShown: false }} component={ContractForm} />
          <Stack.Screen name="VegList" options={{ headerShown: false }} component={VegList} />
          <Stack.Screen name="ResInventory" options={{ headerShown: false }} component={ResInventory} />
          <Stack.Screen name="ResForgetPassword" options={{ headerShown: false }} component={ResForgetPassword} />
          <Stack.Screen name="ResOrderTracking" options={{ headerShown: false }} component={ResOrderTracking} />
          <Stack.Screen name="ResResetPassword" options={{ headerShown: false }} component={ResResetPassword} />
          <Stack.Screen name="ResOTPInput" options={{ headerShown: false }} component={ResOTPInput} />
          <Stack.Screen name="Checkout" options={{ headerShown: false }} component={Checkout} />
          <Stack.Screen name="Receipt" options={{ headerShown: false }} component={Receipt} />
          <Stack.Screen name="FeedbackScreen" options={{ headerShown: false }} component={FeedbackScreen} />
          <Stack.Screen name="EditStoreItems" options={{ headerShown: false }} component={EditStoreItems} />
          <Stack.Screen name="ForgetPassword" options={{ headerShown: false }} component={ForgetPassword} />
          <Stack.Screen name="SupResetPassword" options={{ headerShown: false }} component={SupResetPassword} />



        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
       { user && user.role === 'supplier' ? <Stack.Screen name="Drawer" options={{ headerShown: false }} component={DrawerScreen} />:
        <Stack.Screen name="BottomNavigation2" options={{ headerShown: false }} component={AnimTab3} />
       
       }
        <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
        <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
        <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUpScreen} />
        <Stack.Screen name="ResWelcomeScreen" options={{ headerShown: false }} component={ResWelcomeScreen} />
        <Stack.Screen name="ResLogin" options={{ headerShown: false }} component={ResLogin} />
        <Stack.Screen name="ResSignUp" options={{ headerShown: false }} component={ResSignUp} />
        <Stack.Screen name="Welcome" options={{ headerShown: false }} component={WelcomeScreen} />
        <Stack.Screen name="SupplierProfiles" options={{ headerShown: false }} component={SupplierProfiles} />
        <Stack.Screen name="SupplierOrRestaurant" options={{ headerShown: false }} component={SupplierOrRestaurant} />
        <Stack.Screen name="ResAddInventoryItems" options={{ headerShown: false }} component={ResAddInventoryItems} />
        <Stack.Screen name="ResAddCategory" options={{ headerShown: false }} component={ResAddCategory} />
        <Stack.Screen name="FindSuppliers" options={{ headerShown: false }} component={FindSuppliers} />
        <Stack.Screen name="GenerateRequest" options={{ headerShown: false }} component={GenerateRequest} />
        <Stack.Screen name="CustomDrawer" options={{ headerShown: false }} component={CustomDrawer} />
        <Stack.Screen name="StarRating" options={{ headerShown: false }} component={StarRating} />
        <Stack.Screen name="BottomNavigation" options={{ headerShown: false }} component={AnimTab2} />
        <Stack.Screen name="AddCategory" options={{ headerShown: false }} component={AddCategory} />
        <Stack.Screen name="AddInventoryItems" options={{ headerShown: false }} component={AddInventoryItems} />
        <Stack.Screen name="details" options={{ headerShown: false }} component={Details} />
        <Stack.Screen name="SupplierDashboard" options={{ headerShown: false }} component={SupplierDashboard} />
        <Stack.Screen name="Dashboard" options={{ headerShown: false }} component={Dashboard} />
        <Stack.Screen name="chat" options={{ headerShown: false }} component={Chat} />
        <Stack.Screen name="SupplierInventory" options={{ headerShown: false }} component={SupplierInventory} />
        <Stack.Screen name="SupplierStore" options={{ headerShown: false }} component={SupplierStore} />
        <Stack.Screen name="CreateStore" options={{ headerShown: false }} component={CreateStore} />
        <Stack.Screen name="EditStore" options={{ headerShown: false }} component={EditStore} />
        <Stack.Screen name="MyStore" options={{ headerShown: false }} component={MyStore} />
        <Stack.Screen name="MyProfile" options={{ headerShown: false }} component={MyProfile} />
        <Stack.Screen name="Profile" options={{ headerShown: false }} component={Profile} />
        <Stack.Screen name="RestaurantRequest" options={{ headerShown: false }} component={RestaurantRequest} />
        <Stack.Screen name="BiddingScreen" options={{ headerShown: false }} component={BiddingScreen} />
        <Stack.Screen name="BidConfirmed" options={{ headerShown: false }} component={BidConfirmed} />
        <Stack.Screen name="Chats" options={{ headerShown: true }} component={Chat} />
        <Stack.Screen name="PersonalChat" options={{ headerShown: false }} component={PersonalChat} />
        <Stack.Screen name="AddItem" options={{ headerShown: false }} component={AddItem} />
        <Stack.Screen name="ProductsList" options={{ headerShown: false }} component={ProductsList} />
        <Stack.Screen name="DetailsScreen" options={{ headerShown: false }} component={DetailsScreen} />
        <Stack.Screen name="SupplierCatalog" options={{ headerShown: false }} component={SupplierCatalog} />
        <Stack.Screen name="RestaurantDashboard" options={{ headerShown: false }} component={RestaurantDashboard} />
        <Stack.Screen name="ResProfile" options={{ headerShown: false }} component={ResProfile} />
        <Stack.Screen name="OrderHistory" options={{ headerShown: false }} component={OrderHistory} />
        <Stack.Screen name="SearchSupplier" options={{ headerShown: false }} component={SearchSupplier} />
        <Stack.Screen name="CartScreen" options={{ headerShown: false }} component={CartScreen} />
        <Stack.Screen name="OrderTracking" options={{ headerShown: false }} component={OrderTracking} />
        <Stack.Screen name="MyContracts" options={{ headerShown: false }} component={MyContracts} />
        <Stack.Screen name="drawerNavigator" options={{ headerShown: false }} component={drawerNavigator} />
        <Stack.Screen name="Store" options={{ headerShown: false }} component={Store} />
        <Stack.Screen name="MyBids" options={{ headerShown: false }} component={MyBids} />
        <Stack.Screen name="CreateInventory" options={{ headerShown: false }} component={CreateInventory} />
        <Stack.Screen name="UploadPortfolio" options={{ headerShown: false }} component={UploadPortfolio} />
        <Stack.Screen name="Portfolio" options={{ headerShown: false }} component={Portfolio} />
        <Stack.Screen name="ContractForm" options={{ headerShown: false }} component={ContractForm} />
        <Stack.Screen name="VegList" options={{ headerShown: false }} component={VegList} />
        <Stack.Screen name="ResInventory" options={{ headerShown: false }} component={ResInventory} />
        <Stack.Screen name="SupplierBidRequest" options={{ headerShown: false }} component={SupplierBidRequest} />
        <Stack.Screen name="AcceptBid" options={{ headerShown: false }} component={AcceptBid} />
        <Stack.Screen name="ResEditProfile" options={{ headerShown: false }} component={ResEditProfile} />
        <Stack.Screen name="ResOrderTracking" options={{ headerShown: false }} component={ResOrderTracking} />
        <Stack.Screen name="CreateResInventory" options={{ headerShown: false }} component={CreateResInventory} />
        <Stack.Screen name="ResAddItem" options={{ headerShown: false }} component={ResAddItem} />
        <Stack.Screen name="ForgetPassword" options={{ headerShown: false }} component={ForgetPassword} />
        <Stack.Screen name="ResForgetPassword" options={{ headerShown: false }} component={ResForgetPassword} />
        <Stack.Screen name="ResetPassword" options={{ headerShown: false }} component={ResetPassword} />
        <Stack.Screen name="ResResetPassword" options={{ headerShown: false }} component={ResResetPassword} />
        <Stack.Screen name="FruitList" options={{ headerShown: false }} component={FruitList} />
        <Stack.Screen name="MeatList" options={{ headerShown: false }} component={MeatList} />
        <Stack.Screen name="DairyProductList" options={{ headerShown: false }} component={DairyProductList} />
        <Stack.Screen name="SpicesList" options={{ headerShown: false }} component={SpicesList} />
        <Stack.Screen name="SeaFoodList" options={{ headerShown: false }} component={SeaFoodList} />
        <Stack.Screen name='Dropdown' options={{ headerShown: false }} component={Dropdown} />
        <Stack.Screen name="ResBids" options={{ headerShown: false }} component={ResBids} />
        <Stack.Screen name="ResChats" options={{ headerShown: false }} component={ResChats} />
        <Stack.Screen name="supChats" options={{ headerShown: false }} component={supChats} />
        <Stack.Screen name="ChattingScreen" options={{ headerShown: false }} component={ChattingScreen} />
        <Stack.Screen name="SupplierChatting" options={{ headerShown: false }} component={SupplierChatting} />
        <Stack.Screen name="Checkout" options={{ headerShown: false }} component={Checkout} />
        <Stack.Screen name="Receipt" options={{ headerShown: false }} component={Receipt} />
        <Stack.Screen name="FeedbackScreen" options={{ headerShown: false }} component={FeedbackScreen} />
        <Stack.Screen name="EditStoreItems" options={{ headerShown: false }} component={EditStoreItems} />


        

      </Stack.Navigator>
    </NavigationContainer>
  )
}
