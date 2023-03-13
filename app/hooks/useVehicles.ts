import { useAppSelector, useAppDispatch } from "../redux/store";
import { getVehicles, selectVehicles } from "../redux/vehiclesSlice";
import axios from "axios";
import { VEHICLES_DOMAIN } from "./constants";
import { useState } from "react";

export default function useVehicles() {
  const dispatch = useAppDispatch();
  const allVehicles = useAppSelector(selectVehicles);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function fetchVehicles() {
    setLoading(true);
    axios
      .get(VEHICLES_DOMAIN, {
        headers: {
          Authorization: `Bearer token`,
        },
      })
      .then(({ data }) => {
        dispatch(getVehicles(data));
        setLoading(false);
        setError(null);
      })
      .catch(setError);
  }

  return {
    allVehicles,
    fetchVehicles
  };
}
