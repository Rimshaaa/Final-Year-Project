import { View, Text, Image, TouchableOpacity, ImageBackground, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import Colors from '../constants/Colors'

export default function ResetPassword() {
    const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1" style={{backgroundColor: themeColors.bg}}>
            <View className="flex-row justify-center mt-80">
                <Text className="text-amber-500 text-2xl text-center">Enter new Password</Text>
                </View> 


                <View className="flex-1 bg-white px-8 pt-8" style={{borderTopLeftRadius: 50, borderTopRightRadius: 50,}}>
        <View className="form space-y-2">
            <TextInput
                className="p-2 bg-gray-200 text-gray-700 rounded-2xl h-14"
        
                placeholder='Enter Password'
            />
             <TextInput
                className="p-2 bg-gray-200 text-gray-700 rounded-2xl h-14"
              
                placeholder='Re-Enter Password'
            />
            </View>

            <TouchableOpacity
                    onPress={()=> navigation.navigate('Login')}
                    className="py-3 bg-amber-500 mx-7" style={{borderRadius: 90, marginTop:40}}>
                        <Text 
                            className="text-xl text-center text-black"
                        >
                            Reset Password
                        </Text>
                </TouchableOpacity>
            </View>
       
         
     
    </SafeAreaView>
  )
}