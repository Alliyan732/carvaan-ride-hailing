import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../../../../firebase.config';

const UserSignIn = ({ navigation, route }) => {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [isSecureEntry, setIsSecureEntry] = useState(true);


  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        navigation.navigate('UserPersonalDetails');
      })

      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  const resetPass = () => {
    if (email != null) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert('Password reset email has been sent successfully!');
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
        });
    } else {
      alert('Please enter a valid email!');
    }
  };

  React.useEffect(() => {
    if (route.params?.Email) {
      setEmail(route.params?.Email);
    }
    if (route.params?.Password) {
      setPassword(route.params?.Password);
    }
  }, [route.params?.Email, route.params?.Password]);

  return (
    <ScrollView style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>Lets Sign you in !</Text>
        <Text style={styles.headerT1}>
          Login to your account to book a ride{' '}
        </Text>
        <Text style={styles.headerT2}>book a ride </Text>
        <View style={styles.container2}>
          <View style={styles.inputView}>
            <Icon name="mail" size={20} color="#0386D0" />
            <TextInput
              placeholder="Email Address"
              style={styles.textInput}
              onChangeText={email => setEmail(email)}>
              {email}
            </TextInput>
          </View>

          <View style={styles.inputView}>
            <Icon name="lock" size={20} color="#0386D0" />
            <TextInput
              placeholder="Password"
              secureTextEntry={isSecureEntry}
              style={[styles.textInput, { width: '80%' }]}
              onChangeText={password => setPassword(password)}>
              {password}
            </TextInput>
            <TouchableOpacity onPress={() => setIsSecureEntry(!isSecureEntry)}>
              <EvilIcon
                name="eye"
                size={30}
                color="#0386D0"
                style={{ paddingTop: 10 }}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.rememberPassView}>
            <Ionicon name="checkbox-outline" size={20} color="#0386D0" />
            <Text style={styles.rememberPassText}>Remember password</Text>
          </View>
          <TouchableOpacity onPress={() => resetPass()}>
            <Text style={styles.forgetPassText}>Forget password ?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.filledButton}
            onPress={() => signIn()}>
            <Text style={styles.signInBtnText}>Sign In</Text>
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
              style={styles.gImage}
              source={require('../../../../assets/images/google.png')}
            />
            <Text style={{ fontSize: 18, fontWeight: '700' }}>
              Sign in with Google
            </Text>
          </TouchableOpacity>

          <View
            style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 30 }}>
            <Text style={{ fontSize: 15 }}>Don't have an account ? </Text>
            <Text
              style={{ color: '#0386D0', fontSize: 15, fontWeight: 'bold' }}
              onPress={() => navigation.navigate('UserSignUp')}>
              Sign Up
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
    marginTop: 35,
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
    borderWidth: 1,
    borderColor: '#F1F1F1',
    marginTop: 25,
    alignSelf: 'center',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#DADADA',
  },
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 60,
    color: 'black',
  },
  headerT1: {
    fontSize: 18,
    marginLeft: 20,
    marginTop: 5,
    color: 'black',
  },
  headerT2: {
    fontSize: 18,
    marginLeft: 20,
    color: 'black',
  },
  inputView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: '#A6A6A6',
  },
  rememberPassView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 5,
  },
  rememberPassText: {
    marginLeft: 10,
  },
  gImage: {
    width: 40,
    height: 40,
  },
  forgetPassText: {
    color: '#0386D0',
    marginTop: 8,
    marginLeft: 35,
  },
  signInBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  hr: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
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
  background: {
    backgroundColor: 'white',
  },
});

export default UserSignIn;
