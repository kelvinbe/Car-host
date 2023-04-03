import { IVehicleDetails } from "../globaltypes"

function useVehicleFilter(vehicleId:string,vehicles:IVehicleDetails[]) {
  /**
   * @todo refactor this to make a request to the api
   */
  const selectedVehicle = vehicles.find(vehicle => vehicle.id === vehicleId) // ignoring this ts error, since it'll get fixed with the update mentioned above

  return selectedVehicle
}

export default useVehicleFilter