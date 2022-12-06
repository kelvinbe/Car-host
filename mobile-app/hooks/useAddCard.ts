import { useEffect, useState } from 'react';
import axios from 'axios';
import { ADD_CARD_ENDPOINT } from './constants';

interface Card {
    cardNum: string,
    cardExp: string,
    cardSec: string,
    firstName: string,
    lastName: string,
    billingZip?: string | number
};
type Error = any;

export default function useEditProfile(props: Card){

    const {
        cardNum,
        cardExp,
        cardSec,
        firstName,
        lastName,
        billingZip
    } = props;

    const [data, setData] = useState(null)
    const [error, setError] = <Error>useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (
            async function(){
                try{
                    setLoading(true)
                    const response = await axios.post(ADD_CARD_ENDPOINT, {
                        fname: firstName,
                        lname: lastName,
                        card_num: cardNum,
                        card_exp: cardExp,
                        card_sec: cardSec,
                        billing_zip: billingZip
                    });
                    setData(response.data);
                } catch(err){
                    setError(err)
                } finally{
                    setLoading(false)
                }
            }
        )()
    }, [setError, firstName, lastName, cardExp, cardNum, cardSec, billingZip])

    return { data, error, loading }

}