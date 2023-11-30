import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../firebase.config';

const UserSignIn = ({ navigation, route }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isSecureEntry, setIsSecureEntry] = useState(true);

  //firebase
  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        navigation.navigate({
          name: 'DriverFirstSignIn',
          params: { Email: email, Password: password },
        });
        alert('Signed Up Successfully!');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header}>Sign up now !</Text>
        <Text style={styles.hd1}>Sign up Today and Book Your </Text>
        <Text style={styles.hd2}>First Ride. </Text>
        <View style={styles.container2}>
          <View style={styles.inputView}>
            <Icon name="mail" size={20} color="#0386D0" />
            <TextInput
              placeholder="Email Address"
              onChangeText={setEmail}
              style={styles.textInput}></TextInput>
          </View>

          <View style={styles.inputView2}>
            <Icon name="lock" size={20} color="#0386D0" />
            <TextInput
              placeholder="Password"
              secureTextEntry={isSecureEntry}
              onChangeText={setPassword}
              style={[styles.textInput, { width: '80%' }]}></TextInput>
            <TouchableOpacity onPress={() => setIsSecureEntry(!isSecureEntry)}>
              <EvilIcon
                name="eye"
                size={30}
                color="#0386D0"
                style={{ paddingTop: 10 }}
              />
            </TouchableOpacity>

          </View>

          <TouchableOpacity
            style={styles.filledButton}
            onPress={() => signUp()}>
            <Text style={styles.signInBtnText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.hr}>
            <View style={styles.hr1} />
            <View>
              <Text style={styles.hrText}>Login With</Text>
            </View>
            <View style={styles.hr2} />
          </View>

          <TouchableOpacity style={styles.outlinedButton}>
            <Image
              style={{ width: 40, height: 40 }}
              source={require('../../../../assets/images/google.png')}
            />
            <Text style={{ fontSize: 18, fontWeight: '700' }}>
              Sign in with Google
            </Text>
          </TouchableOpacity>

          <View
            style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
            <Text>Already have an account ? </Text>
            <Text
              style={{ color: '#0386D0' }}
              onPress={() => navigation.navigate('DriverSignIn')}>
              Sign In
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 4,
  },
  logo: {
    width: 100,
    height: 100,
  },
  text: {
    flex: 1,
    bottom: 20,
    color: 'white',
  },
  textInput: {
    width: '90%',
    marginLeft: 5,
    fontSize: 16,
  },
  filledButton: {
    height: 45,
    width: 240,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#27B162',
    marginTop: 55,
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
  outlinedButton: {
    height: 45,
    width: 240,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'grey',
    marginTop: 25,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 60,
    color: 'black',
  },
  hd1: {
    fontSize: 18,
    marginLeft: 20,
    color: 'black',
  },
  hd2: {
    fontSize: 18,
    marginLeft: 20,
    color: 'black',
  },
  inputView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1.5,
    marginTop: 20,
    borderBottomColor: '#A6A6A6',
  },
  inputView2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1.5,
    marginTop: 10,
    borderBottomColor: '#A6A6A6',
  },
  signInBtnText: { color: 'white', fontSize: 18, fontWeight: '700' },
  hr: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 90,
  },
  hr1: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
    marginRight: 7,
  },
  hrText: {
    textAlign: 'center',
    fontSize: 13,
  },
  hr2: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
    marginLeft: 7,
  },
});

export default UserSignIn;
