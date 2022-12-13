import React from 'react'

function AllMapView() {
  return (
    <div>AllMapView</div>
  )
}

export default AllMapView

export function getStaticProps() {
    return {
        props: {
            adminonly: true,
            authonly: true,
            dashboard: true
        }
    }
}