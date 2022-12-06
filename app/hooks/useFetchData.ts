import { useEffect, useState } from 'react';
import axios from 'axios';

type Url = string;
type Error = any;

export default function useFetchData(url: Url){

    const [data, setData] = useState(null)
    const [error, setError] = <Error>useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (
            async function(){
                try{
                    setLoading(true)
                    const response = await axios.get(url)
                    setData(response.data)
                }catch(err){
                    setError(err)
                }finally{
                    setLoading(false)
                }
            }
        )()
    }, [setError, url])

    return { data, error, loading }

}