import { useEffect, useState } from 'react';
import axios from 'axios';
import { CREATE_PASSWORD_ENDPOINT } from './constants';

interface  Passwords {
    password: string,
    confirmPassword: string
};
type Error = any;

export default function useCreatePassword(props: Passwords){

    const { password, confirmPassword } = props;

    const [data, setData] = useState(null)
    const [error, setError] = <Error>useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (
            async function(){
                try{
                    setLoading(true)
                    const response = await axios.post(CREATE_PASSWORD_ENDPOINT, {
                        password,
                        confirm_password: confirmPassword
                    });
                    setData(response.data);
                } catch(err){
                    setError(err)
                } finally{
                    setLoading(false)
                }
            }
        )()
    }, [setError, password, confirmPassword])

    return { data, error, loading }

}