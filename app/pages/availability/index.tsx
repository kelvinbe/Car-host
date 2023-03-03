import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import {data} from '../dashboard/index'
import EventModal from '../../components/organism/Modals/EventModal';
import { useDisclosure } from '@chakra-ui/react';
import useReservation from '../../hooks/useReservation';

export function getStaticProps() {
  return {
      props: {
          adminonly: false,
          authonly: true,
          dashboard: true
      }
  }
}
interface ResourcesData{
  id: string;
  title: string;
}

interface EventData{
  id: string;
  title: string;
  resourceId: string;
  start: string;
  end: string;
}

function Availability() {

  const [eventId, setEventId] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {fetchReservations, loading, errors, reservations, activeReservations}=useReservation()
  useEffect(()=>{
    fetchReservations()
  },[])
  function handleEventContent(eventInfo: any){
    return (
      <>
        <p>{eventInfo.timeText}</p>
        <p>{eventInfo.event.title}</p>
      </>
    )
  }

  function handleDateSelect(){
    alert("Date select")
  }

  function handleClick(info: { event: { id: React.SetStateAction<string>; }; }){
    onOpen()
    setEventId(info.event.id)
  }
  if (!reservations) return null
  const resourcesData: ResourcesData [] = reservations.map((item: any)=>({id: item.reservation_id, title: `${item.vehicle.make} ${item.vehicle.model}`}))
  const eventData: EventData []  = activeReservations.map((item: any)=>({
    id: item.reservation_id,
    resourceId: item.id,
    title: item.vehicle.location.market.name,
    start: item.start_date_time,
    end: item.end_date_time,
  }))
  return (
    <>
    <FullCalendar 
      schedulerLicenseKey= '<YOUR-LICENSE-KEY-GOES-HERE>'
      plugins={[resourceTimeGridPlugin, interactionPlugin, dayGridPlugin, timeGridPlugin]}
      resources={resourcesData}
      headerToolbar={{
        right: "prev,next today",
        center: "resourceTimeGridDay,timeGridWeek,dayGridMonth"
      }}
      initialView="resourceTimeGridDay"
      events={eventData}
      editable={true}
      dayMaxEvents={true}
      weekends={true}
      eventClick={handleClick}
      eventContent={handleEventContent}
      select={handleDateSelect}

    />
    <EventModal isOpen={isOpen} onClose={onClose} data={data} eventId={eventId}/>
    </>
  )
    }


export default Availability