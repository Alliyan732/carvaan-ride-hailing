import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, Alert, TextInput, Button, Pressable, PermissionsAndroid, Modal, ScrollView } from "react-native";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { getFirestore, collection, getDocs, addDoc, setDoc, doc, updateDoc } from 'firebase/firestore/lite';
import { db, auth } from '../../../../firebase.config'



const PersonalDetails = ({ navigation, route }) => {


  const [Date, setDate] = React.useState('')

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(JSON.stringify(date));
    // Console.log(Date.substring(2,4));
    console.log(date)
    console.log(Date)
    hideDatePicker();
  };



  const [modalVisible, setModalVisible] = useState(false);
  const [cameraPhoto, setCameraPhoto] = useState();
  // const [galleryPhoto, setGalleryPhoto] = useState();
  const [defaultPic, checkDefaultPic] = useState(0)
  let options = {
    mediaType: 'photo'
  }
  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );



    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(options);
      setCameraPhoto(result.assets[0].uri);
      checkDefaultPic(1);
    }
  }
  const openGallery = async () => {
    const result = await launchImageLibrary(options);
    setCameraPhoto(result.assets[0].uri);
    checkDefaultPic(1);

  };

  const [firstName, setFirstName] = React.useState('')

  React.useEffect(() => {
    if (route.params?.Name) {
      setFirstName(route.params?.Name)
    }
  }, [route.params?.Name]);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header1}>Vechicle</Text>
        <Text style={styles.header2}>Information</Text>
        <Text style={styles.headerText}>You must be upload vehicle image clearly showing license plate.</Text>
        <View style={styles.container2}>



          <View >
            {/* source={require('../../assets/images/user.png')} */}
            <Image source={defaultPic === 0 ? require("../../../../assets/images/license.png") : { uri: cameraPhoto }} style={styles.logo} width={"100%"} height={200} borderRadius={15} />

          </View>

          <TouchableOpacity style={styles.outlinedButton} onPress={() => setModalVisible(true)}>
            <Text style={{ color: "#27B162", fontSize: 18, fontWeight: "700" }}>Upload A Photo</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.filledButton} onPress={() => {
            /* 1. Navigate to the Details route with params */
            if (cameraPhoto == null) {
              Alert.alert('Please Add Picture!')
            }
            else {
              navigation.navigate('VehicleInformation', {
                VehiclePic: cameraPhoto
              })
            }
          }
          }
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "700" }}>Next</Text>
          </TouchableOpacity>



          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Pressable
                    style={styles.modalButtonOutlined}
                    onPress={() => { openCamera(); setModalVisible(!modalVisible) }}
                  >
                    <Text style={styles.modalTextStyle1}>Open Camera</Text>
                  </Pressable>
                  <Pressable
                    style={styles.modalButtonFilled}
                    onPress={() => { openGallery(); setModalVisible(!modalVisible) }}
                  >
                    <Text style={styles.modalTextStyle2}>Upload from gallery</Text>
                  </Pressable>

                </View>
              </View>
            </Modal>

          </View>


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
    marginTop: 15,
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
  outlinedButton: {
    height: 45,
    width: 240,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#27B162",
    marginTop: 50,
    alignSelf: "center",
  },
  cnicFrame: {
    marginTop: 5,
    height: 230,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
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
    fontSize: 16, marginLeft: 20, marginRight: 20, color: "black", marginTop: 5, marginBottom: 20
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2
  },
  inputs: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
    marginTop: 15,
    borderRadius: 10,
    paddingLeft: 10,
    alignSelf: "center"
  },
});


export default PersonalDetails;