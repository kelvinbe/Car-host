import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";
import useReservation from "../../../hooks/useReservation";

export default function BlockoutModal({
  isOpen,
  onClose,
  startTime,
  endTime,
  event,
  eventId,
}: any) {
  const { addReservation } = useReservation(eventId);
  function handleEventBlock() {
    addReservation(event);
    onClose()
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom' isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Selected Slot</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Block from {new Date(startTime).toLocaleTimeString()} to {new Date(endTime).toLocaleTimeString()}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" variant={'outline'} mr={3} onClick={onClose}>
              Cancel
            </Button>
              <Button
                variant="outline"
                colorScheme="red"
                mr={20}
                onClick={handleEventBlock}
              >
                Block Slot
              </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
