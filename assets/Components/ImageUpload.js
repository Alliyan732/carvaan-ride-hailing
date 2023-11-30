import React, { useState, useEffect } from "react";
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Button, Pressable, PermissionsAndroid, Modal} from "react-native";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { getFirestore, collection, getDocs, addDoc, setDoc , doc, updateDoc} from 'firebase/firestore/lite';
import {db, auth} from '../../../firebase.config'


const ImageUpload = () => {

    useEffect(()=> {
        const uploadImage = async() => {
        // three imp steps:
        // coverting to blob image
        const blobImage = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function() {
            resolve(xhr.response);
            };
            xhr.onerror = function() {
            reject(new TypeError("Network request failed"))
            };
            xhr.responseType = "blob";
            xhr.open("GET" , image, true);
            xhr.send(null);
        });
    
    
        // Create the file metadata
        /** @type {any} */
        const metadata = {
        contentType: 'image/jpeg'
        };
    
        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(storage, 'UserImages/' + Date.now());
        const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);
    
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
        (error) => {
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
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setImageURL(downloadURL);
            console.log("imageIRL: " + downloadURL);
            });
        }
        );
    
    }
    if (image != null){
        uploadImage()
        setImage(null)
    }
    }), [image]

}


export default ImageUpload;
