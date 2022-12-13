import React from 'react'

function Locations() {
  return (
    <div>Locations</div>
  )
}

export default Locations

export function getStaticProps() {
    return {
        props: {
            adminonly: false,
            authonly: true,
            dashboard: true
        }
    }
}