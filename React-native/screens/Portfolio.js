import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import MyHeader from '../components/MyHeader';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function Portfolio() {
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
    <Text style={{fontSize: 26, fontWeight: 'bold', marginBottom:40,}} className="text-center text-black mb-5">Your Portfolio</Text>

  <Text style={{fontSize:18}} className="text-black ml-1">Enter Work Details</Text>
            <TextInput multiline numberOfLines={8}
                className="p-2 bg-gray-100 text-black rounded-2xl"
                placeholder='The restaurant offers an elegant and refined ambiance, providing guests with a sophisticated dining experience. The Gourmet Haven offers a diverse menu featuring a fusion of international cuisines, prepared with high-quality ingredients. The establishment boasts an extensive wine list and a variety of handcrafted cocktails, catering to different tastes and preferences.'
            />

<View className="flex-row">
<Text style={{fontSize:18}} className="text-black ml-1 mt-5">Upload PFA Certificate</Text>
 <View className= "ml-40 mt-5" onPress={this}>
     <Icon
    name='edit'
    size={30}
    color='#FF9801'
    style={{height:30,width:40}}/>
     </View>

     <View className= " mt-5" onPress={this}>
     <Icon
    name='delete'
    size={30}
    color='#FF9801'
    style={{height:30,width:40}}/>
     </View>


     </View>

         
 <View className="flex items-center p-3 mb-2 mx-2 mt-2 border-gray-400 " style={{ height: 230, width: 400, borderWidth:  2, borderStyle:  'dashed'}}>
 <Image source={require('../assets/images/PFA-Certificate.jpeg')} 
                style={{width:300, height: 200}} />

      </View>



      <View className="flex-row">
<Text style={{fontSize:18}} className="text-black ml-1 mt-5">Upload PFA Certificate</Text>
 <View className= "ml-40 mt-5" onPress={this}>
     <Icon
    name='edit'
    size={30}
    color='#FF9801'
    style={{height:30,width:40}}/>
     </View>

     <View className= " mt-5" onPress={this}>
     <Icon
    name='delete'
    size={30}
    color='#FF9801'
    style={{height:30,width:40}}/>
     </View>


     </View>   

         
 <View className="flex items-center p-3 mb-2 mx-2 mt-2 border-gray-400 " style={{ height: 140, width: 400, borderWidth:  2, borderStyle:  'dashed'}}>
 <Image source={require('../assets/images/pdf.png')} 
                style={{width:100, height: 100}} />
    <Text style={{fontSize: 12}}>WorkHistory.pdf</Text>
  
      </View>

 

      </View>


      </ScrollView>   
    </View>
  )
}
