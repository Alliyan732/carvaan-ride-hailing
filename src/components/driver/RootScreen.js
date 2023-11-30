import * as React from 'react';
import { PermissionsAndroid,TouchableOpacity, StyleSheet, Text, View,Image } from 'react-native';
import {
  BaseButton,
  GestureHandlerRootView
} from 'react-native-gesture-handler';
import MapView,{Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
// importing Firebase related stuff
import { getFirestore, collection,arrayUnion, getDocs, addDoc, setDoc , doc, updateDoc,getDoc} from 'firebase/firestore/lite';
import {db, auth} from '../../../firebase.config'
// Importing ASYNCStorage
import {storeDataAsyncStorage,getDataAsyncStorage} from './utils/LocalStorage'

export function RootScreen({navigation}){
    
const [location,setLocation] = React.useState({"coords":{"latitude": 32.32, "longitude": 73.3095385,}})
      
// Fetching User Data From The Database 
  // const UID = 'kQsMhPszxHNVerLOirGM9PGymwq1'        // can retrieve it using auth.user-UID 
  const  UID = auth.currentUser.uid  
  
  const [rider_id,setRiderId]=React.useState('')
  const [rider_name,setRiderName] = React.useState('Abdullah')
  const [rider_rating,setRating] = React.useState('3.4')
  const [rider_rides,setRiderRides] = React.useState('07')
  const [rider_rides_duration,setRiderRidesDuration] = React.useState('10.2')
  const [rider_vehicle_name,setRiderVehicleName] = React.useState('Alto')
  const [rider_vehicle_registration,setRiderVehicleRegistration] = React.useState('BCS-111')
  const [rider_pic,setRiderPic] = React.useState('')


  
  const ReadDriverData =  async () =>
      {
        const docRef = doc(db,"Drivers",UID)
        const docSnap = await getDoc(docRef)
        if(docSnap.exists()){
            setRiderId(UID)
            setRiderName(docSnap.data().FirstName+' '+docSnap.data().LastName)

        //    setRating(docSnap.data().Rating)
        //    setRiderRides(docSnap.data().Rides)
        //    setRiderRidesDuration(docSnap.data().RidesDuration)
            setRiderVehicleName(docSnap.data().VehicleInfo.Model)
            setRiderVehicleRegistration(docSnap.data().VehicleInfo.RegisterationNumber)
            setRiderPic(docSnap.data().ProfilePic)

          // Saving To Local Storage 

          storeDataAsyncStorage("RIDER_ID",(UID))
          storeDataAsyncStorage("RIDER_NAME",(docSnap.data().FirstName+' '+docSnap.data().LastName))
          storeDataAsyncStorage("RIDER_PIC",(docSnap.data().ProfilePic))
          storeDataAsyncStorage("RIDER_RATING",(rider_rating))
          storeDataAsyncStorage("RIDER_RIDES",(rider_rides))
          storeDataAsyncStorage("RIDER_RIDES_DURATION",(rider_rides_duration))
          storeDataAsyncStorage("RIDER_VEHICLE",(docSnap.data().VehicleInfo.Model))
          storeDataAsyncStorage("RIDER_VEHICLE_REG",(docSnap.data().VehicleInfo.RegisterationNumber))

          console.log('Done Saving Driver Data In Local Storage'+docSnap.data().VehicleInfo.Model);
          
        }
      } 

  


    // Function to get permission for location
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Geolocation Permission',
            message: 'Can we access your location?',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        console.log('granted', granted);
        if (granted === 'granted') {
          console.log('You can use Geolocation');
          return true;
        } else {
          console.log('You cannot use Geolocation');
          return false;
        }
      } catch (err) {
        return false;
      }
    };

    // Sets the current location in location state variable 
    const getLocation = () => {
      const result = requestLocationPermission();
      result.then(res => {
        console.log('res is:', res);
        if (res) {
          Geolocation.getCurrentPosition(
            position => {
              console.log(position);
              setLocation(position);
            },
            error => {
              // See error code charts below.
              console.log(error.code, error.message);
              setLocation(false);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        }
      });
      console.log(location);

    };
    // we update the location with user's current coordinatess
    React.useEffect(()=>{
        getLocation()
        ReadDriverData()
    
      },[])
    
    const mapRef = React.useRef(null)
    
    const recenter=()=>{
      mapRef.current.fitToSuppliedMarkers(['loc'],{edgePadding:{top:80,right:50,bottom:100,left:50}}) 
      console.log('Recentered to supplied marker');
    }
          
    const goToOnlineScreen = () =>{
      const riderData = {
        earning:'PKR2500',
        rides:rider_rides,
        riderDur:rider_rides_duration
      }

      navigation.navigate('DriverScreen',{
        screen:'OnlineScreen',
        params:riderData})
  }


    return(
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.viewCont}>

        
        <MapView style={{flex:1,}}
        
        // showsUserLocation={true}
        loadingEnabled={true}
        ref={mapRef}
        // showsTraffic={true}
        initialRegion={{
          latitude: 32.32,
          longitude: 71.25,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,}}
        region={{
        latitude:location.coords.latitude,
        longitude:location.coords.longitude,
        latitudeDelta:0.005,
        longitudeDelta:0.004
        }}

>
  { <Marker  coordinate={{latitude: location.coords.latitude,
      longitude:location.coords.longitude}} image={require('./assets/icons/map-marker-1.png')}  title='MyLocation' identifier='loc' description='My Current Location'/> }
</MapView>
        <Image source={require('./assets/icons/zoom.png')} style={{height:34,width:34,position:'absolute',right:20,bottom:190}} />
        <TouchableOpacity onPress={()=>recenter()}>
            <Image source={require('./assets/icons/recenter.png')} style={{height:34,width:34,position:'absolute',right:20,bottom:240}} />
        </TouchableOpacity>
          <Image source={require('./assets/icons/zoomout.png')}  style={{height:34,width:34,position:'absolute',right:20,bottom:140}} />
        </View>
        <TouchableOpacity style={styles.rbtn} onPress={() => goToOnlineScreen()}>
          <Text style={styles.rbtnTxt}>Go Online</Text>
        </TouchableOpacity>
        <View style={styles.drawerView}>
                <TouchableOpacity style={styles.openDrawerBtn} onPress={() => navigation.openDrawer()}>
                  <Image style={styles.openDrawerImage} source={require('../driver/assets/icons/hamburger-large.png')}/>
                </TouchableOpacity>
        </View>
      </GestureHandlerRootView>
    )
  }

  
const styles=StyleSheet.create({
  container:{
    flex:1
  },
  viewCont:{
    flex:1,

  },
  rbtn:{
    alignSelf:'center',
    width:250,
    height:50,
    borderRadius:50,
    color:"F1F1F1",
    backgroundColor:"#FF0000",
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
  rbtnTxt:{
    fontSize:18,
    fontWeight:'bold',
    color:"#FFFFFF"
  },
  drawerView: {
    position: 'absolute',
    left: 20,
    top: 20,
},
openDrawerBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 50/2,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
},
openDrawerImage:{
  width:35,
  height:35,
}

}
)