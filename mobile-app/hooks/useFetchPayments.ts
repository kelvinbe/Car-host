import { useEffect, useState } from 'react';
import axios from 'axios';
import { FETCH_PAYMENT_METHODS_ENDPOINT } from './constants';
import { auth } from '../firebase/firebaseApp';
import { useDispatch } from 'react-redux';
import { setPaymentMethods } from '../store/slices/paymentMethodSlice';

type Error = any;

export default function useFetchPayments() {
  const [data, setData] = useState(null);
  const [error, setError] = <Error>useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()



  const fetchPayments = () => {

    try {
      setLoading(true);
      auth?.currentUser?.getIdToken().then(async token => {
        const response = await axios.get(FETCH_PAYMENT_METHODS_ENDPOINT, {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        setData(response.data);
        dispatch(setPaymentMethods(response.data))

      });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    fetchPayments()
  }, []);

  return { data, error, loading, fetchPayments };
}
