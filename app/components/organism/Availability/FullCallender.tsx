import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import EventModal from '../Modals/EventModal';
import { useDisclosure } from '@chakra-ui/react';
import {ResourcesData, EventData} from '../../../pages/availability/index'

  export interface IProps{
    resourcesData: ResourcesData;
    eventData: EventData
  }

function handleEventContent(eventInfo: any){
  return (
    <>
      <p>{eventInfo.timeText}</p>
      <p>{eventInfo.event.title}</p>
    </>
  )
}

function FullCallender(props:IProps) {
  const [eventId, setEventId] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  function handleDateSelect(){
    // return <EventModal isOpen={isOpen} onClose={onClose} eventId={eventId}/>
  }

  function handleClick(info: { event: { id: React.SetStateAction<string>; }; }){
    onOpen()
    setEventId(info.event.id)
  }
  return (
    <>
    <FullCalendar 
      schedulerLicenseKey= '<YOUR-LICENSE-KEY-GOES-HERE>'
      plugins={[resourceTimeGridPlugin, interactionPlugin, dayGridPlugin, timeGridPlugin]}
      resources={props.resourcesData}
      headerToolbar={{
        right: "prev,next today",
        center: "resourceTimeGridDay,timeGridWeek,dayGridMonth"
      }}
      initialView="resourceTimeGridDay"
      events={props.eventData}
      editable={true}
      selectable={true}
      dayMaxEvents={true}
      weekends={true}
      eventClick={handleClick}
      eventContent={handleEventContent}
      select={handleDateSelect}

    />
    <EventModal isOpen={isOpen} onClose={onClose} eventId={eventId}/>
    </>
  )
}

export default FullCallender