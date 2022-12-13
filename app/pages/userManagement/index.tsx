import React from 'react'

function UserManagement() {
  return (
    <div>UserManagement</div>
  )
}

export default UserManagement

export function getStaticProps() {
    return {
        props: {
            adminonly: true,
            authonly: true,
            dashboard: true
        }
    }
}