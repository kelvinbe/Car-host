import { useState } from "react";
import axios from "axios";
import { EVENT_DATA_DOMAIN } from "./constants";
import { getEvents, selectedEvents } from "../redux/eventSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/store";
import apiClient from "../utils/apiClient";

export default function useEventData(){
    const [loadingEvents, setLoadingEvents] =useState(false);
    const events = useAppSelector(selectedEvents)
    const dispatch=useDispatch()
    function fetchEvents(){
        setLoadingEvents(true)
        apiClient.get(EVENT_DATA_DOMAIN)
        .then(({data})=>{
            setLoadingEvents(false)
            dispatch(getEvents(data))
        }).catch((e)=>{
            setLoadingEvents(false)
        })
    }

    return{
        loadingEvents, fetchEvents, events
    }
}