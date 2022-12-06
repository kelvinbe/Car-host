import { useEffect, useState } from 'react';
import axios from 'axios';
import { REPORT_ISSUE_ENDPOINT } from './constants';

type Error = any;

export default function useReportIssue(message: string){

    const [data, setData] = useState(null)
    const [error, setError] = <Error>useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (
            async function(){
                try{
                    setLoading(true)
                    const response = await axios.post(REPORT_ISSUE_ENDPOINT, {
                        message
                    });
                    setData(response.data);
                } catch(err){
                    setError(err)
                } finally{
                    setLoading(false)
                }
            }
        )()
    }, [setError, message])

    return { data, error, loading }

}