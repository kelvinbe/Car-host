import { Box, Text } from "@chakra-ui/react";
import { IStation } from "../../../globaltypes";
import VehiclePic from "../../atoms/images/VehiclePic";
import StatusTag from "../../atoms/status/StatusTag";
import ModalTemplate from "./ModalTemplate";

interface Props{
    isOpen:boolean,
    onClose:() => void,
    station:Partial<IStation>|null
}
export default function ViewStationModal({isOpen, onClose, station}:Props){
    return(
        <>
            <ModalTemplate isOpen={isOpen} onClose={onClose} headerTitle={station?.name}>
                { station ? <Box paddingBottom={5} data-cy={'view-station-modal'}>
                    <Text marginBottom={5}>Description: {station.description}</Text>
                    <Text marginBottom={5}>Sub-Market Name: {station?.sub_market?.name}</Text>
                    <Text marginBottom={2}>{station.name} Image:</Text>
                    <Box marginBottom={5}>
                            <VehiclePic image={station?.image ?? ""} size={'mid'}/>
                    </Box>
                    <StatusTag status={station?.status ?? 'inactive'}>{station.status}</StatusTag>
                </Box> : (
                    <Text>Station not found</Text>
                )}
            </ModalTemplate>
        </>
    )
}