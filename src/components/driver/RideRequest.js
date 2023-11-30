import * as React from 'react';
import MapView,{Marker} from 'react-native-maps';
import { Modal,Image,TouchableOpacity, StyleSheet, Text, View, Alert } from 'react-native';
import {
  BaseButton,
  GestureHandlerRootView
} from 'react-native-gesture-handler';
import {getDataAsyncStorage} from './utils/LocalStorage'
// importing Firebase related stuff
import {  doc,getDoc} from 'firebase/firestore/lite';
import {db,} from '../../../firebase.config'

// RideRequest Function(Component) is called and executed when there is some 
    // ride request present in the DB  
    
    
export  function RideRequest({route,navigation}){
    

    const [flag,setFlag] = React.useState(false)
    
    const [origin,setOrigin] = React.useState('')
    const [destination,setDestination] = React.useState('')
    const [distance,setDistance] = React.useState('')
    const [duration,setDuration] = React.useState('')
    const [rideId,setRideId] = React.useState('')
    const [fare,setFare] = React.useState('')
    const [customerId,setCustomerId] = React.useState('')
    const [name,setName] = React.useState('')
    const [pic,setPic]= React.useState('')
    const [originLat,setOriginLat] = React.useState('')
    const [originLong,setOriginLong] = React.useState('')
    const [destLat,setDestLat] = React.useState('')
    const [destLong,setDestLong] = React.useState('')

    // Getting Ride infromation from the Async Storage
    const getRideInfo = async ()=>{
      try{
        const tempID = await getDataAsyncStorage('RIDE_ACCEPTED');
        const tempCID = await getDataAsyncStorage("CUST_ID")
        console.log(tempCID);
        
        // Setting up the fetched data in state vars
        setRideId(tempID)
        setCustomerId(tempCID)
        setFlag(true)
      }  
      catch(e){
        console.log('Error while reading RiderData from AsyncStrg '+e);    
      }
      
    }

    // Getting Ride Infromation From Firestore
      
  const ReadRideData =  async () =>
  {
    try{
      const docRef = doc(db,"Rides",rideId)
      const docSnap = await getDoc(docRef)
      if(docSnap.exists()){
        setDestination(docSnap.data().Destination)
        setOrigin(docSnap.data().Origin)
        setDistance(docSnap.data().Distance.toFixed(2))
        setDuration(docSnap.data().Duration.toFixed(1))
        setFare(docSnap.data().Cost.TotalCost)
        setOriginLat(docSnap.data().RidePickupLocation.Latitude)
        setOriginLong(docSnap.data().RidePickupLocation.Longitude)
        setDestLat(docSnap.data().RideDestinationLocation.Latitude)
        setDestLong(docSnap.data().RideDestinationLocation.Longitude)
      } 
  }
    catch(e){
      console.log('',e);
      
    }
  }
  
  // Reading Data from Users Collection to display name of the rider

  const ReadCustomerData=  async () =>
  {
    try{
      const docRef = doc(db,"Users",customerId)
      const docSnap = await getDoc(docRef)
      if(docSnap.exists()){
        setPic(docSnap.data().ProfilePic)
        console.log('Profile Pic'+docSnap.data().ProfilePic);
        
        setName(docSnap.data().FirstName+' '+docSnap.data().LastName)
    }
  }
    catch(e){
      console.log('',e);
      
    }
  }
    
    React.useEffect(()=>{
      if(rideId === ''){
        getRideInfo()
      }

    },[])

    React.useEffect(()=>{
      if(rideId !== '' && customerId !== '')
      {
        ReadRideData();
        ReadCustomerData();
      }

    },[rideId,customerId])

    // This would be called when acceptride btn is pressed

    const acceptRide = () =>{
      const routeData = {
        customerName:name,
        customerPic:pic,
        dist:distance,
        dur:duration,
        cost:fare,
        pickup:origin,
        dropoff:destination
      }
      const coordinates={
        origin:{
          latitude:originLat,
          longitude:originLong
        },
        destination:{
          latitude:destLat,
          longitude:destLong
        }
      }

      console.log('Coordinates'+ coordinates.origin.longitude+ coordinates.origin.latitude);
      

      navigation.navigate('DriverScreen',{
        screen:'RideAccepted',
        params:routeData},navigation.navigate('DriverHomeScreen',{
          screen:'Map1',
          params:coordinates
        }))
      //   navigation.navigate('Map1',coordinates))
      // console.log('Coordinates inside funct ',coordinates);
      
    }

        return(
        <GestureHandlerRootView style={styles.container}>
        <View style={styles.viewCont}>
            <View style={styles.Rcont}>
        {pic &&  <Image source={{uri:pic}}  style={{width: 60, height: 60,borderRadius: 60/ 2}} />}       
                <Text style={styles.bldTxt}>{name}</Text>
            </View>
            <View style={styles.hr}></View>
            <View style={styles.Rcont1}>
                    <View style={styles.Rcont2}>
                        <Image source={require('./assets/icons/clock.png')}  style={{width: 24, height: 24}} />
                        <Text style={styles.bldTxt1}>{duration} min</Text>
                    </View>
                    <View style={styles.rhr2}></View>
                    <View style={[styles.Rcont2,{flexBasis:'25%'}]}>
                        <Text style={styles.bldTxt1}>RS {fare}</Text>
                    </View>
                    <View style={styles.rhr2}></View>
                    <View style={styles.Rcont2}>
                        <Image source={require('./assets/icons/locationPin.png')}  style={{width: 24, height: 24,}} />
                        <Text style={styles.bldTxt1}>{distance}KM</Text>   
                    </View>
             </View>
             <View style={styles.hr}></View>
            <View style={styles.Rdetails}>
                <Text style={styles.RbldTxt}>Ride Details</Text>
                {/* Wrapped inside multiple views so that alignment is not affected  */}
                <View>
                    <View style={styles.rInfo}>
                        <View style={styles.cont4}>
                            <View style={styles.cDot}></View>
                        </View>
                        <View style={styles.cont3}>
                            <Text style={styles.Rdtxt}>Pickoff</Text>
                            <Text style={styles.gTxt}>{origin}</Text>
                        </View>
                    </View>
                    <View style={styles.rInfo}>
                        <View style={styles.cont4}>
                            <View style={styles.cgDot}></View>
                        </View>
                        <View style={styles.cont3}>
                            <Text style={styles.Rdtxt}>Dropoff</Text>
                            <Text style={styles.gTxt}>{destination}</Text>
                        </View>
                    </View>
                </View>
               
            </View>
            <View style={styles.hr}></View>
            {/* Change this onPress to send Data to Database and then navigate back to Online Screen */}
            <TouchableOpacity style={styles.grbtn} onPress={() => acceptRide()}> 
                <Text style={styles.gbtnTxt}>Accept Ride</Text>
            </TouchableOpacity>
        </View>
      </GestureHandlerRootView>)
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