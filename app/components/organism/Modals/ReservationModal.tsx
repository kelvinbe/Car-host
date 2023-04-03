import { useEffect, useState } from "react";
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input
} from "@chakra-ui/react";
import Rounded from "../../molecules/Buttons/General/Rounded";
import { Box } from '@chakra-ui/react'
import useVehicles from "../../../hooks/useVehicles";
import useReservation from "../../../hooks/useReservation";
import dayjs from "dayjs";
import useFilter from "../../../hooks/useFilter";

export default function ReservationModal({ isOpen, onClose, toggleViewReservationModal, changeStateViewModal,toggleEditReservationModal, changeStateEditModal, reservationId}: any) { 
  const [editStartTime, setEditStartTime] = useState(new Date());
  const [editEndTime, setEditEndTime] = useState(new Date());
  const [editStartTimeString, setEditStartTimeString] = useState('');
  const [editEndTimeString, setEditEndTimeString] = useState('');

  const {fetchVehicles, allVehicles} = useVehicles()
  const { updateReservation} = useReservation(reservationId)
  const {viewReservation, editReservation} = useFilter(reservationId)

  useEffect(() => {
    fetchVehicles()
  },[])

  useEffect(() => {
    const startTime = new Date(dayjs(editReservation?.[0]?.start_date_time).format('YYYY-MM-DDTHH:mm:ss'))
    const startTimeString = startTime.toISOString().slice(0, 16);


    const endTime = new Date(dayjs(editReservation?.[0]?.end_date_time).format('YYYY-MM-DDTHH:mm:ss'))
    const endTimeString = endTime.toISOString().slice(0, 16);

    setEditStartTime(startTime)
    setEditEndTime(endTime)
    setEditStartTimeString(startTimeString)
    setEditEndTimeString(endTimeString)
  },[editReservation])

  const calculateTotalCost = () => {
    setEditStartTime(new Date(editStartTimeString))
    setEditEndTime(new Date(editEndTimeString))

    let editedDurationHours =new Date(editEndTimeString).getHours() - new Date(editStartTimeString).getHours()
    let editedDurationMinutes = new Date(editEndTimeString).getMinutes() - new Date(editStartTimeString).getMinutes()
    let totalEditedDurationInMinutes 

    if(editedDurationMinutes < 0){
      totalEditedDurationInMinutes = ((editedDurationHours - 1)*60) + (new Date(editEndTimeString).getMinutes() + 60) - new Date(editStartTimeString).getMinutes()
    }else{
      totalEditedDurationInMinutes = (editedDurationHours *60) + editedDurationMinutes
    }
    let getVehicle = allVehicles.filter(vehicle => vehicle?.plate === editReservation?.[0]?.plate)
    return totalEditedDurationInMinutes/60 * getVehicle?.[0]?.hourly_rate
  }

  const handleEditReservation = () => { 
   let totalCost = calculateTotalCost()
   updateReservation({
      start_date_time: editStartTimeString,
      end_date_time: editEndTimeString,
      total_cost: totalCost,  
    }, 'Updated', 'Your reservation has been updated')
    onClose()
    changeStateEditModal()
  }
  const handleCloseModal = () => {
    toggleViewReservationModal && changeStateViewModal()
    toggleEditReservationModal && changeStateEditModal()
    onClose()
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={handleCloseModal} blockScrollOnMount={false} size='xl' isCentered motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={'center'}>{toggleEditReservationModal ? "Edit Reservation" : "Reservation"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {toggleViewReservationModal && viewReservation.length !== 0 &&
              <div>
                <Text fontWeight={'bold'} marginBottom={15}>Reservation Number:{viewReservation?.[0]?.id}</Text>
                <Text marginBottom={15}>Pickup time: {`${new Date(viewReservation[0]?.start_date_time)}`}</Text>
                <Text marginBottom={15}>Drop-off time: {`${new Date(viewReservation?.[0]?.end_date_time)}`}</Text>
                <Text marginBottom={15}>Vehicle details: {`${viewReservation?.[0]?.vehicle?.make} ${viewReservation?.[0]?.vehicle?.model} - ${viewReservation?.[0]?.vehicle?.plate}`}</Text>
                <Text marginBottom={15}>Host handle: {viewReservation?.[0]?.vehicle?.host?.handle}</Text>
                <Text marginBottom={15}>Pickup location: {`${viewReservation?.[0]?.vehicle?.location?.building_name}, ${viewReservation?.[0]?.vehicle?.location?.address}, ${viewReservation?.[0]?.vehicle?.location?.market?.name}`}</Text>
                <Text marginBottom={15}>Total cost: {viewReservation?.[0]?.total_cost}</Text>
              </div>
            }
            {toggleEditReservationModal && 
              <div>
                <Box>
                  <Text>Change your pickup time:</Text>
                  <Input
                    size="md"
                    type="datetime-local"
                    value={editStartTimeString }
                    onChange={e => setEditStartTimeString(e.target.value)}
                  />
                </Box>
                <Box paddingTop={10}>
                  <Text>Change your drop-off time:</Text>
                  <Input
                    size="md"
                    type="datetime-local"
                    value={editEndTimeString}
                    onChange={e => setEditEndTimeString(e.target.value)}
                  />
                </Box>
              </div>
            }
          </ModalBody>
          {toggleEditReservationModal && <ModalFooter>
            <Rounded variant="outline" fullWidth rounded='full' onClick={handleEditReservation} >
              Edit
            </Rounded>
          </ModalFooter>}
        </ModalContent>
      </Modal>
    </>
  );
  
}
