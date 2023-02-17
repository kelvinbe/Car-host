import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { VERIFY_AUTH_CODE_ENDPOINT } from './constants';
import { useDispatch } from 'react-redux';
import { setAuthCode } from '../store/slices/bookingSlice';
import { auth } from '../firebase/firebaseApp';


type Error = any;

export default function useVerifyAuthCode(code: string){
    const reduxDispatch = useDispatch()
    const [data, setData] = useState(null)
    const [error, setError] = <Error>useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(!isEmpty(code) && code.length === 6 ){
            (
                async function(){
                    try{
                        setLoading(true)
        auth?.currentUser?.getIdToken().then(async token => {
                        
                        const response = await axios.get(VERIFY_AUTH_CODE_ENDPOINT, {
                            headers: {
                                token: `Bearer ${token}`,
                            },
                            params: {
                                code
                            },
                        }, )
                        if(response.data.status === "Valid"){
                            setData(response.data)
                            reduxDispatch(setAuthCode({authCode: code}))
                        }else{
                            setError({
                                message: "Invalid auth code"
                            })
                        }
                    })}catch(err){
                        setError(err)
                    }finally{
                        setLoading(false)
                    }
                }
            )()
        }
    }, [code])

    return {data, error, loading }

}