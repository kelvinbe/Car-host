import { useAppSelector } from "../redux/store";
import { useToast } from "@chakra-ui/react";
import {
  getReservations,
  selectReservations,
  selectReservationsFeedback,
} from "../redux/reservationSlice";
import axios from "axios";
import { RESERVATION_DOMAIN } from "./constants";
import { getLocalStorage } from "../utils/utils";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { IReservation } from "../globaltypes";
import apiClient from "../utils/apiClient";
import LogRocket from "logrocket";

export default function useReservation(reservationId?: string | number, size?:number, page?:number, status?: string) {
  const { data: reservations} = useAppSelector(selectReservationsFeedback)
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [updateErrors, setUpdateErrors] = useState<any>(null);
  const [loadingRemove, setLoadingRemove] = useState(false);
  const [removeErrors, setRemoveErrors] = useState<any>(null);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [addErrors, setAddErrors] = useState<any>(null);
  const dispatch = useDispatch();
  const toast = useToast();

  function fetchReservations() {
    setLoading(true);
    apiClient
      .get(RESERVATION_DOMAIN, {
        params:{
          page,
          size,
          status
        }
      })
      .then(({ data }) => {
        dispatch(getReservations(data));
        setLoading(false);
        setErrors(null);
      })
      .catch(error=>{
        setErrors(error)
        LogRocket.error(error)
      });
  }

  function updateReservation(
    updatedBody: any,
    title: string,
    description: string
  ) {
    if (isEmpty(updatedBody))
      return setUpdateErrors({
        message: "body is empty",
      });
    setLoadingUpdate(true);
    apiClient
      .patch(
        `${RESERVATION_DOMAIN}?reservation_id=${reservationId}`,
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
        toast({
          position: "top",
          title: title,
          description: description,
          duration: 3000,
          isClosable: true,
          status: "success",
        });
      })
      .catch((error) => {
        setUpdateErrors(error);
        toast({
          position: "top",
          title: title,
          description: "An error occured",
          duration: 3000,
          isClosable: true,
          status: "error",
        });
        LogRocket.error(error)
      });
  }

  function deleteReservation(id: number) {
    setLoadingRemove(true);
    apiClient
      .delete(`${RESERVATION_DOMAIN}?reservation_id=${id}`)
      .then((res) => {
        fetchReservations();
        setLoadingRemove(false);
        toast({
          position: "top",
          title: "Delete Reservation",
          description: "Reservation deleted successfully",
          duration: 3000,
          isClosable: true,
          status: "success",
        });
      })
      .catch((error) => {
        setRemoveErrors(error);
        toast({
          position: "top",
          title: "Delete Reservation",
          description: "An error occured",
          duration: 3000,
          isClosable: true,
          status: "error",
        });
        LogRocket.error(error)
      });
  }

  function addReservation(reservation: Partial<IReservation>) {
    setLoadingAdd(true);
    if (isEmpty(reservation))
      return setAddErrors({
        message: "Reservation data is empty",
      });
    apiClient
      .post(
        RESERVATION_DOMAIN,
        reservation
      )
      .then((res) => {
        fetchReservations();
        setLoadingAdd(false);
        toast({
          position: "top",
          title: `${
            res.data.type === "Blocked" ? "Blocked" : "Create Reservation"
          }`,
          description: `${
            res.data.type === "Blocked"
              ? "Reservation blocked succesfully"
              : "Reservation created succesfully"
          }`,
          duration: 3000,
          isClosable: true,
          status: "success",
        });
      })
      .catch((error) => {
        setAddErrors(error);
        toast({
          position: "top",
          title: "Create Reservation",
          description: "Could not create a reservation",
          duration: 3000,
          isClosable: true,
          status: "success",
        });
        LogRocket.error(error)
      });
  }

  return {
    reservations,
    fetchReservations,
    loading,
    errors,
    updateReservation,
    loadingUpdate,
    updateErrors,
    selectedReservation: reservations?.find(
      ({ id: reservation_id }) => reservation_id?.toString() === reservationId
    ),
    removeErrors,
    loadingRemove,
    deleteReservation,
    addErrors,
    loadingAdd,
    addReservation,
  };
}
