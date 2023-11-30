
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";

import {getDataAsyncStorage} from '../utils/LocalStorage';
import { SnapLevels } from "../utils/BottomSheetSnapLevels";

const waitingStatus = [
    {
        start_ride_background_color: '#F1F1F1',
        start_ride_foreground_color: '#878787',
        start_ride_arrow_image: require('../../../assets/icons/arrow_grey_24.png')
    },
    {
        start_ride_background_color: '#40D27E',
        start_ride_foreground_color: '#FFFFFF',
        start_ride_arrow_image: require('../../../assets/icons/arrow_green_24.png')
    },
]

const WaitingRider = ({route, navigation}) => {

    const [origin, setOrigin] = useState("")
    const [destination, setDestination] = useState("")
    const [distance, setDistance] = useState("")
    const [duration, setDuration] = useState("")

    const [status, setStatus] = useState(1)

    useEffect(() => {
        navigation.snapTo(SnapLevels.WaitingRider);

        (async () => {
            const localOrigin = await getDataAsyncStorage('origin');
            const localDestination = await getDataAsyncStorage('destination');
            const localDistance = await getDataAsyncStorage('distance');
            const localDuration = await getDataAsyncStorage('duration');

            setOrigin(localOrigin);
            setDestination(localDestination);
            setDistance(localDistance);
            setDuration(localDuration);

        })();

    }, [])

    return (
        <View style={waitingRiderStyles.container}>
            <View style={waitingRiderStyles.userProfileInfoContainer}>
                <View style={waitingRiderStyles.userProfileImageContainer}>
                    <Image style={waitingRiderStyles.userProfileImage} source={{uri: route.params.rider_profilepic}}/>
                </View>
                <View style={waitingRiderStyles.userProfileDetailsContainer}>
                    <Text style={waitingRiderStyles.userProfileDetailsName}>{route.params.rider_name}</Text>
                    <Text style={waitingRiderStyles.userProfileDetailsVehicle}>{route.params.rider_vehicle}</Text>
                    <Text style={waitingRiderStyles.userProfileDetailsTimeInfo}>Ride will arrive in approx {duration} min</Text>
                </View>
            </View>
            <View style={waitingRiderStyles.horizontalLineContainer}></View>
            <View style={waitingRiderStyles.rideApproxWaitingContainer}>
                <View style={waitingRiderStyles.rideApproxContainer}>
                    <View style={waitingRiderStyles.IconContainer}>
                        <Image style={waitingRiderStyles.Icon} source={require('../../../assets/icons/clock_24.png')}/>
                    </View>
                    <View style={waitingRiderStyles.TextContainer}>
                        <Text style={waitingRiderStyles.approxText}>{duration} min</Text>
                    </View>
                </View>
                <View style={waitingRiderStyles.verticalLineContainer}></View>
                <View style={waitingRiderStyles.rideApproxContainer}>
                    <View style={waitingRiderStyles.IconContainer}>
                        <Image style={waitingRiderStyles.Icon} source={require('../../../assets/icons/address_24.png')}/>
                    </View>
                    <View style={waitingRiderStyles.TextContainer}>
                        <Text style={waitingRiderStyles.approxText}>{distance} km</Text>
                    </View>
                </View>
            </View>
            <View style={waitingRiderStyles.horizontalLineContainer}></View>
            <View style={waitingRiderStyles.ridesDetailsContainer}>
                <View style={waitingRiderStyles.rideDetailsTitleContainer}>
                    <Text style={waitingRiderStyles.rideTitle}>Ride Details</Text>
                </View>
                <View style={waitingRiderStyles.rideDetailsInfoContainer}>
                    <View style={waitingRiderStyles.rideIconContainer}>
                        <Image style={waitingRiderStyles.rideIcon} source={require('../../../assets/icons/black_circle_15.png')} />
                    </View>
                    <View style={waitingRiderStyles.rideDetailsTextContainer}>
                        <Text style={waitingRiderStyles.rideDetailsTitleText}>Pickup</Text>
                        <Text style={waitingRiderStyles.rideDetailsDescText}>{origin}</Text>
                    </View>
                </View>
                <View style={waitingRiderStyles.rideDetailsInfoContainer}>
                    <View style={waitingRiderStyles.rideIconContainer}>
                        <Image style={waitingRiderStyles.rideIcon} source={require('../../../assets/icons/black_circle_15.png')} />
                    </View>
                    <View style={waitingRiderStyles.rideDetailsTextContainer}>
                        <Text style={waitingRiderStyles.rideDetailsTitleText}>Dropoff</Text>
                        <Text style={waitingRiderStyles.rideDetailsDescText}>{destination}</Text>
                    </View>
                </View>
            </View>
            <View style={waitingRiderStyles.horizontalLineContainer}></View>
            <View style={waitingRiderStyles.buttonsContainer}>
                <TouchableOpacity disabled={status == 0 ? true : false} style={[waitingRiderStyles.startRideBtn, {backgroundColor: waitingStatus[status].start_ride_background_color}]} onPress={() => {
                    navigation.navigate('InProgress', 
                    {
                        navigationOrigin: 'WaitingRider',
                        origin: origin,
                        destination: destination,
                        distance: distance,
                        duration: duration,
                        rider_name: route.params.rider_name,
                        rider_vehicle: route.params.rider_vehicle,
                        rider_profilepic: route.params.rider_profilepic 
                    })
                }}>
                    <View style={waitingRiderStyles.startRideBtnContainer}>
                        <View style={waitingRiderStyles.startRideBtnIconContainer}>
                            <Image style={waitingRiderStyles.startRideBtnIcon} source={waitingStatus[status].start_ride_arrow_image}/>
                        </View>
                        <View style={waitingRiderStyles.startRideTextContainer}>
                            <Text style={[waitingRiderStyles.startRideBtnText, {color: waitingStatus[status].start_ride_foreground_color}]}>Start Ride</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={waitingRiderStyles.cancelRideBtn} onPress={() => {
                    navigation.navigate({
                        name: 'HomeScreen',
                        params: { cancelled: 'cancelled' },
                        merge: true,
                    })
                }}>
                    <View style={waitingRiderStyles.cancelRideBtnContainer}>
                        <Text style={waitingRiderStyles.cancelRideBtnText}>Cancel Ride</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const waitingRiderStyles = StyleSheet.create({
    container: {
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15
    },
    /* START: User Info */
    userProfileInfoContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: 20
    },
    userProfileImageContainer: {},
    userProfileImage: {
        width: 75,
        height: 75,
        borderRadius: 75/2
    },
    userProfileDetailsContainer: {
        marginLeft: 20
    },
    userProfileDetailsName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black'
    },
    userProfileDetailsVehicle: {
        fontSize: 18,
        fontWeight: 'normal',
        color: 'black'
    },
    userProfileDetailsTimeInfo: {
        fontSize: 14,
        fontWeight: 'normal',
        color: 'grey'
    },
    /* START: Horizontal Line*/
    horizontalLineContainer: {
        height: 1,
        width: '100%',
        backgroundColor: 'grey',
        marginTop: 5,
        marginBottom: 5
    },
    /* START: Vertical Line*/
    verticalLineContainer: {
        width: 1,
        height: '100%',
        backgroundColor: 'grey',
    },
    /* START: Ride Info */
    rideApproxWaitingContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
        marginBottom: 20
    },
    rideApproxContainer: {
        padding: 30,
    },
    rideApproxContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    approxText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 15
    },
    /* START: Ride Details */
    ridesDetailsContainer: {
        marginTop: 10,
        marginBottom: 10
    },
    rideDetailsTitleContainer: {},
    rideTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black'
    },
    rideDetailsInfoContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 15,
    },
    rideIconContainer: {
        marginLeft: 5,
        marginTop: 10
    },
    rideIcon: {
        width: 20,
        height: 20
    },
    rideDetailsTextContainer: {
        marginLeft: 30
    },
    rideDetailsTitleText: {
        fontSize: 18,
        fontWeight: 'normal',
        color: 'black'
    },
    rideDetailsDescText: {
        fontSize: 16,
        fontWeight: 'normal',
        color: 'grey'
    },
    /* START: Start Ride Btn */
    buttonsContainer: {
        marginTop: 30,
        marginBottom: 10,
        marginLeft: 30
    },
    startRideBtn: {
        width: '90%',
        height: 50,
        borderColor: 'grey',
        borderRadius: 50,
        marginBottom: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    startRideBtnContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    startRideBtnIconContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 40/2,
        backgroundColor: '#FFFFFF',
        marginLeft: 5,
        marginTop: 5
    },
    startRideBtnIcon: {
        marginTop: 7
    },
    startRideTextContainer: {
        marginLeft: 50,
        marginTop: 12
    },
    startRideBtnText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    cancelRideBtn: {
        width: '90%',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 50,
        borderWidth: 1.5,
        borderColor: '#FF0000',
        shadowColor: "#FF0000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    cancelRideBtnContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    cancelRideBtnText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF0000'
    },
})

export default WaitingRider;