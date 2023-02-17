import { useEffect, useState } from 'react';
import axios from 'axios';

import { CANCEL_BOOKING_ENDPOINT } from './constants';
import { auth } from '../firebase/firebaseApp';


type Error = any;

export default function useCancelBooking(id: string){

    const [data, setData] = useState(null)
    const [error, setError] = <Error>useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (
            async function(){
                try{
                    setLoading(true)
        auth?.currentUser?.getIdToken().then(async token => {

                    const response = await axios.put(CANCEL_BOOKING_ENDPOINT, {id}, {
                        headers: {
                          token: `Bearer ${token}`,
                        },
                      });
                    setData(response.data);
                } )}catch(err){
                    setError(err)
                } finally{
                    setLoading(false)
                }
            }
        )()
    }, [ setError,id ])

    return { data, error, loading }

}