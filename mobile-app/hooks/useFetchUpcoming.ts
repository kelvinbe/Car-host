import axios from 'axios';
import {useState} from 'react'
import { FETCH_UPCOMING_RESERVATIONS_ENDPOINT } from './constants';
import { auth } from '../firebase/firebaseApp';
import { useDispatch } from 'react-redux';
import { setGetUpcomingReservations } from '../store/slices/upcomingReservationSlice';

type Error = any;

export default function useFetchUpcoming(){

    const [data, setData] = useState(null)
    const [error, setError] = <Error>useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const fetchUpcoming = async() => {
        setLoading(true)
        auth?.currentUser?.getIdToken()
        .then(token => {
            axios.get(FETCH_UPCOMING_RESERVATIONS_ENDPOINT, {
                headers: {
                    token: `Bearer ${token}`,
                },
            })
            .then((response) => {
              setData(response.data)
              dispatch(setGetUpcomingReservations({upcoming:response.data}))
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

    return { data, error, loading, fetchUpcoming }
}