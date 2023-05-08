import {
Modal,
ModalOverlay,
ModalContent,
ModalHeader,
ModalBody,
ModalCloseButton,
} from "@chakra-ui/react";

interface Props{
    isOpen:boolean,
    headerTitle?:string,
    modalSize?:string,
    children:JSX.Element,
    onClose:() => void
}
  export default function ModalTemplate(props:Props) { 
    const {isOpen, onClose, headerTitle, children, modalSize} = props
    
    return (
        <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false} size={modalSize || "2xl"}  isCentered motionPreset="slideInBottom">
          <ModalOverlay />
          <ModalContent >
            <ModalHeader textAlign={'center'}>{headerTitle ?? ""}</ModalHeader>
            <ModalCloseButton data-cy="close-modal-button"/>
            <ModalBody>
                {children}
            </ModalBody>
          </ModalContent>
        </Modal>
    );
    
  }