import { useEffect, useState } from 'react';
import axios from 'axios';
import { SETTINGS_ENDPOINT } from './constants';

interface Settings {
  currentPassword: string;
  NewPassword: string;
}
type Error = any;

export default function useSetSettings(props: Settings) {
  const { currentPassword, NewPassword } = props;

  const [data, setData] = useState(null);
  const [error, setError] = <Error>useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function() {
      try {
        setLoading(true);
        const response = await axios.post(SETTINGS_ENDPOINT, {
          current_password: currentPassword,
          new_password: NewPassword,
        });
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [setError, currentPassword, NewPassword]);

  return { data, error, loading };
}