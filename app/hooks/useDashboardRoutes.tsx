import { useRouter } from 'next/router'
import React from 'react'

function useDashboardRoutes() {

    const { push } = useRouter()
    const toHome = () =>{
        push("/dashboard")
      }
      const toResports = () => {
        push("/reports")
      }
      const toVehicleManagement = () => {
        push("/vehiclemanagement")
      }
      const toReservations = () => {
        push("/reservations")
      }
      const toUsers = () => {
        push("/userManagement")
      }
      const toAnalytics = () =>{
        push("/analytics")
      }
      const toAvailability = () => {
        push("/availability")
      }
      const toLocations = () => {
        push("/locations")
      }
      const toPayouts = () =>{
        push("/payouts")
      }
      const toIntegrations = () =>{
        push("/integrations")
      }
      const toAuthCodeManagement = () =>{
        push("/authCodeManagement")
      }
    
      const toAllMapView = () =>{
        push("/allMapView")
      }
  return (
    {
        toHome: toHome,
        toResports: toResports,
        toVehicleManagement: toVehicleManagement,
        toReservations: toReservations,
        toUsers: toUsers,
        toAnalytics: toAnalytics,
        toAvailability: toAvailability,
        toLocations: toLocations,
        toPayouts: toPayouts,
        toIntegrations: toIntegrations,
        toAuthCodeManagement: toAuthCodeManagement,
        toAllMapView: toAllMapView,
    } as {
        [key: string]: ()=> void
    }
  )
}

export default useDashboardRoutes