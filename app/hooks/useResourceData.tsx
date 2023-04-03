import { useState } from "react";
import axios from "axios";
import { RESOURCE_DATA_DOMAIN } from "./constants";
import { getResources, selectedResources } from "../redux/resourceSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/store";

export default function useResourceData(){
    const [loadingResources, setLoadingResources] =useState(false);
    const resources = useAppSelector(selectedResources)
    const dispatch = useDispatch()
    function fetchResources(){
        setLoadingResources(true)
        axios.get(RESOURCE_DATA_DOMAIN, {
            headers: {
                Authorization: `Bearer token`
            }
        })
        .then(({data})=>{
            setLoadingResources(false)
            dispatch(getResources(data.data))
        }).catch((e)=>{
            setLoadingResources(false)
        })
    }

    return {
        loadingResources, fetchResources, resources
    }
}
