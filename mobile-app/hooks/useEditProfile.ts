import { useEffect, useState, useReducer } from 'react';
import axios from 'axios';
import { EDIT_PROFILE_ENDPOINT } from './constants';
import { auth } from '../firebase/firebaseApp';
import useUserAuth from './useUserAuth';
import { _setEmail, _setName, _setPictureUrl } from '../store/slices/editProfileSlice';
import { editReducer } from '../store/slices/editProfileSlice';

export interface Profile {
    name: string
    email: string,
    pictureUrl: string,
    edited:boolean,
};
type Error = any;

const initialState = {
    email:'',
    name:'',
    pictureUrl:'',
    edited:false,
}
export default function useEditProfile(props: Profile){
    const {userProfile} = useUserAuth()
    let userName = `${userProfile?.fname} ${userProfile?.lname}`;

    const [ {name, email, pictureUrl}, dispatchAction ] = useReducer(editReducer, {
        ...initialState,
        email: userProfile?.email,
        name: userName,
        pictureUrl:userProfile?.profile_pic_url,
    });

    const [data, setData] = useState(null)
    const [error, setError] = <Error>useState(null)
    const [loading, setLoading] = useState(false)

    const editUserProfile = async (body:{}) => {
        try {
          setLoading(true);
          auth?.currentUser?.getIdToken().then(async token => {
            const response = await axios.put(
              EDIT_PROFILE_ENDPOINT,
              {
                name:body?.name,
                email:body?.email,
                pictureUrl: body?.pictureUrl
              },{ 
                headers: {
                  token: `Bearer ${token}`,
                },
              }
            );
            setData(response.data);
            dispatchAction(_setEmail({ email, prev: userProfile?.email }));
            dispatchAction(_setName({ name, prev: userName }));
            dispatchAction(_setPictureUrl({ pictureUrl, prev: userProfile?.profile_pic_url }));
          });
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      }
      useEffect(() => {
        editUserProfile({})
      },[])

      return { data, error, loading, editUserProfile } as const;
}