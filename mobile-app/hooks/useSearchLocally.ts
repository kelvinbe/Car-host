import { useEffect, useState } from 'react';
import axios from 'axios';
import { SEARCH_LOCALLY_ENDPOINT } from './constants';

type Error = any;

export default function useSearchLocally(){

    const [data, setData] = useState(null)
    const [error, setError] = <Error>useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (
            async function(){
                try{
                    setLoading(true)
                    const response = await axios.get(SEARCH_LOCALLY_ENDPOINT)
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