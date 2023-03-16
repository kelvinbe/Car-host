import axios from "axios";
import { LOCATIONS_DOMAIN } from "./constants";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import useFetchData from "./useFetchData";
import { getLocations } from "../redux/locationsSlice";

export default function useDeleteData(url:string) {
  const toast = useToast()
  const {fetchData} = useFetchData(LOCATIONS_DOMAIN, getLocations)

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null|{message:string}>(null);

  function deleteData(id: number){
    setLoading(true)
    axios.delete(`${url}/${id}`, {
        headers:{
            Authorization: `Bearer token`,
        }
    })
    .then((res)=>{
        fetchData()
        setLoading(false)
        toast({
          position: "top",
          title: "Delete Location",
          description: "Location deleted successfully",
          duration: 3000,
          isClosable: true,
          status: "success",
        })
    })
    .catch(error=>{
      setError({message:error})
      toast({
        position: "top",
        title: "Delete Location",
        description: "An error occured. Could not delete location",
        duration: 3000,
        isClosable: true,
        status: "error",
      })
    })
  }
  
  return {
    deleteData
  };
}