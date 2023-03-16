import axios from "axios";
import { STATIONS_DOMAIN } from "./constants";
import { useState } from "react";
import { isEmpty } from "lodash";
import { useToast } from "@chakra-ui/react";
import useFetchData from "./useFetchData";
import { getStations } from "../redux/stationSlice";

export default function useEditData(url:string, id:number) {
  const toast = useToast()
  const {fetchData} = useFetchData(STATIONS_DOMAIN, getStations)

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null|{message:string}>(null);

  function updateData(updatedBody: {}) {
    setLoading(true);
    if(isEmpty(updatedBody)) return setError({
        message:"body is empty"
    })
    axios
      .patch(
        `${url}/${id}`,
        { ...updatedBody },
        {
          headers: {
            Authorization: `Bearer token}`,
          },
        }
      )
      .then((res) => {
        fetchData();
        setLoading(false);
        toast({
          position: "top",
          title: 'Updated Station',
          description: "Station updated successfully",
          duration: 3000,
          isClosable: true,
          status: "success",
        })
      })
      .catch(error=>{
        setError({message:error})
        toast({
          position: "top",
          title: 'An error occurred',
          description: "Could not update station",
          duration: 3000,
          isClosable: true,
          status: "error",
        })
      });
  }
  
  return {
    updateData
  };
}