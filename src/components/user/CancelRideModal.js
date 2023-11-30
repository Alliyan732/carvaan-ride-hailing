
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Modal } from "react-native";

const CancelRideModal = (params) => {


    const [modalVisible, setModalVisible] = useState(params.modalStatus);

    return (
        <View>
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }}
            >
                <View style={cancelRideStyles.modalViewContainer}>
                    <View style={cancelRideStyles.modelContentContainer}>
                        <View style={cancelRideStyles.modelIconImageContainer}>
                            <Image style={cancelRideStyles.modelIconImage} source={require('../../../assets/icons/alert_medium.png')}/>
                        </View>
                        <View style={cancelRideStyles.modalCancelContainer}>
                            <View style={cancelRideStyles.cancelWarningViewContainer}>
                                <View style={cancelRideStyles.CancelWarningViewTitle}>
                                    <Text style={cancelRideStyles.cancelWarningTitle}>Do you want to cancel this ride?</Text>
                                </View>
                                <View style={cancelRideStyles.CancelWarningViewDesc}>
                                    <Text style={cancelRideStyles.cancelWarningDesc}>make sure you want to cancel the ride.</Text>
                                </View>
                            </View>
                        </View>
                        <View style={cancelRideStyles.modelCancelBtnContainer}>
                            <TouchableOpacity style={cancelRideStyles.dontCancelOptionBtnContainer} onPress={() => {
                                setModalVisible(!modalVisible)
                            }}>
                                <View style={cancelRideStyles.dontcancelOptionView}>
                                    <Text style={cancelRideStyles.dontcancelOptionText}>No</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={cancelRideStyles.cancelOptionBtnContainer} onPress={() => {
                                setModalVisible(!modalVisible)
                            }}>
                                <View style={cancelRideStyles.cancelOptionView}>
                                    <Text style={cancelRideStyles.cancelOptionText}>Yes, Cancel</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const cancelRideStyles = StyleSheet.create({
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
        height: 300,
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
        fontWeight: 'normal'
    },
    breakdownCost: {
        fontSize: 18,
        fontWeight: 'normal'
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
    modalCancelContainer: {
        marginTop: 30,
        marginBottom: 30
    },
    cancelWarningViewContainer: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    CancelWarningViewTitle: {
        marginLeft: 12,
        marginRight: 12
    },
    cancelWarningTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    CancelWarningViewDesc: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20
    },
    cancelWarningDesc: {
        fontSize: 14,
        fontWeight: 'normal'
    },
    modelCancelBtnContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    dontCancelOptionBtnContainer: {
        width: 120,
        height: 45,
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        borderWidth: 3,
        borderColor: '#40D27D',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 3,
    },
    dontcancelOptionView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 7
    },
    dontcancelOptionText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#40D27D'
    },
    cancelOptionView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 7
    },
    cancelOptionBtnContainer: {
        width: 120,
        height: 45,
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        borderWidth: 3,
        borderColor: '#FF0000',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 3,
    },
    cancelOptionText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF0000'
    }
})

export default CancelRideModal;