
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
  

const PayRider = ({route, navigation}) => {

    useEffect(() => {
        navigation.snapTo(1)
    }, [])


    return (
        <View style={showDriverProfileStyles.containerView}>
            <View style={showDriverProfileStyles.driverProfileImageView}>
                <Image style={showDriverProfileStyles.driverProfileImage} source={require('../../../assets/profile/men_medium.jpg')} />
            </View>
            <View style={showDriverProfileStyles.driverPaymentView}>
                <Text style={showDriverProfileStyles.driverPaymentTitle}>Pay the following amount to the driver</Text>
                <Text style={showDriverProfileStyles.driverPayment}>PKR494</Text>
            </View>
            <View style={showDriverProfileStyles.submitSummaryView}>
                <TouchableOpacity style={showDriverProfileStyles.submitSummaryBtn} onPress={() => Alert.alert("Paid")}>
                    <Text style={showDriverProfileStyles.submitSummaryTitle}>Pay Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const showDriverProfileStyles = StyleSheet.create({
    containerView: {
        marginTop: 30
    },
    driverProfileImageView: {
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'center',
        marginBottom: 50
    },
    driverProfileImage: {
        width: 200,
        height: 200,
        borderRadius: 200/2
    },
    driverPaymentView: {
    },
    driverPaymentTitle: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center'
    },
    driverPayment: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
        marginTop: 15
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
        backgroundColor: 'white',
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
        color: '#40D27D'
    }
})


export default PayRider;