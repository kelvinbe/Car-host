import axios from "axios";
import { LOCATIONS_DOMAIN } from "./constants";
import { useState } from "react";
import { ILocation } from "../globaltypes";
import { isEmpty } from "lodash";
import { useToast } from "@chakra-ui/react";
import useFetchData from "./useFetchData";
import { getLocations } from "../redux/locationsSlice";

export default function useAddNewData(url:string) {
  const toast = useToast()
  const {fetchData} = useFetchData(LOCATIONS_DOMAIN, getLocations)

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null|{message:string}>(null);

  function addData(data:{}){
    setLoading(true)
    if(isEmpty(location)) return setError({
        message: "location data is empty"
    })
    axios.post(url, {...data},
        {
            headers: {
                Authorization: `Bearer token`
            }
        })
    .then((res)=>{
        fetchData()
        setLoading(false)
        toast({
          position: "top",
          title: "Create Location",
          description: "Location created succesfully",
          duration: 3000,
          isClosable: true,
          status: "success",
        })
    })
    .catch(error=>{
      setError({message:error})
      toast({
        position: "top",
        title: "Create Location",
        description: "Could not create a location",
        duration: 3000,
        isClosable: true,
        status: "error",
      })
    })
  }
  
  return {
    addData
  };
}