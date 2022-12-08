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