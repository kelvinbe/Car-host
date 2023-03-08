import FullCallender from "../../components/organism/Availability/FullCallender"
import React, { useEffect, useState } from 'react';
import useReservation from '../../hooks/useReservation';

export function getStaticProps() {
  return {
      props: {
          adminonly: false,
          authonly: true,
          dashboard: true
      }
  }
}
export interface ResourcesData{
  id: string;
  title: string;
}

export interface EventData{
  id: string;
  title: string;
  resourceId: string;
  start: string;
  end: string;
}

function Availability() {

  const {fetchReservations, loading, errors, reservations, activeReservations}=useReservation()
  useEffect(()=>{
    fetchReservations()
  },[])

  if (!reservations) return null
  const resourcesData: ResourcesData [] = reservations.map((item: any)=>({id: item.reservation_id, title: `${item.vehicle.make} ${item.vehicle.model}`}))
  const eventData: EventData []  = activeReservations.map((item: any)=>({
    id: item.entity_id,
    resourceId: item.reservation_id,
    title: item.vehicle.location.market.name,
    start: item.start_date_time,
    end: item.end_date_time,
  }))
  return (
    <>
    <FullCallender resourcesData={resourcesData} eventData={eventData}/>
    
    </>
  )
    }


export default Availability