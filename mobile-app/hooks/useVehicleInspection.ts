import { useEffect, useState } from 'react';
import axios from 'axios';

import { SET_VEHICLE_INSPECTION_ENDPOINT } from './constants';
import { vehicleInspection } from '../types';
import { auth } from '../firebase/firebaseApp';

type Error = any;

export default function useVehicleInspection(props: vehicleInspection) {
  const {
    vehicleId,
    vehicleAvailability,
    vehicleAvailabilityPictures,
    vehicleAvailabiltyDetails,
    vehicleCleanliness,
    vehicleCleanlinessDetails,
    vehicleCleanlinessPictures,
    vehicleDamage,
    vehicleDamageDetails,
    vehicleDamagePictures,
    vehicleGas,
  } = props;
  const [data, setData] = useState(null);
  const [error, setError] = <Error>useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function() {
      try {
        setLoading(true);
        auth?.currentUser?.getIdToken().then(async token => {
          const response = await axios.post(SET_VEHICLE_INSPECTION_ENDPOINT, {
            params: {
              vehicle_id: vehicleId,
              vehicleAvailability,
              vehicleAvailabilityPictures,
              vehicleAvailabiltyDetails,
              vehicleCleanliness,
              vehicleCleanlinessDetails,
              vehicleCleanlinessPictures,
              vehicleDamage,
              vehicleDamageDetails,
              vehicleDamagePictures,
              vehicleGas,
            },
            headers: {
              token: `Bearer ${token}`,
            },
          });
          setData(response.data);
        });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    });
  });

  return { data, error, loading };
}
