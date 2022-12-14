import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth'
import React from 'react'
import {  auth } from '../firebase/firebaseApp'
import useToast from './useToast'

function useUserAuth() {

    const  toast = useToast()


    /**
     * @name signUp  
     * @description Sign up a user with email and password
     * @param email
     * @param password
     * @return Promise with userCredential
     */
    const signUp = (email: string, password: string): Promise<UserCredential> => new Promise((res, rej)=>{
        createUserWithEmailAndPassword(auth, email, password).then((userCredential)=>{
            res(userCredential)
        }).catch((e)=>{
            rej(e)
        })
    })

    /**
     * @name signOut
     * @description Sign out a user
     * @return Promise with void
     */

    const logOut = (): Promise<void> => new Promise((res, rej)=>{
      console.log("logging out")
      auth.signOut().then(()=>{
        console.log("logout success")
        res()
      }).catch((e)=>{
        console.log("logot error", e)
        rej(e)
      })
    })

  return {
    signUp,
    logOut
  }
}

export default useUserAuth