import React from 'react'
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MyHeader from '../components/MyHeader';
import Colors from '../constants/Colors'
import { categories2 } from '../constants';
import AnimTab2 from '../BottomTab/AnimTab2';

const { width } = Dimensions.get('window');
const ListItem = ({ item, navigation }) => {
  return (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => navigation.navigate('DetailsScreen', { item })}
        style={[styles.imageContainer, { backgroundColor: item.bgColor }]}>
          <Image source={item.image} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={[styles.text, { color: Colors.darkGray }]}>{item.title}</Text>
        <Text style={styles.text}>Rs{item.price}</Text>
      </View>
    </View>
  )
}

export default function ProductsList({ navigation, route }) {
  return (
    <View className="flex-1 bg-white" >

    <MyHeader
    back
    onPressBack={() => navigation.goBack()}
    title={route.name}
    right="more-vertical"
    optionalBtn="shopping-cart"
    onRightPress={() => console.log('right')}
  />

  
    <View style={styles.container}>
     
      <FlatList
        data={categories2}
        numColumns={2}
        style={{ paddingVertical: 10 }}
        keyExtractor={(item, index) => item.id + index.toString()}
        renderItem={({ item }) => <ListItem item={item.veg} navigation={navigation} />}
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

