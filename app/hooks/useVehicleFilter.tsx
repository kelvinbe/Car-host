function useVehicleFilter(vehicleId:number,vehicles:[]) {
  const selectedVehicle = vehicles.find(vehicle => vehicle.vehicle_id === vehicleId)

  return selectedVehicle
}

export default useVehicleFilter