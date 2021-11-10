import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { addingTask, getCompletedTasksCount, getCompleteTasksCount, getTasks, getUserInfo, loggingOut } from '../services';
import { Entypo } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import taskProfile from './taskProfile';
import { AntDesign } from '@expo/vector-icons';
import "firebase/firestore";
import { firebase } from '../config/firebaseConfig';
require('firebase/auth')

const Profile = ({ navigation }) => {
    const [task, setTask] = useState('');
    const [taskItems, setTaskItems] = useState([]);
    const [taskCitems, setTaskCitems] = useState([]);
    const [taskPitems, setTaskPitems] = useState([]);
    const [firstName, setFirstName] = useState([]);
    const currentUser = firebase.auth().currentUser

    let list = []

    const fetchTask = async => {
        getTasks().then((data) => {
            list = data
            console.log(list);
            setTaskItems(list)
        })
    }

    const fetchUser = async => {
        getUserInfo().then((data) => {
            list = data
            console.log(list);
            setFirstName(list)
        })
    }
    const fetchCompleteTasksLength = async => {
        getCompleteTasksCount().then((data) => {
            list = data
            console.log(list)
            setTaskCitems(list)
        })
    }
    const fetchInCompleteTasksLength = async => {
        getCompletedTasksCount().then((data) => {
            list = data
            console.log(list)
            setTaskItems(list)
        })
    }
    console.log(firstName)

    useEffect(() => {
        fetchTask()
        fetchUser()

        // fetchCompleteTasksLength()
        // fetchInCompleteTasksLength()

    }, [])

    const SignOut = () => {
        loggingOut().then(
            navigation.navigate('Welcome')
        )
    }
    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1
                }}
                keyboardShouldPersistTaps='handled'
            >
                <View style={styles.signO}>
                    <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signOSpace} onPress={SignOut}>
                        <AntDesign name="logout" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                <View style={styles.square}>
                    <Text>Today's tasks</Text>
                  
                </View>
                <View>
                {
                    firstName.map((item, index) => {
                        return (
                            <View key={index} style={styles.usernameCenter}>
                                {/* <TaskView text={item.task} status={'Complete'} /> */}
                                <Text style={styles.username}> {item.firstName}</Text>
                                <Text>{item.email}</Text>
                            </View>
                        )
                    })
                }
                
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
    },
    tasksWrapper: {
        paddingTop: 80,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',

    },
    inline: {
        flexDirection: 'row',
    },
    items: {
        marginTop: 30,
    },
    square: {
        width: 435,
        height: 200,
        backgroundColor: 'white',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,


    },

    writeTaskWrapper: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    signO: {
        marginLeft: 5,
        marginTop: 8,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },

    signOSpace: {
        marginRight: 10,
    },
    searching: {
        marginTop: 5,
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        width: 250,
    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
     username: {
        color: 'orange',
        fontWeight: 'bold',
        fontSize: 30,
    },
    usernameCenter: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    addText: {},
});
export default Profile;