import axios from "axios";
import { useState } from "react";
import { isEmpty } from "lodash";
import { useToast } from "@chakra-ui/react";
import apiClient from "../utils/apiClient";
import LogRocket from "logrocket";

export default function useAddNewData(url:string, fetchDataFunc: () => void, showToast?:boolean, successTitle?:string, successDescription?:string, errorTitle?:string, errorDescription?:string) {
  const toast = useToast()

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null|{message:string}>(null);

  function addData(data:{}){
    setLoading(true)
    if(isEmpty(data)) return setError({
        message: "data is empty"
    })
    apiClient.post(url, data)
    .then((res)=>{
        fetchDataFunc()
        setLoading(false)
        showToast && toast({
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
      showToast && toast({
        position: "top",
        title: errorTitle,
        description: errorDescription,
        duration: 3000,
        isClosable: true,
        status: "error",
      })
      LogRocket.error(error)
    })
  }
  
  return {
    addData
  };
}