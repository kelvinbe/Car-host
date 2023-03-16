import { Box, Text } from "@chakra-ui/react";
import StatusTag from "../../atoms/status/StatusTag";
import ModalTemplate from "./ModalTemplate";

interface Props{
    isOpen:boolean,
    onClose:() => void,
    location:{
        address:string,
        market_name:string,
        vehicle:{
            vehicle_name:string
        },
        status:string
    }
}
export default function ViewLocationModal({isOpen, onClose, location}:Props){
    return(
        <>
            <ModalTemplate isOpen={isOpen} onClose={onClose} headerTitle={location.address}>
                <Box paddingBottom={5}>
                    <Text marginBottom={5}>Market Name: {location.market_name}</Text>
                    <Text marginBottom={5}>Vehicle: {location.vehicle.vehicle_name}</Text>
                    <StatusTag status={location.status}>{location.status}</StatusTag>
                </Box>
            </ModalTemplate>
        </>
    )
}