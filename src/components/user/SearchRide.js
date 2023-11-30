
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const SearchRide = ({route, navigation}) => {

    useEffect(() => {
        navigation.snapTo(1)
    }, [])


    return (
        <View style={SearchRideStyles.container}>
            <View style={SearchRideStyles.autocompleteContainer}>
            <GooglePlacesAutocomplete
              placeholder='Search'
              textInputProps={{
                placeholderTextColor: 'black',
                returnKeyType: "search",
                errorStyle: { color: 'red' },
              }}
              styles={{
                textInputContainer: {
                  backgroundColor: 'grey',
                },
                textInput: {
                  height: 38,
                  color: '#5d5d5d',
                  fontSize: 16,
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
                description : {color : 'black'}
              }}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
              }}
              query={{
                key: 'AIzaSyDqcYoZHkHcv14Q3vGAjIpJ0cc3Svnvd7Y',
                language: 'en',
                type: '(cities)'
              }}
              debounce={200}
            />
            </View>
        </View>
    );
}

const SearchRideStyles = StyleSheet.create({
    container: {
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15
    }
})

export default SearchRide;