import * as React from 'react';
import {storeDataAsyncStorage,getDataAsyncStorage} from './utils/LocalStorage'
import { Modal,Image,TouchableOpacity, StyleSheet, Text, View, Alert, DevSettings } from 'react-native';
import {
  GestureHandlerRootView
} from 'react-native-gesture-handler';



export default function RideSummary({route}){
  const [rating,setRating] = React.useState(3)
  const [maxRating,setMaxRating] = React.useState([1,2,3,4,5])
  const {customerName,customerPic,dist,dur,cost,pickup,dropoff} = route.params
  
  

  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  console.log('Data Time'+dateTime);
   
  
 
console.log(dateTime)
  

  React.useEffect(()=>
  async ()=>{
    try{
      const stars = await getDataAsyncStorage('RATING');
      // Setting up the fetched data in state vars
      setRating(stars)
    }  
    catch(e){
      console.log('Error while reading RiderData from AsyncStrg '+e); 
    } 
  }
  ,[rating])

    const CustomRatingBar = () =>{
        const StarFilled=()=>{
            return(
                <Image style={{width:21,height:21}}
                        source={
                            require('./assets/images/star_filled.png')
                        } 
                        />
            )
        }
        const StarUnfilled=()=>{
            return(
                <Image style={{width:21,height:21}}
                        source={
                            require('./assets/images/star_corner.png')
                        } 
                        />
            )
        }
        return(
            <View style={{flexDirection:'row'}}>
            {
                maxRating.map((item,key)=>{

                  return(

                        <View style={{}} key={item}>
                            {
                            (item <= rating)?StarFilled():StarUnfilled()} 
                        </View>
                        
                    )
                })

            }
            </View>
        )
    }
    return(
  <GestureHandlerRootView style={styles.container}>
    <View style={styles.viewCont}>
        <Text style={styles.bldTxt}>{dateTime}</Text>
        <Text style={styles.greyTxt}>Ride to {dropoff}</Text>
        
        <View style={styles.hr}></View>
        <View style={styles.cont1}>
            <View style={styles.cont2}>
                <Text style={styles.greyTxt}>Earnings</Text>
                <Text style={styles.miniBldTxt}>PKR{cost}</Text>
            </View>
                <View style={styles.rhr}></View>
            <View style={styles.cont2}>
                <Text style={styles.greyTxt}>Ride Time</Text>
                <Text style={styles.miniBldTxt}>{dur}min</Text>
            </View>
                <View style={styles.rhr}></View>
            <View style={styles.cont2}>
                <Text style={styles.greyTxt}>Distance</Text>
                <Text style={styles.miniBldTxt}>{dist}KM</Text> 
            </View>
        </View>
        <View style={{margin:10,marginBottom:15}}>
            <View style={styles.rInfo}>
                <View style={styles.cont4}>
                    <View style={styles.cDot}></View>
                </View>
                <View style={styles.cont3}>
                    <Text style={styles.dtxt}>{pickup}</Text>
                    <Text style={styles.gTxt}>11:16 PM</Text>
                </View>
            </View>
            <View style={styles.rInfo}>
                <View style={styles.cont4}>
                    <View style={styles.cgDot}></View>
                </View>
                <View style={styles.cont3}>
                    <Text style={styles.dtxt}>{dropoff}</Text>
                    <Text style={styles.gTxt}>11:36 PM</Text>
                </View>
            </View>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginHorizontal:20}}>
            <View style={{}}>
                <Text style={{color:'#000',fontSize:18,fontWeight:'500',paddingHorizontal:10}}>{customerName}</Text>
                <View style={{flexDirection:'row',padding:10}}>
                    <Text style={[styles.dtxt,{marginRight:20}]}>Your Rating</Text>
                    <CustomRatingBar ></CustomRatingBar>
                </View>
            </View>
            <Image source={{uri:customerPic}}  style={{width: 80, height: 80,borderRadius: 80/ 2}} />
        </View>
        <View style={styles.hr}></View>
        <View style={styles.earningBreakdown}>
            <Text style={[styles.bldTxt,{alignSelf:'flex-start'}]}>Earnings Breakdown</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between',paddingRight:10,paddingVertical:10}}>
                <View >
                    <Text style={styles.mBTxt}>Time</Text>
                    <Text style={[styles.gTxt,{paddingTop:5}]}>{dur} min X PKR 20</Text>
                </View>
                <Text style={styles.pTxt}>PKR200</Text>
            </View>
            <View style={styles.hr1}></View>
            <View style={{flexDirection:'row',justifyContent:'space-between',paddingRight:10,paddingVertical:10}}>
                <View >
                    <Text style={styles.mBTxt}>Distance</Text>
                    <Text style={[styles.gTxt,{paddingTop:5}]}>{dist}km X PKR 20</Text>
                </View>
                <Text style={styles.pTxt}>PKR200</Text>
            </View>
            <View style={styles.hr1}></View>
            <View style={{flexDirection:'row',justifyContent:'space-between',paddingRight:10,paddingVertical:10}}>
                    <Text style={styles.mBTxt}>Total</Text>
                <Text style={styles.pTxt}>PKR{cost}</Text>
            </View>
        </View>
    </View> 
  </GestureHandlerRootView>
    )
}

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
      paddingTop:10,
      marginTop:3,
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
      marginVertical:10,
      alignSelf:'center'
    },
    hr1:{
        borderWidth:0.5,
        height:0.5,
        width:'100%',
        backgroundColor:"#D1CCCC",
        borderColor:"#D1CCCC",
        marginHorizontal:30,
        alignSelf:'center'
      },
    cont1:{
      flexDirection:'row',
      justifyContent:'space-around',
      marginVertical:10
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
      padding:5,
      alignSelf:'center'
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
      fontSize:13,
      color:"#8B8989",
      paddingBottom:3
    },
    cont3:{
      padding:4,
      flexBasis:"80%"
    },
    cont4:{
      flexBasis:"20%",
      alignItems:'center'
    },
    earningBreakdown:{
        flex:1,
        width:'90%',
        alignSelf:'flex-start',
        marginHorizontal:15
    },
    pTxt:{
        color:"#000",
        fontWeight:'500',
        fontSize:15
    },
    mBTxt:{
        color:"#000",
        fontSize:15,
        fontWeight:'500'
    }
})