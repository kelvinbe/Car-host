import axios from 'axios'
import { getAuth } from 'firebase/auth'
import { app } from '../firebase/firebaseApp'
import { isEmpty } from 'lodash'

const apiClient = axios.create({
    headers: {
        "x-user": "HOST", // its cumbersome to add this header everytime
        "ngrok-skip-browser-warning": true
    }
})

apiClient.interceptors.request.use((config)=> {
    const currentUser = getAuth(app).currentUser
    if(isEmpty(currentUser)) return Promise.reject("User not logged in")
    return getAuth(app).currentUser?.getIdToken().then((token)=>{
        return {
            ...config,
            headers: {
                ...config.headers,
                "Authorization": `Bearer ${token}`
            }
        }
    })
})


/**
 * @description - for all responses coming from the backend, for consistency
 *              - we have {
 *                          data: any, // the incoming data
 *                          message: string, // a human readable message
 *                          status: "success" | "error" | "warning" // the status of the response
 *                          }
 *              - its alittle cumbersome to type data.data eveytime
 *              - so we use this interceptor to return the data directly
 */
apiClient.interceptors.response.use((response)=>{
    return response.data as {
        data: any,
        message: string,
        status: "success" | "error" | "warning"
    }
}, (error)=>{
    return Promise.reject(error)
})


export default apiClient