import { useEffect, useState } from 'react';
import { auth } from '../firebase/firebaseApp';
import axios from 'axios';
import { FETCH_VEHICLES_ENDPOINT } from './constants';
import { useDispatch } from 'react-redux';
import { setGetVehicleData } from '../store/slices/vehiclesSlice';


export interface VehicleData {

  hostId: string;
  marketId: string

}

type Error = any;
export default function useVehicleData(props: VehicleData) {
  const [data, setData] = useState(null);
  const [error, setError] = useState<Error>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const {hostId, marketId} = props

  const fetchVehicleData = () => {
    try {
      setLoading(true);
      auth?.currentUser?.getIdToken().then(async token => {
        const response = await axios.get(FETCH_VEHICLES_ENDPOINT, {
          
          headers: {
            token: `Bearer ${token}`,
          },
          params: {
            host_id: hostId,
            market_id: marketId
          }
        });
        setData(response.data);
        dispatch(setGetVehicleData(response.data));
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicleData();
  }, []);

  return { data, error, loading, fetchVehicleData };
}
