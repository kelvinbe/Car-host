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
  Input,
} from "@chakra-ui/react";
import Rounded from "../../molecules/Buttons/General/Rounded";
import { Box } from "@chakra-ui/react";
import useVehicles from "../../../hooks/useVehicles";
import useReservation from "../../../hooks/useReservation";
import dayjs from "dayjs";
import useFilter from "../../../hooks/useFilter";

export default function ReservationModal({
  isOpen,
  onClose,
  toggleViewReservationModal,
  changeStateViewModal,
  toggleEditReservationModal,
  changeStateEditModal,
  reservationId,
}: Partial<{
  isOpen: boolean;
  onClose: () => void;
  toggleViewReservationModal: boolean;
  changeStateViewModal: () => void;
  toggleEditReservationModal: boolean;
  changeStateEditModal: () => void;
  reservationId: string;
}>) {
  const [editStartTimeString, setEditStartTimeString] = useState("");
  const [editEndTimeString, setEditEndTimeString] = useState("");

  const { fetchVehicles, allVehicles } = useVehicles();
  const { updateReservation } = useReservation(reservationId);
  const { viewReservation, editReservation } = useFilter(reservationId);

  useEffect(() => {
    fetchVehicles();
  }, []);

  useEffect(() => {
    const startTime = new Date(
      dayjs(editReservation?.start_date_time).format("YYYY-MM-DDTHH:mm:ss")
    );
    const startTimeString = dayjs(startTime).format('YYYY-MM-DDTHH:mm:ss')
    console.log(startTime)
    const endTime = new Date(
      dayjs(editReservation?.end_date_time).format("YYYY-MM-DDTHH:mm:ss")
    );
    const endTimeString = dayjs(endTime).format('YYYY-MM-DDTHH:mm:ss')

    setEditStartTimeString(startTimeString);
    setEditEndTimeString(endTimeString);
  }, [editReservation]);

  const calculateTotalCost = () => {
    const editedDurationHours =
      new Date(editEndTimeString).getHours() -
      new Date(editStartTimeString).getHours();
    const editedDurationMinutes =
      new Date(editEndTimeString).getMinutes() -
      new Date(editStartTimeString).getMinutes();
    let totalEditedDurationInMinutes;

    if (editedDurationMinutes < 0) {
      totalEditedDurationInMinutes =
        (editedDurationHours - 1) * 60 +
        (new Date(editEndTimeString).getMinutes() + 60) -
        new Date(editStartTimeString).getMinutes();
    } else {
      totalEditedDurationInMinutes =
        editedDurationHours * 60 + editedDurationMinutes;
    }
    const getVehicle = allVehicles.filter(
      (vehicle) => vehicle?.plate === editReservation?.vehicle.plate
    );
    return (totalEditedDurationInMinutes / 60) * (getVehicle?.[0]?.hourly_rate ?? 0);
  };

  const handleEditReservation = () => {
    const totalCost = calculateTotalCost();
    updateReservation(
      {
        start_date_time: editStartTimeString,
        end_date_time: editEndTimeString,
        total_cost: totalCost,
      },
      "Updated",
      "Your reservation has been updated"
    );
    onClose?.();
    changeStateEditModal?.();
  };
  const handleCloseModal = () => {
    toggleViewReservationModal && changeStateViewModal?.();
    toggleEditReservationModal && changeStateEditModal?.();
    onClose?.();
  };
  return (
    <>
      <Modal
        isOpen={isOpen ?? false}
        onClose={handleCloseModal}
        blockScrollOnMount={false}
        size="xl"
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader data-cy={"modal-header"} textAlign={"center"}>
            {toggleEditReservationModal ? "Edit Reservation" : "Reservation"}
          </ModalHeader>
          <ModalCloseButton data-cy={"close-modal-button"} />
          <ModalBody>
            {toggleViewReservationModal && viewReservation && (
              <div data-cy={"view-reservation-modal"}>
                <Text marginBottom={15}>
                  <b>Reservation Number: </b>
                  {viewReservation?.id}
                </Text>
                <Text marginBottom={15}>
                  <b>Pickup time: </b>
                  {`${new Date(viewReservation.start_date_time)}`}
                </Text>
                <Text marginBottom={15}>
                  <b>Drop-off time: </b>
                  {`${new Date(viewReservation?.end_date_time)}`}
                </Text>
                <Text marginBottom={15}>
                  <b>Vehicle details: </b>
                  {`${viewReservation?.vehicle?.make} ${viewReservation?.vehicle?.model} - ${viewReservation?.vehicle?.plate}`}
                </Text>
                <Text marginBottom={15}>
                  <b>Host handle: </b>{`${viewReservation?.vehicle?.host?.fname} ${viewReservation?.vehicle?.host?.lname}`}
                </Text>
                <Text marginBottom={15}>
                  <b>Pickup location: </b>
                  {`${viewReservation?.vehicle?.station?.name}, ${viewReservation?.vehicle?.station?.sub_market.name}, ${viewReservation?.vehicle?.station?.market.name}`}
                </Text>
                <Text marginBottom={15}>
                  <b>Total cost: </b>
                  {viewReservation.vehicle.station.market.currency} {viewReservation?.payment?.tax &&
                    viewReservation?.payment?.amount -
                      viewReservation?.payment?.tax}
                </Text>
              </div>
            )}
            {toggleEditReservationModal && (
              <div data-cy={"edit-reservation-modal"}>
                <Box>
                  <Text>Change your pickup time:</Text>
                  <Input
                    size="md"
                    type="datetime-local"
                    value={editStartTimeString}
                    onChange={(e) => setEditStartTimeString(e.target.value)}
                  />
                </Box>
                <Box paddingTop={10}>
                  <Text>Change your drop-off time:</Text>
                  <Input
                    size="md"
                    type="datetime-local"
                    value={editEndTimeString}
                    onChange={(e) => setEditEndTimeString(e.target.value)}
                  />
                </Box>
              </div>
            )}
          </ModalBody>
          {toggleEditReservationModal && (
            <ModalFooter data-cy={"modal-footer"}>
              <Rounded
                variant="outline"
                fullWidth
                rounded="full"
                onClick={handleEditReservation}
              >
                Edit
              </Rounded>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
