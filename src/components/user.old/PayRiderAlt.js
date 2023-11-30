import React, { useState, useEffect } from 'react';
import type {Node} from 'react';
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
  Alert,
  Modal,
  Pressable
} from 'react-native';

import { getDataAsyncStorage } from '../utils/LocalStorage';

const PayRiderAlt = ({route, navigation}) => {

    const [modalVisible, setModalVisible] = useState(false);

    const [fareCost, setFareCost] = useState()
    const [taxCost, setTaxCost] = useState()
    const [totalCost, setTotalCost] = useState()

    const [distance, setDistance] = useState("")
    const [duration, setDuration] = useState("")

    useEffect(() => {
        (async () => {

            const localDistance = await getDataAsyncStorage('distance');
            const localDuration = await getDataAsyncStorage('duration');

            setDistance(localDistance);
            setDuration(localDuration);

            const floatLocalDistance = parseFloat(localDistance);
            const totalFareCost = floatLocalDistance * 15;
            const totalTaxCost = totalFareCost / 10;
            const totalCost = totalFareCost + totalTaxCost;

            setFareCost(totalFareCost.toFixed(0));
            setTaxCost(totalTaxCost.toFixed(0));
            setTotalCost(totalCost.toFixed(0));
        })()
        
    }, [])

    return (
        <View style={showDriverProfileStyles.containerView}>
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }}
            >
                <View style={showDriverProfileStyles.modalViewContainer}>
                    <View style={showDriverProfileStyles.modelContentContainer}>
                        <View style={showDriverProfileStyles.modelIconImageContainer}>
                            <Image style={showDriverProfileStyles.modelIconImage} source={require('../../../assets/icons/note_48.png')}/>
                        </View>
                        <View style={showDriverProfileStyles.modelContentBreakdownContainer}>
                            <View style={showDriverProfileStyles.contentBreakdownContainer}>
                                <View style={showDriverProfileStyles.contentBreakdown}>
                                    <Text style={showDriverProfileStyles.breakdownTitle}>Fare Cost</Text>
                                    <Text style={showDriverProfileStyles.breakdownCost}>Rs. {fareCost}</Text>
                                </View>
                                <View style={showDriverProfileStyles.contentBreakdown}>
                                    <Text style={showDriverProfileStyles.breakdownTitle}>Tax</Text>
                                    <Text style={showDriverProfileStyles.breakdownCost}>Rs. {taxCost}</Text>
                                </View>
                                <View style={showDriverProfileStyles.contentBreakdown}>
                                    <Text style={[showDriverProfileStyles.breakdownTitle, {fontWeight: 'bold'}]}>Total</Text>
                                    <Text style={[showDriverProfileStyles.breakdownCost, {fontWeight: 'bold', color: '#41D37F'}]}>Rs. {totalCost}</Text>
                                </View>
                                <View style={showDriverProfileStyles.horizontalLineContainer}>
                                    <View style={showDriverProfileStyles.horizontalLine}></View>
                                </View>
                                <View style={showDriverProfileStyles.contentBreakdown}>
                                    <Text style={showDriverProfileStyles.breakdownTitle}>Kilometers</Text>
                                    <Text style={showDriverProfileStyles.breakdownCost}>{distance} Km</Text>
                                </View>
                                <View style={showDriverProfileStyles.contentBreakdown}>
                                    <Text style={showDriverProfileStyles.breakdownTitle}>Minutes</Text>
                                    <Text style={showDriverProfileStyles.breakdownCost}>{duration} minutes</Text>
                                </View>
                            </View>
                        </View>
                        <View style={showDriverProfileStyles.modelPayBtnContainer}>
                            <TouchableOpacity style={showDriverProfileStyles.PayBtnContainer} onPress={() => {
                                setModalVisible(!modalVisible)
                                navigation.navigate('RideSummary', 
                                {
                                    navigationOrigin: 'PayRiderAlt', 
                                    fareCost: fareCost, 
                                    taxCost: taxCost,
                                    totalCost: totalCost,
                                    distance: distance,
                                    duration: duration,
                                    rider_name: route.params.rider_name,
                                    rider_vehicle: route.params.rider_vehicle
                                })
                            }}>
                                <View style={showDriverProfileStyles.PayBtnViewContainer}>
                                    <Text style={showDriverProfileStyles.PayBtnText}>Pay Now</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={showDriverProfileStyles.driverProfileImageView}>
                <Image style={showDriverProfileStyles.driverProfileImage} source={require('../../../assets/profile/men_medium.jpg')} />
            </View>
            <View style={showDriverProfileStyles.driverPaymentView}>
                <Text style={showDriverProfileStyles.driverPaymentTitle}>Pay the following amount to the driver</Text>
                <Text style={showDriverProfileStyles.driverPayment}>PKR{totalCost}</Text>
            </View>
            <View style={showDriverProfileStyles.submitSummaryView}>
                <TouchableOpacity style={showDriverProfileStyles.submitSummaryBtn} onPress={() => setModalVisible(true)}>
                    <Text style={showDriverProfileStyles.submitSummaryTitle}>Pay Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const showDriverProfileStyles = StyleSheet.create({
    horizontalLineContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    horizontalLine: {
        height: 1,
        backgroundColor: 'grey',
        width: '80%'
    },
    containerView: {
        marginTop: 30
    },
    driverProfileImageView: {
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: 50,
        marginBottom: 50
    },
    driverProfileImage: {
        width: 275,
        height: 275,
        borderRadius: 275/2
    },
    driverPaymentView: {
    },
    driverPaymentTitle: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        color: 'black'
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
        marginTop: 100
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
    },
    modalViewContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'rgba(247, 247, 247, 0.7)',
    },
    modelContentContainer: {
        backgroundColor: '#FFFFFF',
        width: '80%',
        height: 400,
        marginTop: 150,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 100,
    },
    modelIconImageContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15
    },
    modelIconImage: {
        width: 40,
        height: 40,
    },
    modelContentBreakdownContainer: {
        marginTop: 15
    },
    contentBreakdown: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 15
    },
    breakdownTitle: {
        fontSize: 18,
        fontWeight: 'normal',
        color: 'black'
    },
    breakdownCost: {
        fontSize: 18,
        fontWeight: 'normal',
        color: 'black'
    },
    modelPayBtnContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    },
    PayBtnContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10,
        width: 140,
        height: 50,
        backgroundColor: '#41D37F',
        borderRadius: 25
    },
    PayBtnText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
})

export default PayRiderAlt;
