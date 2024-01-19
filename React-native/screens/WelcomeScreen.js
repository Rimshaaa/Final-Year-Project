import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import Colors from '../constants/Colors'
import { ScrollView } from 'react-native'

export default function WelcomeScreen() {
    const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1" style={{backgroundColor: themeColors.bg}}>
        <ScrollView>
            <View className="flex-row justify-center mt-24">
                <Text className="text-amber-500 font-bold text-2xl text-center">Sign Up to get your best experience</Text>
                </View> 
            <View className="flex-row justify-center mt-20">
                <Image source={require("../assets/images/logo4.png")}
                    style={{width: 350, height: 350}} />
            </View>
            <View className="space-y-4">
                <TouchableOpacity
                    onPress={()=> navigation.navigate('SignUp')}
                    className="py-3 bg-amber-500 mx-7" style={{borderRadius: 90, marginTop:150}}>
                        <Text 
                            className="text-xl text-center text-black"
                        >
                            Sign Up
                        </Text>
                </TouchableOpacity>
                <View className="flex-row justify-center">
                    <Text className="text-lg text-black font-semibold">Already have an account?</Text>
                    <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                        <Text className=" text-lg font-bold text-amber-500"> Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
         
            </ScrollView>
    </SafeAreaView>
  )
}