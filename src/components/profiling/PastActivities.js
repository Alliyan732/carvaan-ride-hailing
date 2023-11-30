
import React, { useState, useEffect, useLayoutEffect } from "react";
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


import {auth, db} from '../../../config/firebase';
import { doc, getDoc } from "firebase/firestore/lite";

import {currentUser, currentRide} from '../user/CurrentUser';


const PastActivities = ({route, navigation}) => {

  const [bookingDate, setBookingDate] = useState("01 JAN");
  const [totalCost, setTotalCost] = useState("0");
  const [pickupLocation, setPickupLocation] = useState("Pickup Location");
  const [destinationLocation, setDestinationLocation] = useState("Destination Location");

  const getPastActivities = async (UserUID) => {
    try {
      const docRef = doc(db, "Rides", UserUID);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        setBookingDate(docSnap.data().BookingDate);
        setTotalCost(docSnap.data().Cost.TotalCost);
        setPickupLocation(docSnap.data().Origin);
        setDestinationLocation(docSnap.data().Destination);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
  
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

    getPastActivities(currentRide);

  });

  return (
    <View style={pastActivitiesStyles.container}>
      <View style={pastActivitiesStyles.titlebarView}>
        <TouchableOpacity style={pastActivitiesStyles.backBtnContainer} onPress={() => {
          navigation.goBack()
        }}>
          <View style={pastActivitiesStyles.backIconView}>
            <Image style={pastActivitiesStyles.backIconImage} source={require('../../../assets/icons/back_small.png')}/>
          </View>
        </TouchableOpacity>
        <View style={pastActivitiesStyles.titlebar}>
          <Text style={pastActivitiesStyles.titlebarText}>Past Activities</Text>
        </View>
      </View>
      <View style={pastActivitiesStyles.activityContainer}>
        <View style={pastActivitiesStyles.activityInfoView}>
          <View style={pastActivitiesStyles.activityDateView}>
            <Text style={pastActivitiesStyles.activityInfoText}>{bookingDate}</Text>
          </View>
          <View style={pastActivitiesStyles.activityCostView}>
            <Text style={pastActivitiesStyles.activityInfoText}>PKR {totalCost}</Text>
          </View>
        </View>
        <View style={pastActivitiesStyles.activityInfoDetailsView}>
          <View style={pastActivitiesStyles.visualsIconsContainer}>
            <Image style={pastActivitiesStyles.dots} source={require('../../../assets/visual_icons/grey_dot_20.png')}/>
            <Image style={pastActivitiesStyles.VerticalLine} source={require('../../../assets/visual_icons/black_line_50.png')}/>
            <Image style={pastActivitiesStyles.dots} source={require('../../../assets/visual_icons/green_dot_20.png')}/>
          </View>
          <View style={pastActivitiesStyles.activityLocationView}>
            <View style={pastActivitiesStyles.fromLocationView}>
              <Text style={pastActivitiesStyles.locationText}>{pickupLocation}</Text>
            </View>
            <View style={pastActivitiesStyles.destinationLocationView}>
              <Text style={pastActivitiesStyles.locationText}>{destinationLocation}</Text>
            </View>
          </View>
        </View>
        <View style={pastActivitiesStyles.horizontalLine}></View>
      </View>
    </View>
  )
}

const pastActivitiesStyles = StyleSheet.create({
  container: {

  },
  titlebarView: {
    display: 'flex',
    flexDirection: 'row',
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
  backIconView: {
    marginTop: 5
  },
  backIconImage: {
    width: 20,
    height: 22
  },
  titlebar: {
    marginLeft: 40
  },
  titlebarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black'
  },
  activityInfoView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 25,
    paddingRight: 25
  },
  activityInfoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black'
  },
  visualsIconsContainer: {
    marginTop: 4
  },
  dots: {
    width: 12,
    height: 12
  },
  VerticalLine: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 4,
    height: 30
  },
  activityInfoDetailsView: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 25,
    marginLeft: 15
  },
  locationText: {
    fontSize: 18,
    fontWeight: 'normal',
    color: 'black'
  },
  destinationLocationView: {
    marginTop: 35
  },
  activityLocationView: {
    marginLeft: 20
  },
  horizontalLine: {
    height: 1,
    backgroundColor: '#9C9C9C'
  },
  activityContainer: {
    marginTop: 10,
  }
})

export default PastActivities;