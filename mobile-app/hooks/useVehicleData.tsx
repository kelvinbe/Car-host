import { useEffect, useState } from 'react';
import { auth } from '../firebase/firebaseApp';
import axios from 'axios';
import { FETCH_VEHICLES_ENDPOINT } from './constants';
import { useDispatch, useSelector } from 'react-redux';
import { setGetVehicleData } from '../store/slices/vehiclesSlice';
import { isEmpty } from 'lodash';
import { selectVehicleData } from '../store/slices/vehiclesSlice';


export interface VehicleData {

  hostCode?: string;
  marketId?: string

}

type Error = any;
export default function useVehicleData() {
  const [data, setData] = useState(null);
  const [error, setError] = useState<Error>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const vehicleData = useSelector(selectVehicleData)
  const [token, setToken] = useState<string|null>(null)

  auth?.currentUser?.getIdToken().then((response) => {
    setToken(response)
})


  const fetchVehicleData = (props?: VehicleData | null) => {
      setLoading(true);
      axios.get(FETCH_VEHICLES_ENDPOINT, {
        headers: {
            token: `Bearer ${token}`,
        },params: isEmpty(props) ? null : {
          ...props
        }
    })
    .then(({data}) => {
        dispatch(setGetVehicleData({vehicleData: data}))        
    }).catch (err => {
      setError(err)
    }) .finally( () => {
      setLoading(false)
  })


  };


  return { vehicleData, error, loading, fetchVehicleData };
}
