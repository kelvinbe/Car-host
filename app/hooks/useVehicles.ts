import { useAppSelector, useAppDispatch } from "../redux/store";
import { getVehicles, selectVehicles } from "../redux/vehiclesSlice";
import axios from "axios";
import { VEHICLES_DOMAIN } from "./constants";
import { useState } from "react";
import { IVehicleDetails } from "../globaltypes";
import { isEmpty } from "lodash";
import { useToast } from "@chakra-ui/react";

export default function useVehicles(vehicleId?:number) {
  const dispatch = useAppDispatch();
  const allVehicles = useAppSelector(selectVehicles);
  const toast = useToast()

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null|{message:string}>(null);

  function fetchVehicles() {
    setLoading(true);
    axios
      .get(VEHICLES_DOMAIN, {
        headers: {
          Authorization: `Bearer token`,
        },
      })
      .then(({ data }) => {
        dispatch(getVehicles(data));
        setLoading(false);
        setError(null);
      })
      .catch(setError);
  }

  function updateVehicle(updatedBody: IVehicleDetails) {
    setLoading(true);
    if(isEmpty(updatedBody)) return setError({
        message:"body is empty"
    })
    axios
      .patch(
        `${VEHICLES_DOMAIN}/${vehicleId}`,
        { ...updatedBody },
        {
          headers: {
            Authorization: `Bearer token}`,
          },
        }
      )
      .then((res) => {
        fetchVehicles();
        setLoading(false);
        toast({
          position: "top",
          title: 'Updated vehicle',
          description: "Vehicle updated successfully",
          duration: 3000,
          isClosable: true,
          status: "success",
        })
      })
      .catch(error=>{
        setError({message:error})
        toast({
          position: "top",
          title: 'Could not update vehicle',
          description: "An error occured",
          duration: 3000,
          isClosable: true,
          status: "error",
        })
      });
  }

  function addVehicle(vehicle: IVehicleDetails){
    setLoading(true)
    if(isEmpty(vehicle)) return setError({
        message: "Vehicle data is empty"
    })
    axios.post(VEHICLES_DOMAIN, {...vehicle},
        {
            headers: {
                Authorization: `Bearer token`
            }
        })
    .then((res)=>{
        fetchVehicles()
        setLoading(false)
        toast({
          position: "top",
          title: "Create Vehicle",
          description: "Vehicle created succesfully",
          duration: 3000,
          isClosable: true,
          status: "success",
        })
    })
    .catch(error=>{
      setError({message:error})
      toast({
        position: "top",
        title: "Create vehicle",
        description: "Could not create a vehicle",
        duration: 3000,
        isClosable: true,
        status: "error",
      })
    })
  }
  function deleteVehicle(id: number){
    setLoading(true)
    axios.delete(`${VEHICLES_DOMAIN}/${id}`, {
        headers:{
            Authorization: `Bearer token`,
        }
    })
    .then((res)=>{
        fetchVehicles()
        setLoading(false)
        toast({
          position: "top",
          title: "Delete vehicle",
          description: "Vehicle deleted successfully",
          duration: 3000,
          isClosable: true,
          status: "success",
        })
    })
    .catch(error=>{
      setError({message:error})
      toast({
        position: "top",
        title: "Delete vehicle",
        description: "An error occured",
        duration: 3000,
        isClosable: true,
        status: "error",
      })
    })
  }
  return {
    allVehicles,
    fetchVehicles,
    addVehicle,
    deleteVehicle,
    updateVehicle
  };
}