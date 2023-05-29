import FullCallender from "../../components/organism/Availability/FullCallender"
import React, { useEffect } from 'react';
import useReservation from '../../hooks/useReservation';
import useEventData from "../../hooks/useEventData";
import useResourceData from "../../hooks/useResourceData";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../components/organism/ErrorFallback";
import { logError } from "../../utils/utils";

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

  const { fetchReservations, reservations } = useReservation()
  const { fetchEvents } = useEventData()
  const { fetchResources } = useResourceData()
  useEffect(() => {
    fetchReservations()
    fetchEvents()
    fetchResources()
  }, [])

  if (!reservations) return null
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
      <FullCallender />
    </ErrorBoundary>
  )
}


export default Availability