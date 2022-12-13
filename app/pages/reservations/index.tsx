import React from 'react'

function Reservations() {
  return (
    <div>Reservations</div>
  )
}

export default Reservations

export function getStaticProps() {
    return {
        props: {
            adminonly: false,
            authonly: true,
            dashboard: true
        }
    }
}