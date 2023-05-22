/* eslint-disable react-hooks/exhaustive-deps */
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Spinner,
} from "@chakra-ui/react";
import { IVehicle } from "../../../globaltypes";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { fetchVehicle, selectFetchVehicleFeedback } from "../../../redux/vehiclesSlice";
import { useEffect } from "react";
import { selectUser } from "../../../redux/userSlice";
interface Props{
  isOpen:boolean,
  onClose:() => void,
  vehicleId?:string | null,
  vehicles:Partial<IVehicle>[]
}

export default function ViewVehicleModal(props:Props) { 
  const {isOpen, onClose, vehicleId } = props
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const { data, loading } = useAppSelector(selectFetchVehicleFeedback)

  useEffect(()=>{
    vehicleId && dispatch(fetchVehicle({
      vehicle_id:vehicleId
    }))
  }, [])

  

  return (
      <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false} size='xl' isCentered motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent data-cy={'view-vehicle-modal'}>
          {
            loading ? (<div className='w-full h-full items-center justify-center flex' >
              <Spinner colorScheme="green" size={"md"} />
            </div>) : (
              <>
                <ModalHeader textAlign={'center'}>{data?.make} {data?.model}, {data?.plate}</ModalHeader>
                <ModalCloseButton data-cy={'close-modal-button'}/>
                <ModalBody>
                    <div>
                        <Text paddingBottom={4}>Hourly rate: {user?.market?.currency} {data?.hourly_rate}/hr</Text>
                        <Text paddingBottom={4}>Year of make: {data?.year}</Text>
                        <Text paddingBottom={4}>Transmission: {data?.transmission}</Text>
                    </div>
                </ModalBody>
              </>
              )
          }
        </ModalContent>
      </Modal>
  );
  
}