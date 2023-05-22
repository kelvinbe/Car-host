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
import { IReservation } from "../../../globaltypes";

export default function BlockoutModal({
  isOpen,
  onClose,
  startTime,
  endTime,
  event,
  eventId,
}: {
  isOpen: boolean;
  onClose: () => void;
  startTime: string;
  endTime: string;
  event: Partial<IReservation>;  
  eventId: string;

}) {
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
          <ModalHeader data-testid='header'>Selected Slot</ModalHeader>
          <ModalCloseButton />
          <ModalBody data-testid='blockout'>
            <Text>
              Block from {new Date(startTime).toLocaleTimeString()} to {new Date(endTime).toLocaleTimeString()}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" variant={'outline'} mr={3} onClick={onClose} data-testid='cancel'>
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
