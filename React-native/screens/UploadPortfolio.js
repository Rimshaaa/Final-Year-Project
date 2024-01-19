import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import MyHeader from '../components/MyHeader';


export default function UploadPortfolio() {
    const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white">
      <MyHeader
        back
        onPressBack={() => navigation.goBack()}
        title= 'Portfolio'
        right="more-vertical"
        optionalBtn="shopping-cart"
        onRightPress={() => console.log('right')}
      />

<ScrollView>  


    
<View className="flex-1 bg-white px-8 pt-8"
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}
      >
    <Text style={{fontSize: 26, fontWeight: 'bold', marginBottom:40,}} className="text-center text-black mb-5"> Create Your Portfolio</Text>

  <Text style={{fontSize:18}} className="text-black ml-1">Enter Work Details</Text>
            <TextInput multiline numberOfLines={8}
                className="p-2 bg-gray-100 text-gray-700 rounded-2xl"
            />


<Text style={{fontSize:18}} className="text-black ml-1 mt-5">Upload PFA Certificate</Text>
         
 <View className="flex items-center p-3 mb-2 mx-2 mt-2 border-gray-400 " style={{ height: 140, width: 400, borderWidth:  2, borderStyle:  'dashed'}}>
 <Text style={{fontSize: 12,marginTop:20}}>Drag & drop a single file here</Text>

<TouchableOpacity
               className="py-3 bg-amber-500 rounded-xl"  style={{ marginTop:10, width: 180}}
           >
               <Text className="font-xl font-bold text-center text-black"  >
                   Upload 
               </Text>
           </TouchableOpacity>
      </View>

      <Text style={{fontSize:18}} className="text-black ml-1 mt-5">Upload Work History</Text>
         
 <View className="flex items-center p-3 mb-2 mx-2 mt-2 border-gray-400 " style={{ height: 140, width: 400, borderWidth:  2, borderStyle:  'dashed'}}>
 <Text style={{fontSize: 12,marginTop:20}}>Drag & drop a single file here</Text>

 <TouchableOpacity
                className="py-3 bg-amber-500 rounded-xl"  style={{ marginTop:10, width: 180}}
            >
                <Text className="font-xl font-bold text-center text-black"  >
                    Upload 
                </Text>
            </TouchableOpacity>
     
      </View>



      </View>


      </ScrollView>   
    </View>
  )
}
