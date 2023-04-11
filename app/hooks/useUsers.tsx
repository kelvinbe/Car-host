import { USERS_DOMAIN } from "./constants";
import { useAppDispatch } from "../redux/store";
import { useToast } from "@chakra-ui/react";
import { fetchUser } from "../redux/userSlice";
import { useState } from "react";
import apiClient from "../utils/apiClient";

export default function useUsers() {
  const dispatch = useAppDispatch();
  const toast = useToast(); 
  const [loading, setLoading] = useState(false)

  async function editUserProfile(id: string, updatedBody: object) {
    setLoading(true)
    try {
      const response = await apiClient.patch(USERS_DOMAIN, {
        params:{
          id
        },
        updatedBody,
      });
      dispatch(fetchUser());
      toast({
        position: "top",
        title: "Success",
        description: "Your profile details has been updated",
        duration: 3000,
        isClosable: true,
        status: "success",
      });
      setLoading(false)
      return response.data;
    } catch (error) {
      toast({
        position: "top",
        title: "Error",
        description: "Could not update your profile details",
        duration: 3000,
        isClosable: true,
        status: "error",
      });
      setLoading(false)
    }
  }
  return { editUserProfile, loading };
}
