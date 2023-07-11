import React from 'react'
import PendingConfirmationTable from '../../components/organism/Table/peding-confirmation';

function PendingConfirmation() {
  return (
    <PendingConfirmationTable/>
  )
}

export default PendingConfirmation

export function getServerSideProps() {
    return {
      props: {
        adminonly: false,
        authonly: true,
        dashboard: true,
      },
    };
  }
  