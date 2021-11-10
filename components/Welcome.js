//import liraries
import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';

// create a component
const Welcome = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.jpg')} style={styles.logoImg} />

            <Text style={styles.welcomeText}>Welcome</Text>
            <View style={styles.inlineButton}>
                <TouchableOpacity

                    onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.loginBtn2}>Login</Text>

                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate("SignUp")}>
                    <Text style={styles.loginBtn2}>SignUp</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.wlText}>OR</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.googlBtn}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate("resetPassword")}>
                <Text style={styles.wlText}>Forgot Password</Text>
            </TouchableOpacity>

        </View >
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    logoImg: {
        height: 120,
        width: 145,
        marginBottom: 50,
        borderRadius: 75,
    },
    welcomeText: {
        fontSize: 30,
        fontWeight: 'bold',
        margin: 20,
    },
    wlText: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 20,
    },
    loginBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'green',
        color: 'white',
    },
    loginBtn2: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'green',
        color: 'white',
        marginRight: 5,
    },
    googlBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 80,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'red',
        color: 'white',
        marginRight: 5,
    },

    inlineButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});


//make this component available to the app
export default Welcome;
