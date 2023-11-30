import React, { useState, useRef } from "react";
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Button, Pressable, Alert} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getFirestore, collection, getDocs, addDoc, setDoc , doc, updateDoc} from 'firebase/firestore/lite';
import {db, auth} from '../../../firebase.config'


const PersonalDetails = ({ navigation, route }) => {

  const [cardNo, setCardNo] = useState(null)
  const [CVV, setCVV] = useState(null)
  const [Date, setDate] = React.useState(null)
  const [country, setCountry] = useState(null)
  
  // firebase
  const addPersonalInfo = async() => {  
    if (cardNo == null || CVV == null || Date == null || country == null){
      Alert.alert("Please Fill All Entries!")
    }
    else{
      await updateDoc(doc(db, "Drivers", auth.currentUser.uid), {
        DriverPaymentMethod:  {
          CardNumber: cardNo,
          CVV: CVV,
          ExpiryDate: Date,
          Country: country,
        }
      })
      .then(() => {
        navigation.navigate("UserHome")
      })
      .catch(error => {
        alert(error)
      })
    }
  }

    // firebase
    const chooseCash = async () => {
      await updateDoc(doc(db, 'Users', auth.currentUser.uid), {
        UserPaymentMethod: 'Cash Payment Method',
      })
        .then(() => {
          navigation.navigate('UserHome');
        })
        .catch(error => {
          alert(error);
        });
    };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date.toString().split(' ')[1]+ "/" +date.toString().split(' ')[2]+ "/" +date.toString().split(' ')[3]);
    console.log(date)
    console.log(Date)
    hideDatePicker();
  };
    
  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
      <Text style={styles.header1}>Choose Payment</Text>
      <Text style={styles.header2}>Method</Text>
      <Text style={styles.headerText}>Choose your favorite payment method</Text>
      
      <View style={styles.container2}>
        <View style={[styles.inputs, styles.inputShadow]}>
          <FontAwesomeIcon name="cc-visa" size={20} color="#0386D0" />
          <TextInput keyboardType="numeric" placeholder="Card Number" style={styles.textInput} 
            onChangeText={setCardNo}></TextInput>
        </View>
        
        <View style={{flexDirection:"row"}}>
          <View style={[styles.cardInput, styles.inputShadow]}>
            <Image style={{width:25, height:25}} source={require('../../../assets/images/cvv.png')} />
            <TextInput placeholder="CVV" keyboardType="numeric" style={styles.textInput} onChangeText={setCVV}></TextInput>
          </View>


          <Pressable onPress={showDatePicker}>
            <View pointerEvents="none" 
              style={[styles.dateInput , styles.inputShadow]}>

            <MaterialIcons name="date-range" size={20} color="#0386D0"/>
            <TextInput placeholder="Expiry Date" style={[styles.textInput, {marginLeft:-2}]}>{Date}</TextInput>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            </View>
          </Pressable>
        </View>

        <View style={[styles.inputs,styles.inputShadow]}>
          <TextInput placeholder="Issuing Country" style={styles.textInput} onChangeText={setCountry}>

          </TextInput>
        </View>

        <TouchableOpacity style={styles.outlinedButton} >
          <Text style={{color:"#27B162", fontSize:18, fontWeight: "700"}} 
          onPress={() => chooseCash()}
          >Choose Cash Instead</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.filledButton} onPress={()=> addPersonalInfo()}>
          <Text style={{color:"white", fontSize:18, fontWeight: "700"}}>Save</Text>
        </TouchableOpacity>
    
      </View>
           
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    width: "80%",
    alignSelf: "center",
    marginTop: 4
  },
  logo: {

    width:100,
    height:100,
    
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
    marginTop:15,
    borderRadius:10,
    paddingLeft:10
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
    marginTop:15,
    alignSelf: "center"

  },
  outlinedButton:{
    height:45,
    width:240,
    borderRadius:50,
    justifyContent:"center",
    alignItems:"center",
    borderWidth:2,
    borderColor: "#27B162",
    marginTop: 50,
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

  header1:
  {fontSize:30, fontWeight: "bold", marginLeft: 20, marginTop: 40, color: "black"},
  
  header2:
  {fontSize:30, fontWeight: "bold", marginLeft: 20,color: "black"},
  
  headerText:{
    fontSize:18, marginLeft: 20, color: "black", marginTop:10, marginBottom:10
  },
  cardInput:{
    flexDirection: "row", 
    justifyContent:"center", 
    alignItems:"center", 
    width:"48.5%", 
    marginTop:15,
    borderRadius:10,
    paddingLeft:15,
    marginRight:"5%"
  },
  dateInput:{
    flexDirection: "row", 
    justifyContent:"center", 
    alignItems:"center", 
    width:"67.5%", 
    marginTop:15,
    borderRadius:10,
    paddingLeft:11
  }

});

export default PersonalDetails;