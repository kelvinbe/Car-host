import { useEffect, useState } from 'react';
import axios from 'axios';
import { REPORT_ISSUE_ENDPOINT } from './constants';
import { auth } from '../firebase/firebaseApp';
import { useDispatch } from 'react-redux';
import { setIssues } from '../store/slices/issuesSlice';

export interface Issue {
  name: string;
  email: string;
  message: string
}

type Error = any;

export default function useReportIssue(props: Issue) {
  const dispatch = useDispatch()
  const [data, setData] = useState(null);
  const [error, setError] = <Error>useState(null);
  const [loading, setLoading] = useState(false);

  const{name, email, message} = props

  const sendIssue = (body:{}) => {
    try {
      setLoading(true);
      auth?.currentUser?.getIdToken().then(async token => {
        const response = await axios.post(
          REPORT_ISSUE_ENDPOINT,
          {
            name:body?.name,
            email:body?.email,
            message:body?.message,
          },
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        dispatch(setIssues({issues: [name, email, message]}))
        if(Object.values(body).includes("")){
          setError("Fill in all fields")
        }
        else{ 
          setData(response.data);
          setError('')
        }
      });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }
  return { data, error, loading, sendIssue };
}
