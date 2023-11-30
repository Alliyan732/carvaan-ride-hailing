import { useState, useCallback, useEffect, useMemo } from "react";
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { FlatList } from "react-native-gesture-handler";

import { SnapLevels } from "../utils/BottomSheetSnapLevels";

import { BookRidesData, PaymentData, suggestedRideState } from "../utils/BookingRidesData";

import { auth, db } from "../../../config/firebase";
import { collection, doc, addDoc, setDoc } from "firebase/firestore/lite"; 


const Booking = ({route, navigation}) => {

    const [origin, setOrigin] = useState("")
    const [destinationLocation, setDestinationLocation] = useState("")

    const [suggestedRideCurrentState, SuggestedRideCurrentState] = useState(1)
    const [selectedRide, setSelectedRide] = useState(1);

    const [selectedPayment, setSelectedPayment] = useState(1);

    const [rideTypeName, setRideTypeName] = useState("Standard");
    const [selectedPaymentOption, setSelectedPaymentOption] = useState("VISA")

    useEffect(() => {
        navigation.snapTo(SnapLevels.Booking);

        setOrigin(route.params.origin);
        setDestinationLocation(route.params.destination);

        // setOrigin("Fake Location")
        // setDestinationLocation("Fake Location")
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => {
            setSelectedRide(item.id)
            setRideTypeName(item.ride_name);
        }}>
            <View style={bookingStyles.suggestedRideContainer}>
                <View style={[
                    bookingStyles.suggestedRideBox,
                    selectedRide == item.id ?
                    {
                        backgroundColor: suggestedRideState[1].suggested_ride_background_color,
                        borderColor: suggestedRideState[1].suggested_ride_border_color, 
                    }:
                    {
                        backgroundColor: suggestedRideState[0].suggested_ride_background_color,
                        borderColor: suggestedRideState[0].suggested_ride_border_color, 
                    }
                ]}>
                    <Text style={[
                        bookingStyles.suggestedRideTitle,
                        selectedRide == item.id ?
                        {
                            color: suggestedRideState[1].suggested_ride_foreground_color
                        }:
                        {
                            color: suggestedRideState[0].suggested_ride_foreground_color
                        }
                    ]}>{item.ride_name}</Text>
                    {/* <Text style={[
                        bookingStyles.suggestedRideCost,
                        {
                            color: suggestedRideState[suggestedRideCurrentState].suggested_ride_foreground_color
                        }
                    ]}>{item.ride_price}</Text> */}
                </View>
                <View style={bookingStyles.suggestedRideImageView}>
                    <Image style={bookingStyles.suggestedRideImage} source={item.ride_image}/>
                </View>
            </View>
        </TouchableOpacity>
    )

    const renderPaymentItem = ({item}) => (
        <TouchableOpacity style={bookingStyles.renderPaymentItemBtn} onPress={() => {
            setSelectedPayment(item.id);
            setSelectedPaymentOption(item.payment_title);
        }}>
            <View style={[
                bookingStyles.paymentMethods,
                selectedPayment == item.id ?
                {
                    backgroundColor: '#40D27D'
                }:
                {
                    backgroundColor: 'white'
                }
            ]}>
                <View style={bookingStyles.paymentView}>
                    <View style={bookingStyles.paymentImageView}>
                        <Image style={bookingStyles.paymentImage} source={item.payment_image}/>
                    </View>
                    <View style={bookingStyles.paymentContentView}>
                        <Text style={[
                            bookingStyles.paymentTitle,
                            selectedPayment == item.id ?
                            {
                                color: 'white',
                                fontWeight: 'bold'
                            }:
                            {
                                color: 'black',
                            }
                        ]}>{item.payment_title}</Text>
                        <Text style={[
                            bookingStyles.paymentDescription,
                            selectedPayment == item.id ?
                            {
                                color: 'white',
                                fontWeight: 'bold'
                            }:
                            {
                                color: 'black',
                            }
                        ]}>{item.payment_desc}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )

    return (
        <View style={bookingStyles.container}>
            <View style={bookingStyles.locationInfoContainer}>
                <View style={bookingStyles.visualsIconsContainer}>
                    <Image style={bookingStyles.dots} source={require('../../../assets/visual_icons/grey_dot_20.png')}/>
                    <Image style={bookingStyles.VerticalLine} source={require('../../../assets/visual_icons/black_line_50.png')}/>
                    <Image style={bookingStyles.dots} source={require('../../../assets/visual_icons/green_dot_20.png')}/>
                </View>
                <View style={bookingStyles.userLocationView}>
                    <View style={bookingStyles.originLocationView}>
                        <Text style={bookingStyles.originLocationText}>{origin}</Text>
                        <Image style={bookingStyles.originLocationIcon} source={require('../../../assets/icons/reset_48.png')}/>
                    </View>
                    <View style={bookingStyles.destinationLocationView}>
                        <TextInput editable={false} selectTextOnFocus={false} placeholder="Enter Destination" placeholderTextColor="black" style={bookingStyles.destinationLocationInput} value={destinationLocation} onChangeText={setDestinationLocation}/>
                    </View>
                </View>
            </View>
            <View style={bookingStyles.suggestedRidesContainerView}>
                <Text style={bookingStyles.suggestedRidesTitle}>Suggested Rides</Text>
                <View style={bookingStyles.suggestedRidesTypes}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={BookRidesData}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                    />
                </View>
            </View>
            <View style={bookingStyles.paymentMethodContainerView}>
                <Text style={bookingStyles.paymentMethodTitle}>Payment Method</Text>
                <View style={bookingStyles.paymentMethodItems}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={PaymentData}
                        keyExtractor={(item) => item.id}
                        renderItem={renderPaymentItem}
                    />
                </View>
            </View>
            <View style={bookingStyles.bookRideButtonView}>
                <TouchableOpacity style={bookingStyles.bookRideNowButton} onPress={() => {

                    const pickup_latitude = route.params.ride_pickup_location.latitude;
                    const pickup_longitude = route.params.ride_pickup_location.latitude;

                    const destination_latitude = route.params.ride_destination_location.latitude;
                    const destination_longitude = route.params.ride_destination_location.longitude;

                    const distance = route.params.distance;
                    const duration = route.params.duration;

                    const floatLocalDistance = parseFloat(distance);
                    const totalFareCost = floatLocalDistance * 15;
                    const totalTaxCost = totalFareCost / 10;
                    const totalCost = totalFareCost + totalTaxCost;

                    const month = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
                    
                    const today = new Date();
                    const getDate = String(today.getDate()).padStart(2, '0');
                    const getMonth = month[today.getMonth()];

                    const bookingDate = getDate + ' ' + getMonth;

                    (async () => {
                        try {
                            // FYfSqBU5JgSP2GUilJmz and mRzaVK6r1xcWGOsU5dcyzQG2wua2 will be same 
                            // because we will have single doc with unique id of the user.
                            // but changed for mocked data
                            await setDoc(doc(db, "Rides", "FYfSqBU5JgSP2GUilJmz"), {
                                CustomerId: "mRzaVK6r1xcWGOsU5dcyzQG2wua2",
                                Origin: origin,
                                Destination: destinationLocation,
                                Distance: distance,
                                Duration: duration,
                                BookingDate: bookingDate,
                                RideTypeName: rideTypeName,
                                PaymentOption: selectedPaymentOption,
                                RiderAccepted: '',
                                Cost: {
                                    FareCost: totalFareCost.toFixed(0),
                                    TaxCost: totalTaxCost.toFixed(0),
                                    TotalCost: totalCost.toFixed(0)
                                },
                                RidePickupLocation: {
                                    Latitude: pickup_latitude,
                                    Longitude: pickup_longitude
                                },
                                RideDestinationLocation: {
                                    Latitude: destination_latitude,
                                    Longitude: destination_longitude
                                },
                                riders: [ // USED for Testing: should pass empty array only
                                    {
                                        rider_id: "sSvnjkDUu7TYtZYCNs2NcQeQZvk1",
                                        rider_name: "Imran",
                                        rider_rating: 5,
                                        rider_rides: 112,
                                        rider_rides_duration: 2.2,
                                        rider_vehicle_name: "Corolla",
                                        rider_vehicle_registration: "BCS-025" 
                                    },
                                    {
                                        rider_id: "kQsMhPszxHNVerLOirGM9PGymwq1",
                                        rider_name: "Ali",
                                        rider_rating: 4,
                                        rider_rides: 110,
                                        rider_rides_duration: 1.4,
                                        rider_vehicle_name: "Honda",
                                        rider_vehicle_registration: "BCS-002" 
                                    },
                                ]
                            });
                    
                        } catch (error) {
                            console.log(error);
                        }
                    })();

                    navigation.navigate('SelectRide')
                }}>
                    <Text style={bookingStyles.bookNowText}>BOOK NOW</Text>
                </TouchableOpacity>
                {/* <View style={bookingStyles.selectDateView}>
                    <Image style={bookingStyles.calenderImage} source={require('../../../assets/visual_icons/calender_68.png')}/>
                </View> */}
            </View>
        </View>
    )
}

const bookingStyles = StyleSheet.create({
    container: {
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15
    },
    /* START: locationInfoContainer */
    locationInfoContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 25,
        paddingRight: 25
    },
    visualsIconsContainer: {
        marginTop: 4
    },
    dots: {
        width: 15,
        height: 15
    },
    VerticalLine: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 6,
        height: 30
    },
    userLocationView: {
        marginLeft: 20,
        width: '90%'
    },
    originLocationView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    originLocationText: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'normal'
    },
    originLocationIcon: {
        width: 25,
        height: 25
    },
    destinationLocationView: {
        marginTop: 20
    },
    destinationLocationInput: {
        borderLeftColor: '#40D27D',
        borderLeftWidth: 5,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        color: 'black',
        fontSize: 16,
        padding: 10,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity:  0.17,
        shadowRadius: 2.54,
        elevation: 1.5
    },
    /* START: suggestedRidesContainerView */
    suggestedRidesContainerView: {
        marginTop: 25
    },
    suggestedRideContainer: {
        marginLeft: 15,
        marginBottom: 5
    },
    suggestedRidesTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#828282'
    },
    suggestedRidesTypes: {
        marginTop: 20,
    },
    suggestedRideBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 140,
        height: 200,
        marginLeft: 25,
        borderWidth: 5,
        borderRadius: 15
    },
    suggestedRideTitle: {
        marginTop: 120,
        fontSize: 23,
        fontWeight: 'bold',
    },
    suggestedRideCost: {
        fontSize: 19,
        fontWeight: 'normal',
    },
    suggestedRideImageView: {
        position: 'absolute',
        marginTop: 40,
    },
    suggestedRideImage: {
        width: 180,
        height: 90
    },
    /* START: paymentMethodContainerView */
    paymentMethodContainerView: {
        marginTop: 15,
    },
    paymentMethodItems: {
        marginLeft: 20
    },
    paymentMethods: {
        marginTop: 15,
        marginBottom: 5,
        marginRight: 15,
        width: 160,
    },
    paymentMethodTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#828282'
    },
    paymentView: {
        display: 'flex',
        flexDirection: 'row',
        padding: 15,
        borderColor: '#40D27D',
        borderWidth: 3,
        borderRadius: 10
    },
    paymentImageView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    paymentTitle: {
        fontSize: 16,
        fontWeight: '300'
    },
    paymentDescription: {
        color: 'black',
        fontSize: 9,
        fontWeight: '300'
    },
    /* START: bookRideButtonView */
    bookRideButtonView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 30
    },
    bookRideNowButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '90%',
        height: 45,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity:  0.16,
        shadowRadius: 1.51,
        elevation: 3,
        borderRadius: 50,
        backgroundColor: '#40D27D'
    },
    bookNowText: {
        paddingTop: 7,
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white'
    },
    selectDateView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        width: 45,
        height: 45,
        borderRadius: 10,
        borderColor: '#40D27D',
        borderWidth: 4,
        backgroundColor: 'white',
        marginLeft: 20
    },
    calenderImage: {
        width: 30,
        height: 30
    },
    contentContainer: {
        backgroundColor: 'yellow'
    }
})

export default Booking;