import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import useVehicleFilter from "../../../hooks/useVehicleFilter"
import { capitalize} from "lodash";
import { IVehicleDetails } from "../../../globaltypes";
interface Props{
  isOpen:boolean,
  onClose:() => void,
  vehicleId:string,
  vehicles:IVehicleDetails[]
}

export default function ViewVehicleModal(props:Props) { 
  const {isOpen, onClose, vehicleId, vehicles} = props
  const selectedVehicle = useVehicleFilter(vehicleId, vehicles)
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false} size='xl' isCentered motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent data-cy={'view-vehicle-modal'}>
        {selectedVehicle && <ModalHeader textAlign={'center'}>{selectedVehicle['make']} {selectedVehicle['model']}, {selectedVehicle['plate']}</ModalHeader>}
          <ModalCloseButton data-cy={'close-modal-button'}/>
          <ModalBody>
            {selectedVehicle && 
              <div>
                  <Text paddingBottom={4}>Hourly rate: ${selectedVehicle['hourly_rate']}/hr</Text>
                  <Text paddingBottom={4}>Year of make: {selectedVehicle['year']}</Text>
                  <Text paddingBottom={4}>Transmission: {capitalize(selectedVehicle['transmission'])}</Text>
              </div>
            }
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
  
}