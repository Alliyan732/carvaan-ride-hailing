
import React, { useState, useEffect } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert
} from 'react-native';

// const ridesType = [
//     {
//         id: 1,
//         carSticker: require('../../../assets/show_car_profile/show_car_profile_119.png')
//     },
//     {
//         id: 2,
//         carSticker: require('../../../assets/show_car_profile/show_car_profile_119.png')
//     },
//     {
//         id: 3,
//         carSticker: require('../../../assets/show_car_profile/show_car_profile_119.png')
//     }
// ]

import { auth, db } from "../../../config/firebase";
import { doc, getDoc } from "firebase/firestore/lite";


const SelectRide = ({route, navigation}) => {

    const [displayDriverList, setDisplayDriverList] = useState([])

    useEffect(() => {
        navigation.snapTo(6);

        const interval = setInterval(() => {
            (async () => {
                try {
                    // HARDCODED ID.. Should be changed to the UserUID
                    const docRef = doc(db, "Rides", "FYfSqBU5JgSP2GUilJmz");
                    const docSnap = await getDoc(docRef);
            
                    if (docSnap.exists()) {
                        console.log("Document data:", docSnap.data().riders);
                        setDisplayDriverList(docSnap.data().riders);
                    } else {
                        console.log("No such document!");
                    }
            
                } catch (error) {
                    console.log(error);
                }
            })();

        }, 30000);

        return () => clearInterval(interval);

    }, [])

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => {navigation.navigate('ConfirmRide', {rider_data: item})}}>
            <View style={displayDriverListStyles.carListView}>
                <View style={displayDriverListStyles.carStickerView}>
                    <Image style={displayDriverListStyles.carStickerImage} source={require('../../../assets/show_car_profile/show_car_profile_119.png')} />
                </View>
                <View style={displayDriverListStyles.carDetailsView}>
                    <Text style={displayDriverListStyles.carDetailsName}>{item.rider_name}</Text>
                    {/* <Text style={displayDriverListStyles.carDetailsPrice}>Rs. {item.price}</Text> */}
                    <View style={displayDriverListStyles.carDetailsStarsView}>
                        {
                            [...Array(parseInt(item.rider_rating))].map((e, i) => <Image key={i} style={displayDriverListStyles.carDetailsStars} source={require('../../../assets/review_stars/star_filled_20.png')} />)
                        }
                        {/* {
                            [...Array(5 - )].map((e, i) => <Image key={i} style={displayDriverListStyles.carDetailsStars} source={require('../../../assets/review_stars/star_empty_20.png')} /> />)
                        } */}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={displayDriverListStyles.container}>
        <View style={displayDriverListStyles.displayDriverListView}>
            <FlatList
                keyExtractor={(item) => item.rider_id}
                data={displayDriverList}
                renderItem={renderItem}
                contentContainerStyle={{ padding: 1, paddingBottom: 5 }}
            />
        </View>
        </View>
    );
}

const displayDriverListStyles = StyleSheet.create({
    displayDriverListStyles: {

    },
    displayDriverListView: {
        marginLeft: 15,
        marginRight: 15,
    },
    carListView: {
        display: 'flex',
        flexDirection: 'row',
        height: 120,
        marginTop: 15,
        padding: 20,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    carStickerView: {
    },
    carStickerImage: {
        width: 170,
        height: 70
    },
    carDetailsView: {
        marginLeft: 20
    },
    carDetailsName: {
        fontSize: 22,
        color: 'black',
        fontWeight: '500'
    },
    carDetailsPrice: {
        fontSize: 20,
        fontWeight: 'normal',
        color: '#40D27D'
    },
    carDetailsStarsView: {
        display: 'flex',
        flexDirection: 'row'
    },
    carDetailsStars: {
        width: 30,
        height: 30
    }
})

export default SelectRide;