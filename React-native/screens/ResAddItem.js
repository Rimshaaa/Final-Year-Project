import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import MyHeader2 from '../components/MyHeader2';


export default function ResAddItem() {
    const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white">
      <MyHeader2
        back
        onPressBack={() => navigation.goBack()}
        title= 'Add Item'
        right="more-vertical"
        optionalBtn="shopping-cart"
        onRightPress={() => console.log('right')}
      />
 <ScrollView>  
<View className= "flex-row items-center mt-5">

      <View className="flex items-center p-3 mb-2 mx-2 ml-40 border-gray-400 " style={{ height: 140, width: 160, borderWidth:  2, borderStyle:  'dashed'}}>
      <Text style={{fontSize: 32, fontWeight: 'semibold'}}>+</Text>
      <Text style={{fontSize: 24}}>Add Photo</Text>
      </View>


      </View>



      <View className="flex-1 bg-white px-8 pt-8"
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}
      >
        <View className="form space-y-2 mb-24">
            <Text className="text-black ml-1">Item Name</Text>
            <TextInput
                className="p-2 bg-gray-100 text-gray-700 rounded-2xl"
                //value="john snow"
                placeholder='Enter Name'
            />
            <Text className="text-black ml-1">Category</Text>
            <TextInput
                className="p-2 bg-gray-100 text-gray-700 rounded-2xl"
                placeholder='Enter Category'
            />
           <Text className="text-black ml-1">Price</Text>
            <TextInput
                className="p-2 bg-gray-100 text-gray-700 rounded-2xl"
                //value="john snow"
                placeholder='Enter Price'
            />
            <Text className="text-black ml-1">Offer Price</Text>
            <TextInput
                className="p-2 bg-gray-100 text-gray-700 rounded-2xl"
                //value="john snow"
                placeholder='Enter Offered price'
            />
           
            <Text className="text-black ml-1">Item Description</Text>
            <TextInput
                className="p-2 bg-gray-100 text-gray-700 rounded-2xl"
                placeholder='Enter Description'
            />
          
            <TouchableOpacity
                className="py-3 bg-purple-500 rounded-xl"
            >
                <Text style={{fontSize:18}} className="font-xl font-bold text-center text-black" >
                    Add Item
                </Text>
            </TouchableOpacity>
        </View>
       
      </View>

      </ScrollView>   
    </View>
  )
}
