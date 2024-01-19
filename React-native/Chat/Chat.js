/* eslint-disable */
import { Image, StyleSheet, Text, View,ScrollView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function Chat() {
  const navigation= useNavigation();
  
    const contact =[
        {
            uid: 1,
            name: 'Hitesh Choudhary',
            status: 'Just an extra ordinary teacher',
            imageUrl: 'https://avatars.githubusercontent.com/u/11613311?v=4',
          },
          {
            uid: 2,
            name: 'Anurag Tiwari',
            status: 'I ❤️ To Code and Teach!',
            imageUrl: 'https://avatars.githubusercontent.com/u/94738352?v=4',
          },
          {
            uid: 3,
            name: 'Sanket Singh',
            status: 'Making your GPay smooth',
            imageUrl: 'https://avatars.githubusercontent.com/u/29747452?v=4',
          },
          {
            uid: 4,
            name: 'Anirudh Jwala',
            status: 'Building secure Digital banks',
            imageUrl: 'https://avatars.githubusercontent.com/u/25549847?v=4',
          },
          {
            uid: 5,
            name: 'Hitesh Choudhary',
            status: 'Just an extra ordinary teacher',
            imageUrl: 'https://avatars.githubusercontent.com/u/11613311?v=4',
          },
          {
            uid: 6,
            name: 'Anurag Tiwari',
            status: 'I ❤️ To Code and Teach!',
            imageUrl: 'https://avatars.githubusercontent.com/u/94738352?v=4',
          },
         
    ]
  return (
    <View style={styles.main}>
      <View style={{backgroundColor:'orange',height:60, marginBottom:10, flexDirection:'row'}}>
      <TouchableOpacity style={{marginTop:10, marginLeft:10}} onPress={()=>{navigation.navigate("BottomNavigation")}}>
      <Ionicons name="arrow-back-circle-outline" size={35} color="#fff" />
      </TouchableOpacity>
      
      <Text style={styles.headingText}>ContactList</Text>
      <TouchableOpacity style={{marginTop:10, marginLeft:120}}>
      <Ionicons name="search-circle-outline" size={35} color="#fff" />
      </TouchableOpacity>
      </View>
      <ScrollView style={styles.conatiner}>
        {contact.map(({uid,name,status,imageUrl})=>(
          <ScrollView>
          <TouchableOpacity onPress={()=>{navigation.navigate("PersonalChat")}}>
            <View key={uid} style={styles.heading}>
            <Image source={{uri: imageUrl}} style={styles.userImage} />
            <View>
            <Text style={styles.userName}>{name}</Text>
            <Text style={styles.userStatus}>{status}</Text>
            </View>
           </View>
           </TouchableOpacity>
           </ScrollView>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    main:{
        backgroundColor: '#ffffff',
        marginTop:10
    },
    headingText:{
        fontSize:22,
         fontWeight:'bold',
         padding:8,
         color:'#fff',
         alignItems:'center',
         marginTop:3,
         marginLeft:10
    },
    conatiner:{
        paddingHorizontal:12,
        marginBottom:6

    },
    heading:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        padding:8,
        marginBottom:2,
        borderRadius:14,
        backgroundColor:'orange'
    },
    userImage:{
        height:60,
        width:60,
        borderRadius: 60/2,
        marginRight:8
    },
    userName:{
        fontSize:16,
        fontWeight:'600',
        color:'#FFF'
    },
    userStatus:{
        fontSize:12,
    },


})