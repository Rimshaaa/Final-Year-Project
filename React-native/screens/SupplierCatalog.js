import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {themeColors} from '../theme';
import * as Icon from "react-native-feather";
import { StatusBar } from 'expo-status-bar';
import { categories2, coffeeItems } from '../constants';
import Carousel from 'react-native-snap-carousel';
import CoffeeCard from '../components/coffeeCard';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { MapPinIcon } from 'react-native-heroicons/solid'
import AnimTab2 from '../BottomTab/AnimTab2';
import MyHeader from '../components/MyHeader';
import { useNavigation } from '@react-navigation/native'



export default function SupplierCatalog() {
  const [activeCategory, setActiveCategory] = useState(1);
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white">
      <StatusBar />
      <MyHeader
    back
    onPressBack={() => navigation.goBack()}
    title= 'Catalog'
    right="more-vertical"
    optionalBtn="shopping-cart"
    onRightPress={() => console.log('right')}
  />

      <Image 
        source={require('../assets/images/bgpic.jpg')} 
        style={{height: 200}} 
        className="w-full absolute -top-5 opacity-10" />
      <SafeAreaView className="flex-1">
      
      <View className= "flex items-center">

      <Text style={{fontSize: 24, fontWeight: 'bold'}}>My Catalog</Text>
      </View>

        {/* search bar */}
        <View className="mx-5 mt-5 shadow">
          <View className="flex-row items-center rounded-full p-1 bg-[#e6e6e6]">
            <TextInput placeholder='Search' className="p-4 flex-1 font-semibold text-gray-700" />
            <TouchableOpacity 
              className="rounded-full p-2" 
              style={{backgroundColor: themeColors.bgLight}}>
              <MagnifyingGlassIcon size="25" strokeWidth={2} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* categories */}
        <View className="px-5 mt-6">

          <FlatList 
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories2}
            keyExtractor={item=> item.id}
            className="overflow-visible"
            renderItem={({item})=>{
              isActive = item.id==activeCategory;
              let activeTextClass = isActive? 'text-white': 'text-gray-700';
              if(item.id === 1) {
              return (
                <TouchableOpacity 
                onPress={()=> setActiveCategory(item.id) & navigation.navigate('ProductsList')} 
                style={{backgroundColor: isActive? themeColors.bgLight: 'rgba(0,0,0,0.07)'}} 
                className="p-4 px-5 mr-2 rounded-full shadow">
                  <Text className={"font-semibold " + activeTextClass}>{item.title}</Text>
                </TouchableOpacity>
              )

              }
              if(item.id === 2) {
                return (
                  <TouchableOpacity 
                  onPress={()=> setActiveCategory(item.id) & navigation.navigate('ProductsList')} 
                  style={{backgroundColor: isActive? themeColors.bgLight: 'rgba(0,0,0,0.07)'}} 
                  className="p-4 px-5 mr-2 rounded-full shadow">
                    <Text className={"font-semibold " + activeTextClass}>{item.title}</Text>
                  </TouchableOpacity>
                )
                
                }

                if(item.id === 3) {
                  return (
                    <TouchableOpacity 
                    onPress={()=> setActiveCategory(item.id) & navigation.navigate('ProductsList')} 
                    style={{backgroundColor: isActive? themeColors.bgLight: 'rgba(0,0,0,0.07)'}} 
                    className="p-4 px-5 mr-2 rounded-full shadow">
                      <Text className={"font-semibold " + activeTextClass}>{item.title}</Text>
                    </TouchableOpacity>
                  )
                  
                  }

                  if(item.id === 4) {
                    return (
                      <TouchableOpacity 
                      onPress={()=> setActiveCategory(item.id) & navigation.navigate('SplashScreen')} 
                      style={{backgroundColor: isActive? themeColors.bgLight: 'rgba(0,0,0,0.07)'}} 
                      className="p-4 px-5 mr-2 rounded-full shadow">
                        <Text className={"font-semibold " + activeTextClass}>{item.title}</Text>
                      </TouchableOpacity>
                    )
                    
                    }

                    if(item.id === 5) {
                      return (
                        <TouchableOpacity 
                        onPress={()=> setActiveCategory(item.id) & navigation.navigate('SplashScreen')} 
                        style={{backgroundColor: isActive? themeColors.bgLight: 'rgba(0,0,0,0.07)'}} 
                        className="p-4 px-5 mr-2 rounded-full shadow">
                          <Text className={"font-semibold " + activeTextClass}>{item.title}</Text>
                        </TouchableOpacity>
                      )
                      
                      }
            }}
          />
        </View>
          
          {/* coffee cards */}
        <View className="mt-11 py-2">
          <Carousel
            containerCustomStyle={{overflow: 'visible'}}
            data={coffeeItems}
            renderItem={({item})=> <CoffeeCard item={item} />}
            firstItem={1}
            loop={true}
            inactiveSlideScale={0.77}
            inactiveSlideOpacity={0.75}
            sliderWidth={400}
            itemWidth={260}
            slideStyle={{display: 'flex', alignItems: 'center', marginTop:40}}
            
          />
        </View>
      </SafeAreaView>
      
      <View>
        <AnimTab2></AnimTab2>
      </View>
    </View>


  )

}
