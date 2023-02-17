import { useEffect, useState } from 'react';
import axios from 'axios';
import { FETCH_PAYMENT_METHODS_ENDPOINT } from './constants';
import { auth } from '../firebase/firebaseApp';

type Error = any;

export default function useFetchPayments() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function() {
      try {
        setLoading(true);
        auth?.currentUser?.getIdToken().then(async token => {
          const response = await axios.get(FETCH_PAYMENT_METHODS_ENDPOINT, {
            headers: {
              token: `Bearer ${token}`,
            },
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
