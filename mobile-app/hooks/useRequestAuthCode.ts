import { useEffect, useState } from 'react';
import axios from 'axios';
import { REQUEST_AUTH_CODE_ENDPOINT } from './constants';
import { auth } from '../firebase/firebaseApp';
import { useDispatch } from 'react-redux';
import { setRequestAuthCode } from '../store/slices/requestAuthorizationSlice';

type Error = any;

export interface requestAuthCode {
  requestAuthCode: Boolean;
  hostId: String;
  vehicleId: String;
}

export default function useRequestAuthCode(requestAuth: requestAuthCode) {
  const [dataRequest, setData] = useState(null);
  const [err, setError] = <Error>useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { requestAuthCode, hostId, vehicleId } = requestAuth;

  const requestAuthorizationCode = () => {
    try {
      setLoading(true);
      auth?.currentUser?.getIdToken().then(async token => {
        const response = await axios.post(
          REQUEST_AUTH_CODE_ENDPOINT,
          {
            requestAuthCode,
            host_id: hostId,
            vehicle_id: vehicleId,
          },
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
        dispatch(setRequestAuthCode());
      });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestAuthorizationCode();
  }, []);
  return { dataRequest, err, loading, requestAuthorizationCode };
}
