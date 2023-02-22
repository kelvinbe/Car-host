import { useEffect, useState } from 'react';
import axios from 'axios';
import { ADD_CARD_ENDPOINT } from './constants';
import { auth } from '../firebase/firebaseApp';
import { useDispatch } from 'react-redux';
import { setCard} from '../store/slices/addCardSlice';
import { removeSpaces } from '../utils/utils';

export interface Card {
    cardNum: string,
    cardExp: string,
    cvv: string,
    name: string,
    billingZip?: string | number,
};
type Error = any;

export default function useAddCard(props: Card) {
    const [data, setData] = useState(null)
    const [error, setError] = <Error>useState(null)
    const [loading, setLoading] = useState(false)

    const{name, cardNum, cardExp, cvv} = props

    const dispatch = useDispatch()

    const addPaymentCard = (body:{}) => {
        try{
            setLoading(true)
            auth?.currentUser?.getIdToken().then(async token => {
                
            const response = await axios.post(ADD_CARD_ENDPOINT, {
                name:body?.name.payload,
                cardNum: removeSpaces(body?.cardNumber),
                cardExp: removeSpaces(body?.expDate)?.replace("/", ""),
                cvv:removeSpaces(body?.cvv),
            }, {
                headers: {
                    token: `Bearer ${token}`,
                },
            });
            dispatch(setCard({card:[name, cardNum, cardExp, cvv]}))

            if(Object.values(body).includes("")){
                setError("Fill in all fields")
                setLoading
            }
            else{ 
                setData(response.data);
                setError('')
            }
        })} catch(err){
            setError(err)
        } finally{
            setLoading(false)
        }
    }
    
    return { data, error, loading, addPaymentCard }
}