import { useEffect, useState } from 'react';
import axios from 'axios';
import { EDIT_PROFILE_ENDPOINT } from './constants';

interface Profile {
    firstName: string,
    lastName: string,
    email: string,
    pictureUrl: string
};
type Error = any;

export default function useEditProfile(props: Profile){

    const {
        firstName,
        lastName,
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
                    const response = await axios.post(EDIT_PROFILE_ENDPOINT, {
                        fname: firstName,
                        lname: lastName,
                        emal: email,
                        picture_url: pictureUrl
                    });
                    setData(response.data);
                } catch(err){
                    setError(err)
                } finally{
                    setLoading(false)
                }
            }
        )()
    }, [setError, firstName, lastName, email, pictureUrl])

    return { data, error, loading }

}