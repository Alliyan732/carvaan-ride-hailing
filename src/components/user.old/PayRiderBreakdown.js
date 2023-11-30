
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";

const PayRiderBreakdown = ({route, navigation}) => {

    useEffect(() => {
        navigation.snapTo(1)
    }, [])


    return (
        <View style={selectRideStyles.container}>
            <Text>Select Screen</Text>
        </View>
    );
}

const selectRideStyles = StyleSheet.create({
    container: {
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15
    }
})

export default PayRiderBreakdown;