import axios from "axios";
import { useState } from "react";
import { isEmpty } from "lodash";
import { useToast } from "@chakra-ui/react";
import apiClient from "../utils/apiClient";
import LogRocket from "logrocket";

export default function useEditData(url:string, id:number | string, successTitle:string, successDescription:string, errorTitle:string, errorDescription:string, fetchDataFunc: () => void) {
  const toast = useToast()

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null|{message:string}>(null);

  function updateData(updatedBody: {}) {
    setLoading(true);
    if(isEmpty(updatedBody)) return setError({
        message:"body is empty"
    })
    apiClient
      .patch(
        `${url}/${id}`,
        updatedBody
      )
      .then((res) => {
        fetchDataFunc();
        setLoading(false);
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
        LogRocket.error(error)
      });
  }
  
  return {
    updateData
  };
}