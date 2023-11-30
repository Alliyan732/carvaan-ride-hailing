
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";

import { getDataAsyncStorage } from "../utils/LocalStorage";
import { SnapLevels } from "../utils/BottomSheetSnapLevels";

const ProgressState = [
    {
        progress_status_title: 'Ride in Progress',
        progress_ride_button_text: 'Cancel Ride',
        progress_ride_button_fill_color: '#FFFFFF',
        progress_ride_button_text_color: '#FF0000',
        progress_ride_button_border_color: '#FF0000' 
    },
    {
        progress_status_title: 'Ride Ended',
        progress_ride_button_text: 'End Ride',
        progress_ride_button_fill_color: '#3FD17D',
        progress_ride_button_text_color: '#FFFFFF',
        progress_ride_button_border_color: '#FFFFFF' 
    }
]

const InProgress = ({route, navigation}) => {

    const [reachedDestination, setReachedDestination] = useState(1)

    const [origin, setOrigin] = useState("")
    const [destination, setDestination] = useState("")
    const [distance, setDistance] = useState("")
    const [duration, setDuration] = useState("")

    useEffect(() => {
        navigation.snapTo(SnapLevels.InProgress);

        setOrigin(route.params.origin);
        setDestination(route.params.destination);
        setDistance(route.params.distance);
        setDuration(route.params.duration);

        // (async () => {
        //     const localOrigin = await getDataAsyncStorage('origin');
        //     const localDestination = await getDataAsyncStorage('destination');
        //     const localDistance = await getDataAsyncStorage('distance');
        //     const localDuration = await getDataAsyncStorage('duration');

        //     setOrigin(localOrigin);
        //     setDestination(localDestination);
        //     setDistance(localDistance);
        //     setDuration(localDuration);
        // })()

    }, [])

    
    return (
        <View style={inProgressStyles.container}>
            <View style={inProgressStyles.InProgressTextContainer}>
                <Text style={inProgressStyles.InProgressText}>{ProgressState[reachedDestination].progress_status_title}</Text>
            </View>
            <View style={inProgressStyles.rideApproxWaitingContainer}>
                <View style={inProgressStyles.rideApproxContainer}>
                    <View style={inProgressStyles.IconContainer}>
                        <Image style={inProgressStyles.Icon} source={require('../../../assets/icons/clock_24.png')}/>
                    </View>
                    <View style={inProgressStyles.TextContainer}>
                        <Text style={inProgressStyles.approxText}>{duration} min</Text>
                    </View>
                </View>
                <View style={inProgressStyles.dotIconContainer}>
                    <Image style={inProgressStyles.dotIcon} source={require('../../../assets/icons/black_dot_20.png')}/>
                </View>
                <View style={inProgressStyles.rideApproxContainer}>
                    <View style={inProgressStyles.IconContainer}>
                        <Image style={inProgressStyles.Icon} source={require('../../../assets/icons/address_24.png')}/>
                    </View>
                    <View style={inProgressStyles.TextContainer}>
                        <Text style={inProgressStyles.approxText}>{distance} km</Text>
                    </View>
                </View>
            </View>
            <View style={inProgressStyles.userProfileInfoContainer}>
                <View style={inProgressStyles.userProfileImageContainer}>
                    <Image style={inProgressStyles.userProfileImage} source={{uri: route.params.rider_profilepic}}/>
                </View>
                <View style={inProgressStyles.userProfileDetailsContainer}>
                    <Text style={inProgressStyles.userProfileDetailsName}>{route.params.rider_name}</Text>
                    <Text style={inProgressStyles.userProfileDetailsVehicle}>{route.params.rider_vehicle}</Text>
                    <Text style={inProgressStyles.userProfileDetailsTimeInfo}>Ride will arrive in approx {duration} min</Text>
                </View>
            </View>
            <View style={inProgressStyles.horizontalLineContainer}></View>
            <View style={inProgressStyles.ridesDetailsContainer}>
                <View style={inProgressStyles.rideDetailsTitleContainer}>
                    <Text style={inProgressStyles.rideTitle}>Ride Details</Text>
                </View>
                <View style={inProgressStyles.rideDetailsInfoContainer}>
                    <View style={inProgressStyles.rideIconContainer}>
                        <Image style={inProgressStyles.rideIcon} source={require('../../../assets/icons/black_circle_15.png')} />
                    </View>
                    <View style={inProgressStyles.rideDetailsTextContainer}>
                        <Text style={inProgressStyles.rideDetailsTitleText}>Dropoff</Text>
                        <Text style={inProgressStyles.rideDetailsDescText}>{destination}</Text>
                    </View>
                </View>
            </View>
            <View style={inProgressStyles.horizontalLineContainer}></View>
            <View style={inProgressStyles.buttonsContainer}>
                <TouchableOpacity style={[
                    inProgressStyles.cancelRideBtn, 
                    {
                        backgroundColor: ProgressState[reachedDestination].progress_ride_button_fill_color, 
                        borderColor: ProgressState[reachedDestination].progress_ride_button_border_color,
                        shadowColor: ProgressState[reachedDestination].progress_ride_button_border_color
                    }
                ]} onPress={() => {
                    navigation.navigate('PayRiderAlt', {
                        rider_name: route.params.rider_name,
                        rider_vehicle: route.params.rider_vehicle,
                        rider_profilepic: route.params.rider_profilepic 
                    })
                }}>
                    <View style={inProgressStyles.cancelRideBtnContainer}>
                        <Text style={[
                            inProgressStyles.cancelRideBtnText, 
                            {
                                color: ProgressState[reachedDestination].progress_ride_button_text_color
                            }
                        ]}>{ProgressState[reachedDestination].progress_ride_button_text}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const inProgressStyles = StyleSheet.create({
    container: {
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15
    },
    /* START: InProgress */
    InProgressTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    InProgressText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#40D27D'
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
    dotIconContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center'
    },
    dotIcon: {
        width: 10,
        height: 10
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
    cancelRideBtn: {
        width: '90%',
        height: 50,
        borderRadius: 50,
        borderWidth: 1.5,
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
    },
})

export default InProgress;