import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import MyHeader2 from '../components/MyHeader2';


export default function CreateResInventory() {
    const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white">
      <MyHeader2
        back
        onPressBack={() => navigation.goBack()}
        title= 'My store'
        right="more-vertical"
        optionalBtn="shopping-cart"
        onRightPress={() => console.log('right')}
      />
      





      <View className="flex-1 bg-white px-8 pt-8"
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}
      >
      <Text style={{fontSize: 26, fontWeight: 'bold', marginBottom:40, }}>Create Your Inventory</Text>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft:3}}>Add Categories</Text>


        <View className="form space-y-2">
            <Text style={{fontSize:18}} className="text-gray-700 ml-1">Category 1</Text>
            <TextInput
                className="p-2 bg-gray-100 text-gray-700 rounded-2xl"
                //value="john snow"
                placeholder='Enter Name'
            />
            <Text style={{fontSize:18}} className="text-gray-700 ml-1">Category 2</Text>
            <TextInput
                className="p-2 bg-gray-100 text-gray-700 rounded-2xl"
                //value="john@gmail.com"
                placeholder='Enter Name'
            />
           <Text style={{fontSize:18}} className="text-gray-700 ml-1">Category 3</Text>
            <TextInput
                className="p-2 bg-gray-100 text-gray-700 rounded-2xl"
                //value="john snow"
                placeholder='Enter Name'
            />
            <Text style={{fontSize:18}} className="text-gray-700 ml-1">Category 4</Text>
            <TextInput 
                className="p-2 bg-gray-100 text-gray-700 rounded-2xl"
                //value="john snow"
                placeholder='Enter Name'
            />
           
           <TouchableOpacity>
                <Text style={{textDecorationLine: 'underline', textDecorationStyle: 'solid', marginTop:30 }} className=" text-lg text-center text-black mb-5"> Add more categories</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={()=> navigation.navigate('ResAddItem')}
                className="py-3 bg-purple-500 rounded-xl"
            >
                <Text style={{fontSize:18}} className="font-xl font-bold text-center text-black">
                    Create Inventory
                </Text>
            </TouchableOpacity>
        </View>
       
      </View>
    </View>
  )
}
