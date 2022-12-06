import { useEffect, useState } from 'react';
import axios from 'axios';
import { SET_PAYMENT_ENDPOINT } from './constants';

interface PaymentMethod {
    paymentType: 'MC' | 'Visa' | 'AMEX' | 'Discover' | 'Paypal' | 'Mpesa',
    entityId?: string,
    details?: any, //TODO: should be object types for each payment type
};

type Error = any;

export default function useSetPayment(props: PaymentMethod){

    const {
        paymentType,
        entityId,
        details
    } = props;

    const [data, setData] = useState(null)
    const [error, setError] = <Error>useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (
            async function(){
                try{
                    setLoading(true)
                    const response = await axios.post(SET_PAYMENT_ENDPOINT, {
                        payment_type: paymentType,
                        entity_id: entityId,
                        details: details
                    });
                    setData(response.data);
                } catch(err){
                    setError(err)
                } finally{
                    setLoading(false)
                }
            }
        )()
    }, [setError, paymentType, entityId, details])

    return { data, error, loading }

}