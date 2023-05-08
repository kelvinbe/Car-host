import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useState } from 'react';
import axios from 'axios';
import { useAppDispatch } from '../redux/store';
import apiClient from '../utils/apiClient';

type Error = any;


export default function useFetchData<T>(url:string, actionFunc:(responseData: T) => void, isNotForStore?: boolean){
    const [loading, setLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<null|{}>(null)
    const dispatch = useAppDispatch()

    function fetchData() {
        setLoading(true);
        apiClient
          .get(url)
          .then(({ data }) => {
            isNotForStore ? actionFunc(data) : dispatch(actionFunc(data) as unknown as ActionCreatorWithPayload<any, any>) 
            setLoading(false);
            setErrors(null);
          })
          .catch(err => setErrors(err));
    }
    return {
        fetchData,
        loading,
        errors
    }
}