/* eslint-disable react-hooks/exhaustive-deps */
import { getAuth } from 'firebase/auth'
import { isEmpty } from 'lodash'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
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
    const { pageProps, checked } = props
    const { adminonly, authonly } = pageProps
    const [user, loading, error] = useAuthState(getAuth(app))
    const { pathname, push } = useRouter()


    useEffect(()=>{
        //using set timeout for loading effect
        
        if(user){
            checked(true)
            /**
             * @todo check if user is admin
             */
        }
        if(isEmpty(user)){
            if(adminonly || authonly){
                checked(false)
                push('/')
            }else{
                checked(true)
            }
        }
    return ()=>{
    }
        
    }, [pathname])

  return (
    <div className="flex flex-col items-center justify-start w-screen flex-1 h-full">
        { isEmpty(error) ? <LoadingComponent/> : <ErrorComponent 
            error={error?.message}
        />}
    </div>
  )
}

export default CheckAuthorization