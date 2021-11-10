//import liraries
import React, { Component,useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, Keyboard } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { registration } from '../services';
 

// create a component
const SignUp = ({navigation}) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName ] = useState('');
    const [email, setEmail ] = useState('');
    const [password, setPassword ] = useState('');
    const [confirmPassword, setConfirmPassword ] = useState('');
    const emptyState = ()=>{
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };
    
    const handlePress = () =>{
        if(!firstName){
                Alert.alert('First name is required');
        }else if(!email){
                Alert.alert('Email is required')
        }else if(!password){
            Alert.alert('Password field is required')
        }else if(!confirmPassword){
            setPassword('');
            Alert.alert('Confirm password field is required')
        }else if(password !== confirmPassword){
            Alert.alert('Password does not match!')
        }else{
            registration(
            email,
            password,
            lastName,
            firstName,
            );
            navigation.navigate('HomeScreen');
            emptyState();
        }
    }

    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.jpg')} style={styles.logoImge} />
           
            <TextInput
            style={styles.inputDtls}
            placeholder="First Name"
            value={firstName}
            onChangeText={(name) => setFirstName(name)}
            />
            
            <TextInput
                style={styles.inputDtls}
                placeholder="Last Name"
                value={lastName}
                onChangeText={(name)=> setLastName(name) }
            />
            <TextInput
                style={styles.inputDtls}
                placeholder="Enter your email"
                autoCapitalize='none'
                value={email}
                onChangeText={(email)=> setEmail(email)
                }
            />
            <TextInput
                style={styles.inputDtls}
                placeholder="Enter your password"
                value={password}
                onChangeText={(password1)=> setPassword(password1) }
                secureTextEntry= {true}
            />
            <TextInput
                style={styles.inputDtls}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={(confirmPassword)=>setConfirmPassword(confirmPassword)}
                secureTextEntry= {true}
            />

            <TouchableOpacity onPress={handlePress}>
                <Text style={styles.submitBtn}>SignUp</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={styles.submitBtn}>SignIn</Text>
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
        paddingHorizontal: 32,
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
export default SignUp;
