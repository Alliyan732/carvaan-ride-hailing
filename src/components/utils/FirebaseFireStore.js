import {auth, db} from '../../../config/firebase';


import { collection, doc, addDoc, setDoc, getDoc, updateDoc, deleteDoc, onSnapshot} from "firebase/firestore/lite"; 

// const AddBookRide = async (collectionItem) => {
//     try {
//         const docRef = await addDoc(collection(db, "rides"), collectionItem);
//         console.log("Document written with ID: ", docRef.id);
//     }
// }


// const SetBookRide = async (collectionItem, UserUID) => {
//     try {
//         await setDoc(doc(db, "rides", UserUID), collectionItem).then(response => {
//             console.log("Data is updated")
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }


// const GetBookRides = async (UserUID) => {
//     try {
//         const docRef = doc(db, "rides", UserUID);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//             return docSnap.data();
//         } else {
//             return null;
//         }

//     } catch (error) {
//         console.log(error);
//     }
// }

// const UpdateBookRides = async (updatedCollectionItems, UserUID) => {
//     try {
//         const docRef = doc(db, "rides", UserUID);

//         await updateDoc(docRef, updatedCollectionItems);
//     } catch (error) {
//         console.log(error);
//     }
// }


// const DeleteBookRides = async (userUID) => {
//     try {

//         await deleteDoc(doc(db, "rides", userUID));

//     } catch (error) {
//         console.log(error);
//     }
// }


// const showMultipleCollectionItems = async () => {
//     try {
//         const ref = collection(db, "rides");

//         onSnapshot(ref, (rides) => 
//             rides.docs.map((document) => ({
//                 // data
//                 // https://www.youtube.com/watch?v=JzshL7Ddf5E&list=PLw_vECRHWqlmEUHqnPQacYgSGHJYYH4Ko&index=24
//             })) 
//         )
//     } catch (error) {
//         console.log(error);
//     }
// }


// ---------------

const GetUserProfile = async (UserUID) => {
    try {
        const docRef = doc(db, "Users", UserUID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return null;
        }

    } catch (error) {
        console.log(error);
    }
}

