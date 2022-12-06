import { useEffect, useState } from 'react';
import axios from 'axios';
import { FETCH_HISTORY_ENDPOINT } from './constants';

type Error = any;

export default function useFetchHistory(){

    const [data, setData] = useState(null)
    const [error, setError] = <Error>useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (
            async function(){
                try{
                    setLoading(true)
                    const response = await axios.get(FETCH_HISTORY_ENDPOINT)
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