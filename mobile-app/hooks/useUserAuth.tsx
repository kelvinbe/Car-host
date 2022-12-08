import { createUserWithEmailAndPassword, getAuth, UserCredential, signOut } from 'firebase/auth'
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

    /**
     * @name signOut
     * @description Sign out a user
     * @return Promise with void
     */

    const logOut = (): Promise<void> => new Promise((res, rej)=>{
      signOut(getAuth()).then(()=>{
        res()
      }).catch((e)=>{
        rej(e)
      })
    })

  return {
    signUp,
    logOut
  }
}

export default useUserAuth