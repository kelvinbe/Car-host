/* eslint-disable react-hooks/exhaustive-deps */
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { isEmpty } from 'lodash'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import ErrorComponent from '../components/molecules/feedback/ErrorComponent'
import LoadingComponent from '../components/molecules/feedback/LoadingComponent'
import { app } from '../firebase/firebaseApp'
import { IStaticProps } from '../globaltypes'
import { adminRoutesRegex, dashboardRoutesRegex, protectedRegex } from '../utils/regex'

interface IProps {
    pageProps: IStaticProps,
    checked: (proceed: boolean) => void
}


function CheckAuthorization(props: IProps) {
    const { pageProps: { adminonly, authonly, dashboard }, checked } = props
    const [appUser, loading, error] = useAuthState(getAuth(app))
    const { pathname, push } = useRouter()
    const [user, setUser] = useState<User | null>(null)

    onAuthStateChanged(getAuth(app), (user) => {
        setUser(user)
    })


    useEffect(()=>{
            if (loading) return ()=>{}
            if (error) return checked(false)
            if(!isEmpty(user)){
                if (!authonly) return checked(true)
                if(adminonly){
                    /**
                     * @todo check if user is admin from db and redirect to dashboard
                     */
                }else {
                    checked(true)
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

        return ()=>{
            // clearTimeout(timeout_ref)
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