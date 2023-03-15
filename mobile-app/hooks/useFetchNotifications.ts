import { useState, useEffect } from 'react';
import axios from 'axios';
import { FETCH_NOTIFICATION_ENDPOINT } from './constants';

type Error = any;

export default function useFetchNotifications(){

    const [data, setData] = useState<any>(null)
    const [error, setError] = <Error>useState(null)
    const [loading, setLoading] = useState(false)

    const fetchNotification = () => {
        setLoading(true)
        return axios.get(FETCH_NOTIFICATION_ENDPOINT)
        .then(({data}) => {
            return data
        })
        .catch(err => {
            return err
        })
    }
    useEffect(() => {
        /**
         * the notifications will be sent to the expo endpoint, which will then send them to the user's device
         */
        // fetchNotification().then(setData).catch(err => setError(err))
    },[])
    return { data, error, loading}
}