import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';

const Splash = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../../../assets/images/logo-white.png')}
      />
      <Text style={styles.text}>@2022 Caravan</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#27B162',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  text: {
    flex: 1,
    position: 'absolute',
    bottom: 20,
    color: 'white',
  },
});

export default Splash;
