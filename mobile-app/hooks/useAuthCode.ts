import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { AUTH_CODE_ENDPOINT, REQUEST_AUTH_CODE_ENDPOINT } from './constants';
import { getAuth } from 'firebase/auth';
import { app } from '../firebase/firebaseApp';
import useToast from './useToast';
import { isEmpty } from 'lodash';

type tResponse = {
    data: Record<string, string> | null;
    loading: boolean;
    error: object | null;
}

type RequestAuthCodeFn = ( data: {
    host_id: string,
    vehicle_id: string
} ) => Promise<void>


type VerifyAuthCodeFn = (code?: string | null) => Promise<void>

export default function useAuthCode(){
    const [requestAuthCodeResponse, setRequestAuthCodeResponse] = useState<tResponse>({
        data: null,
        loading: false,
        error: null
    })
    const [verifyAuthCodeResponse, setVerifyAuthCodeResponse] = useState<tResponse>({
        data: null,
        loading: false,
        error: null
    })
    const toast = useToast()


    /**
     * @name requestAuthCode
     * @description send an authcode request to the server
     */
    const requestAuthCode: RequestAuthCodeFn = async (data) => {
        setRequestAuthCodeResponse((prev)=>({
            ...prev,
            loading: true
        }))
        return getAuth(app).currentUser?.getIdToken().then(async (token)=>{
            return await axios.post(REQUEST_AUTH_CODE_ENDPOINT, {
                ...data
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "x-user": "CUSTOMER"
                }
            }).then(({data})=>{
                toast({
                    title: "Auth Code Requested",
                    message: "Wait for the host to approve your request",
                    type: "success"
                })
                setRequestAuthCodeResponse((prev)=>({
                    ...prev,
                    data: data.data,
                    loading: false
                }))
            }).catch((e: AxiosError)=>{
                setRequestAuthCodeResponse((prev)=>({
                    ...prev,
                    error: e.response?.data as object,
                    loading: false
                }))
            })
        }).catch((e: AxiosError)=>{
            setRequestAuthCodeResponse((prev)=>({
                ...prev,
                error: e.response?.data as object,
                loading: false
            }))
        })  
    }

    /**
     * @name verifyAuthCode
     * @description verify the auth code
     * 
     */

    const verifyAuthCode: VerifyAuthCodeFn = async (code) => {
        if (isEmpty(code)) return Promise.reject(setVerifyAuthCodeResponse((prev)=>({
            ...prev,
            error: {
                message: "Code is empty"
            }
        })))
        setVerifyAuthCodeResponse((prev)=>({
            ...prev,
            loading: true
        }))
        return getAuth(app).currentUser?.getIdToken().then(async (token)=>{
            return await axios.get(AUTH_CODE_ENDPOINT, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "x-user": "CUSTOMER"
                },
                params: {
                    code
                }
            }).then(({data})=>{
                setVerifyAuthCodeResponse((prev)=>({
                    ...prev,
                    data: data.data?.code, // the verified auth code
                    loading: false
                }))
            }).catch((e: AxiosError)=>{
                setVerifyAuthCodeResponse((prev)=>({
                    ...prev,
                    error: e.response?.data as object,
                    loading: false
                }))
            })
        }).catch((e)=>{
            setVerifyAuthCodeResponse((prev)=>({
                ...prev,
                error: e.response?.data as object,
                loading: false
            }))
        })
    }


    return {
        requestAuthCode,
        requestAuthCodeResponse,
        verifyAuthCode,
        verifyAuthCodeResponse
    }

}