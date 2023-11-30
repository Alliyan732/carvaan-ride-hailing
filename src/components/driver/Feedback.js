import * as React from 'react';
import {storeDataAsyncStorage,getDataAsyncStorage} from './utils/LocalStorage'
import { Image,TouchableOpacity,Button, StyleSheet, Text, View, TextComponent } from 'react-native';
import {
    BaseButton,
    GestureHandlerRootView
  } from 'react-native-gesture-handler';

export function Feedback({route,navigation}){
    const [rating,setRating] = React.useState(2)
    const [maxRating,setMaxRating] = React.useState([1,2,3,4,5])

    const {customerName,customerPic,dist,dur,cost,pickup,dropoff} = route.params

    
    
    const CustomRatingBar = () =>{
        const StarFilled=()=>{
            return(
                <Image style={styles.starImgStyle}
                        source={
                            require('./assets/images/star_filled.png')
                        } 
                        />
            )
        }
        const StarUnfilled=()=>{
            return(
                <Image style={styles.starImgStyle}
                        source={
                            require('./assets/images/star_corner.png')
                        } 
                        />
            )
        }
        return(
            <View style={styles.customRating}>
            {
                maxRating.map((item,key)=>{
                    return(
                        <TouchableOpacity 
                            activeOpacity={0.7}
                            key={item}
                            onPress={() => setRating(item)}>
                        {(item <= rating)?StarFilled():StarUnfilled()} 
                        
                        </TouchableOpacity>
                    )
                })

            }
            </View>
        )
    }

    const goToSummary = () =>{
        const stars = rating.toString()
        storeDataAsyncStorage("RATING",stars)
        navigation.navigate('DriverScreen',{
            screen:'DriverRideSummary',
            params:route.params},navigation.navigate('RootScreen')); 
    }
    return(
        <GestureHandlerRootView style={styles.container} >
            <View style={styles.container}>
                <Image source={{uri:customerPic}}  style={{width: 120, height: 120,borderRadius: 120/ 2 ,alignSelf:'center'}} />
                <Text style={styles.text}>How was your experience with {customerName} </Text>
                <View style={{padding:5,marginBottom:30}}><CustomRatingBar></CustomRatingBar></View>
                <View style={styles.btnContainer}>
                    
                    <TouchableOpacity style={styles.btn} onPress={() => goToSummary()}>
                        <Text style={styles.btnTxt}>Close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.gbtn} onPress={() => goToSummary()}>
                        <Text style={styles.gbtnTxt}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </GestureHandlerRootView>
    )
}


const styles=StyleSheet.create({
    btnContainer:{
        flexDirection:'row',
        justifyContent:'space-evenly',
    },
    container:{
      flex:1,
      marginHorizontal:8,
      borderColor:"#000"
    },
    text:{
        fontSize:24,
        color:"#000",
        padding:15,
        textAlign:'center'
    },
    boldText:{
        color:'#000',
        fontSize:28,
        fontWeight:'700',
    },
    btn:{
      width:142,
      height:57,
      borderRadius:50,
      color:"F1F1F1",
      backgroundColor:"#FFFFFF",
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
    btnTxt:{
      fontSize:18,
      fontWeight:'bold',
      color:"#40D27D"
    },
    gbtn:{
      width:142,
      height:57,
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
      color:"#FFF",
    },
    customRating:{
        justifyContent:'center',
        flexDirection:'row',
    },
    starImgStyle:{
        width:40,
        height:40,
        resizeMode:'cover',
        
    }
  
  }
  )