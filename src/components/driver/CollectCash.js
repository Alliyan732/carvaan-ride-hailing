import * as React from 'react';
import { Image,TouchableOpacity,Button, StyleSheet, Text, View } from 'react-native';


export function CollectCash({route,navigation}){
  const {customerName,customerPic,dist,dur,cost,pickup,dropoff} = route.params
    return(
        <View style={styles.container} >
        <Image source={{uri:customerPic}}  style={{width: 128, height: 128,borderRadius: 128/ 2 ,marginTop:'40%'}} />
        <Text style={styles.text}>Collecting Cash from {customerName}</Text>
        <Text style={styles.boldText}>PKR {cost}</Text>
        <TouchableOpacity style={styles.btn} onPress={() =>{ navigation.navigate('DriverScreen',{
      screen:'Feedback',
      params:route.params},navigation.navigate('RootScreen')); }}>
            <Text style={styles.btnTxt}>Cash Collected</Text>
        </TouchableOpacity>
        </View>
    )
}


const styles=StyleSheet.create({
    container:{
      flex:1,
      alignItems:'center'
    },
    text:{
        fontSize:16,
        color:"#000",
        padding:15
    },
    boldText:{
        color:'#000',
        fontSize:28,
        fontWeight:'700',
    },
    btn:{
      alignSelf:'center',
      width:250,
      height:53,
      borderRadius:50,
      color:"F1F1F1",
      backgroundColor:"#FFFFFF",
      justifyContent:"center",
      alignItems:"center",
      borderColor:"#F1F1F1",
      borderWidth:1,
      position:'absolute',
      bottom:25,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
  
      elevation: 5,
    },
    btnTxt:{
      fontSize:18,
      fontWeight:'bold',
      color:"#40D27D"
    }
  
  }
  )