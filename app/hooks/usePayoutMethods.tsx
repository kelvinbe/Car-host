import axios from 'axios';
import { PAYOUTMETHODS_API } from './constants';
import { useAppDispatch } from '../redux/store';
import { useToast } from '@chakra-ui/react';
import { fetchUser } from '../redux/userSlice';
import { getAuth } from 'firebase/auth';
import { app } from '../firebase/firebaseApp';
import apiClient from '../utils/apiClient';
import LogRocket from "logrocket";

export default function usePayoutMethods(){
    const dispatch = useAppDispatch()
    const toast = useToast()

    async function deactivatePayout(id: string, updatedBody: object) {
      try {
        const response = await apiClient.put(PAYOUTMETHODS_API, 
          {
            params:{
              id
            },
            updatedBody,
          }
        );
        dispatch(fetchUser())
        toast({
            position: "top",
            title: 'Success',
            description: 'Deactivated account',
            duration: 3000,
            isClosable: true,
            status: "success",
        })

        return response.data;
      } catch (error) {
        LogRocket.error(error);
        toast({
            position: "top",
            title: "Error",
            description: 'Could not deactivate account',
            duration: 3000,
            isClosable: true,
            status: "error",
        })
      }
    }
    return {deactivatePayout};
}