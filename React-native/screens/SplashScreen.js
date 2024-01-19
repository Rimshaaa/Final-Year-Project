import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
    ImageBackground
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import Colors from "../constants/Colors";
import { ScrollView } from 'react-native';

const Splash = ({ navigation }) => {
    const { colors } = useTheme();

    return (
        <View className="flex">
            <ImageBackground source={require("../assets/images/app-bg.jpg")} style={{ height: 900 }}>
                <ScrollView scrollEnabled={true} style={styles.container}>

                    <View style={styles.header}>
                        <Animatable.Image
                            animation="bounceIn"
                            duraton="1500"
                            source={require("../assets/images/logo4.png")}
                            style={styles.logo}
                            resizeMode="stretch"
                        />
                    </View>
                    <Animatable.View
                        style={[styles.footer, {
                        }]}
                        animation="fadeInUpBig"
                    >
                        <Text style={[styles.title]}>Distances will no longer be a hurdle for Quality!</Text>

                        <View style={styles.button}>
                            <TouchableOpacity onPress={() => navigation.navigate('SupplierOrRestaurant')}>
                                <LinearGradient
                                    colors={['#A134F6', '#A134F6']}
                                    style={styles.signIn}
                                >
                                    <Text style={styles.textSign}>Get Started</Text>
                                    <MaterialIcons
                                        name="navigate-next"
                                        color="#fff"
                                        size={24}
                                    />
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </Animatable.View>

                </ScrollView>
            </ImageBackground>
        </View>
    );
};

export default Splash;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingVertical: 30,
        paddingHorizontal: 10,
    },
    logo: {
        width: 400,
        height: 400
    },
    title: {
        color: '#FF9801',
        fontWeight: '600',
        fontWeight: 'bold',
        fontSize: 22,
        alignItems: 'center',
        justifyContent: "center",
        marginRight: 30,
        marginLeft: 30,
        textAlign: 'center'

    },
    text: {
        fontSize: 20,
        color: '#FF9801',
        marginTop: 2,
        marginBottom: 4,
        marginRight: 50,
        marginLeft: 50,
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid'
    },
    button: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
        margin: 8,
        marginTop: 80
    },
    signIn: {
        flex: 1,
        width: 150,
        height: 50,
        marginTop: 4,
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderRadius: 20,
    },
    textSign: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
});
