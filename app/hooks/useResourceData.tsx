import { useState } from "react";
import axios from "axios";
import { RESOURCE_DATA_DOMAIN } from "./constants";
import { getResources, selectedResources } from "../redux/resourceSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/store";
import apiClient from "../utils/apiClient";

export default function useResourceData(){
    const [loadingResources, setLoadingResources] =useState(false);
    const resources = useAppSelector(selectedResources)
    const dispatch = useDispatch()
    function fetchResources(){
        setLoadingResources(true)
        apiClient.get(RESOURCE_DATA_DOMAIN)
        .then(({data})=>{
            setLoadingResources(false)
            dispatch(getResources(data))
        }).catch((e)=>{
            setLoadingResources(false)
        })
    }

    return {
        loadingResources, fetchResources, resources
    }
}
