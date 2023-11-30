import * as React from 'react';
import {storeDataAsyncStorage,getDataAsyncStorage} from './utils/LocalStorage'
import { useIsFocused } from '@react-navigation/native';
import { Modal,Image,TouchableOpacity, StyleSheet, Text, View, Alert } from 'react-native';
import {
  GestureHandlerRootView
} from 'react-native-gesture-handler';

import {RideRequest} from './RideRequest'
// importing Firebase related stuff
import { getFirestore, collection,arrayUnion, getDocs, addDoc, setDoc , doc, updateDoc,getDoc} from 'firebase/firestore/lite';
import {db, auth} from '../../../firebase.config'



export function OnlineScreen({route,navigation}) {
  const [rider_id,setRiderId]=React.useState('')
  const [rider_name,setRiderName] = React.useState('')
  const [rider_rating,setRating] = React.useState('')
  const [earning,setEarning] = React.useState(route.params.earning)
  const [rider_rides,setRiderRides] = React.useState(route.params.rides)
  const [rider_rides_duration,setRiderRidesDuration] = React.useState(route.params.riderDur)
  const [rider_vehicle_name,setRiderVehicleName] = React.useState('')
  const [rider_vehicle_registration,setRiderVehicleRegistration] = React.useState('')
  const [rider_pic,setRiderPic] = React.useState('')

  const [localFlag,setLocalFlag] = React.useState(false)
  const [updateFlag,setUpdateFlag] = React.useState(false)
  
  
// Retrieving Driver's(Riders) data from LocalStorage and then setting up the states
//        
const RiderData = async ()=>{
  try{
    const tempID = await getDataAsyncStorage('RIDER_ID');
    const tempName = await getDataAsyncStorage('RIDER_NAME');
    const tempPic = await getDataAsyncStorage('RIDER_PIC');
    const tempRating = await getDataAsyncStorage('RIDER_RATING');
    const tempRides = await getDataAsyncStorage('RIDER_RIDES');
    const tempRidesDur = await getDataAsyncStorage('RIDER_RIDES_DURATION');
    const tempVehicle = await getDataAsyncStorage('RIDER_VEHICLE');
    const tempVehicleReg = await getDataAsyncStorage('RIDER_VEHICLE_REG');
    

    
    // Setting up the fetched data in state vars
    setRiderId(tempID)
    setRiderName(tempName)
    setRating(tempRating)
    setRiderRides(tempRides)
    setRiderRidesDuration(tempRidesDur)
    setRiderVehicleName(tempVehicle)
    setRiderVehicleRegistration(tempVehicleReg)
    setLocalFlag(true)
    setRiderPic(tempPic)
    console.log('Data set Successfully ,Inside RiderData');
    
    

  }  
  catch(e){
    console.log('Error while reading RiderData from AsyncStrg '+e);
    
  }
  
}
  

// This would update the riders array in doc  
const updateRides = async () =>{
  const querySnapshot = await getDocs(collection(db, "Rides"));
  querySnapshot.forEach(async (doc1) => {
    const rideRef = doc(db,"Rides",doc1.id)
      try{    
        await updateDoc(rideRef, {
          riders: arrayUnion( {
            "rider_id": rider_id,
            "rider_name": rider_name,
            "rider_profilepic":rider_pic,
            "rider_rating": rider_rating,
            "rider_rides": rider_rides,
            "rider_rides_duration": rider_rides_duration,
            "rider_vehicle_name": rider_vehicle_name,
            "rider_vehicle_registration": rider_vehicle_registration
        })    
      });  
        console.log('Rides updated Successfully');
        setUpdateFlag(true)
      }  
      catch(e){
        console.log(e);
        
      }  
    
  
  });  
}  

  React.useEffect(()=>{
    if (!localFlag)
    {
      RiderData()

    }
  }
  ,[])
  React.useEffect(()=>{
    if(!updateFlag && localFlag){
      updateRides()
    }

  }
  ,[rider_pic])

  // React.useEffect(()=>{
    
  //   const myFunc = async ()  => {
  //     try{
  //       const querySnapshot = await getDocs(collection(db, "Rides"));
  //       querySnapshot.forEach(async (doc1) => {
  //         console.log('Inside Clear Interval');
          
  //         if( rider_id !== '' && doc1.data().RiderAccepted == rider_id  ){
  //           {
  //             storeDataAsyncStorage("RIDE_ACCEPTED",(doc1.id))
  //             storeDataAsyncStorage("CUST_ID",(doc1.data().CustomerId))

  //             console.log('Ride Data Added to local storage ',doc1.data().Origin,doc1.data().Destination);
  //             navigation.navigate('RideRequest')
              
  //           }
  //         }
        
  //       })
        
  //     }
  //     catch(e){
  //       console.log('Error while checking for Ride Req '+e);
        
  //     }}
  //     myFunc()
  // },[updateFlag])

  React.useEffect(()=>{
    const interval = setInterval(()=>
  {
    (async ()  => {
      try{
        const querySnapshot = await getDocs(collection(db, "Rides"));
        querySnapshot.forEach(async (doc1) => {
          console.log('Inside Clear Interval');
          
          if( rider_id !== '' && doc1.data().RiderAccepted == rider_id  ){
            { console.log('Ride Matched');
            
              storeDataAsyncStorage("RIDE_ACCEPTED",(doc1.id))
              storeDataAsyncStorage("CUST_ID",(doc1.data().CustomerId))

              console.log('Ride Data Added to local storage ',doc1.data().Origin,doc1.data().Destination);
              navigation.navigate('RideRequest')
              
            }
          }
        
        })
        
      }
      catch(e){
        console.log('Error while checking for Ride Req '+e);
        
      }})();
  },10000);

  return ()=>clearInterval(interval)

  },[updateFlag]
  )


    // Using Alerts for now instead of Modal
    const goOffline=()=>{
        Alert.alert(
            "Do you want to Go Offline",
            "You would stop getting ride requests",
            [
              {
                text: "No",
                onPress: () => console.log("No Pressed"),
                style: "cancel"
              },
              { text: "Yes", onPress: () => navigation.navigate('RootScreen') }
            ]
          );
        
    }





    // Check for the ride request in the realtime db if any navigate to the RideRequest Screen
    // setTimeout(() => {
    //   navigation.navigate('RideRequest')
    // }, 5000)

        return(
<>
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.viewCont}>
            <TouchableOpacity style={styles.wrbtn} onPress={() => goOffline()}>
                <Text style={styles.rbtnTxt}>Go Offline</Text>
            </TouchableOpacity>
            <Text style={styles.bldTxt}>Finding Ride Requests</Text>
            <View style={styles.hr}><View style={styles.hrg}></View></View>
            <View style={styles.cont1}>
                <View style={styles.cont2}>
                    <Text style={styles.greyTxt}>Earnings</Text>
                    <Text style={styles.miniBldTxt}>{earning}</Text>
                </View>
                    <View style={styles.rhr}></View>
                <View style={styles.cont2}>
                    <Text style={styles.greyTxt}>Online</Text>
                    <Text style={styles.miniBldTxt}>{rider_rides_duration} hrs</Text>
                </View>
                    <View style={styles.rhr}></View>
                <View style={styles.cont2}>
                    <Text style={styles.greyTxt}>Rides</Text>
                    <Text style={styles.miniBldTxt}>{rider_rides}</Text>
                </View>
            </View>
            <View style={styles.schdPCont}>
                <Text style={styles.bldTxt}>Your Scheduled Pickups</Text>
                <Image source={require('./assets/images/person.jpg')}  style={{width: 80, height: 80,borderRadius: 75/ 2}} />
                <Text style={styles.bldTxt1}>Abdul Sammi Gul</Text>
                {/* Wrapped inside multiple views so that alignment isnot affected  */}
                <View>
                    <View style={styles.rInfo}>
                        <View style={styles.cont4}>
                            <View style={styles.cDot}></View>
                        </View>
                        <View style={styles.cont3}>
                            <Text style={styles.dtxt}>House#4 Jinnah Rd,Islamabad</Text>
                            <Text style={styles.gTxt}>11:16 PM</Text>
                        </View>
                    </View>
                    <View style={styles.rInfo}>
                        <View style={styles.cont4}>
                            <View style={styles.cgDot}></View>
                        </View>
                        <View style={styles.cont3}>
                            <Text style={styles.dtxt}>Hostel City ChakShahzad, Islamabad</Text>
                            <Text style={styles.gTxt}>11:36 PM</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.cont5}>
                    <View style={styles.cont6}>
                        <Image source={require('./assets/icons/clock.png')}  style={{width: 24, height: 24}} />
                        <Text style={styles.bldTxt1}>15min</Text>
                    </View>
                    <View style={styles.rhr2}></View>
                    <View style={styles.cont6}>
                        <Text style={styles.bldTxt1}>PKR1400</Text>
                    </View>
                    <View style={styles.rhr2}></View>
                    <View style={styles.cont6}>
                        <Image source={require('./assets/icons/locationPin.png')}  style={{width: 24, height: 24}} />
                        <Text style={styles.bldTxt1}>4KM</Text>   
                    </View>
                </View>
            </View>
        </View>
      </GestureHandlerRootView>
      </>
        )
    }
    


// Container styles for both components
const styles=StyleSheet.create({
  container:{
    flex:1,
    borderWidth:1,
    backgroundColor:"#FFFFFF"
  },
  viewCont:{
    flex:1,
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
  bldTxt:{
    color:"#000000",
    alignSelf:'center',
    padding:10,
    marginVertical:6,
    fontSize:22,
    fontWeight:'bold'
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
  hrg:{
    borderWidth:1.5,
    backgroundColor:"#40D27D",
    height:0.7,
    width:'30%',
    borderColor:"#40D27D",
    alignSelf:'center'
  },
  cont1:{
    flexDirection:'row',
    justifyContent:'space-around',
    marginVertical:"5%"
  },
  cont2:{
    flexDirection:'column',
    justifyContent:'space-around',
    alignItems:'center',
    flexBasis:"33%",
  },
  greyTxt:{
    color:"#808080",
    fontSize:16,
    padding:5
  },
  miniBldTxt:{
    fontWeight:'600',
    color:"#000000",
    padding:5
  },
  rhr:{
    borderWidth:0.5,
    height:"65%",
    alignSelf:'center',
    borderColor:"#D1CCCC",
    backgroundColor:"#D1CCCC"
  },rhr2:{
    borderWidth:0.5,
    height:"65%",
    alignSelf:'center',
    borderColor:"#000000",
    backgroundColor:"#000000"
  },
  schdPCont:{
    borderWidth:1,
    alignItems:'center',
    borderRadius:10,
    borderColor:"#D1CCCC",
    marginHorizontal:10,
    paddingBottom:10
  },
  bldTxt1:{
    color:'#000000',
    fontWeight:'600',
    fontSize:18,
    marginVertical:5,
    marginLeft:5
  },
  rInfo:{
    flexDirection:"row",
    alignItems:'center',
    justifyContent:'space-evenly',
    width:'100%'
  },
  cDot:{
    height:9,
    width:9,
    backgroundColor:"#000",
    borderRadius:9/2,
  },
  cgDot:{
    height:9,
    width:9,
    backgroundColor:"#40D27D",
    borderRadius:9/2,
  }
  ,
  dtxt:{
    fontSize:16,
    color:'#000000'
  },
  gTxt:{
    fontSize:14,
    color:"#8B8989"
  },
  cont3:{
    padding:4,
    flexBasis:"80%"
  },
  cont4:{
    flexBasis:"20%",
    alignItems:'center'
  },
  cont5:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  cont6:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    flexBasis:"33%",
  },
  //Styles for RideRequest Component
  Rcont:{
    flexDirection:'row',
    justifyContent:'flex-start',
    marginHorizontal:"7%",
    marginTop:"2%",
    marginBottom:"4%"
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
    marginVertical:5,
    marginLeft:5,
    marginLeft:20,
    alignSelf:'flex-start'
  },
  


}
)