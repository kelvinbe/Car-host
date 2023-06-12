import axios from 'axios'
import { User, getAuth } from 'firebase/auth'
import { app } from '../firebase/firebaseApp'
import { isEmpty } from 'lodash'
import LogRocket from 'logrocket'
import store from '../redux/store'
import { fetchUser } from '../redux/userSlice'

class DebounceUser {
    retries = 0
    constructor() {

    }

    async getUser(): Promise<User> {
        const currentUser = getAuth(app).currentUser
        if(isEmpty(currentUser)) {
            if(this.retries > 20) return Promise.reject("User not logged in")
            this.retries += 1
            await new Promise((resolve)=>setTimeout(resolve, 1000))
            return this.getUser()
        }

        if(this.retries > 5) {
            store.dispatch(fetchUser())
        }
        return currentUser
    }
}


const apiClient = axios.create({
    headers: {
        "x-user": "HOST", // its cumbersome to add this header everytime
        "ngrok-skip-browser-warning": true
    }
})

apiClient.interceptors.request.use(async (config)=> {
    const db = new DebounceUser()
    try {
        const user = await db.getUser() 

        const token = await user.getIdToken()

        localStorage.setItem("token", token)

        return {
            ...config,
            headers: {
                ...config.headers,
                "Authorization": `Bearer ${token}`
            }
        }
    } catch (e) {
        localStorage.removeItem("token")
        LogRocket.error(e)
        return Promise.reject("User not logged in")
    }
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

const db_user = new DebounceUser()

export { db_user }