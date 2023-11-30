import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Button,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const SignInHome = ({navigation}) => {
  useEffect(() => {
    SplashScreen.hide(); 
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../../../assets/images/Waave.jpg')}
      />
      <View style={styles.box}>
        <Text style={[styles.text1, {marginTop: 30}]}>Travel safely,</Text>
        <Text style={styles.text1}>comfortabily, & easily,</Text>
        <Text style={styles.text2}>By signing in you are agreeing our</Text>
        <Text style={styles.text3}>Term and privacy policy</Text>

        <TouchableOpacity
          style={styles.outlinedButton}
          onPress={() => navigation.navigate('DriverSignIn')}>
          <Text style={styles.outlinedButtonText}>Sign In As Driver</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filledButton}
          onPress={() => navigation.navigate('UserSignIn')}>
          <Text style={styles.filledButtonText}>Sign In As Passenger</Text>
        </TouchableOpacity>

        <Text style={styles.copyrightText}>@2022 Caravan</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '42%',
  },
  text1: {
    fontSize: 24,
    color: 'black',
  },
  text2: {
    fontSize: 14,
    marginTop: 11,
  },
  text3: {
    fontSize: 14,
    color: '#0386D0',
  },
  box: {
    flex: 1,
    marginTop: -25,
    height: '60%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
  outlinedButton: {
    backgroundColor:"white",
    height: 48,
    width: 250,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#27B162',
    marginTop: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
  filledButton: {
    height: 48,
    width: 250,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#27B162',
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },

  copyrightText: {
    flex: 1,
    position: 'absolute',
    bottom: 15,
    color: '#0386D0',
  },
  outlinedButtonText: {
    color: '#27B162',
    fontSize: 18,
    fontWeight: '700',
  },
  filledButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default SignInHome;
