/* eslint-disable react-hooks/exhaustive-deps */
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { isEmpty } from 'lodash'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import ErrorComponent from '../components/molecules/feedback/ErrorComponent'
import LoadingComponent from '../components/molecules/feedback/LoadingComponent'
import { app } from '../firebase/firebaseApp'
import { InitialPageProps } from '../globaltypes'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { fetchOnboardingDetails, selectCompleted } from '../redux/onboardingSlice'
import { useToast } from '@chakra-ui/react'
import { fetchUser, selectUser } from '../redux/userSlice'

interface IProps {
    pageProps: InitialPageProps,
    checked: (proceed: boolean) => void
}


function CheckAuthorization(props: IProps) {
    const { pageProps: { adminonly, authonly, dashboard}, checked } = props
    const [,,error] = useAuthState(getAuth(app))
    const { pathname, push } = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const dispatch = useAppDispatch()
    const fetched_user = useAppSelector(selectUser)
    const loading = useAppSelector((state)=>{
        const is_user_fetch_loading = state.users.profileLoading
        const onboarding_loading = state.onBoarding.onBoardingLoading
        return (is_user_fetch_loading || onboarding_loading)
    })
    onAuthStateChanged(getAuth(app), (user) => {
        setUser(user)
    })

    useEffect(()=>{
        (async()=>{
            await dispatch(fetchUser())
            await dispatch(fetchOnboardingDetails())
        })()
    }, [,user, pathname])

    


    useEffect(()=>{
        const token = sessionStorage?.getItem('token')
        const completed = JSON.parse(localStorage.getItem('onboarding') ?? "{}")
        if(!isEmpty(token)){
            if (error) return ()=>{}
            if (loading) return ()=>{}
            if (!authonly) return checked(true)
            if(adminonly){
               fetched_user?.is_admin ? checked(true) : push("/auth").then(()=>{
                    checked(true)
               })
            }else {
                if (fetched_user?.is_admin) {
                    checked(true)
                }else {
                    if (completed?.profile && completed?.payout_method && completed?.location) {
                        checked(true)
                    } else{
                        push("/onboarding").then(()=>{
                            checked(true)
                        })
                    }
                }
            }
        }else{
            if (authonly || adminonly) {
                push("/auth").then(()=>{
                    checked(true)
                })
            }else{
                checked(true)
            }
        }
    }, [loading])

  return (
    <div className="flex flex-col items-center justify-start w-screen flex-1 h-full">
        { isEmpty(error) ? <LoadingComponent/> : <ErrorComponent 
            error={"Something went wrong"}
        />}
    </div>
  )
}

export default CheckAuthorization