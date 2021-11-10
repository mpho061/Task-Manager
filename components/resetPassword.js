//import liraries
import React, { Component, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { forgotPassword } from '../services'

// create a component
const resetPassword = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const reset = () => {
        forgotPassword(email);
    }
    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.jpg')} style={styles.logoImge} />
            <Text>Reset Password</Text>
            <Text>Enter your email address </Text>
            <TextInput
                style={styles.inputDtls}
                placeholder="Enter your email"
                value={email}
                onChangeText={(email) => setEmail(email)}
            />
            <TouchableOpacity onPress={reset}>
                <Text style={styles.submitBtn}>Submit</Text>
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
    inputDtls: {
        paddingVertical: 12,
        paddingHorizontal: 40,
        backgroundColor: "#ecf0f1",
        marginTop: 5,
        borderRadius: 4,
    },
    submitBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'green',
        color: 'white',
        marginTop: 5,
    },
    logoImge: {
        height: 120,
        width: 145,
        marginBottom: 50,
        borderRadius: 75,
    },
});

//make this component available to the app
export default resetPassword;
