import React from 'react'

function Analytics() {
  return (
    <div>Analytics</div>
  )
}

export default Analytics

export function getServerSideProps() {
    return {
        props: {
            adminonly: false,
            authonly: true,
            dashboard: true
        }
    }
}