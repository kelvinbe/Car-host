import FullCallender from "../../components/organism/Availability/FullCallender"
import React, { useEffect, useState } from 'react';
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

  const {fetchReservations, loading, errors, reservations, activeReservations}=useReservation()
  const {fetchEvents, events}=useEventData()
  const {fetchResources, resources}=useResourceData()
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