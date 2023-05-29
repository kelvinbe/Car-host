import { useState } from 'react';
import axios from 'axios';
import { useAppDispatch } from '../redux/store';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import apiClient from '../utils/apiClient';
import LogRocket from "logrocket";
type Error = any;

export default function useFetchRequestedAuthCode<T>(url:string, actionFunc:(responseData:T) => void){
    const [loading, setLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<null|{}>(null)
    const dispatch = useAppDispatch()

    function fetchRequests() {
        setLoading(true);
        apiClient
          .get(url)
          .then(({ data }) => {
            dispatch(actionFunc(data) as unknown as ActionCreatorWithPayload<any, any>);
            setLoading(false);
            setErrors(null);
          })
          .catch(err => {
            setErrors(err)
            LogRocket.error(err)
          });
    }
    return {
        fetchRequests,
        loading,
        errors
    }
}