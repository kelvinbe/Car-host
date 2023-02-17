import { useEffect, useState } from 'react';
import axios from 'axios';
import { REPORT_ISSUE_ENDPOINT } from './constants';
import { auth } from '../firebase/firebaseApp';


interface iProps {
  name: string;
  email: string;
  message: string
}

type Error = any;

export default function useReportIssue(props: iProps) {
  const [data, setData] = useState(null);
  const [error, setError] = <Error>useState(null);
  const [loading, setLoading] = useState(false);


  const{name, email, message} = props

  useEffect(() => {
    (async function() {
      try {
        setLoading(true);
        auth?.currentUser?.getIdToken().then(async token => {
          const response = await axios.post(
            REPORT_ISSUE_ENDPOINT,
            {
               name, email, message
            },
            {
              headers: {
                token: `Bearer ${token}`,
              },
            }
          );
          setData(response.data);
        });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [setError,name, email, message]);

  return { data, error, loading };
}
