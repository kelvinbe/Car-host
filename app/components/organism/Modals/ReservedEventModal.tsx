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
            Selected Reservation
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text data-testid={'customer'}>
              Customer: {capitalize(selectedReservation.user.fname)} {capitalize(selectedReservation.user.lname)}
            </Text>
            <Text data-testid={'type'}>
              Reservation Type: {selectedReservation.type}
            </Text>
            <Text data-testid={'start'}>
              Start Time:{" "}
              {dayjs(selectedReservation.start_date_time).format("DD/MM/YYY")}
            </Text>
            <Text data-testid={'end'}>
              End Time:{" "}
              {dayjs(selectedReservation.end_date_time).format("DD/MM/YYY")}
            </Text>
            <Text data-testid={'station'}>
              Station: {selectedReservation.vehicle.station.name}
            </Text>
            <Text data-testid={'market'}>
              Reservation Market: {selectedReservation.vehicle.station.market.name}
            </Text>
            <Text data-testid={'sub-market'}>
              Reservation Sub Market: {selectedReservation.vehicle.station.sub_market.name}
            </Text>
            <Text>Status: {capitalize(selectedReservation.status)}</Text>
            <Text>Total: {selectedReservation?.payment?.amount} </Text>
            <Text data-testid={'make'}>
              Vehicle Make: {selectedReservation.vehicle.make}
            </Text>
            <Text data-testid={'model'}>Vehicle Model: {selectedReservation.vehicle.model}</Text>
            <Text data-testid={'plate'}>Vehicle Plate: {selectedReservation.vehicle.plate}</Text>
            <Box>
              <Image
                src={selectedReservation.vehicle.pictures[0]}
                alt={selectedReservation.vehicle.make}  
            />
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
            {selectedReservation.status !== "Cancelled" || selectedReservation.status !== "Completed" ? (
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
