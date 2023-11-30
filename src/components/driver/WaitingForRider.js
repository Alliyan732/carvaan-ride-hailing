import * as React from 'react';
import { Modal,Image,TouchableOpacity, StyleSheet, Text, View, Alert } from 'react-native';
import {
  BaseButton,
  GestureHandlerRootView
} from 'react-native-gesture-handler';
import { RideCancel1 } from './RideCancel1';

export function WaitingForRider({route,navigation}){

  const {customerName,customerPic,dist,dur,cost,pickup,dropoff} = route.params


    const cancelRide=()=>{
        Alert.alert(
            "Do you want to Cancel this",
            "You cannot undo this !",
            [
              {
                text: "No",
                onPress: () => console.log("No Pressed"),
                style: "cancel"
              },
              { text: "Yes", onPress: () => navigation.navigate(RideCancel1) }
            ]
          );
        }

        return (
    <GestureHandlerRootView style={styles.container}>
        <View style={styles.viewCont}>
            <View style={styles.cont}>
                <View style={styles.timer  }>
                    <Text style={styles.timerTxt}>02:49</Text>
                </View>
                <Text style={styles.gTxt}>Waiting For the rider</Text>
                <Text style={styles.bldTxt}>{customerName}</Text>
            </View>
            <TouchableOpacity style={styles.gbtn} onPress={() => {navigation.navigate('DriverScreen',{
        screen:'RideInProgress',
        params:route.params})}}>
                <Image source={require('./assets/icons/arrow.png')}  style={{width: 44, height: 44,borderRadius: 44/ 2,marginTop:5}} />
                <Text style={styles.gbtnTxt}>Start Ride</Text>
            </TouchableOpacity>
            <View style={styles.hr}></View>

            <View style={styles.Rdetails}>
                <Text style={styles.RbldTxt}>Ride Details</Text>
                {/* Wrapped inside multiple views so that alignment is not affected  */}
                <View>
                    <View style={[styles.rInfo,{backgroundColor:"#DEDEDE"}]}>
                        <View style={styles.cont4}>
                            <View style={styles.cDot}></View>
                        </View>
                        <View style={[styles.cont3,]}>
                            <Text style={styles.Rdtxt}>Pickoff</Text>
                            <Text style={styles.gTxt}>{pickup}</Text>
                        </View>
                    </View>
                    <View style={styles.rInfo}>
                        <View style={styles.cont4}>
                            <View style={styles.cDot}></View>
                        </View>
                        <View style={styles.cont3}>
                            <Text style={styles.Rdtxt}>Dropoff</Text>
                            <Text style={styles.gTxt}>{dropoff}</Text>
                        </View>
                    </View>
                </View>
            
            </View>
            <View style={styles.hr}>
            </View>
            <TouchableOpacity style={styles.wrbtn} onPress={() => cancelRide()}>
                <Text style={styles.rbtnTxt}>Cancel Ride</Text>
            </TouchableOpacity>
        </View>
    </GestureHandlerRootView>)
    }


    const styles = StyleSheet.create({
        container:{
            flex:1,
            borderWidth:1,
            backgroundColor:"#FFFFFF"
          },
          viewCont:{
            flex:1,
          },
        Rcont:{
            flexDirection:'row',
            justifyContent:'flex-start',
            marginHorizontal:"7%",
            marginTop:"3%",
            marginBottom:"3%"
          },
          wrbtn:{
            alignSelf:'center',
            width:250,
            height:50,
            borderRadius:50,
            color:"F1F1F1",
            backgroundColor:"#FFFFFF",
            justifyContent:"center",
            alignItems:"center",
            borderColor:"#FF0000",
            borderWidth:1,
            marginTop:12,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
        
            elevation: 5,
          },
          rbtnTxt:{
            fontSize:18,
            fontWeight:'bold',
            color:"#FF0000",
          },
          Rcont1:{
            flexDirection:'row',
            justifyContent:'space-between',
            padding:10
          },
          Rcont2:{
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            flexBasis:"33%",
          },
          Rdtxt:{
            fontSize:16,
            color:'#000000',
            fontWeight:'500'
          },
          Rdetails:{
            alignItems:'center',
            borderRadius:10,
            borderColor:"#D1CCCC",
            marginHorizontal:10,
            marginVertical:10
          },
          RbldTxt:{
            color:'#000000',
            fontWeight:'700',
            fontSize:18,
            marginBottom:5,
            marginLeft:5,
            marginLeft:20,
            alignSelf:'flex-start'
          },
          hr:{
            borderWidth:0.5,
            height:0.5,
            width:'90%',
            backgroundColor:"#D1CCCC",
            borderColor:"#D1CCCC",
            marginHorizontal:30,
            alignSelf:'center'
          },
          gTxt:{
            fontSize:14,
            color:"#8B8989",
    
          },
          cont3:{
            padding:4,
            flexBasis:"80%"
          },
          cont4:{
            flexBasis:"20%",
            alignItems:'center'
          },  rInfo:{
            flexDirection:"row",
            alignItems:'center',
            justifyContent:'space-evenly',
            width:'100%'
          },
          cDot:{
            borderWidth:4,
            borderColor:"#000",
            height:13,
            width:13,
            backgroundColor:"#fff",
            borderRadius:13/2,
          },
          bldTxt1:{
            color:'#000000',
            fontWeight:'600',
            fontSize:18,
            marginVertical:5,
            marginLeft:5
          },
          bldTxt:{
            color:"#000000",
            alignSelf:'center',
            fontSize:20,
            paddingHorizontal:15,
            paddingVertical:3,
            fontWeight:'bold'
          },
          rhr2:{
            borderWidth:0.5,
            height:"65%",
            alignSelf:'center',
            borderColor:"#000000",
            backgroundColor:"#000000"
          },
    
        //   Extra Styles for CloseToRider Component
        cont:{
            alignItems:'center',
            marginHorizontal:"7%",
            marginBottom:"1%"
          },
          gbtn:{
            flexDirection:'row',
            borderWidth:1,
            alignSelf:'center',
            width:250,
            height:50,
            borderRadius:50,
            color:"F1F1F1",
            backgroundColor:"#40D27D",
            marginBottom:20,
            marginTop:7,
            justifyContent:"space-between",
            alignItems:"center",
            borderColor:"#FFF",
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
            marginRight:70,
            fontSize:18,
            fontWeight:'bold',
            color:"#FFF",
          },
          timer:{
            borderWidth:1.5,
            borderRadius:17,
            borderColor:"#FF0000",
            marginBottom:5
          },
          timerTxt:{
            color:'#FF0000',
            padding:5,
            paddingHorizontal:10,
            fontSize:18,
            fontWeight:'700'
          }
          
    })