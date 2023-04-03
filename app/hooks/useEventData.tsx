import { useState } from "react";
import axios from "axios";
import { EVENT_DATA_DOMAIN } from "./constants";
import { getEvents, selectedEvents } from "../redux/eventSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/store";

export default function useEventData(){
    const [loadingEvents, setLoadingEvents] =useState(false);
    const events = useAppSelector(selectedEvents)
    const dispatch=useDispatch()
    function fetchEvents(){
        setLoadingEvents(true)
        axios.get(EVENT_DATA_DOMAIN, {
            headers: {
                Authorization: `Bearer token`
            }
        })
        .then(({data})=>{
            setLoadingEvents(false)
            dispatch(getEvents(data.data))
        }).catch((e)=>{
            setLoadingEvents(false)
        })
    }

    return{
        loadingEvents, fetchEvents, events
    }
}