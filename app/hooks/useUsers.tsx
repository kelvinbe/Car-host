import { useAppDispatch, useAppSelector } from "../redux/store";
import { useToast } from "@chakra-ui/react";
import { selectUpdateUserProfile, updateUserProfile } from "../redux/userSlice";

export default function useUsers() {
  const dispatch = useAppDispatch();
  const toast = useToast(); 

  const {loading, user, error} = useAppSelector(selectUpdateUserProfile)
  async function editUserProfile(updatedBody: object) {
    dispatch(updateUserProfile(updatedBody)).unwrap().then(()=>{
      toast({
        position: "top",
        title: "Success",
        description: "Your profile details has been updated",
        duration: 3000,
        isClosable: true,
        status: "success",
      });
    }).catch(()=>{
      toast({
        position: "top",
        title: "Error",
        description: "Could not update your profile details",
        duration: 3000,
        isClosable: true,
        status: "error",
      });
    })
  }
  return { editUserProfile, loading, error, user };
}
