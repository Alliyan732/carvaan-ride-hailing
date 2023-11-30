
import React, { useState, useEffect } from "react";
import {
    Button,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    FlatList,
    TouchableOpacity,
    Alert,
    Modal,
    Pressable,
  } from 'react-native';

import { auth, db } from "../../../config/firebase";
import { collection, getDoc, doc, updateDoc} from 'firebase/firestore/lite';

import {currentUser} from '../user/CurrentUser';


const UpdateUserProfile = async (updatedCollectionItems, UserUID) => {
    try {
        const docRef = doc(db, "Users", UserUID);

        await updateDoc(docRef, updatedCollectionItems);
    } catch (error) {
        console.log(error);
    }
}

const Settings = ({route, navigation}) => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [dob, setDOB] = useState("")
    const [phone, setPhone] = useState("")
    const [profileImage, setProfileImage] = useState("")

    useEffect(() => {
        (async () => {
            // const docRef = doc(db, "Users", auth.currentUser.uid);
            const docRef = doc(db, "Users", currentUser);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setFirstName(docSnap.data().FirstName);
                setLastName(docSnap.data().LastName);
                setDOB(docSnap.data().DateOfBirth);
                setPhone(docSnap.data().Phone);
                setProfileImage(docSnap.data().ProfilePic)
            } else {
                return null;
            }
        })()
    }, [])

    return (
      <View style={settingsStyles.container}>
        <View style={settingsStyles.titlebarView}>
          <TouchableOpacity style={settingsStyles.backBtnContainer} onPress={() => {
            navigation.goBack()
          }}>
            <View style={settingsStyles.backIconView}>
              <Image style={settingsStyles.backIconImage} source={require('../../../assets/icons/back_small.png')}/>
            </View>
          </TouchableOpacity>
          <View style={settingsStyles.titlebar}>
            <Text style={settingsStyles.titlebarText}>Settings</Text>
          </View>
        </View>
        <View style={settingsStyles.settingsContainer}>
            <View style={settingsStyles.profileImageView}>
                <Image style={settingsStyles.profileImage} source={{uri: profileImage}} />
            </View>
            <View style={settingsStyles.profileDetailsView}>
                <View style={settingsStyles.profileDetails}>
                    <View style={settingsStyles.iconContainer}>
                        <Image style={settingsStyles.iconImage} source={require('../../../assets/icons/card.png')}/>
                    </View>
                    <View style={settingsStyles.inputView}>
                        <TextInput placeholder="First Name" placeholderTextColor="#000"  style={settingsStyles.userEmailInputDetails} onChangeText={setFirstName} value={firstName}/>
                    </View>
                </View>
                <View style={settingsStyles.profileDetails}>
                    <View style={settingsStyles.iconContainer}>
                        <Image style={settingsStyles.iconImage} source={require('../../../assets/icons/card.png')}/>
                    </View>
                    <View style={settingsStyles.inputView}>
                        <TextInput placeholder="Last Name" placeholderTextColor="#000"  style={settingsStyles.userPasswordInputDetails} onChangeText={setLastName} value={lastName}/>
                    </View>
                </View>
                <View style={settingsStyles.profileDetails}>
                    <View style={settingsStyles.iconContainer}>
                        <Image style={settingsStyles.iconImage} source={require('../../../assets/icons/dob_small.png')}/>
                    </View>
                    <View style={settingsStyles.inputView}>
                        <TextInput placeholder="DOB" placeholderTextColor="#000"  style={settingsStyles.userDOBInputDetails} onChangeText={setDOB} value={dob} />
                    </View>
                </View>
                <View style={settingsStyles.profileDetails}>
                    <View style={settingsStyles.iconContainer}>
                        <Image style={settingsStyles.iconImage} source={require('../../../assets/icons/phone_flag_small.png')}/>
                    </View>
                    <View style={settingsStyles.inputView}>
                        <TextInput placeholder="Phone" placeholderTextColor="#000"  style={settingsStyles.userPhoneInputDetails} onChangeText={setPhone} value={phone}/>
                    </View>
                </View>       
            </View>
        </View>
        <View style={settingsStyles.updateBtnContainerView}>
            <TouchableOpacity style={settingsStyles.updateBtnContainer} onPress={() => {
                // UpdateUserProfile({
                //     FirstName: firstName,
                //     LastName: lastName,
                //     DateOfBirth: dob,
                //     Phone: phone
                // }, auth.currentUser.uid);

                UpdateUserProfile({
                    FirstName: firstName,
                    LastName: lastName,
                    DateOfBirth: dob,
                    Phone: phone
                }, "mRzaVK6r1xcWGOsU5dcyzQG2wua2");

            }}>
                <View style={settingsStyles.updateBtnView}>
                    <Text style={settingsStyles.updateBtnText}>Update</Text>
                </View>
            </TouchableOpacity>
        </View>
      </View>
    )
}

const settingsStyles = StyleSheet.create({
    container: {

    },
    titlebarView: {
        display: 'flex',
        flexDirection: 'row',
        padding: 15,
        elevation: 1
    },
    backIconView: {
        marginTop: 7
    },
    backIconImage: {
        width: 20,
        height: 22
    },
    titlebar: {
        marginLeft: 40
    },
    titlebarText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black'
    },
    profileImageView: {
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        marginTop: 30
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 200/2
    },
    profileDetailsView: {
        marginLeft: 40,
        marginRight: 40,
    },
    profileDetails: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 7
    },
    userEmailInputDetails: {
        borderBottomWidth: 1,
        fontSize: 18,
        color: 'black'
    },
    userPasswordInputDetails: {
        borderBottomWidth: 1,
        fontSize: 18,
        color: 'black'
    },
    userDOBInputDetails: {
        borderBottomWidth: 1,
        fontSize: 18,
        color: 'black'
    },
    userPhoneInputDetails: {
        borderBottomWidth: 1,
        fontSize: 18,
        color: 'black'
    },
    inputView: {
        marginLeft: 15,
        width: '80%'
    },
    iconContainer: {
        paddingTop: 20
    },
    iconImage: {
        width: 23,
        height: 23
    },
    updateBtnContainerView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 60
    },
    updateBtnContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: 270,
        height: 45,
        paddingTop: 7,
        backgroundColor: '#40D27D',
        borderRadius: 25,
        elevation: 15
    },
    updateBtnView: {

    },
    updateBtnText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    }
})

export default Settings;