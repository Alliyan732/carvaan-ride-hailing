
export const requestLocationPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('ACCESS_FINE_LOCATION is granted');
        return true;
      } else {
        console.log('ACCESS_FINE_LOCATION is not granted');
        return false;
      }
    } catch (err) {
      return false;
    }
};