import { IVehicleDetails } from "../globaltypes"

function useVehicleFilter(vehicleId:number,vehicles:IVehicleDetails[]) {
  const selectedVehicle = vehicles.find(vehicle => vehicle.vehicle_id === vehicleId)

  return selectedVehicle
}

export default useVehicleFilter