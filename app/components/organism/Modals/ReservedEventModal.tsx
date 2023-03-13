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

export default function EventModal({
  isOpen,
  onClose,
  eventId,
  selectedReservation,
}: any) {
  const { updateReservation, loadingUpdate, updateErrors } = useReservation(eventId);

  function handleUpdate(){
    if(selectedReservation.type==="Blocked"){
      updateReservation(
        { status: "Cancelled", type: "Hourly" },
        "Unblocked Reservation",
        "Time slot unblocked succesfully"
      )
    }else{
      updateReservation(
        { status: "Cancelled" },
        "Cancel Reservation",
        "Reservation cancelled succesfully"
      )
    }
  }
  if (!selectedReservation) return null;
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={false}
        size="xl"
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedReservation.vehicle.location.market.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Reservation Type: {selectedReservation.type}
            </Text>
            <Text>
              Start Time:{" "}
              {dayjs(selectedReservation.start_date_time).format("DD/MM/YYY")}
            </Text>
            <Text>
              End Time:{" "}
              {dayjs(selectedReservation.end_date_time).format("DD/MM/YYY")}
            </Text>
            <Text>
              Location Address: {selectedReservation.vehicle.location.address}
            </Text>
            <Text>Status: {capitalize(selectedReservation.status)}</Text>
            <Text>Total: {selectedReservation.total_cost}</Text>
            <Text>
              Vehicle Make: {selectedReservation.vehicle.vehicle_type}
            </Text>
            <Text>Vehicle Model: {selectedReservation.vehicle.model}</Text>
            <Box>
              {/* <Image
                src={eventDetailsData.vehicle.location.picture_url}
                alt={eventDetailsData.vehicle.vehicle_type}  
            /> */}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onClose}
              variant={"outline"}
            >
              Close
            </Button>
            {selectedReservation.status !== "Cancelled" ? (
              <Button
                variant="outline"
                colorScheme="red"
                onClick={handleUpdate}
              >
                {selectedReservation.status === "Blocked" ? "Unblock Slot": "Cancel Booking"}
              </Button>
            ) : null}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
