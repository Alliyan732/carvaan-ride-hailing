import React, { useState, useRef } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Button, Pressable, PermissionsAndroid, Modal, ScrollView } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getFirestore, collection, getDocs, addDoc, setDoc, doc, updateDoc, ChildUpdateFields } from 'firebase/firestore/lite';
import { db, auth } from '../../../../firebase.config'



const PersonalDetails = ({ navigation, route }) => {

  const { VehiclePic } = route.params;

  // firebase
  const addPersonalInfo = async () => {
    if (RegNo == '' || model == '' || city == '' || country == '') {
      alert("Please Enter All the Values!");
    }
    else {
      await updateDoc(doc(db, "Drivers", auth.currentUser.uid), {
        VehicleInfo: {
          RegisterationNumber: RegNo,
          Model: model,
          City: city,
          Country: country,
          VehiclePic: VehiclePic
        }
      })
        .then(() => {
          navigation.navigate("DriverPaymentMethod")
        })
        .catch(error => {
          alert(error)
        })
    }
  }

  const [RegNo, setRegNo] = useState('')
  const [model, setModel] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header1}>Vechicle</Text>
        <Text style={styles.header2}>Information</Text>
        <Text style={styles.headerText}>You must enter vehicle information to continue.</Text>
        <View style={styles.container2}>

          <View style={styles.inputContainer}>
            <View style={styles.inputShadow}>
              <View style={styles.inputs}>
                <TextInput keyboardType="numeric" placeholder="Vehicle Registeration Number" style={styles.textInput} onChangeText={setRegNo}></TextInput>
              </View>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputShadow}>
              <View style={styles.inputs}>
                <TextInput placeholder="Model" style={styles.textInput} onChangeText={setModel}></TextInput>
              </View>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputShadow}>
              <View style={styles.inputs}>
                <TextInput placeholder="Registered City" style={styles.textInput} onChangeText={setCity}></TextInput>
              </View>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputShadow}>
              <View style={styles.inputs}>
                <TextInput placeholder="Country" style={styles.textInput} onChangeText={setCountry}></TextInput>
              </View>
            </View>
          </View>



          <TouchableOpacity style={styles.filledButton} onPress={() => addPersonalInfo()}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "700" }}>Next</Text>
          </TouchableOpacity>


        </View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    width: "90%",
    alignSelf: "center",
    marginTop: 4
  },

  text: {
    flex: 1,
    bottom: 20,
    color: "white"
  },
  inputs: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 1,
    marginTop: 15
  },
  textInput: {
    width: "90%",
    marginLeft: 5,
    fontSize: 16
  },
  filledButton: {
    height: 45,
    width: 240,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#27B162",
    marginTop: 50,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },


  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalButtonFilled: {
    height: 45,
    width: 200,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#27B162",
    marginTop: 15,
    alignSelf: "center"
  },

  modalButtonOutlined: {
    height: 46,
    width: 200,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#27B162",
    marginTop: 70,
    alignSelf: "center"
  },

  buttonOpen: {
    backgroundColor: "#F194FF",
  },

  modalTextStyle1: {
    color: "#27B162",
    fontWeight: "bold",
    textAlign: "center"
  },

  modalTextStyle2: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  header1:
    { fontSize: 25, fontWeight: "bold", marginLeft: 20, marginTop: 20, color: "black" },

  header2:
    { fontSize: 25, fontWeight: "bold", marginLeft: 20, color: "black" },

  headerText: {
    fontSize: 16, marginLeft: 20, marginRight: 20, color: "black", marginTop: 5, marginBottom: 10
  },

  dateInput: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
    marginTop: 30,
    borderRadius: 10,
    paddingLeft: 15,
    alignSelf: "center"
  },
  inputShadow: {
    borderRadius: 10,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  inputs: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden'
  },

  inputContainer: {
    marginTop: 15,
    width: "90%",
    alignSelf: "center"
  }
});


export default PersonalDetails;