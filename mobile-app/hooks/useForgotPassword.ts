import { useEffect, useState } from 'react';
import axios from 'axios';
import { FORGOT_PASSWORD_ENDPOINT } from './constants';

type Error = any;

export default function useForgotPassword(email: string){

    const [data, setData] = useState(null)
    const [error, setError] = <Error>useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (
            async function(){
                try{
                    setLoading(true)
                    const response = await axios.post(FORGOT_PASSWORD_ENDPOINT, {email});
                    setData(response.data);
                } catch(err){
                    setError(err)
                } finally{
                    setLoading(false)
                }
            }
        )()
    }, [setError, email])

    return { data, error, loading }

}