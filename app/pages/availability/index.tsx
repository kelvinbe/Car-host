import React from 'react'

function Availability() {
  return (
    <div>Availability</div>
  )
}

export default Availability

export function getStaticProps() {
    return {
        props: {
            adminonly: false,
            authonly: true,
            dashboard: true
        }
    }
}