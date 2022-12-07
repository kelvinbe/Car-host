import { createUserWithEmailAndPassword, getAuth, UserCredential } from 'firebase/auth'
import React from 'react'
import useToast from './useToast'

const auth = getAuth()

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

  return {
    signUp
  }
}

export default useUserAuth