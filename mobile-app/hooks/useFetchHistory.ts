import { useEffect, useState } from 'react';
import axios from 'axios';
import { FETCH_HISTORY_ENDPOINT } from './constants';
import { auth } from '../firebase/firebaseApp';
import { useDispatch } from 'react-redux';
import { setGetHistoryReservations } from '../store/slices/historySlice';

type Error = any;

export default function useFetchHistory(){

    const [data, setData] = useState(null)
    const [error, setError] = <Error>useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const fetchHistory = async() => {
        setLoading(true)
        auth?.currentUser?.getIdToken()
        .then(token => {
            axios.get(FETCH_HISTORY_ENDPOINT, {
                headers: {
                    token: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setData(response.data)
                dispatch(setGetHistoryReservations({history:response.data}))
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

    return { data, error, loading, fetchHistory }
}