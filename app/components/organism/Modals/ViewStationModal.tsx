import { Box, Text } from "@chakra-ui/react";
import VehiclePic from "../../atoms/images/VehiclePic";
import StatusTag from "../../atoms/status/StatusTag";
import ModalTemplate from "./ModalTemplate";

interface Props{
    isOpen:boolean,
    onClose:() => void,
    station:{
        station_name:string,
        sub_market_name:string,
        status:'active'|'inactive',
        description:string,
        station_images:string[]
    }
}
export default function ViewStationModal({isOpen, onClose, station}:Props){
    return(
        <>
            <ModalTemplate isOpen={isOpen} onClose={onClose} headerTitle={station.station_name}>
                <Box paddingBottom={5}>
                    <Text marginBottom={5}>Description: {station.description}</Text>
                    <Text marginBottom={5}>Sub-Market Name: {station.sub_market_name}</Text>
                    <Text marginBottom={2}>{station.station_name} Image:</Text>
                    <Box marginBottom={5}>
                        {station.station_images.map(image => (
                            <VehiclePic key={image} image={image} size={'mid'}/>
                        ))}
                    </Box>
                    <StatusTag status={station.status}>{station.status}</StatusTag>
                </Box>
            </ModalTemplate>
        </>
    )
}