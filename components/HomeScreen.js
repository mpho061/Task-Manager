import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, Platform, Alert } from 'react-native';
import Task from './Task';
import { firebase } from '../config/firebaseConfig'
import { addingTask, getTasks, getUserInfo, getCompleteTasks,getIncompleteTasks } from '../services';
import { Entypo } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
const HomeScreen = ({ navigation }) => {

    const [task, setTask] = useState();
    const [taskItems, setTaskItems] = useState([]);
    const [fbTask, setFbTask] = useState([]);
    const [firstName, setFirstName] = useState([]);
    const currentUser = firebase.auth().currentUser

    let list = []

    const handleAddTask = () => {
        Keyboard.dismiss();
        setTaskItems([...taskItems, task])
        setFbTask([...fbTask, task])
        setTask("");
        addingTask(task)
        fetchTask()
    }

    const fetchTask = async => {
        getCompleteTasks().then((data) => {
            list = data
            console.log(list);
            setFbTask(list)
        })
    }
    const fetchUser = async => {
        getUserInfo().then((data) => {
            list = data
            console.log(list);
            setFirstName(list)
        })
    }

    const handlePress = () => {
        if (!task) {
            Alert.alert('Task field is required');
        } else {

            setTask('');
        }
    }
    console.log(firstName);
    useEffect(() => {
        fetchTask()
        fetchUser()
    }, [])

    async function getUserInfo() {
        let doc = await firebase
            .firestore()
            .collection('users')
            .doc(currentUser?.uid)
            .get();

        if (!doc.exist) {
            Alert.alert('No user data found')
        } else {
            let dataObj = doc.data();
            setFirstName(dataObj.firstname)
        }
    }

    const completeTask = (id) => {
        
        getIncompleteTasks(id);
        navigation.navigate('HomeScreen')
    }

    return (
        <View style={styles.container}>
            {/* Added this scroll view to enable scrolling when list gets longer than the page */}
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1
                }}
                keyboardShouldPersistTaps='handled'
            >

                {/* Today's Tasks */}
                <View style={styles.tasksWrapper}>
                    <View style={styles.inline}>
                        <Text style={styles.sectionTitle}>Today's tasks</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                            <Entypo
                                style={styles.signO}
                                name="user"
                                size={24} color="black" />
                        </TouchableOpacity>

                        <Text>Hello</Text>
                    </View>

                    <Searchbar placeholder="search" style={styles.searching} />
                    <View style={styles.items}>
                        {/* This is where the tasks will go! */}
                        {
                            taskItems.map((item, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => completeTask(item.id)}>
                                        <Task text={item} />
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>

            </ScrollView>

            {/* Write a task */}
            {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
            <KeyboardAvoidingView
                behavior={Platform.OS === "android" ? "padding" : "height"}
                style={styles.writeTaskWrapper}
            >
                <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />
                <TouchableOpacity onPress={() => handleAddTask()}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>+</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>

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
    writeTaskWrapper: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    signO: {
        marginLeft: 200,
        marginTop: 8,

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
    addText: {},
});
export default HomeScreen;