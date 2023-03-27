import { Text, FormControl, FormLabel, Input, Box, Flex } from "@chakra-ui/react";
import ModalTemplate from "./ModalTemplate";
import { useState } from "react";
import { FlexRowCenterBetween, FlexRowCenterEnd } from "../../../utils/theme/FlexConfigs";
import randomstring from 'randomstring'
import Rounded from "../../molecules/Buttons/General/Rounded";
import useAddNewData from '../../../hooks/useAddNewData'
import { AUTHCODE_DOMAIN, REQUESTED_AUTHCODE_DOMAIN } from "../../../hooks/constants";
import useDeleteData from "../../../hooks/useDeleteData";
import { useFetchData } from "../../../hooks";
import { getAuthcode } from "../../../redux/authcodeSlice";
import { getRequestedAuthCode } from "../../../redux/requestedAuthCodeSlice";
import useFetchRequestedAuthCode from "../../../hooks/useFetchRequestedAuthCode";
import { selectUsers } from "../../../redux/userSlice";
import { useAppSelector } from "../../../redux/store";
interface Props{
    isOpen:boolean,
    onClose:() => void,
    authcodeId:number
    showRequestsTable:() => void,
    userId:number
}

export default function CreateAuthCodeModal({isOpen, onClose, authcodeId, showRequestsTable, userId}:Props) {
    const [authcode, setAuthcode] = useState<string>('')
    const {fetchData} = useFetchData(AUTHCODE_DOMAIN, getAuthcode)
    const {fetchRequests} = useFetchRequestedAuthCode(REQUESTED_AUTHCODE_DOMAIN, getRequestedAuthCode)
    const {addData} = useAddNewData(AUTHCODE_DOMAIN, fetchData, false)
    const {deleteData} = useDeleteData(REQUESTED_AUTHCODE_DOMAIN, 'Success', 'Your have generated an authcode', 'An error occurred', 'Could not generate an authcode', fetchRequests)
    const users = useAppSelector(selectUsers)

    const generateAuthCode = () => {
        setAuthcode(
            randomstring.generate({
                length: 12,
                charset: 'alphanumeric'
            })
        )
    } 
    const handleCreateAuthcode = () => {
        let selectedUser = users.find(user => user.user_id === userId)
        deleteData(authcodeId)
        addData({
            user_image:selectedUser && selectedUser.profilePicUrl,
            authcode:authcode,
            status:"reserved"
        })
        onClose()
        showRequestsTable()
    }

    return (
        <>
            <ModalTemplate headerTitle="Create AuthCode" isOpen={isOpen} onClose={onClose}>
                <FormControl paddingBottom={'20px'}>
                    <FormLabel>AuthCode</FormLabel>
                        <Flex {...FlexRowCenterBetween} w={'100%'} h={'40px'} bgColor={"gray.100"} borderRadius={'5px'} marginBottom={'20px'} paddingX={'10px'}>
                            {authcode}
                            <button onClick={generateAuthCode}>
                                <Text
                                    cursor="pointer"
                                    borderBottom="1px solid"
                                    borderBottomColor={"link"}
                                    fontSize="14px" 
                                    fontWeight="500"
                                    color={"link"}
                                >
                                Get AuthCode
                                </Text>
                            </button> 
                        </Flex>
                        <Rounded variant="solid" fullWidth rounded="full" onClick = {handleCreateAuthcode}>
                            <Text cursor="pointer">Create</Text>
                        </Rounded>
                </FormControl>
            </ModalTemplate>
        </>
    )
}    