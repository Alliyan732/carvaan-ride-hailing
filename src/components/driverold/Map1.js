import * as React from 'react';
import { PermissionsAndroid,TouchableOpacity,Button, StyleSheet, Text, View, Dimensions,Image } from 'react-native';

import MapView,{Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';


// Importing Stack Screens 


export function Map1({route,navigation}){

    const {origin,destination} = route.params  
    const [flag,setFlag] = React.useState(false)



    const mapRef = React.useRef(null)
    
    //   Zooming and fitting to markers
    React.useEffect(()=>{
        if (!origin || !destination) return;
        mapRef.current.fitToSuppliedMarkers(['origin','destination'],{edgePadding:{top:80,right:50,bottom:100,left:50}}) 
        console.log('After fit to supplied marker');
        
        
    },[flag])
    
    const recenter=()=>{
      mapRef.current.fitToSuppliedMarkers(['origin','destination'],{edgePadding:{top:80,right:50,bottom:100,left:50}})  
      console.log('After fit to supplied marker');
    }
    
    const INITIAL_POSITION={
        latitude: origin.latitude,
        longitude: origin.longitude,
        latitudeDelta:0.005,
        longitudeDelta:0.005,
    }

    return(
      <View style={[styles.container,{height:'50%'}]}>
         <MapView style={styles.map}
         ref={mapRef}
        //  showsUserLocation={true}
        initialRegion={INITIAL_POSITION}
> 
 {origin &&  <Marker coordinate={origin} pinColor="#ff0000" title='Origin' identifier='origin' description='Origin Location'/>}
  {destination && <Marker coordinate={destination} pinColor="#2BCE70" title='Destination' identifier='destination' description='Destination'/>}
    {origin && destination && <MapViewDirections 
                origin={origin}
                destination={destination}
                // apikey={GOOGLE_MAPS_APIKEY}
                apikey='AIzaSyDqcYoZHkHcv14Q3vGAjIpJ0cc3Svnvd7Y'
                strokeWidth={5}
                strokeColor="#2BCE70"
                onReady={()=>setFlag(true)}
            />
        }        
        </MapView>
        <TouchableOpacity onPress={()=>recenter()}>
            <Image source={require('./assets/icons/recenter.png')} style={{height:34,width:34,position:'absolute',right:15,bottom:140}} />
        </TouchableOpacity>
        <View style={styles.drawerView}>
                <TouchableOpacity style={styles.openDrawerBtn} onPress={() => navigation.openDrawer()}>
                  <Image style={styles.openDrawerImage} source={require('../driver/assets/icons/hamburger-large.png')}/>
                </TouchableOpacity>
        </View>
        </View>
    )
  }

   
const styles=StyleSheet.create({
    container:{
      flex:1,
      height:'50%'
    },map:{
        height:'50%'
    },drawerView: {
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