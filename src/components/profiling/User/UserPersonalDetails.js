import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Button,
  Pressable,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PhoneInput from 'react-native-phone-number-input';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {setDoc, doc} from 'firebase/firestore/lite';
import {db, auth} from '../../../../firebase.config';

const PersonalDetails = ({navigation, route}) => {
  const [firstName, setFirstName] = React.useState(null);
  const [LastName, setLastName] = React.useState(null);
  const [Date, setDate] = React.useState(null);
  const [formattedValue, setFormattedValue] = useState(null); // phone

  // firebase
  const addPersonalInfo = async () => {
    if (
      firstName == null ||
      LastName == null ||
      Date == null ||
      formattedValue == null
    ) {
      alert('Please Enter All the Values!');
    } else {
      await setDoc(doc(db, 'Users', auth.currentUser.uid), {
        FirstName: firstName,
        LastName: LastName,
        DateOfBirth: Date,
        Phone: formattedValue,
        Amount: 0,
      })
        .then(() => {
          navigation.navigate('UserAddProfilePic', {
            name: firstName,
          });
        })
        .catch(error => {
          alert(error);
        });
    }
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setDate(
      date.toString().split(' ')[1] +
        '/' +
        date.toString().split(' ')[2] +
        '/' +
        date.toString().split(' ')[3],
    );
    console.log(date);
    console.log(Date);
    hideDatePicker();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.header}>Tell us more about yourself !</Text>
        <View style={styles.container2}>
          <View style={styles.inputs}>
            <FontAwesomeIcon name="user" size={20} color="#0386D0" />
            <TextInput
              placeholder="First Name"
              style={styles.textInput}
              value={firstName}
              onChangeText={setFirstName}></TextInput>
          </View>

          <View style={styles.inputs}>
            <FontAwesomeIcon name="user" size={20} color="#0386D0" />
            <TextInput
              placeholder="Last Name"
              style={styles.textInput}
              onChangeText={setLastName}></TextInput>
          </View>

          <Pressable onPress={showDatePicker}>
            <View pointerEvents="none" style={styles.inputs}>
              <MaterialIcons name="date-range" size={20} color="#0386D0" />
              <TextInput placeholder="Date of birth" style={styles.textInput}>
                {Date}
              </TextInput>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </View>
          </Pressable>

          <View
            style={{
              borderBottomWidth: 1.5,
              borderBottomColor: '#A6A6A6',
              height: 70,
            }}>
            <PhoneInput
              defaultCode="PK"
              layout="first"
              onChangeFormattedText={text => {
                setFormattedValue(text);
              }}
            />
          </View>

          <TouchableOpacity
            style={styles.filledButton}
            onPress={() => addPersonalInfo()}>
            <Text style={styles.btnText}>Next</Text>
          </TouchableOpacity>
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
  inputs: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 15,
    borderBottomWidth: 1.5,
    borderBottomColor: '#A6A6A6',
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
    marginTop: 50,
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
  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 60,
    color: 'black',
  },
});

export default PersonalDetails;
