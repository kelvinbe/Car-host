import axios from "axios";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import apiClient from "../utils/apiClient";

export default function useDeleteData(url:string, successTitle:string, successDescription:string, errorTitle:string, errorDescription:string, fetchDataFunc: () => void) {
  const toast = useToast()

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null|{message:string}>(null);

  function deleteData(id: number){
    setLoading(true)
    apiClient.delete(`${url}/${id}`)
    .then((res)=>{
        fetchDataFunc()
        setLoading(false)
        toast({
          position: "top",
          title: successTitle,
          description: successDescription,
          duration: 3000,
          isClosable: true,
          status: "success",
        })
    })
    .catch(error=>{
      setError({message:error})
      toast({
        position: "top",
        title: errorTitle,
        description: errorDescription,
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