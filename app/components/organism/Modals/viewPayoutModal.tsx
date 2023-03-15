import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { IPayout } from "../../../globaltypes";
import StatusTag from "../../atoms/status/StatusTag";

interface Props{
  isOpen:boolean,
  onClose:() =>  void,
  payout:IPayout
}
export default function ViewPayoutModal(props:Props) {
  const {isOpen, onClose, payout} = props
  if(!payout)return null
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false} size='xl' isCentered motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent>
        <ModalHeader textAlign={'center'}>Payout details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text marginBottom={5}>Payout Date: {payout['payout_date']}</Text>
            <Text marginBottom={5}>Amount paid: ${payout['amount']}</Text>
            <StatusTag status={payout.status}>{payout.status}</StatusTag>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
  
}