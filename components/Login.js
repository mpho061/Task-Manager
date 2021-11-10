//import liraries
import React, { Component, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { firebase } from '../config/firebaseConfig';
import { signIn } from '../services';
require('firebase/auth')

// create a component
const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handlePress = () =>{
        if(!email){
            Alert.alert('Email field is required');
        }

        if(!password){
            Alert.alert('Password field is required')
        }
        signIn(email, password).then(()=>{
            let user = firebase.auth().currentUser
            if(user){
                navigation.navigate('HomeScreen');
            }
        });
        setEmail('');
        setPassword('');
 }

    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.jpg')} style={styles.logoImge} />
            <Text style={styles.bckText}>Welcome Back</Text>
            <Text style={styles.bckText}>Sign in your account:</Text>
            <TextInput
                style={styles.inputDetls}
                placeholder="Enter your email"
                autoCapitalize='none'
                value={email}
                onChangeText={(email)=> setEmail(email)}
            />
            <TextInput
                style={styles.inputDetls}
                placeholder="Enter your password"
                value={password}
                onChangeText={(password1)=> setPassword(password1) }
                secureTextEntry= {true}
            />
            <TouchableOpacity onPress={handlePress}>
                <Text style={styles.submitBtn2}>Submit</Text>
            </TouchableOpacity>
        </View>
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

    logoImge: {
        height: 120,
        width: 145,
        marginBottom: 50,
        borderRadius: 75,
    },
    bckText: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        marginTop: 5,
    },
    logText: {
        fontSize: 20,

    },
    submitBtn2: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'green',
        color: 'white',
        marginTop: 5,
    },
    inputDetls: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        backgroundColor: "#ecf0f1",
        marginTop: 5,
        borderRadius: 4,
        
    },
});

//make this component available to the app
export default Login;
