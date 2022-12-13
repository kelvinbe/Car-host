import React from 'react'

function Integrations() {
  return (
    <div>Integrations</div>
  )
}

export default Integrations

export function getStaticProps() {
    return {
        props: {
            adminonly: false,
            authonly: true,
            dashboard: true
        }
    }
}