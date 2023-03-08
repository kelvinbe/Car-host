import { useDispatch } from "react-redux";
import {
  Button,
  Text,
  Box,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import useReservation from "../../../hooks/useReservation";
import dayjs from "dayjs";
import { capitalize } from "lodash";

export default function EventModal({ isOpen, onClose, eventId}: any) { 
  const {updateReservation, selectedReservation, loadingUpdate, updateErrors} = useReservation(eventId)

  if(!selectedReservation) return null  
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false} size='xl' isCentered motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedReservation.vehicle.location.market.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
                Start Time: {dayjs(selectedReservation.start_date_time).format("DD/MM/YYY")}
            </Text>
            <Text>
                End Time: {dayjs(selectedReservation.end_date_time).format("DD/MM/YYY")}
            </Text>
            <Text>
                Location Address: {selectedReservation.vehicle.location.address}
            </Text>
            <Text>
                Status: {capitalize(selectedReservation.status)}
            </Text>
            <Text>
                Total: {selectedReservation.total_cost}
            </Text>
            <Text>
                Vehicle Make: {selectedReservation.vehicle.vehicle_type}
            </Text>
            <Text>
                Vehicle Model: {selectedReservation.vehicle.model}
            </Text>
            <Box>
            {/* <Image
                src={eventDetailsData.vehicle.location.picture_url}
                alt={eventDetailsData.vehicle.vehicle_type}  
            /> */}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose} variant={'outline'}>
              Close
            </Button>
            {selectedReservation.status !== "Cancelled"? <Button variant="outline" colorScheme="red" onClick={()=>updateReservation({status: "Cancelled"}, "Cancell Reservation", "Reservation cancelled succesfully")}>Cancel Booking</Button>: null}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
  
}
