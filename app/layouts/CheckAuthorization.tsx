/* eslint-disable react-hooks/exhaustive-deps */
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { isEmpty } from 'lodash'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import ErrorComponent from '../components/molecules/feedback/ErrorComponent'
import LoadingComponent from '../components/molecules/feedback/LoadingComponent'
import { app } from '../firebase/firebaseApp'
import { IStaticProps } from '../globaltypes'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { fetchOnboardingDetails, selectCompleted } from '../redux/onboardingSlice'
import { useToast } from '@chakra-ui/react'
import { selectUser } from '../redux/userSlice'
import LogRocket from 'logrocket'

interface IProps {
    pageProps: IStaticProps,
    checked: (proceed: boolean) => void
}


function CheckAuthorization(props: IProps) {
    const { pageProps: { adminonly, authonly, dashboard }, checked } = props
    const [appUser, loading, error] = useAuthState(getAuth(app))
    const { pathname, push } = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const toast = useToast()
    const dispatch = useAppDispatch()
    const fetched_user = useAppSelector(selectUser)
    const fetched_onboarding_n_times = useRef(0)
    const completed =  useAppSelector(selectCompleted)
    onAuthStateChanged(getAuth(app), (user) => {
        setUser(user)
    })


    useEffect(()=>{
            if (loading) return ()=>{}
            if (error) return checked(false)
            if(!isEmpty(user)){
                if (!authonly) return checked(true)
                if(adminonly){
                   fetched_user?.is_admin ? checked(true) : push("/").then(()=>{
                        checked(true)
                   })
                }else {
                    if (fetched_user?.is_admin) {
                        checked(true)
                    }else {
                        if (fetched_onboarding_n_times.current > 2) {
                            if (completed.profile && completed.payout_method && completed.location) {
                                checked(true)
                            } else{
                                push("/onboarding").then(()=>{
                                    checked(true)
                                })
                            }
                        }else{
                            dispatch(fetchOnboardingDetails()).unwrap().then(({completed})=>{
                                if (completed.profile && completed.payout_method && completed.location) {
                                    fetched_onboarding_n_times.current += 1
                                    checked(true)
                                } else{
                                    push("/onboarding").then(()=>{
                                        checked(true)
                                    })
                                }
                            }).catch((e)=>{
                                toast({
                                    position: "top",
                                    title: "Error",
                                    description: "We are unable to log you in now, please try again later",
                                    status: "error",
                                    duration: 5000,
                                })
                                LogRocket.error(e)
                                push("/").then(()=>{
                                    checked(true)
                                })
                            })
                        }
                        
                    }
                    
                }
            }else{
                if (authonly || adminonly) {
                    push("/").then(()=>{
                        checked(true)
                    })
                }else{
                    checked(true)
                }
            }
        
    }, [,loading, error, pathname, user])

  return (
    <div className="flex flex-col items-center justify-start w-screen flex-1 h-full">
        { isEmpty(error) ? <LoadingComponent/> : <ErrorComponent 
            error={error?.message}
        />}
    </div>
  )
}

export default CheckAuthorization