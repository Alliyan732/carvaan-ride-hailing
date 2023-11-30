import EncryptedStorage from 'react-native-encrypted-storage';

export const storeDataAsyncStorage = async (key, value) => {
    try {
        await EncryptedStorage.setItem(key,value );
    } catch (error) {
        console.log("Custom Error: " + error);
    }
}

export const getDataAsyncStorage = async (key) => {
    try {
        return await EncryptedStorage.getItem(key).then((response) => {return (response)});
    } catch(e) {
      console.log(e)
    }
}

export const clearAsyncStorage = async () => {
    try {
        await EncryptedStorage.clear();
    } catch (error) {
        console.log(error);
    }
}

export const remvoveItemAsyncStorage = async (key) => {
    try {
        await EncryptedStorage.removeItem(key);
    } catch (error) {
        console.log(error.code);
    }
}