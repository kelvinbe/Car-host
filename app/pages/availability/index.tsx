import FullCallender from "../../components/organism/Availability/FullCallender"
import React, { useEffect } from 'react';
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../components/organism/ErrorFallback";
import { logError } from "../../utils/utils";


export function getServerSideProps() {
  return {
    props: {
      adminonly: false,
      authonly: true,
      dashboard: true
    }
  }
}

function Availability() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
      <FullCallender />
    </ErrorBoundary>
  )
}


export default Availability