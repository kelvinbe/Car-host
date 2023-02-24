import { useState } from 'react';
import axios from 'axios';
import { EXTEND_RESERVATION_ENDPOINT } from './constants';
import { auth } from '../firebase/firebaseApp';
import { useDispatch } from 'react-redux';
import { setExtendReservation } from '../store/slices/reservationSlice';
import useBookingActions from './useBookingActions';

type Error = any;

export default function useExtendBooking(){
    const [data, setData] = useState(null)
    const [error, setError] = <Error>useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const {bookingDetails} = useBookingActions()
    
    const extendBooking = async(reservationId:string) => {
        setLoading(true)
        auth?.currentUser?.getIdToken()
        .then(token => {
            axios.put(EXTEND_RESERVATION_ENDPOINT,{
                    dropoff_time:bookingDetails?.endDateTime,
                params:{
                    reservation_id:reservationId
                },
                headers: {
                    token: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setData(response.data)
                dispatch(setExtendReservation())
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

    return { data, error, loading, extendBooking }
}