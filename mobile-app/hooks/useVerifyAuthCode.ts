import { useEffect, useState } from 'react';
import axios from 'axios';
import { VERIFY_AUTH_CODE_ENDPOINT } from './constants';

type Error = any;

export default function useVerifyAuthCode(){

    const [data, setData] = useState(null)
    const [error, setError] = <Error>useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (
            async function(){
                try{
                    setLoading(true)
                    const response = await axios.get(VERIFY_AUTH_CODE_ENDPOINT)
                    setData(response.data)
                }catch(err){
                    setError(err)
                }finally{
                    setLoading(false)
                }
            }
        )()
    }, [setError])

    return { data, error, loading }

}