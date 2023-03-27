import { Box, Text, Avatar } from "@chakra-ui/react";
import { IUserProfile } from "../../../globaltypes";
import StatusTag from "../../atoms/status/StatusTag";
import ModalTemplate from "./ModalTemplate";

interface Props{
    isOpen:boolean,
    onClose:() => void,
    user:IUserProfile
}
export default function ViewUserModal({isOpen, onClose, user}:Props){
    return(
        <>
            <ModalTemplate isOpen={isOpen} onClose={onClose} headerTitle={`${user.fname} ${user.lname} - (${user.handle})`}>
                <Box paddingBottom={5}>
                    <Avatar
                        src={user.profilePicUrl}
                        size={'xl'}
                    />
                    <Text marginBottom={5}>Email: {user.email}</Text>
                    <Text marginBottom={5}>Phone: {user.phone}</Text>
                    <Text marginBottom={2}>Market Name: {user.marketId}</Text>
                    <Text marginBottom={2}>User: {user.userType}</Text>
                    <StatusTag status={user.status}>{user.status}</StatusTag>
                </Box>
            </ModalTemplate>
        </>
    )
}