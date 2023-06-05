/* eslint-disable react-hooks/exhaustive-deps */
import { createSlice } from '@reduxjs/toolkit'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { intersection, isEmpty, isNull } from 'lodash'
import { useRouter } from 'next/router'
import React, { useEffect, useReducer, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { app } from '../firebase/firebaseApp'
import { IStaticProps } from '../globaltypes'
import { adminRoutesRegex, dashboardRoutesRegex, protectedRegex } from '../utils/regex'
import CheckAuthorization from './CheckAuthorization'
import Dashboardlayout from './dashboard'
import MainLayout from './main'
import { useAppDispatch } from '../redux/store'
import { fetchUser } from '../redux/userSlice'



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
        }
    }
})

export const { setProceed } = layoutMiniSlice.actions

export const layoutReducer = layoutMiniSlice.reducer

function Layouts(props: IProps) {
    const [{
        proceed
    }, dispatchAction] = useReducer(layoutReducer, initialState)
    const { pageProps, children } = props
    const { dashboard } = pageProps
    const check = (proceed: boolean) => {
        dispatchAction(setProceed(proceed))
    }

    const { pathname, events } = useRouter()








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
                    checked={check}
                    pageProps={pageProps}
                />
            ) 
        }
    </div>
  )
}

export default Layouts