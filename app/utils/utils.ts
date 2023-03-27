import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebaseApp";

import { GenerateDataTransferObject } from './../globaltypes';
/**
 * @name loadEnv 
 * @params {string} envVariableName
 * @returns {string} envVariableValue
 * 
 */

export const loadEnv = (envVariableName: string): string => {
    const envVariableValue = process.env[envVariableName];
    if (!envVariableValue) {
        throw new Error(`Environment variable ${envVariableName} is not defined`);
    }
    return envVariableValue;
};


/**
 * @name generateResponseDataTransferObject
 * @param {string} type
 * @param {any} data
 * @param {string} message
 * @description Generates a consistent response data transfer object, making it easier for the consumer to know what to expect
 * @returns {any} responseDto 
 */

export function generateResponseDataTransferObject<T>(type: "error" | "success", data: any, message: string): GenerateDataTransferObject<T> {
    return {
        type,
        data,
        message
    }
}

/**
 * @name genGreetingBasedOnTime
 * @param {string} name
 * @returns {string} greetings
 */

export const genGreetingBasedOnTime = (name: string): string => {
    const hour = new Date().getHours();
    if (hour < 12) {
        return `Good Morning, ${name}`;
    } else if (hour < 18) {
        return `Good Afternoon, ${name}`;
    } else {
        return `Good Evening, ${name}`;
    }
}

/**
 * @section Form helpers ====================================================================================================================================
 * @description custom helpers for helping with input
 */


/**
 * @name addSpacingAfterEveryFourDigits
 * @description Adds a space after every four digits
 * @param {string} str
 * @returns {string}
 * @example addSpacingAfterEveryFourDigits("1234567890123456") => "1234 5678 9012 3456"
 */
export const addSpacingAfterEveryFourDigits = (str: string) => {
    return str.replace(/(.{4})/g, "$1 ").trim()
}

/**
 * @name addSlashAfter2Digits
 * @description Adds a slash after every two digits
 * @param {string} str
 * @returns {string}
 * @example addSlashAfter2Digits("1234567890123456") => "12/34/56/78/90/12/34/56"
 */
export const addSlashAfter2Digits = (str: string) => {
    return str.replace(/(.{2})/g, "$1/").trim()
}


/**
 * @name removeSpaces
 * @description Removes all spaces from a string
 * @param {string} str
 * @returns {string}
 * @example removeSpaces("1234 5678 9012 3456") => 
 * "1234567890123456"
 */

export const removeSpaces = (str: string) => {
    return str.replace(/\s/g, "")
}



export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//password with atleast 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const hasLowercase = (str: string) => /[a-z]/.test(str);
export const hasUppercase = (str: string) => /[A-Z]/.test(str);
export const hasNumber = (str: string) => /\d/.test(str);
export const hasSpecialCharacter = (str: string) => /[@$!%*?&]/.test(str);



/**
 * @name getLocalStorage
 * @description Gets a value from local storage returns null if in server side
 */

export const getLocalStorage = (key: string): string | null => {
    if (typeof window === 'undefined') {
        return null;
    }
    return localStorage.getItem(key);
}

/**
 * @name isYearStringValid
 * @description Checks if a year string is valid
 */

export const isYearStringValid = (year: string): boolean => {
    const yearInt = parseInt(year);
    if (yearInt < 1900) {
        return false;
    }
    return true;
}

/**
 * @name isValidNumberString
 * @description Checks if a number string is valid using regex
 */
export const isValidNumberString = (str: string): boolean => {
    const regex = /^[0-9]*$/;
    return regex.test(str);
}


/**
  * @name upload to firebase
  * @returns a Promise that resolves to a url
  * @param blob_url
  * @param file_name
  * @param file_type
  */

export const uploadToFirebase = async (blob_url: string, file_name: string, file_type: string): Promise<string> => new Promise(async (res,rej)=>{
    if(blob_url?.includes("https://firebasestorage.googleapis.com")){
        res(blob_url);
    }else{
        const file = await fetch(blob_url).then(r => r.blob());
        const _ref  = ref(storage, file_name);
        uploadBytes(_ref, file, {
            contentType: file_type
        }).then((r)=>{
            getDownloadURL(_ref).then((url)=>{
                res(url);
            }).catch((e)=>{
                rej(e)
            })
        }).catch((e)=>{
            rej(e)
        })
    }
 })
