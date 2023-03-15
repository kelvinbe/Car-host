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
interface Props{
  isOpen:boolean,
  onClose:() => void,
  vehicleId:number,
  vehicles:[]
}

export default function ViewVehicleModal(props:Props) { 
  const {isOpen, onClose, vehicleId, vehicles} = props
  const selectedVehicle = useVehicleFilter(vehicleId, vehicles)
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false} size='xl' isCentered motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent>
        {selectedVehicle && <ModalHeader textAlign={'center'}>{selectedVehicle['make']} {selectedVehicle['model']}, {selectedVehicle['plate']}</ModalHeader>}
          <ModalCloseButton />
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