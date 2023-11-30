import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Button,
  Pressable,
  ScrollView,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { doc, updateDoc } from 'firebase/firestore/lite';
import { db, auth } from '../../../../firebase.config';

const PersonalDetails = ({ navigation, route }) => {
  const [cardNo, setCardNo] = useState(null);
  const [CVV, setCVV] = useState(null);
  const [Date, setDate] = React.useState('');
  const [country, setCountry] = useState(null);

  // firebase
  const addPersonalInfo = async () => {
    if (cardNo == null || CVV == null || Date == null || country == null) {
      alert('Please Fill All Entries!');
    } else {
      await updateDoc(doc(db, 'Users', auth.currentUser.uid), {
        UserPaymentMethod: {
          CardNumber: cardNo,
          CVV: CVV,
          ExpiryDate: Date,
          Country: country,
        },
      })
        .then(() => {
          navigation.navigate('UserHome');
        })
        .catch(error => {
          alert(error);
        });
    }
  };

  // firebase
  const chooseCash = async () => {
    await updateDoc(doc(db, 'Users', auth.currentUser.uid), {
      UserPaymentMethod: 'Cash Payment Method',
    })
      .then(() => {
        navigation.navigate('UserHome');
      })
      .catch(error => {
        alert(error);
      });
  };

  const [firstName, setFirstName] = React.useState('');
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
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header1}>Choose Payment</Text>
        <Text style={styles.header2}>Method</Text>
        <Text style={styles.headerText}>
          Choose your favorite payment method
        </Text>

        <View style={styles.container2}>

          <View style={styles.inputShadow}>
            <View style={styles.inputs}>
              <FontAwesomeIcon name="cc-visa" size={20} color="#0386D0" />
              <TextInput
                keyboardType="numeric"
                placeholder="Card Number"
                style={styles.textInput}
                onChangeText={setCardNo}></TextInput>
            </View>
          </View>


          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>

            <View style={{ width: "48%" }}>
              <View style={styles.inputShadow}>
                <View style={styles.inputs}>
                  <Image
                    style={{ width: 25, height: 25, marginLeft: 15 }}
                    source={require('../../../../assets/images/cvv.png')}
                  />
                  <TextInput
                    keyboardType="numeric"
                    placeholder="CVV"
                    style={styles.textInput}
                    onChangeText={setCVV}></TextInput>
                </View>
              </View>
            </View>

            <View style={{ width: "48%" }}>
              <Pressable onPress={showDatePicker}>
                <View style={styles.inputShadow}>
                  <View
                    pointerEvents="none"
                    style={[styles.inputs]}>
                    <MaterialIcons name="date-range" size={20} color="#0386D0" />
                    <TextInput
                      placeholder="Expiry Date"
                      style={[styles.textInput, { marginLeft: -1 }]}>
                      {Date}
                    </TextInput>
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={handleConfirm}
                      onCancel={hideDatePicker}
                    />
                  </View>
                </View>
              </Pressable>
            </View>

          </View>

          <View style={[styles.inputShadow, { marginTop: 15 }]}>
            <View style={styles.inputs}>
              <TextInput
                placeholder="Issuing Country"
                style={styles.textInput}
                onChangeText={setCountry}></TextInput>
            </View>
          </View>

          <TouchableOpacity style={styles.outlinedButton}>
            <Text
              style={{ color: '#27B162', fontSize: 18, fontWeight: '700' }}
              onPress={() => chooseCash()}>
              Choose Cash Instead
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.filledButton}
            onPress={() => addPersonalInfo()}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>
              Save
            </Text>
          </TouchableOpacity>
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
    marginTop: 15,
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
    borderColor: '#27B162',
    marginTop: 50,
    alignSelf: 'center',
  },

  inputShadow: {
    borderRadius: 10,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  inputs: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',

  },
  header1: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 40,
    color: 'black',
  },

  header2: { fontSize: 30, fontWeight: 'bold', marginLeft: 20, color: 'black' },

  headerText: {
    fontSize: 18,
    marginLeft: 20,
    color: 'black',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default PersonalDetails;
