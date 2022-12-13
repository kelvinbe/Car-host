import React from 'react'

function Reports() {
  return (
    <div>Reports Page</div>
  )
}

export default Reports

export function getStaticProps() {
    return {
        props: {
            adminonly: false,
            authonly: true,
            dashboard: true
        }
    }
}