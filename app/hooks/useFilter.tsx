import {useState, useEffect} from 'react'
import { IReservation } from '../globaltypes'
import { selectReservations } from '../redux/reservationSlice'
import { useAppSelector } from '../redux/store'

function useFilter(reservationId:string|number) {
  const reservations = useAppSelector(selectReservations)
  const [viewReservation, setViewReservation] = useState<IReservation[]>([])
  const [editReservation, setEditReservation] = useState<IReservation[]>([])

  useEffect(() => {
    let reservationToView = reservations.filter(reservation => reservation.id === reservationId)
    let reservationToEdit = reservations.filter(reservation => reservation.id === reservationId)
    setViewReservation(reservationToView)
    setEditReservation(reservationToEdit)
  },[reservations, reservationId])

  return{
    viewReservation, editReservation
  }
}

export default useFilter