import * as React from 'react';
import { Modal,Image,TouchableOpacity, StyleSheet, Text, View, Alert } from 'react-native';
import {
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { setDoc , doc} from 'firebase/firestore/lite';
import {db, auth} from '../../../firebase.config'
import { OnlineScreen } from './OnlineScreen';

export function RideCancel1({navigation}){
    // This would be set and sent to DB
    const [reason,setReason] = React.useState('')
    const [bg2,setBg2] = React.useState('#FFFFFF')
    const [bg3,setBg3] = React.useState('#FFFFFF')
    const [bg4,setBg4] = React.useState('#FFFFFF')
    const [bg1,setBg1] = React.useState('#FFFFFF')

    const riderId = 'kQsMhPszxHNVerLOirGM9PGymwq1'
    const passengerId = 'JJXOjhhKkhQ6DX3sGh1lygqACGR2'

  const addDataToDB=async ()=>{
    try{
      await setDoc(doc(db, "CancelledRides", "01"), {
        DriverId:riderId,
        PassengerId:passengerId,
        RideId:FYfSqBU5JgSP2GUilJmz,
        Reason:reason
        });

    }
    catch(e){
      console.log('Error'+e);
      
    }
  }
    return(
    <GestureHandlerRootView style={styles.container}>
    <View style={styles.viewCont}>
        <Text style={styles.mainBoldTxt}>Share the reason for cancelling the ride</Text>
        <Text style={styles.greyTxt}>Choose an issue</Text>
        <TouchableOpacity style={[styles.miniCont,{backgroundColor:bg1}]} 
            onPress={()=>{if (bg1 === '#FFFFFF') {setBg1("#CAC7C7") ;setReason(reason+" Can't Find the rider");}
                         else {setBg1('#FFFFFF');setReason("");}}}>
            <Text style={styles.regularTxt}>Can't Find the rider </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.miniCont,{backgroundColor:bg2}]}
            onPress={()=>{if (bg2 === '#FFFFFF') {setBg2("#CAC7C7") ;setReason(reason+" Rider's item don't fit");}
            else {setBg2('#FFFFFF');setReason("");}}}>
            <Text style={styles.regularTxt}>Rider's item don't fit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.miniCont,{backgroundColor:bg3}]}
            onPress={()=>{if (bg3 === '#FFFFFF') {setBg3("#CAC7C7") ;setReason(reason+" Too Many Riders");}
            else {setBg3('#FFFFFF');setReason("");}}}>
            <Text style={styles.regularTxt}>Too Many Riders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.miniCont,{backgroundColor:bg4}]}
            onPress={()=>{if (bg4 === '#FFFFFF') {setBg4("#CAC7C7") ;setReason(reason+" Rude Behaviour ");}
            else {setBg4('#FFFFFF');setReason("");}}}>
            <Text style={styles.regularTxt} >Rude Behaviour</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.grbtn} onPress={() => {addDataToDB(); navigation.navigate('RootScreen')}}>
                <Text style={styles.gbtnTxt}>Submit Feedback</Text>
        </TouchableOpacity>
        <View style={styles.hr}></View>

    </View>
  </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        borderWidth:1,
        backgroundColor:"#FFFFFF"
      },
      viewCont:{
        flex:1,
        alignItems:'center',
      },
      mainBoldTxt:{
        fontSize:22,
        fontWeight:'700',
        color:"#000000",
        marginHorizontal:15,
        textAlign:'center'
      },
      greyTxt:{
        fontSize:16,
        paddingVertical:2,
        color:"#000"
      },
      miniCont:{
        borderWidth:1,
        width:'90%',
        borderRadius:6,
        borderColor:"#CAC7C7",
        marginVertical:7,
      },
      regularTxt:{
        fontSize:19,
        color:"#000",
        fontWeight:'500',
        textAlign:'center',
        padding:7
      },
      grbtn:{
        alignSelf:'center',
        width:250,
        marginVertical:10,
        height:50,
        borderRadius:50,
        color:"F1F1F1",
        backgroundColor:"#40D27D",
        justifyContent:"center",
        alignItems:"center",
        borderColor:"#F1F1F1",
        borderWidth:1,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    
        elevation: 5,
      },
      gbtnTxt:{
        fontSize:18,
        fontWeight:'bold',
        color:"#FFFFFF",
      },  
      hr:{
        borderWidth:1,
        height:0.5,
        width:'30%',
        backgroundColor:"#000",
        borderColor:"#000",
        marginHorizontal:30,
        marginTop:10,
        alignSelf:'center'
      },
})