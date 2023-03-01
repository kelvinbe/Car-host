import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from 'axios';
import { auth } from '../firebase/firebaseApp'
import { EDIT_DRIVERS_LICENSE_ENDPOINT } from "./constants";
import { editDriversLicenseUrl } from "../store/slices/driversLicenseSlice";


export interface editDriversLicense{
    driversLicense: string
}

type Error = any

export default function useEditDriversLicense(props: editDriversLicense) {

    const [editedData, setEditedData] = useState(null);
    const [err, setError] = <Error>useState(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()

    const {driversLicense} = props


    const editDriversLicense = (image: string) => {

        try {
            auth.currentUser?.getIdToken().then(async token => {
                const response = await axios.put(
                    EDIT_DRIVERS_LICENSE_ENDPOINT,{
                    drivers_license: image
                },
                {
                    headers: {
                        token: `Bearer ${token}`
                    }
                }    

                );
                setEditedData(response.data)
                dispatch(editDriversLicenseUrl(image))
            })
            
        } catch (error) {
            setError(error)
            
        }finally{
            setLoading(false)
        }
    }

    return {editedData, err, loading, editDriversLicense}

}