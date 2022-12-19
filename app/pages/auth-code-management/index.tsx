import React from 'react'

function AuthCodeManagement() {
  return (
    <div>AuthCodeManagement</div>
  )
}

export default AuthCodeManagement

export function getStaticProps() {
    return {
        props: {
            adminonly: false,
            authonly: true,
            dashboard: true
        }
    }
}