import { createSlice } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { useRouter } from 'next/router'
import React, { useEffect, useReducer } from 'react'
import { useCreateUserWithEmailAndPassword, useSignInWithApple, useSignInWithEmailAndPassword, useSignInWithFacebook, useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { app } from '../firebase/firebaseApp'

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
        signOutError
    } , dispatchAction] = useReducer(authMiniSlice.reducer, initialState)
    const [ appleSignIn, appleUser,  appleSignInLoading, appleSignInError ] = useSignInWithApple(getAuth(app))
    const [facebookSignIn, facebookUser, facebookSignInLoading, facebookSignInError] = useSignInWithFacebook(getAuth(app))
    const [ googleSignIn, googleUser, googleSignInLoading, googleSignInError ] = useSignInWithGoogle(getAuth(app))
    const [createUserWithEmailAndPassword,user,createUserWithEmailAndPasswordLoading, createUserWithEmailAndPasswordError] = useCreateUserWithEmailAndPassword(getAuth(app));
    const [ 
        signInWithEmailAndPassword,
        s_user,
        signInWithEmailAndPasswordLoading,
        signInWithEmailAndPasswordError
     ] = useSignInWithEmailAndPassword(getAuth(app))


     useEffect(()=>{
        console.log({appleSignInError, facebookSignInError})
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
            localStorage.removeItem('admin')
        }).catch((e)=>{
            dispatchAction(setSignOutError(e.message))
            console.log(e)
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
    signInWithEmailAndPassword,
    signInWithEmailAndPasswordLoading,
    signInWithEmailAndPasswordError,

  }
}

export default useAppAuth