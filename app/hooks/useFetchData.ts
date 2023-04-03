import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useState } from 'react';
import axios from 'axios';
import { useAppDispatch } from '../redux/store';

type Error = any;

export default function useFetchData<T>(url:string, actionFunc:(responseData: T) => void, isNotForStore?: boolean){
    const [loading, setLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<null|{}>(null)
    const dispatch = useAppDispatch()

    function fetchData() {
        setLoading(true);
        axios
          .get(url, {
            headers: {
              Authorization: `Bearer token`,
            },
          })
          .then(({ data }) => {
            isNotForStore ? actionFunc(data.data) : dispatch(actionFunc(data.data) as unknown as ActionCreatorWithPayload<any, any>) 
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