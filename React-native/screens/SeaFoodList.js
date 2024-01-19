import React from 'react'
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MyHeader2 from '../components/MyHeader2';
import Colors from '../constants/Colors';
import { fish } from '../constants';
import AnimTab2 from '../BottomTab/AnimTab2';

const { width } = Dimensions.get('window');
const ListItem = ({ item, navigation }) => {
  return (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => navigation.navigate('DetailsScreen', { item })}
        style={[styles.imageContainer, { backgroundColor: Colors.gray }]}>
          <Image source={item.image} style={styles.image} />
          <View style={{}}>
        <Text style={{fontWeight:'bold', fontSize:16}}>{item.name}</Text>
        <Text style={{marginRight:140, marginBottom: 20}}>Rs {item.price}</Text>
      </View>
      </TouchableOpacity>
    
    </View>
  )
}

export default function SeaFoodList({ navigation, route }) {
  return (
    <View className="flex-1 bg-white" >

    <MyHeader2
    back
    onPressBack={() => navigation.goBack()}
    title="SeaFood"
    right="more-vertical"
    optionalBtn="shopping-cart"
    onRightPress={() => console.log('right')}
  />

  
    <View style={styles.container}>
     
      <FlatList
        data={fish}
        numColumns={2}
        style={{ paddingVertical: 10 }}
        keyExtractor={(item, index) => item.id + index.toString()}
        renderItem={({ item }) => <ListItem item={item} navigation={navigation} />}
      />

      
    </View>
</View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  
  },
  item: {
    width: width / 2 - 24,
    marginLeft: 16,
    marginBottom: 16,
    marginLeft: 20
  },
  imageContainer: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray,
    borderRadius: 14,
  },
  image: {
    height: 140,
    width: 140,
    resizeMode: 'center',
  },
  textContainer: {
    marginVertical: 4,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
  },
})

