import React, { useReducer, useState } from 'react';
import { createSlice } from '@reduxjs/toolkit';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import { useDisclosure } from '@chakra-ui/react';
import EventMainModal from '../Modals/EventMainModal';
import { eIReservation } from '../../../entities';
import useEventData from '../../../hooks/useEventData';
import useResourceData from '../../../hooks/useResourceData';
import { useToast } from '@chakra-ui/react';
import { IReservation } from '../../../globaltypes';

function handleEventContent(eventInfo: any){
  return (
    <>
      <p>{eventInfo.timeText}</p>
      <p>{eventInfo.event.title}</p>
    </>
  )
}

const initialState: Partial<IReservation> = {
  type: "",
  start_date_time: '',
  end_date_time: '',
  status: "Upcoming",
  vehicle_id: 0,
  total_cost: 0,
  hourly_rate: 20,
  duration: 0,
  location_id: 0,
}

const eventSlice = createSlice({
  name: "events",
  initialState: {
    data: initialState
  } , 
  reducers: {
    blockEventSlot(state, action){
      state.data = action.payload
    }
  }
})

const eventReducer = eventSlice.reducer
const {blockEventSlot}=eventSlice.actions

function FullCallender() {
  const [eventId, setEventId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('')
  const [isEvent, setIsEvent]= useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [{
    data: state
  }, dispatchAction] = useReducer(eventReducer, {data: initialState})
  const {events}=useEventData()
  const {resources}=useResourceData()
  const toast = useToast()

  function handleDateSelect(eventInfo: any){
    setIsEvent(true)
    setStartTime(eventInfo.startStr)
    setEndTime(eventInfo.endStr)
    let duration = 0
    const durationInHours: number = ((new Date(eventInfo.endStr).getHours() - (new Date(eventInfo.startStr)).getHours()))
    const durationInMinutes: number = ((new Date(eventInfo.endStr).getMinutes() - (new Date(eventInfo.startStr)).getMinutes()))
    if(durationInMinutes < 0){
      duration = durationInHours - Number(durationInMinutes/60)
    }else{
      duration = durationInHours + Number(durationInMinutes/60)
    }

    if(new Date(eventInfo.startStr) <= new Date() ){
      toast({
        position: "top",
        title: "Date Error",
        description: "The selected start time or date is behind the current time",
        duration: 3000,
        isClosable: true,
        status: "error",
      })
    }else{
      dispatchAction(blockEventSlot({
        type: "Blocked",
        start_date_time: eventInfo.startStr,
        end_date_time: eventInfo.endStr,
        status: "Blocked",
        vehicle_id: eventInfo.resource.id,
        total_cost: 0,
        hourly_rate: 20,
        duration: duration,
      }))
      onOpen()
    }
  }

  function handleClick(info: { event: { id: React.SetStateAction<string>; }; }){
    setIsEvent(false)
    onOpen()
    setEventId(info.event.id)
  }
  return (
    <>
    <FullCalendar 
      schedulerLicenseKey= '<YOUR-LICENSE-KEY-GOES-HERE>'
      plugins={[resourceTimeGridPlugin, interactionPlugin, dayGridPlugin, timeGridPlugin]}
      resources={resources}
      headerToolbar={{
        right: "prev,next,today",
      }}
      initialView="resourceTimeGridDay"
      events={events}
      editable={true}
      selectable={true}
      selectOverlap={false}
      dayMaxEvents={true}
      weekends={true}
      eventClick={handleClick}
      eventContent={handleEventContent}
      select={handleDateSelect}

    />
    <EventMainModal isOpen={isOpen} onClose={onClose} isEvent={isEvent} eventId={eventId} startTime={startTime} endTime={endTime} event={state}/> 
    </>
  )
}

export default FullCallender