import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { blockCalendarSlot, fetchCalendarData, selectCalendarFeedback } from '../../../redux/calendarSlice';
import dayjs from 'dayjs';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Progress, useDisclosure } from '@chakra-ui/react';
import CalendarBlock from './modals/block';
import CalendarUnBlock from './modals/unblock';
import CalendarDetails from './modals/details';
import { IUserProfile, IVehicle } from '../../../globaltypes';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core';
import EmulationDeck from '../emulation-deck';
import { selectUser } from '../../../redux/userSlice';
import { DatesSetArg } from '@fullcalendar/core';





function FullCallender() {
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const calendar = useAppSelector(selectCalendarFeedback)
  const [interaction, setInteraction] = useState<"block"|"unblock"|"view"|"none">("none")
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [chosenEvent, setChosenEvent] = useState<Partial<IVehicle & {
    start_date_time: string,
    end_date_time: string,
    id: string,
    user: Partial<IUserProfile>,
    reservation_id: string,
  }>| null>(null)
  const [date, setDate] = useState<DatesSetArg|null>(null)

  const handleClose = () =>{
    onClose()
    setInteraction("none")
    setChosenEvent(null)
  }

  const handleSelect = (data: DateSelectArg) =>{
    if(user?.is_admin) return null
    const starting = data?.start
    const ending = data?.end
    const resourceId = data?.resource?.id

    if(starting && ending && resourceId){
      setChosenEvent({
        start_date_time: dayjs(starting).format(),
        end_date_time: dayjs(ending).format(),
        id: resourceId,
        ...data?.resource?._resource?.extendedProps
      })
      setInteraction("block")
      onOpen()
    }
  }

  const handleEventClick = (e: EventClickArg) =>{
    const data = e?.event?.extendedProps 

    if(data?.type === "BLOCK"){
      setChosenEvent({
        start_date_time: e?.event?.startStr,
        end_date_time: e?.event?.endStr,
        reservation_id: e?.event?.id,
        ...data?.vehicle
      })
      setInteraction("unblock")
      onOpen()
    }else{
      setChosenEvent({
        start_date_time: e?.event?.startStr,
        end_date_time: e?.event?.endStr,
        user: data?.user,
        ...data?.vehicle
      })
      setInteraction("view")
      onOpen()
    }
  }

  useEffect(()=>{
    dispatch(fetchCalendarData({
      reset: true
    }))
  }, [])


  useEffect(()=>{
    if(date){
      dispatch(fetchCalendarData({
        start_time: date?.start?.toISOString(),
        end_time: date?.end?.toISOString()
      }))
    }
  }, [date?.startStr, date?.endStr])

  return(
    <>
    {calendar?.loading && <Progress isIndeterminate colorScheme='red' />}
    <EmulationDeck 
      refetch={()=>{
        dispatch(fetchCalendarData())
      }}
    />
    <FullCalendar 
      schedulerLicenseKey= '<YOUR-LICENSE-KEY-GOES-HERE>'
      plugins={[resourceTimeGridPlugin, interactionPlugin, dayGridPlugin, timeGridPlugin]}
      headerToolbar={{
        right: "prev,next,today",
        center: "title",
        left: "resourceTimeGridDay",

      }}
      initialView="resourceTimeGridDay"
      editable={true}
      selectable={true}
      selectOverlap={false}
      dayMaxEvents={true}
      weekends={true}
      resources={calendar?.data?.resources}
      events={calendar?.data?.events}
      eventContent={(event)=>{
        return (
          <div className="grid grid-cols-3">
            <p>
              {
                event?.timeText
              }
            </p>
            <p className="col-span-2">
              {
                event?.event?.title
              }
              <br></br>
              {
                (event?.event?.extendedProps?.description)
              }
            </p>
          </div>
        )
      }}
      selectLongPressDelay={3}
      select={handleSelect}
      datesSet={(data)=>{
        setDate((prev)=>{
          if(prev?.startStr !== data?.startStr || prev?.endStr !== data?.endStr){
            return data
          }
          return prev
        })
      }}

      eventClick={handleEventClick}
    />
    {chosenEvent && <Modal isOpen={isOpen} onClose={handleClose} size="5xl" >
      <ModalOverlay/>
      <ModalContent>
      <ModalHeader>
        <ModalCloseButton />
      </ModalHeader>
        <ModalBody>
          {
            interaction === "block" ?
            <CalendarBlock  onClose={handleClose} {...chosenEvent} /> :
            interaction === "unblock" ?
            <CalendarUnBlock  onClose={handleClose} {...chosenEvent} /> :
            interaction === "view" ?
            <CalendarDetails onClose={handleClose} {...chosenEvent} /> :
            null
          }
        </ModalBody>
      </ModalContent>
    </Modal>}
    </>
  )
}

export default FullCallender