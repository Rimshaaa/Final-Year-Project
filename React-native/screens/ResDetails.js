import React from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView, TextInput} from 'react-native';
import {COLOURS} from '../components/items2';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MyHeader2 from '../components/MyHeader2';
import { color } from 'react-native-reanimated';

const ResDetails = ({route, navigation}) => {
  const {
    name,
    price,
    image,
    size,
    Qty,
    ID,
    crust,
    delivery,
    ingredients,
    isTopOfTheWeek,
  } = route.params;

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.white,
        flexDirection: 'column',
      
        
      }}>
    <MyHeader2
        title= 'Inventory'
        right="more-vertical"
        optionalBtn="shopping-cart"
        onRightPress={() => console.log('right')}
      />
      <View
          style={{
            marginTop: 40,
            width: 200,
            height: 200,
            alignItems: 'center',
            marginLeft:140,
            borderWidth:  2,
            borderColor: COLOURS.lightGray,
            borderBottomLeftRadius:200,
            borderBottomRightRadius:200,
            borderTopLeftRadius:200,
            borderTopRightRadius:200

          }}>
          <Image
            source={image}
            style={{
              width: '50%',
              height: '90%',
              resizeMode: 'contain',
            }}
          />

             <View
              style={{
                width: 50,
                height: 50,
                backgroundColor: COLOURS.lightGray,
                borderTopRightRadius: 100,
                borderBottomLeftRadius: 100,
                borderTopLeftRadius: 100,
                borderBottomRightRadius:100,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: 90,
                top:160, 
                right: 20, 
                marginLeft: 400
              }}>
              <Entypo
                name="camera"
                style={{fontSize: 18, color: COLOURS.black}}
              />
            </View>
        </View>


      <View
        style={{
          flexDirection: 'row',
          maxHeight: 300,
          width: '100%',
          alignItems: 'center',
        }}>
        <View style={{paddingHorizontal: 20}}>
        <View style={{paddingVertical: 20}}>
            <Text
              style={{
                fontSize: 20,
                color: COLOURS.black,
                opacity: 0.8
              
              }}>
              Name
            </Text>
            <TextInput
              style={{
                paddingHorizontal: 10,
                fontSize: 18,
                borderWidth:  2,
                width: 200,
                height: 50,
                borderColor: COLOURS.lightGray,
                color: COLOURS.black,
                fontWeight: '600',
                opacity: 0.6
              }}>
              {name} 
            </TextInput>
          </View>

           <View style={{paddingVertical: 20}}>
            <Text
              style={{
                fontSize: 20,
                color: COLOURS.black,
                opacity: 0.8
              
              }}>
              ID
            </Text>
            <TextInput
              style={{
                paddingHorizontal: 10,
                fontSize: 18,
                borderWidth:  2,
                width: 200,
                height: 50,
                borderColor: COLOURS.lightGray,
                color: COLOURS.black,
                fontWeight: '600',
                opacity: 0.6
              }}>
              {ID} 
            </TextInput>
          </View>

          <View className="flex-row">
          <View style={{paddingVertical: 20}}>
            <Text
              style={{
                fontSize: 20,
                color: COLOURS.black,
                opacity: 0.8
              
              }}>
              Quantity
            </Text>
            <TextInput
              style={{
                paddingHorizontal: 10,
                fontSize: 18,
                borderWidth:  2,
                width: 200,
                height: 50,
                borderColor: COLOURS.lightGray,
                color: COLOURS.black,
                fontWeight: '600',
                opacity: 0.6
              }}>
              {Qty} 
            </TextInput>
          </View>

          <View style={{paddingVertical: 20}}>
            <Text
              style={{
                fontSize: 20,
                color: COLOURS.black,
                opacity: 0.8
              
              }}>
              Price
            </Text>
            <TextInput
              style={{
                paddingHorizontal: 10,
                fontSize: 18,
                borderWidth:  2,
                width: 200,
                height: 50,
                borderColor: COLOURS.lightGray,
                color: COLOURS.black,
                fontWeight: '600',
                opacity: 0.6
              }}>
              {price} 
            </TextInput>
          </View>
          </View>

        </View>
      
      </View>
   
     
      <View
        style={{
          position: 'relative',
          width: '100%',
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 450,
            height: 60,
            backgroundColor: COLOURS.resprimary, 
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop:30,
            marginBottom: 200
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: COLOURS.black,
              letterSpacing: 1,
              marginRight: 10,
            }}>
            Save Changes
          </Text>
        
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResDetails;