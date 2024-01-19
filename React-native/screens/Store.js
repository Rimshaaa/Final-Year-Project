import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import MyHeader from "../components/MyHeader";
import { categories2, featuredFruits } from "../constants";
import Colors from "../constants/Colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Bold } from "react-native-feather";

const { width } = Dimensions.get("window");
const ListItem = ({ item, navigation }) => {
  return (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => navigation.navigate("DetailsScreen", { item })}
        style={[styles.imageContainer, { backgroundColor: item.bgColor }]}
      >
        <Image source={item.image} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={[styles.text, { color: Colors.darkGray }]}>
          {item.title}
        </Text>
        <Text style={styles.text}>Rs{item.price}</Text>
      </View>
    </View>
  );
};
export default function Store(props) {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState(1);

  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bg }}
    >
      <MyHeader
        Sidebar
        title="Store"
        right="more-vertical"
        optionalBtn="shopping-cart"
        onRightPress={() => console.log("right")}
      />
      <View
        className="bg-gray-200"
        style={{ borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}
      >
        <View
          className="flex-row justify-center"
          style={{ marginRight: 150, marginTop: 20 }}
        >
          <Image
            source={require("../assets/images/store.png")}
            style={{
              width: 100,
              height: 100,
              marginTop: 0,
              marginBottom: 30,
              marginLeft: 90,
            }}
          />
          <View>
            <View className="flex-row">
              <Text
                style={{
                  fontSize: 30,
                  marginLeft: 30,
                  marginBottom: 10,
                  marginTop: 20,
                  fontWeight: "bold",
                  color: Colors.primary,
                }}
              >
                My Store
              </Text>
              <View className="flex-row">
                <View className="ml-10 mt-5" onPress={this}>
                  <Icon
                    name="edit"
                    size={30}
                    color="#FF9801"
                    style={{ height: 30, width: 40 }}
                  />
                  <Text style={(fontSize = 24)}>Edit</Text>
                </View>

                <View className="ml-6 mt-5" onPress={this}>
                  <Icon
                    name="delete"
                    size={30}
                    color="#FF9801"
                    style={{ height: 30, width: 40 }}
                  />
                  <Text style={(fontSize = 24)}>Delete</Text>
                </View>
              </View>
            </View>
            <Text style={{ fontSize: 12, marginLeft: 30, color: Colors.black }}>
              Grocery Store
            </Text>
            <Text
              style={{
                fontSize: 14,
                marginLeft: 30,
                color: Colors.black,
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              My store has a collection of fruits and vegetables
            </Text>
          </View>
        </View>
      </View>

      <SafeAreaView className="flex-1 flex justify-between bg-white">
        <View className="flex-row justify-start mx-5"></View>

        {/* categories */}

        <View className="px-5 mt-6">
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories2}
            keyExtractor={(item, index) => index.toString()}
            className="overflow-visible"
            renderItem={({ item }) => {
              isActive = item.id == activeCategory;
              let activeTextClass = isActive ? "text-white" : "text-gray-700";
              return (
                <TouchableOpacity
                  onPress={() => setActiveCategory(item.id)}
                  style={{
                    backgroundColor: isActive
                      ? Colors.primary
                      : "rgba(0,0,0,0.07)",
                  }}
                  className="p-4 px-5 mr-2 rounded-full shadow"
                >
                  <Text className={"font-semibold " + activeTextClass}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );

              {
                /*}  if(item.id === 2) {
      return (
        <TouchableOpacity 
        onPress={()=> setActiveCategory(item.id)} 
        style={{backgroundColor: isActive? themeColors.bg1: 'rgba(0,0,0,0.07)'}} 
        className="p-4 px-5 mr-2 rounded-full shadow">
          <Text className={"font-semibold " + activeTextClass}>{item.title}</Text>
        </TouchableOpacity>
      )      
}

      if(item.id === 3) {
        return (
          <TouchableOpacity 
          onPress={()=> setActiveCategory(item.id)} 
          style={{backgroundColor: isActive? themeColors.bg1: 'rgba(0,0,0,0.07)'}} 
          className="p-4 px-5 mr-2 rounded-full shadow">
            <Text className={"font-semibold " + activeTextClass}>{item.title}</Text>
          </TouchableOpacity>
        )
        
        }

        if(item.id === 4) {
          return (
            <TouchableOpacity 
            onPress={()=> setActiveCategory(item.id)} 
            style={{backgroundColor: isActive? themeColors.bg1: 'rgba(0,0,0,0.07)'}} 
            className="p-4 px-5 mr-2 rounded-full shadow">
              <Text className={"font-semibold " + activeTextClass}>{item.title}</Text>
            </TouchableOpacity>
          )
          
          }

          if(item.id === 5) {
            return (
              <TouchableOpacity 
              onPress={()=> setActiveCategory(item.id)} 
              style={{backgroundColor: isActive? themeColors.bg1: 'rgba(0,0,0,0.07)'}} 
              className="p-4 px-5 mr-2 rounded-full shadow">
                <Text className={"font-semibold " + activeTextClass}>{item.title}</Text>
              </TouchableOpacity>
            )   
            }
          */
              }
            }}
          />
        </View>

        <View className="bg-amber-500 mt-5 items-centre">
          <Text style={{ fontSize: 24, marginLeft: 160, color: Colors.black }}>
            My Catalogue
          </Text>
        </View>

        <View className="cart mx-5 flex-1">
          <View style={styles.container}>
            <FlatList
              data={featuredFruits}
              numColumns={2}
              style={{ paddingVertical: 10 }}
              keyExtractor={(item, index) => item.id + index.toString()}
              renderItem={({ item }) => (
                <ListItem item={item} navigation={navigation} />
              )}
            />
          </View>
        </View>

        {/*<View style={{height: 60, 
        marginTop: 35, 
        paddingTop: 10, 
        paddingBottom: 10, 
        paddingLeft: 15, 
        backgroundColor: '#F5F5F7', 
        borderRadius: 30, 
        alignContent: 'center', 
        flexDirection: 'row', }}
        >
    <Icon name="search"  size={30}/>
    <TextInput style={{fontSize:18, color: "#616888", marginLeft: 5}} placeholder='Search for anything'/>
       </View>*/}

        {/* <View >
    {
     cartItems.map((item,index)=>  <FruitCardCart fruit={item} key={index} />)
    }
    </View>
*/}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    marginLeft: 10,
    marginRight: 10,
  },
  item: {
    width: width / 2 - 24,
    marginLeft: 16,
    marginBottom: 16,
    marginLeft: 20,
  },
  imageContainer: {
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    borderRadius: 14,
    marginRight: 60,
  },
  image: {
    height: 140,
    width: 140,
    resizeMode: "center",
  },
  textContainer: {
    marginVertical: 4,
  },
  text: {
    fontSize: 18,
  },
});
