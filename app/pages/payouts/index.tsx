import React from 'react'

function Payouts() {
  return (
    <div>Payouts</div>
  )
}

export default Payouts

export function getStaticProps() {
    return {
        props: {
            adminonly: false,
            authonly: true,
            dashboard: true
        }
    }
}