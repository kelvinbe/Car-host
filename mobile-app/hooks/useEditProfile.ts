import { useEffect, useState } from 'react';
import axios from 'axios';
import { EDIT_PROFILE_ENDPOINT } from './constants';
import { auth } from '../firebase/firebaseApp';


interface Profile {
    name: string
    email: string,
    pictureUrl: string
};
type Error = any;

export default function useEditProfile(props: Profile){

    const {
        name,
        email,
        pictureUrl,
    } = props;

    const [data, setData] = useState(null)
    const [error, setError] = <Error>useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (
            async function(){
                try{
                    setLoading(true)
        auth?.currentUser?.getIdToken().then(async token => {

                    const response = await axios.put(EDIT_PROFILE_ENDPOINT, {
                        name,
                        email,
                        picture_url: pictureUrl
                    }, {
                        headers: {
                          token: `Bearer ${token}`,
                        },
                      });
                    setData(response.data);
                })} catch(err){
                    setError(err)
                } finally{
                    setLoading(false)
                }
            }
        )()
    }, [setError, name, email, pictureUrl])

    return { data, error, loading }

}