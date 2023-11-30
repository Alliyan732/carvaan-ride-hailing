import React from 'react';
import {Text, View} from 'react-native';
import {db, auth} from '../../../../firebase.config';

const HelloWorldApp = () => {
  const uid = auth.currentUser.uid;
  console.log(uid);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>{uid}</Text>
    </View>
  );
};
export default HelloWorldApp;
