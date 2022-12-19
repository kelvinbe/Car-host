import { createSlice } from '@reduxjs/toolkit'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'next/router'
import React, { useReducer } from 'react'
import { app } from '../firebase/firebaseApp'

interface IReducerState {
    signOutLoading: boolean,
    signOutError: string
}

const initialState: IReducerState = {
    signOutLoading: false,
    signOutError: ''
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
        }
    }    
})

const { setSignOutLoading, setSignOutError } = authMiniSlice.actions



function useAppAuth() {
    const [ {
        signOutLoading,
        signOutError
    } , dispatchAction] = useReducer(authMiniSlice.reducer, initialState)

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
    appSignOut
  }
}

export default useAppAuth