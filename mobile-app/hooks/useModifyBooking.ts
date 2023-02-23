import { useState } from 'react';
import axios from 'axios';
import { MODIFY_BOOKING_ENDPOINT } from './constants';
import { auth } from '../firebase/firebaseApp';
import { useDispatch } from 'react-redux';
import { setModifyReservation } from '../store/slices/reservationSlice';

export interface Booking {
    entityId: string,
    hostId: string,
    locationId: string,
    vehicleId: string,
    startDateTime: string,
    endDateTime: string,
    hourlyRate: string,
    totalCost: string,
    paymentId: string,
    status: string, //Todo: should be a enum
    day:string,
};
type Error = any;

export default function useModifyBooking(props: Booking){

    const {
        entityId,
        hostId,
        locationId,
        vehicleId,
        startDateTime,
        endDateTime,
        hourlyRate,
        totalCost,
        paymentId,
        status,
        day,
    } = props;

    const [data, setData] = useState(null)
    const [error, setError] = <Error>useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const modifyReservation = async() => {
        setLoading(true)
        auth?.currentUser?.getIdToken()
        .then(token => {
            axios.put(MODIFY_BOOKING_ENDPOINT, {
                    entity_id: entityId,
                    host_id: hostId,
                    location_id: locationId,
                    vehicle_id: vehicleId,
                    day,
                    start_date_time: startDateTime,
                    end_date_time: endDateTime,
                    hourly_rate: hourlyRate,
                    total_cost: totalCost,
                    payment_id: paymentId,
                    status
                }, {
                headers: {
                    token: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setData(response.data)
                dispatch(setModifyReservation())
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
    return { data, error, loading, modifyReservation }

}