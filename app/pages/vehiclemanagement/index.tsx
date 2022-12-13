import React from 'react'

function VehicleManagement() {
  return (
    <div>VehicleManagement</div>
  )
}

export default VehicleManagement

export function getStaticProps () {
  return {
    props: {
        authonly: true,
        dashboard: true,
        adminonly: false
    }
  }
}