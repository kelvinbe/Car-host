import dayjs from "dayjs"
import { z } from "zod"

/**
 * @name addSpacingAfterEveryFourDigits
 * @description Adds a space after every four digits
 * @param {string} str
 * @returns {string}
 * @example addSpacingAfterEveryFourDigits("1234567890123456") => "1234 5678 9012 3456"
 */
 export const addSpacingAfterEveryFourDigits = (str: string) => {
    return str?.replace(/(.{4})/g, "$1 ").trim()
}

/**
 * @name addSlashAfter2Digits
 * @description Adds a slash after every two digits
 * @param {string} str
 * @returns {string}
 * @example addSlashAfter2Digits("1234567890123456") => "12/34/56/78/90/12/34/56"
 */
export const addSlashAfter2Digits = (str: string) => {
    return str?.replace(/(.{2})/g, "$1/").trim()
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
 * @name calcDuration
 * @description Calculates the duration between two dates
 */
export const calcDuration = ( startDateTime: string, endDateTime: string ) => {
    const start = dayjs(startDateTime)
    const end = dayjs(endDateTime)
    const duration = end.diff(start, 'minutes') / 60
    return duration
}


/**
 * @name timeTilEndOfDay
 * @returns {Array} An array of objects with label and value properties
 */

export const timeTilEndOfDay = () =>{
    const now = dayjs()
    const endOfDay = now.endOf('day')
    const duration = endOfDay.diff(now, 'minutes')
    const timeToAddToEvenOut = duration % 30
    const startTime = now.add(timeToAddToEvenOut, 'minutes').add(1, "minute")
    const all30minIntervals = Array.from({length: duration / 30}, (_, i) => i)
    const times = all30minIntervals.map((_, i) => startTime.add(i * 30, 'minutes').format('dddd, MMMM D, YYYY h:mm A'))
    const labelAndValue = times.map(time => ({label: dayjs(time).format("h:mm"), value: time}))
    return labelAndValue
}

/**
 * @name timeTilEndOfNewDay
 * @param fromToday 
 * @returns {Array} An array of objects with label and value properties
 */
export const timeTilEndOfNewDay = ( fromToday: number ) =>{
    const now = dayjs()
    const then = now.add(fromToday, 'day')
    const startOfDay = then.startOf('day')
    const endOfDay = then.endOf('day')
    const duration = endOfDay.diff(startOfDay, 'minutes')
    const all30minIntervals = Array.from({length: duration / 30}, (_, i) => i)
    const times = all30minIntervals.map((_, i) => startOfDay.add(i * 30, 'minutes').format('dddd, MMMM D, YYYY h:mm A'))
    const labelAndValue = times.map(time => ({label: dayjs(time).format("h:mm"), value: time}))
    return labelAndValue
}

/**
 * @name daysOfTheWeekFromToday
 * @returns {Array} An array of objects with label and value properties
 */
export const daysOfTheWeekFromToday = () => {
    const now = dayjs()
    const days = Array.from({length: 7}, (_, i) => i)
    const daysOfTheWeek = days.map((_, i) => now.add(i, 'day').format('dddd'))
    const labelAndValue = daysOfTheWeek.map((day, i) => ({label: day, value: i}))
    return labelAndValue
}


export const isAm = (time: string) => {
    return time?.includes('AM') 
}

/**
 * @name isValidPassword
 * @param password 
 * @returns {boolean}
 */
export const isValidPassword = (password: string) => {
  const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long' })
  .max(50, { message: 'Password must be less than 50 characters long' })
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]+$/,
    { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one of the following special characters: @ $ ! % * ? & .' }
  );

    try {
        passwordSchema.parse(password)
        return true
    }catch (e){
        return false
    }
}

/**
 * @name isValidEmail
 * @param email 
 * @returns  {boolean}
 */
export const isValidEmail = (email: string) => {
    const emailSchema = z
    .string()
    .email({ message: 'Please enter a valid email address' })
    .max(50, { message: 'Email must be less than 50 characters long' });

    try {
        emailSchema.parse(email)
        return true
    }catch (e){
        return false
    }
}