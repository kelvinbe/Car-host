import { useEffect, useState } from 'react';
import axios from 'axios';

import { DELETE_PAYMENT_METHOD_ENDPOINT } from './constants';
import { auth } from '../firebase/firebaseApp';
import { IPaymentMethod } from '../types';

type Error = any;

export default function useDeletePaymentMethod(props: IPaymentMethod<any>
  ) {
  const [data, setData] = useState(null);
  const [error, setError] = <Error>useState(null);
  const [loading, setLoading] = useState(false);

  const {paymentMethodId} = props

  useEffect(() => {
    (async function() {
      try {
        setLoading(true);
        auth?.currentUser?.getIdToken().then(async token => {
          const response = await axios.delete(DELETE_PAYMENT_METHOD_ENDPOINT, {
            headers: {
              token: `Bearer ${token}`,
            },
            params: {
              payment_method_id: paymentMethodId
            }
          });
          setData(response.data);
        });
      } catch (err) {
        
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [setError]);

  return { data, error, loading };
}
