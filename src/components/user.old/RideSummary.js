
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

import { getDataAsyncStorage } from "../utils/LocalStorage";
import { SnapLevels } from "../utils/BottomSheetSnapLevels";

const RideSummary = ({route, navigation}) => {

    const fareCost = route.params.fareCost;
    const taxCost = route.params.taxCost;
    const totalCost = route.params.totalCost;
    const distance = route.params.distance;
    const duration = route.params.duration;

    useEffect(() => {
        navigation.snapTo(SnapLevels.RideSummary);
    }, [])

    return (
        <View style={showDriverProfileStyles.containerView}>
            <View style={showDriverProfileStyles.driverDetailsTitleView}>
                <Text style={showDriverProfileStyles.driverDetailsName}>{route.params.rider_name}</Text>
                <Text style={showDriverProfileStyles.driverDetailsCarName}>{route.params.rider_vehicle}</Text>
            </View>
            <View style={showDriverProfileStyles.driverProfileImageView}>
                <Image style={showDriverProfileStyles.driverProfileImage} source={require('../../../assets/profile/men_medium.jpg')} />
                <Image style={showDriverProfileStyles.driverCarImage} source={require('../../../assets/show_car_profile/show_car_profile_238.png')} />
            </View>
            <View style={showDriverProfileStyles.totalSummaryContainerView}>
                <View style={showDriverProfileStyles.totalSummaryView}>
                    <View style={showDriverProfileStyles.summaryDetailsView}>
                        <Text style={showDriverProfileStyles.summaryDetailsTitle}>Fare Cost</Text>
                        <Text style={showDriverProfileStyles.summaryDetails}>Rs. {fareCost}</Text>
                    </View>
                    <View style={showDriverProfileStyles.summaryDetailsView}>
                        <Text style={showDriverProfileStyles.summaryDetailsTitle}>Tax</Text>
                        <Text style={showDriverProfileStyles.summaryDetails}>Rs. {taxCost}</Text>
                    </View>
                    <View style={showDriverProfileStyles.summaryDetailsView}>
                        <Text style={[showDriverProfileStyles.summaryDetailsTitle, showDriverProfileStyles.totalTitle]}>Total</Text>
                        <Text style={[showDriverProfileStyles.summaryDetails, showDriverProfileStyles.total]}>Rs. {totalCost}</Text>
                    </View>
                    <View style={showDriverProfileStyles.lineBreakView}></View>
                    <View style={showDriverProfileStyles.summaryDetailsView}>
                        <Text style={showDriverProfileStyles.summaryDetailsTitle}>Kilometers</Text>
                        <Text style={showDriverProfileStyles.summaryDetails}>{distance} km</Text>
                    </View>
                    <View style={showDriverProfileStyles.summaryDetailsView}>
                        <Text style={showDriverProfileStyles.summaryDetailsTitle}>Minutes</Text>
                        <Text style={showDriverProfileStyles.summaryDetails}>{duration} min</Text>
                    </View>
                </View>
            </View>
            <View style={showDriverProfileStyles.showStarsView}>
                <Image style={showDriverProfileStyles.showStarsImage} source={require('../../../assets/review_stars/star_filled_58.png')} />
                <Image style={showDriverProfileStyles.showStarsImage} source={require('../../../assets/review_stars/star_filled_58.png')} />
                <Image style={showDriverProfileStyles.showStarsImage} source={require('../../../assets/review_stars/star_filled_58.png')} />
                <Image style={showDriverProfileStyles.showStarsImage} source={require('../../../assets/review_stars/star_filled_58.png')} />
                <Image style={showDriverProfileStyles.showStarsImage} source={require('../../../assets/review_stars/star_empty_58.png')} />
            </View>
            <View style={showDriverProfileStyles.submitSummaryView}>
                <TouchableOpacity style={showDriverProfileStyles.submitSummaryBtn} onPress={() => {
                    navigation.popToTop()
                    navigation.goBack()
                }}>
                    <Text style={showDriverProfileStyles.submitSummaryTitle}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const showDriverProfileStyles = StyleSheet.create({
    containerView: {
        marginTop: 10
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
        marginBottom: 40
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
    totalSummaryContainerView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    totalSummaryView: {
        width: '85%',
        paddingTop: 10,
        paddingBottom: 10,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity:  0.17,
        shadowRadius: 2.54,
        elevation: 2
    },
    summaryDetailsView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 25,
        paddingRight: 25,
        marginTop: 7,
        marginBottom: 7
    },
    lineBreakView: {
        width: '80%',
        height: 1.4,
        backgroundColor: 'grey',
        marginLeft: 25
    },
    summaryDetailsTitle: {
        fontSize: 16,
        fontWeight: 'normal',
        color: 'black'
    },
    summaryDetails: {
        fontSize: 16,
        fontWeight: 'normal',
        color: 'black'
    },
    totalTitle: {
        color: '#40D27D',
        fontWeight: 'bold',
        fontSize: 17
    },
    total: {
        color: '#40D27D',
        fontWeight: 'bold',
        fontSize: 17
    },
    showStarsView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    showStarsImage: {
        width: 40,
        height: 40,
        paddingLeft: 25,
        paddingRight: 25
    },
    submitSummaryView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 30
    },
    submitSummaryBtn: {
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
    submitSummaryTitle: {
        fontSize: 20,
        fontWeight: '500',
        color: 'white'
    }
})
export default RideSummary;