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
 * @name genResponseDto
 * @param {string} type
 * @param {any} data
 * @param {string} message
 * @returns {any} responseDto 
 */

export const genResponseDto = (type: string, data: any, message: string): {
    type: "error" | "success",
    data: any,
    message: string
} => {
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