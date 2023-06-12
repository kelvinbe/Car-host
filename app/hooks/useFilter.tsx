import React,{useState, useEffect} from 'react'
import { IReservation } from '../globaltypes'
import { selectReservations } from '../redux/reservationSlice'
import { useAppSelector } from '../redux/store'

function useFilter(reservationId?:string|number) {
  const reservations = useAppSelector(selectReservations)
  const [viewReservation, setViewReservation] = useState<Partial<IReservation>>()
  const [editReservation, setEditReservation] = useState<Partial<IReservation>>()

  useEffect(() => {
    const reservationToView = reservations.find(reservation => reservation.id === reservationId)
    const reservationToEdit = reservations.find(reservation => reservation.id === reservationId)
    reservationToView && setViewReservation(reservationToView)
    reservationToEdit && setEditReservation(reservationToEdit)
  },[reservations, reservationId])

  return{
    viewReservation, editReservation
  }
}

export default useFilter