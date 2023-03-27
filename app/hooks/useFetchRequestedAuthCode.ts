import { useState } from 'react';
import axios from 'axios';
import { useAppDispatch } from '../redux/store';

type Error = any;

export default function useFetchRequestedAuthCode(url:string, actionFunc:(responseData:[]) => void){
    const [loading, setLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<null|{}>(null)
    const dispatch = useAppDispatch()

    function fetchRequests() {
        setLoading(true);
        axios
          .get(url, {
            headers: {
              Authorization: `Bearer token`,
            },
          })
          .then(({ data }) => {
            dispatch(actionFunc(data));
            setLoading(false);
            setErrors(null);
          })
          .catch(err => setErrors(err));
    }
    return {
        fetchRequests,
        loading,
        errors
    }
}