import axios from "axios";
import { STATIONS_DOMAIN } from "./constants";
import { useState } from "react";
import { isEmpty } from "lodash";
import { useToast } from "@chakra-ui/react";
import useFetchData from "./useFetchData";
import { getStations } from "../redux/stationSlice";

export default function useAddNewData(url:string) {
  const toast = useToast()
  const {fetchData} = useFetchData(STATIONS_DOMAIN, getStations)

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null|{message:string}>(null);

  function addData(data:{}){
    setLoading(true)
    if(isEmpty(data)) return setError({
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
          title: "Create Station",
          description: "Station created succesfully",
          duration: 3000,
          isClosable: true,
          status: "success",
        })
    })
    .catch(error=>{
      setError({message:error})
      toast({
        position: "top",
        title: "Create Station",
        description: "Could not create a station",
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