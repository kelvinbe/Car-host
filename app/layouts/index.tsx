/* eslint-disable react-hooks/exhaustive-deps */
import { createSlice } from '@reduxjs/toolkit'
import { getAuth } from 'firebase/auth'
import { intersection, isEmpty } from 'lodash'
import { useRouter } from 'next/router'
import React, { useEffect, useReducer } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { app } from '../firebase/firebaseApp'
import { IStaticProps } from '../globaltypes'
import { adminRoutesRegex, dashboardRoutesRegex, protectedRegex } from '../utils/regex'
import CheckAuthorization from './CheckAuthorization'
import Dashboardlayout from './dashboard'
import MainLayout from './main'



interface IProps {
    pageProps: IStaticProps,
    children: React.ReactNode
}

interface ILayoutReducer {
    proceed?: boolean,
    hasBeenChecked?: boolean
}

const initialState: ILayoutReducer = {
    proceed: false,
    hasBeenChecked: false
}

const layoutMiniSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        setProceed: (state, action) => {
            state.proceed = action.payload
            state.hasBeenChecked = true
        },
        setHasBeenCheched: (state, action) => {
            state.hasBeenChecked = action.payload
        }
    }
})

export const { setProceed, setHasBeenCheched } = layoutMiniSlice.actions

export const layoutReducer = layoutMiniSlice.reducer

function Layouts(props: IProps) {
    const [{
        proceed,
        hasBeenChecked
    }, dispatchAction] = useReducer(layoutReducer, initialState)
    const [user,loading,error] = useAuthState(getAuth(app))
    const { pageProps, children } = props
    console.log(pageProps)
    const { dashboard } = pageProps
    const { push, pathname } = useRouter()

    const checked = (proceed: boolean) => {
        dispatchAction(setProceed(proceed))
    }

    const uncheck = () => {
        dispatchAction(setHasBeenCheched(false))
    }

    const isAdminOnly = () =>{
        return protectedRegex.test(pathname) && adminRoutesRegex.test(pathname)
    }

    const isAuthOnly = () =>{
        return protectedRegex.test(pathname)
    }

    const isDashboardRoute = () =>{
        return dashboardRoutesRegex.test(pathname)
    }

    useEffect(()=>{
        if(user){
            user.getIdToken().then(tkn=>localStorage.setItem('idToken', tkn))
        }else{
            localStorage.removeItem('idToken')
        }
    }, [user,loading,error])



  return (
    <div className="flex flex-col items-center justify-start w-screen flex-1 min-h-screen h-full ">
        {
            proceed ? (
                dashboard ? (
                    <Dashboardlayout>
                        {children}
                    </Dashboardlayout>
                ) : (
                    <MainLayout>
                        {children}
                    </MainLayout>
                )
            ) : (
                <CheckAuthorization 
                    checked={checked}
                    pageProps={ !isEmpty(pageProps) ? pageProps : {
                        adminonly: isAdminOnly(),
                        authonly: isAuthOnly(),
                        dashboard: isDashboardRoute()
                    }}
                />
            ) 
        }
    </div>
  )
}

export default Layouts