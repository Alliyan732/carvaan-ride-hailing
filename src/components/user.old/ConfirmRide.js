
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

import { SnapLevels } from "../utils/BottomSheetSnapLevels";

import { auth, db } from "../../../config/firebase";
import { doc, updateDoc } from "firebase/firestore/lite";

const ConfirmRide = ({route, navigation}) => {

    useEffect(() => {
        navigation.snapTo(SnapLevels.ConfirmRide)

        console.log(route.params.rider_data.rider_name);
        console.log(route.params.rider_data.rider_vehicle_name);
    }, [])

    return (
        <View style={showDriverProfileStyles.containerView}>
            <View style={showDriverProfileStyles.driverDetailsTitleView}>
                <Text style={showDriverProfileStyles.driverDetailsName}>{route.params.rider_data.rider_name}</Text>
                <Text style={showDriverProfileStyles.driverDetailsCarName}>{route.params.rider_data.rider_vehicle_name}</Text>
            </View>
            <View style={showDriverProfileStyles.driverProfileImageView}>
                <Image style={showDriverProfileStyles.driverProfileImage} source={require('../../../assets/profile/men_medium.jpg')} />
                <Image style={showDriverProfileStyles.driverCarImage} source={require('../../../assets/show_car_profile/show_car_profile_238.png')} />
            </View>
            <View style={showDriverProfileStyles.driverLicensePlateView}>
                <View style={showDriverProfileStyles.driverLicenseBoxView}>
                    <Text style={showDriverProfileStyles.driverLicense}>{route.params.rider_data.rider_vehicle_registration}</Text>
                </View>
            </View>
            <View style={showDriverProfileStyles.safetyInfoView}>
                <Text style={showDriverProfileStyles.safetyInfo}>
                    Safety First - Make sure you confirm the license plate and your driver before getting in
                </Text>
            </View>
            <View style={showDriverProfileStyles.driverDrivesDetailsView}>
                <View style={showDriverProfileStyles.driverRidesViews}>
                    <Text style={showDriverProfileStyles.ridesDetails}>{route.params.rider_data.rider_rides}</Text>
                    <Text style={showDriverProfileStyles.ridesDetailsTitle}>Rides</Text>
                </View>
                <View style={showDriverProfileStyles.driverRidesViews}>
                    <Text style={showDriverProfileStyles.ridesDetails}>{route.params.rider_data.rider_rating}</Text>
                    <Text style={showDriverProfileStyles.ridesDetailsTitle}>Rating</Text>
                </View>
                <View style={showDriverProfileStyles.driverRidesViews}>
                    <Text style={showDriverProfileStyles.ridesDetails}>{route.params.rider_data.rider_rides_duration}</Text>
                    <Text style={showDriverProfileStyles.ridesDetailsTitle}>Years</Text>
                </View>
            </View>
            <View style={showDriverProfileStyles.confirmDriverView}>
                <TouchableOpacity style={showDriverProfileStyles.confirmDriverBtn} onPress={() => {
                    

                    (async () => {
                        try {
                            const docRef = doc(db, "Rides", "FYfSqBU5JgSP2GUilJmz");
                            
                            await updateDoc(docRef, {
                                RiderAccepted: route.params.rider_data.rider_id
                            });

                            navigation.navigate('WaitingRider', {
                                rider_name: route.params.rider_data.rider_name,
                                rider_vehicle: route.params.rider_data.rider_vehicle_name
                            })
                    
                        } catch (error) {
                            console.log(error);
                        }
                    })();

                }}>
                    <Text style={showDriverProfileStyles.confirmDriverText}>Confirm Driver</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const showDriverProfileStyles = StyleSheet.create({
    containerView: {
        marginTop: 15,
        marginLeft: 5,
        marginRight: 5
    },
    driverDetailsTitleView: {
    },
    driverDetailsName: {
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000'
    },
    driverDetailsCarName: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'grey'
    },
    driverProfileImageView: {
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 50
    },
    driverProfileImage: {
        width: 200,
        height: 200,
        borderRadius: 200/2
    },
    driverCarImage: {
        position: 'absolute',
        marginTop: 130,
        width: 250,
        height: 100
    },
    driverLicensePlateView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center',
        marginBottom: 20,
    },
    driverLicenseBoxView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 15,
        width: '50%',
        height: 60,
        borderRadius: 2,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity:  0.16,
        shadowRadius: 1.51,
        elevation: 2,
    },
    driverLicense: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'green'
    },
    safetyInfoView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 15,
        paddingLeft: 45,
        paddingRight: 45
    },
    safetyInfo: {
        textAlign: 'center',
        fontSize: 14,
        color: 'black'
    },
    driverDrivesDetailsView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 5
    },
    ridesDetails: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'
    },
    ridesDetailsTitle: {
        fontSize: 14,
        fontWeight: 'normal',
        color: 'black',
        textAlign: 'center'
    },
    confirmDriverView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 30
    },
    confirmDriverBtn: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#40D27D',
        width: '80%',
        height: 50,
        borderRadius: 25,
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity:  0.20,
        shadowRadius: 5.62,
        elevation: 8
    },
    confirmDriverText: {
        fontSize: 20,
        fontWeight: '500',
        color: 'white'
    }
})

export default ConfirmRide;