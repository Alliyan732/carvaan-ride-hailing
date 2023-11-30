import React, { useState, useRef } from "react";
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Button, Pressable, PermissionsAndroid, Modal, ScrollView} from "react-native";

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getFirestore, collection, getDocs, addDoc, setDoc , doc, updateDoc} from 'firebase/firestore/lite';
import {db, auth} from '../../../firebase.config';



const PersonalDetails = ({ navigation, route }) => {
  
  // firebase
  const addPersonalInfo = async() => {  
    if(cameraPhoto1 == null ||  cameraPhoto2 == null)
    {
      alert("Please Enter All the Values!");
    }
    else{
      await updateDoc(doc(db, "Drivers", auth.currentUser.uid), {
        DriverCnicInfo: {
          CnicFront: cameraPhoto1,
          CnicBack: cameraPhoto2,
        } 
      })
      .then(() => {
        navigation.navigate("VehiclePicture")
      })
      .catch(error => {
        alert(error)
      })
    }
  }

  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [cameraPhoto1, setCameraPhoto1] = useState(null);
  const [cameraPhoto2, setCameraPhoto2] = useState(null);
  // const [galleryPhoto, setGalleryPhoto] = useState();
  const [defaultPic1, checkDefaultPic1] = useState(0)
  const [defaultPic2, checkDefaultPic2] = useState(0)

  let options = {
    mediaType: 'photo'
  }
  const openCamera1 = async () => { 
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED){
      const result = await launchCamera(options);
      setCameraPhoto1(result.assets[0].uri);
      checkDefaultPic1(1);
    }
  }

  const openCamera2 = async () => { 
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED){
      const result = await launchCamera(options);
      setCameraPhoto2(result.assets[0].uri);
      checkDefaultPic2(1);
    }
  }

  const openGallery1 = async () => {
    const result = await launchImageLibrary(options);
    setCameraPhoto1(result.assets[0].uri);
    checkDefaultPic1(1);

  };

  const openGallery2 = async () => {
    const result = await launchImageLibrary(options);
    setCameraPhoto2(result.assets[0].uri);
    checkDefaultPic2(1);

  };
  
  return (
    <ScrollView style={{flex:1}}>
    <View style={styles.container}>
    <Text style={styles.header1}>Add CNIC Pictures</Text>
      <Text style={styles.headerText}>You must have valid CNIC in order to register as driver on caravan.</Text>
      <View style={styles.container2}>
        
        
      <Text style={[styles.cnicHeader, {marginTop: 15,marginBottom:10}]}>CNIC (Front Side)</Text>
<View >
{/* source={require('../../assets/images/user.png')} */}
<Image  source = {defaultPic1 === 0 ? require("../../../assets/images/cnicfront.png") : {uri: cameraPhoto1}} style={styles.logo} width={"100%"} height={200} borderRadius={15}/>

</View>

        <TouchableOpacity style={styles.outlinedButton} onPress={() => setModalVisible1(true)}>
          <Text style={{color:"#27B162", fontSize:14, fontWeight: "700"}}>Upload A Photo</Text>
        </TouchableOpacity>

      <Text style={[styles.cnicHeader, {marginTop: 30, marginBottom:10}]}>CNIC (Back Side)</Text>
<View >
{/* source={require('../../assets/images/user.png')} */}
<Image  source = {defaultPic2 === 0 ? require("../../../assets/images/cnicfront.png") : {uri: cameraPhoto2}} style={styles.logo} width={"100%"} height={200} borderRadius={15}/>

</View>

        <TouchableOpacity style={styles.outlinedButton} onPress={() => setModalVisible2(true)}>
          <Text style={{color:"#27B162", fontSize:14, fontWeight: "700"}}>Upload A Photo</Text>
        </TouchableOpacity>

        
        <TouchableOpacity style={styles.filledButton} onPress={() => addPersonalInfo()}>
          <Text style={{color:"white", fontSize:18, fontWeight: "700"}}>Next</Text>
        </TouchableOpacity>
        
        

        <View style={styles.centeredView}>

      {/* modal 1 */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible1(!modalVisible1);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={styles.modalButtonOutlined}
              onPress={() => {openCamera1(); setModalVisible1(!modalVisible1)}}
            >
              <Text style={styles.modalTextStyle1}>Open Camera</Text>
            </Pressable>
            <Pressable
              style={styles.modalButtonFilled}
              onPress={() => {openGallery1(); setModalVisible1(!modalVisible1)}}
            >
              <Text style={styles.modalTextStyle2}>Upload from gallery</Text>
            </Pressable>

          </View>
        </View>
      </Modal>
      
      {/* modal 2 */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible2(!modalVisible2);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={styles.modalButtonOutlined}
              onPress={() => {openCamera2(); setModalVisible2(!modalVisible2)}}
            >
              <Text style={styles.modalTextStyle1}>Open Camera</Text>
            </Pressable>
            <Pressable
              style={styles.modalButtonFilled}
              onPress={() => {openGallery2(); setModalVisible2(!modalVisible2)}}
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

  text:{
    flex:1,
    bottom: 20,
    color: "white"
  },
  inputs:{
    flexDirection: "row", 
    justifyContent:"center", 
    alignItems:"center", 
    width:"100%", 
    borderBottomWidth:1, 
    marginTop:15
  },
  textInput:{
    width: "90%",
    marginLeft:5,
    fontSize: 16
  },
  filledButton:{
    height:45,
    width:240,
    borderRadius:50,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: "#27B162",
    marginTop:40,
    marginBottom:40,
    alignSelf: "center"
  },
  outlinedButton:{
    height:40,
    width:150,
    borderRadius:50,
    justifyContent:"center",
    alignItems:"center",
    borderWidth:2,
    borderColor: "#27B162",
    marginTop: 20,
    alignSelf:"center"
  },
  cnicFrame:{
    marginTop:5,
    height: 200,
    width:"100%",
    justifyContent: "center",
    alignItems:"center",
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
modalButtonFilled:{
  height:45,
  width:200,
  borderRadius:50,
  justifyContent:"center",
  alignItems:"center",
  backgroundColor: "#27B162",
  marginTop:15,
  alignSelf: "center"
},

modalButtonOutlined:{
  height:46,
  width:200,
  borderRadius:50,
  justifyContent:"center",
  alignItems:"center",
  borderWidth:2,
  borderColor: "#27B162",
  marginTop: 70,
  alignSelf:"center"
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
{fontSize:25, fontWeight: "bold", marginLeft: 20, marginTop: 20, color: "black"},

header2:
{fontSize:25, fontWeight: "bold", marginLeft: 20,color: "black"},

headerText:{
  fontSize:16, marginLeft: 20, marginRight:20, color: "black", marginTop:5, marginBottom:10
},

dateInput:{
    flexDirection: "row", 
    justifyContent:"center", 
    alignItems:"center", 
    width:"85%", 
    marginTop:30,
    borderRadius:10,
    paddingLeft:15,
    alignSelf:"center"
  },
  inputShadow:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2
  },
  inputs:{
    flexDirection: "row", 
    justifyContent:"center", 
    alignItems:"center", 
    width:"85%", 
    marginTop:15,
    borderRadius:10,
    paddingLeft:10,
    alignSelf:"center"
  },
  cnicHeader:{
    alignSelf:"center"
  }
});


export default PersonalDetails;