import React, { useState, useEffect } from 'react';
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
  PermissionsAndroid,
  Modal,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  updateDoc,
} from 'firebase/firestore/lite';
import { db, auth, storage } from '../../../../firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const PersonalDetails = ({ navigation, route }) => {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  // firebase
  const addPersonalInfo = async () => {
    await setDoc(doc(db, 'Drivers', auth.currentUser.uid), {
      ProfilePic: imageURL,
    })
      .then(() => {
        navigation.navigate('DriverPersonalDetails');
        // Pass and merge params back to home screen
        navigation.navigate({
          name: 'DriverPersonalDetails',
          params: { cam: cameraPhoto },
        });
      })
      .catch(error => {
        alert(error);
      });
  };

  // image uploading:
  useEffect(() => {
    const uploadImage = async () => {
      // three imp steps:
      // coverting to blob image
      const blobImage = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', image, true);
        xhr.send(null);
      });

      // Create the file metadata
      /** @type {any} */
      const metadata = {
        contentType: 'image/jpeg',
      };

      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, 'UserImages/' + Date.now());
      const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        'state_changed',
        snapshot => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        error => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;

            // ...

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            console.log('File available at', downloadURL);
            setImageURL(downloadURL);
            console.log('imageIRL: ' + downloadURL);
          });
        },
      );
    };
    if (image != null) {
      uploadImage();
      setImage(null);
    }
  }),
    [image];

  const [modalVisible, setModalVisible] = useState(false);
  const [cameraPhoto, setCameraPhoto] = useState();
  // const [galleryPhoto, setGalleryPhoto] = useState();
  const [defaultPic, checkDefaultPic] = useState(0);
  let options = {
    mediaType: 'photo',
  };
  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(options);
      setCameraPhoto(result.assets[0].uri);
      setImage(cameraPhoto);
      checkDefaultPic(1);
    }
  };
  const openGallery = async () => {
    const result = await launchImageLibrary(options);
    setCameraPhoto(result.assets[0].uri);
    setImage(cameraPhoto);
    checkDefaultPic(1);
  };

  const [firstName, setFirstName] = React.useState('');

  React.useEffect(() => {
    if (route.params?.Name) {
      setFirstName(route.params?.Name);
    }
  }, [route.params?.Name]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header}>
          Save and Book your first ride! {firstName} !
        </Text>
        <View style={styles.container2}>
          <View style={styles.userlogo}>
            {/* source={require('../../assets/images/user.png')} */}
            <Image
              source={
                defaultPic === 0
                  ? require('../../../../assets/images/user-icon.jpg')
                  : { uri: cameraPhoto }
              }
              style={styles.logo}
              width={240}
              height={240}
              borderRadius={150}
            />
          </View>

          <TouchableOpacity
            style={styles.outlinedButton}
            onPress={() => setModalVisible(true)}>
            <Text style={{ color: '#27B162', fontSize: 18, fontWeight: '700' }}>
              Upload Picture
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => addPersonalInfo()}
            disabled={imageURL == null ? true : false}
            style={[
              styles.filledButton,
              { backgroundColor: imageURL === null ? '#A6A6A6' : '#27B162' },
            ]}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>
              Save
            </Text>
          </TouchableOpacity>

          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Pressable
                    style={styles.modalButtonOutlined}
                    onPress={() => {
                      openCamera();
                      setModalVisible(!modalVisible);
                    }}>
                    <Text style={styles.modalTextStyle1}>Open Camera</Text>
                  </Pressable>
                  <Pressable
                    style={styles.modalButtonFilled}
                    onPress={() => {
                      openGallery();
                      setModalVisible(!modalVisible);
                    }}>
                    <Text style={styles.modalTextStyle2}>
                      Upload from gallery
                    </Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
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
  inputs: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    marginTop: 15,
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
    marginTop: 70,
    alignSelf: 'center',

  },
  userlogo: {
    marginTop: 20,
    height: 240,
    width: 240,
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 3,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButtonFilled: {
    height: 45,
    width: 200,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#27B162',
    marginTop: 15,
    alignSelf: 'center',
  },

  modalButtonOutlined: {
    height: 46,
    width: 200,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#27B162',
    marginTop: 70,
    alignSelf: 'center',
  },

  buttonOpen: {
    backgroundColor: '#F194FF',
  },

  modalTextStyle1: {
    color: '#27B162',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  modalTextStyle2: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
    color: 'black',
  },
});

export default PersonalDetails;
