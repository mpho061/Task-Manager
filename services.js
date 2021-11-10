import "firebase/firestore";
import { Alert } from "react-native"
import { exp } from "react-native-reanimated";
import { firebase } from './config/firebaseConfig'
require('firebase/auth')
// import { auth } from "./config/firebaseConfig";
// import { auth } from "firebase";

export async function registration(email, password, lastName, firstname) {

    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const currentUser = firebase.auth().currentUser;

        const db = firebase.firestore();
        db.collection("users")
            .doc(currentUser.uid)
            .set({
                email: currentUser.email,
                lastName: lastName,
                firstName: firstname,
            });

    } catch (err) {
        Alert.alert("There is something wrong!!!", err.message);
        console.log(err.message);
    }
}

export async function signIn(email, password) {
    try {
        await firebase
            .auth()
            .signInWithEmailAndPassword(email, password);

    } catch (err) {
        Alert.alert("There is something wrong!", err.message);
        console.log(err.message);
    }
}

export async function loggingOut() {
    try {
        await firebase.auth().signOut();

    } catch (err) {
        Alert.alert("There is something wrong!", err.message);
    }
}

export async function forgotPassword(email) {
    try {
        //const user = firebase.auth().currentUser;
        firebase.auth().sendPasswordResetEmail(email).then(() => {
            // Password reset email sent
            console.log("Password reset email sent");
        })
            // console.log("rest button clicked")

            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage);
            });

    } catch (error) {
        console.log(error.message)
    }
}

export async function addingTask(task) {

    try {
        const currentUser = firebase.auth().currentUser
        const db = firebase.firestore();

        db.collection("tasks")
            .add({
                userID: currentUser.uid,
                task: task,
                status: "complete",
            });
    } catch (error) {
        console.log(error);
    }
}

export async function getTasks() {
    let dataObj = []
    try {
        const currentUser = firebase.auth().currentUser;
        console.log(currentUser.uid)

        let doc = await firebase
            .firestore()
            .collection("tasks")
            .where("userID", "==", currentUser?.uid)
            .get()

        if (doc) {
            doc.forEach((docs) => {
                dataObj.push({ ...docs.data() })
            })
        } else {
            console.log("no record")

        }
    } catch (error) {
        console.log(error);
    }
    console.log(dataObj);
    return dataObj
}


export async function getCompleteTasks() {
    let dataObj = []
    try {
        const currentUser = firebase.auth().currentUser;
        console.log(currentUser.uid)
        let doc = await firebase.firestore()
            .collection("tasks")
            .where("userID", "==", currentUser?.uid)
            .where("status", "==", "complete").get()
        console.log(doc)

        if (doc) {
            doc.forEach((docs) => {
                console.log(docs.id);
                let docID = docs.id
                dataObj.push({ ...docs.data(), ['id']: docID })
                console.log(dataObj)
            })
        } else {
            console.log("no record");
        }
    } catch (error) {
        alert("There is something wrong while getting the task!!!", error.message);
        console.log(error.message);
    }
    console.log(dataObj);
    return dataObj
}

export async function getCompleteTasksCount() {
    let dataObj = []
    try {
        const currentUser = firebase.auth().currentUser;
        console.log(currentUser.uid)
        let doc = await firebase.firestore().collection("tasks").where("userID", "==", currentUser?.uid).where("status", "==", "completed").get()
        console.log(doc)
        if (doc) {
            doc.forEach((doc) => {
                console.log(docs.id);
                let docID = doc.id
                dataObj.push({ ...docs.data(), ['id']: docID })
                console.log(dataObj)
            })
        } else {
            console.log("no record");
        }
    } catch (error) {
        alert("There is something wrong while getting the task!!!".error.message);
        console.log(dataObj.length);
        return dataObj.length
    }
}

export async function getCompletedTasksCount() {
    let dataObj = []
    try {
        const currentUser = firebase.auth().currentUser;
        console.log(currentUser.uid)

        let doc = await firebase.firestore().collection("tasks").where("userID", "==", currentUser?.uid).where("status", "==", "completed").get()
        console.log(doc)
        if (doc) {
            doc.forEach((docs) => {
                console.log(docs.id);
                let docID = docs.id
                dataObj.push({ ...docs.data(), ['id']: docID })
                console.log(dataObj)
            })
        } else {
            console.log("no record");
        }
    } catch (error) {
        alert("There is something wrong while getting the task!!!", error.message);
        console.log(error.message);
    }
    console.log(dataObj.length);
    return dataObj.length
}

export async function getUserInfo() {
    let dataObj = []
    const currentUser = firebase.auth().currentUser;
    let doc = await firebase.firestore().collection('users').doc(currentUser?.uid).get();

    dataObj.push({ ...doc.data() })
    console.log(dataObj);
    return dataObj
}
export async function getIncompleteTasks(id) {
    console.log('Complete pressed')
    const currentUser = firebase.auth().currentUser;
    console.log(id)
    var washingtonRef = firebase.firestore().collection("tasks").doc(id);
    
    return washingtonRef.update({
        status: 'completed'
    })
        .then(() => {
            console.log("Document successfully updated!");
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
}