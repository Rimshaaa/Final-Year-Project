import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'
import { MinusIcon, PlusIcon } from 'react-native-heroicons/solid'

export default function VegCardCart({veg}) {
  return (
    <View className="flex-row justify-between items-center space-x-5 mb-4">
        <View className="ml-5">
            <TouchableOpacity className="flex-row justify-center -mb-10 -ml-10 shadow-lg z-20" >
            <Image source={veg.image} style={{height: 65,width: 65, marginLeft:30, shadowColor: veg.shadow,
                overflow: 'visible',
                shadowRadius: 15,
                shadowOffset: {width: 0, height: 20},
                shadowOpacity: 0.4,
                }} />
            </TouchableOpacity>
        


        </View>
        <View className="flex-1 space-y-1">
            <Text style={{color: themeColors.text}} className=" text-base font-bold">{veg.name}</Text>
            <Text className="text-purple-500 font-extrabold">Rs {veg.price}</Text>
        </View>
      
        <View className="flex-row items-center space-x-2">
            <TouchableOpacity className="bg-purple-500 p-1 rounded-lg">
                <PlusIcon size="15" color="black"/>
            </TouchableOpacity>
            <Text>{veg.qty}</Text>
            <TouchableOpacity className="bg-purple-500 p-1 rounded-lg">
                <MinusIcon size="15" color="black"/>
            </TouchableOpacity>
        </View>
    </View>
  )
}