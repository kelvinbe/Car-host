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

interface IProps {
    pageProps: IStaticProps,
    checked: (proceed: boolean) => void
}


function CheckAuthorization(props: IProps) {
    const { pageProps, checked } = props
    const { adminonly, authonly } = pageProps
    const [user, loading, error] = useAuthState(getAuth(app))
    const { pathname } = useRouter()


    useEffect(()=>{
        //using set timeout for loading effect
    const timeoutRef = setTimeout(()=>{
        console.log(`Checking authorization for ${pathname}`)
        if(authonly){
            if(!loading){
                if(user){
                    if(adminonly){
                        console.log(typeof localStorage.getItem('admin'))
                        if(localStorage.getItem('admin')){
                            checked(true)
                        }else{
                            checked(false)
                        }
                    }else{
                        checked(true)
                    }
                }else{
                    checked(false)
                }
            }
        }else{
            checked(true)
        }
    }, 3000)

    return ()=>{
        clearTimeout(timeoutRef)
    }
        
    }, [user, loading, pathname])

  return (
    <div className="flex flex-col items-center justify-start w-screen flex-1 h-full">
        { isEmpty(error) ? <LoadingComponent/> : <ErrorComponent 
            error={error?.message}
        />}
    </div>
  )
}

export default CheckAuthorization