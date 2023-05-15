import { createSlice } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { useRouter } from 'next/router'
import React, { useEffect, useReducer } from 'react'
import { useCreateUserWithEmailAndPassword, useSignInWithApple, useSignInWithEmailAndPassword, useSignInWithFacebook, useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { app } from '../firebase/firebaseApp'
import z from "zod"
import { useToast } from '@chakra-ui/react'
import { useAppDispatch } from '../redux/store'
import { fetchUser } from '../redux/userSlice'

interface IReducerState {
    signOutLoading: boolean,
    signOutError: string,
    signInLoading: boolean,
    signInError: string,
    signUpLoading: boolean,
    signUpError: string,
}

const initialState: IReducerState = {
    signOutLoading: false,
    signOutError: '',
    signInLoading: false,
    signInError: '',
    signUpLoading: false,
    signUpError: '',
}

const authMiniSlice = createSlice({
    initialState,
    name: 'auth',
    reducers: {
        setSignOutLoading: (state, action) => {
            state.signOutLoading = action.payload
        },
        setSignOutError: (state, action) => {
            state.signOutError = action.payload
            state.signOutLoading = false
        },
        setSignInLoading: (state, action) => {
            state.signInLoading = action.payload
        },
        setSignInError: (state, action) => {
            state.signInError = action.payload
            state.signInLoading = false
        },
        setSignUpLoading: (state, action) => {
            state.signUpLoading = action.payload
        },
        setSignUpError: (state, action) => {
            state.signUpError = action.payload
            state.signUpLoading = false
        },

    }    
})

const { setSignOutLoading, setSignOutError, setSignInError, setSignInLoading, setSignUpError, setSignUpLoading } = authMiniSlice.actions



function useAppAuth() {
    const [ {
        signOutLoading,
        signOutError,
        signInLoading
    } , dispatchAction] = useReducer(authMiniSlice.reducer, initialState)
    const [ appleSignIn, appleUser,  appleSignInLoading, appleSignInError ] = useSignInWithApple(getAuth(app))
    const [facebookSignIn, facebookUser, facebookSignInLoading, facebookSignInError] = useSignInWithFacebook(getAuth(app))
    const [ googleSignIn, googleUser, googleSignInLoading, googleSignInError ] = useSignInWithGoogle(getAuth(app))
    const [createUserWithEmailAndPassword,user,createUserWithEmailAndPasswordLoading, createUserWithEmailAndPasswordError] = useCreateUserWithEmailAndPassword(getAuth(app));
    const dispatch = useAppDispatch()
    const toast = useToast({
        position: "top",
        duration: 5000,
    })
     /**
      * @name signInWithEmailAndPassword
      * @description Sign in the user with email and password
      * @param credentials {
      *  email: string,
      *  password: string
      * }
      */

     const _signInWithEmailAndPassword = (credentials: any) => {
        z.object({
            email: z.string().email(),
            password: z.string().min(8)
        }).required().parseAsync(credentials).then((credentials)=>{
            dispatchAction(setSignInLoading(true))
            signInWithEmailAndPassword(getAuth(app), credentials.email, credentials.password).then(()=>{
                dispatchAction(setSignInLoading(false))
                dispatch(fetchUser())
                push("/dashboard")
            }).catch((e)=>{
                dispatchAction(setSignInError(e.message))
                toast({
                    title: "Error",
                    description: "Password or email are incorrect",
                    status: "error",
                })
            })
        }).catch((e)=>{
            toast({
                title: "Error",
                description: "Password or email cannot be empty",
                status: "error",
            })
            dispatchAction(setSignInError(e.message))
        })
     }


     useEffect(()=>{
     }, [appleSignInError, facebookSignInError])



    const { push } = useRouter()
    
    /**
     * @appSignOut
     * @description Sign out the user
     * 
     */
    const appSignOut = () => {
        dispatchAction(setSignOutLoading(true))	
        signOut(getAuth(app)).then(()=>{
            dispatchAction(setSignOutLoading(false))
            push("/")
        }).catch((e)=>{
            dispatchAction(setSignOutError(e.message))
        })
    }


  return {
    signOutLoading,
    signOutError,
    appSignOut,
    appleSignIn,
    appleUser,
    appleSignInLoading,
    appleSignInError,
    facebookSignIn,
    facebookUser,
    facebookSignInLoading,
    facebookSignInError,
    googleSignIn,
    googleUser,
    googleSignInLoading,
    googleSignInError,
    createUserWithEmailAndPassword,
    user,
    createUserWithEmailAndPasswordLoading,
    createUserWithEmailAndPasswordError,
    signInWithEmailAndPassword: _signInWithEmailAndPassword,
    signInLoading,

  }
}

export default useAppAuth