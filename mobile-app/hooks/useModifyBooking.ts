import { useEffect, useState } from 'react';
import axios from 'axios';
import { MODIFY_BOOKING_ENDPOINT } from './constants';

interface Booking {
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
};
type Error = any;

export default function useEditProfile(props: Booking){

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
        status
    } = props;

    const [data, setData] = useState(null)
    const [error, setError] = <Error>useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (
            async function(){
                try{
                    setLoading(true)
                    const response = await axios.post(MODIFY_BOOKING_ENDPOINT, {
                        entity_id: entityId,
                        host_id: hostId,
                        location_id: locationId,
                        vehicle_id: vehicleId,
                        start_date_time: startDateTime,
                        end_date_time: endDateTime,
                        hourly_rate: hourlyRate,
                        total_cost: totalCost,
                        payment_id: paymentId,
                        status
                    });
                    setData(response.data);
                } catch(err){
                    setError(err)
                } finally{
                    setLoading(false)
                }
            }
        )()
    }, [
        setError,
        entityId,
        hostId,
        locationId,
        vehicleId,
        startDateTime,
        endDateTime,
        hourlyRate,
        totalCost,
        paymentId,
        status])

    return { data, error, loading }

}