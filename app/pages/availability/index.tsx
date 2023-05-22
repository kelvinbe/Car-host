import FullCallender from "../../components/organism/Availability/FullCallender"
import React, { useEffect } from 'react';
import useReservation from '../../hooks/useReservation';
import useEventData from "../../hooks/useEventData";
import useResourceData from "../../hooks/useResourceData";

export function getStaticProps() {
  return {
      props: {
          adminonly: false,
          authonly: true,
          dashboard: true
      }
  }
}

function Availability() {

  const {fetchReservations, reservations}=useReservation()
  const {fetchEvents}=useEventData()
  const {fetchResources}=useResourceData()
  useEffect(()=>{
    fetchReservations()
    fetchEvents()
    fetchResources()
  },[])
  
  if (!reservations) return null
  return (
    <>
    <FullCallender />
    </>
  )
    }


export default Availability