import ModalTemplate from "./ModalTemplate";
import React, {useState} from "react";
import Rounded from "../../molecules/Buttons/General/Rounded";
import { Box, Heading } from "@chakra-ui/react";
import { Input } from "antd";
import { IUserProfile } from "../../../globaltypes";
import useUsers from "../../../hooks/useUsers";

interface IProps{
    isOpen:boolean,
    onClose: () => void,
    user:IUserProfile
}
export default function EditProfileModal ({isOpen, onClose, user}:IProps) {
    const [fName, setFName] = useState(user.fname)
    const [lName, setLName] = useState(user.lname)
    const [email, setEmail] = useState(user.email)
    const [phone, setPhone] = useState(user.phone)
    const [handle, setHandle] = useState(user.handle)
    const {editUserProfile} = useUsers()
    const handleEditProfile = () => {
        editUserProfile(user.id,{
            ...user,
            fname: fName,
            lname: lName,
            email: email,
            phone: phone,
            handle: handle
        })
        onClose()
    }
    return (
        <ModalTemplate headerTitle="Edit your profile" isOpen={isOpen} onClose={onClose}>
            <>
                <Box my={3}>
                    <Heading as='h6' size='xs'>
                       First Name:
                    </Heading>
                    <Input value={fName} onChange={e => setFName(e.target.value)}/>
                </Box>
                <Box my={3}>
                    <Heading as='h6' size='xs'>
                       Last Name:
                    </Heading>
                    <Input value={lName}  onChange={e => setLName(e.target.value)}/>
                </Box>
                <Box my={3}>
                    <Heading as='h6' size='xs'>
                        Email:
                    </Heading>
                    <Input value={email}  onChange={e => setEmail(e.target.value)}/>
                </Box>
                <Box my={3}>
                    <Heading as='h6' size='xs'>
                        Phone Number:
                    </Heading>
                    <Input value={phone} onChange={e => setPhone(e.target.value)}/>
                </Box>
                <Box my={3}>
                    <Heading as='h6' size='xs'>
                       User handle:
                    </Heading>
                    <Input value={handle} onChange={e => setHandle(e.target.value)}/>
                </Box>
                <Box mb={4}>
                    <Rounded variant='solid' rounded={'full'} fullWidth onClick={handleEditProfile}>Edit</Rounded>
                </Box>
            </>
        </ModalTemplate>
    )
}