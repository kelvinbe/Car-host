import { useAppSelector } from "../redux/store";
import {
  getReservations,
  selectActiveReservations,
  selectReservations,
} from "../redux/reservationSlice";
import axios from "axios";
import { RESERVATION_DOMAIN } from "./constants";
import { getLocalStorage } from "../utils/utils";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { IReservation } from "../globaltypes";


export default function useReservation(reservationId?: number) {

  const reservations = useAppSelector(selectReservations);
  const activeReservations = useAppSelector(selectActiveReservations);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [updateErrors, setUpdateErrors] = useState<any>(null);
  const [loadingRemove, setLoadingRemove] = useState(false);
  const [removeErrors, setRemoveErrors] = useState<any>(null);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [addErrors, setAddErrors] = useState<any>(null);
  const dispatch = useDispatch();
  function fetchReservations() {
    setLoading(true);
    axios
      .get(RESERVATION_DOMAIN, {
        headers: {
          Authorization: `Bearer token`,
        },
      })
      .then(({ data }) => {
        dispatch(getReservations(data));
        setLoading(false);
        setErrors(null);
      })
      .catch(setErrors);
  }

  function updateReservation(updatedBody: any) {
    if(isEmpty(updatedBody)) return setUpdateErrors({
        message:"body is empty"
    })
    setLoadingUpdate(true);
    axios
      .patch(
        `${RESERVATION_DOMAIN}/${reservationId}`,
        { ...updatedBody },
        {
          headers: {
            Authorization: `Bearer token}`,
          },
        }
      )
      .then((res) => {
        fetchReservations();
        setLoadingUpdate(false);
      })
      .catch(setUpdateErrors);
  }

  function deleteReservation(id: string){
    setLoadingRemove(true)
    axios.delete(`${RESERVATION_DOMAIN}/${id}`, {
        headers:{
            Authorization: `Bearer token`,
        }
    })
    .then((res)=>{
        fetchReservations()
        setLoadingRemove(false)
    })
    .catch(setRemoveErrors)
  }

  function addReservation(reservation: IReservation){
    setLoadingAdd(true)
    if(isEmpty(reservation)) return setAddErrors({
        message: "Reservation data is empty"
    })
    axios.post(RESERVATION_DOMAIN, {...reservation},
        {
            headers: {
                Authorization: `Bearer token`
            }
        })
    .then((res)=>{
        fetchReservations()
        setLoadingAdd(false)
    })
    .catch(setAddErrors)

  }
  
  return {
    reservations,
    fetchReservations,
    loading,
    errors,
    activeReservations,
    updateReservation,
    loadingUpdate,
    updateErrors,
    selectedReservation: reservations.find(({reservation_id})=>reservation_id?.toString()===reservationId),
    removeErrors,
    loadingRemove,
    deleteReservation,
    addErrors,
    loadingAdd,
    addReservation,
  };
}
