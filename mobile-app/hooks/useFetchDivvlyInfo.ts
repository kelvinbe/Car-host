import { useState } from 'react';
import axios from 'axios';
import { auth } from '../firebase/firebaseApp';

type Error = any;

export default function useFetchDivvlyInfo(endpointPath:string){

    const [data, setData] = useState<any>(null)
    const [error, setError] = <Error>useState(null)
    const [loading, setLoading] = useState(false)

    const fetchDivvlyInfo = async() => {
        setLoading(true)
        auth?.currentUser?.getIdToken()
        .then(token => {
            axios.get(endpointPath, {
                headers: {
                    token: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setData(response.data)
            }).catch(err => {
                setError(err)
            })
        })
        .catch(err => {
            setError(err)
        })
        .finally( () => {
            setLoading(false)
        })
    }

    return { data, error, loading, fetchDivvlyInfo }
}