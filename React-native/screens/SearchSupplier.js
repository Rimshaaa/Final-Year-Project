import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeftIcon, Bars3CenterLeftIcon, ShoppingCartIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '../theme';
import StarRating from 'react-native-star-rating';
import ResOrderHistory from '../components/ResOrderHistory';
import { cartItems } from '../constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextInput } from 'react-native';
import { featuredFruits, categories } from '../constants';
import MyHeader2 from '../components/MyHeader2';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'

  
export default function SearchSupplier(props) {
    const navigation = useNavigation();
    const [activeCategory, setActiveCategory] = useState('Oranges');

  return (
    <View className="flex-1 bg-white" style={{backgroundColor: themeColors.bg}}>
    <MyHeader2
    title= 'Search'
    right="more-vertical"
    optionalBtn="shopping-cart"
    onRightPress={() => console.log('right')}
  />


    <SafeAreaView className="flex-1 flex justify-between bg-white">
            <View className="flex-1 justify-start mx-5">
                

        {/* search bar */}
        <View className="mx-5 mt-5 shadow">
          <View className="flex-row items-center rounded-full p-1 bg-[#e6e6e6]">
            <TextInput placeholder='Search Suppliers' className="p-4 flex-1 font-semibold text-gray-700" />
            <TouchableOpacity 
              className="rounded-full p-2" 
              style={{backgroundColor: themeColors.resbg}}>
              <MagnifyingGlassIcon size="25" strokeWidth={2} color="white" />
            </TouchableOpacity>
          </View>
        </View>
               
 </View>
 </SafeAreaView> 
 </View>   
  )
}