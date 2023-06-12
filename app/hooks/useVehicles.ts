import { useAppSelector, useAppDispatch } from "../redux/store";
import { getVehicles, selectVehicles } from "../redux/vehiclesSlice";
import axios from "axios";
import { VEHICLES_DOMAIN } from "./constants";
import { useState } from "react";
import { IVehicle, IVehicleDetails, IapiResponseData } from "../globaltypes";
import { isEmpty } from "lodash";
import { useToast } from "@chakra-ui/react";
import apiClient from "../utils/apiClient";
import LogRocket from "logrocket";

export default function useVehicles(vehicle_id?:string) {
  const dispatch = useAppDispatch();
  const allVehicles = useAppSelector(selectVehicles);
  const toast = useToast()

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null|{message:string}>(null);

  function fetchVehicles() {
    setLoading(true);
    apiClient
      .get(VEHICLES_DOMAIN)
      .then(({ data }) => {
        dispatch(getVehicles(data));
        setLoading(false);
        setError(null);
      })
      .catch(setError);
  }

  function updateVehicle(updatedBody: Partial<IVehicle>) {
    if (isEmpty(vehicle_id)) return
    setLoading(true);
    if(isEmpty(updatedBody)) return setError({
        message:"body is empty"
    })
    apiClient
      .patch(
        `${VEHICLES_DOMAIN}`,
        updatedBody,
        {
          params: {
            vehicle_id
          }
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
        LogRocket.error(error)
      });
  }

  function addVehicle(vehicle: Partial<IVehicle>){
    setLoading(true)
    if(isEmpty(vehicle)) return setError({
        message: "Vehicle data is empty"
    })
    apiClient.post(VEHICLES_DOMAIN, {
      vehicle: {
        ...vehicle,
        pictures: undefined
      },
      pictures: vehicle?.pictures
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
        LogRocket.error(error)
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
      LogRocket.error(error)
    })
  }
  function deleteVehicle(id: string){
    setLoading(true)
    apiClient.put(`${VEHICLES_DOMAIN}`,{
      status: 'INACTIVE'
    }, {
        params: {
          vehicle_id: id
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
      LogRocket.error(error)
    }).finally(()=>{
      setLoading(false)
    })
  }

  type IfetchApiVehicles = {
    query:string,
    setApiData: React.Dispatch<React.SetStateAction<IapiResponseData>>
    loading: React.Dispatch<React.SetStateAction<boolean>>
  }
  function fetchApiVehicles(params:IfetchApiVehicles){
    const { query, setApiData, loading } = params
    const url = `https://public.opendatasoft.com/api/records/1.0/search/?dataset=all-vehicles-model&q=${query}&facet=make&facet=model&facet=year`
    loading(true)
    axios.get(url)
    .then((res)=>{
        setApiData(res)
    })
    .catch(error=>{
      loading(false)
      setError({message:error})
      toast({
        position: "top",
        title: "Error fetching API",
        description: "An error occured",
        duration: 3000,
        isClosable: true,
        status: "error",
      })
      LogRocket.error(error)
    })
  }
  return {
    allVehicles,
    fetchVehicles,
    addVehicle,
    deleteVehicle,
    updateVehicle,
    fetchApiVehicles,
    loading
  };
}