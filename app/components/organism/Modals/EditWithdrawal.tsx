import React from "react";
import ModalTemplate from "./ModalTemplate"; 
import { Button, Flex, Heading, Text, useToast, Avatar } from "@chakra-ui/react";
import { IWithdrawals } from "../../../globaltypes";
import StatusTag from "../../atoms/status/StatusTag";
import { updateWithdrawal } from "../../../redux/withdrawalSlice";
import { useAppDispatch } from "../../../redux/store";
import LogRocket from "logrocket";
import useUsers from "../../../hooks/useUsers";
import AdminEdit from "./withdrawals/admin";

interface IProps {
    isOpen: boolean;
    onClose: ()=>void;
    withdrawalData: Partial<IWithdrawals>; 
}


const EditWithdrawalModal = (props: IProps)=>{
    const {isOpen, onClose, withdrawalData } = props;
    const dispatch = useAppDispatch()
    const {user} = useUsers();
    const toast = useToast()

    const handleCancelWithdrawal = ()=>{
        const updatedData: Partial<IWithdrawals> = {...withdrawalData, status: 'CANCELLED'}
        dispatch(updateWithdrawal(updatedData)).unwrap().then(()=>{
            toast({
                position: "top",
                title: "Cancell Withdrawal",
                description: "Withdrawal has been cancelled",
                duration: 3000,
                isClosable: true,
                status: "success",
              });
        })
        .catch((e)=>{
            toast({
                position: "top",
                title: "Cancell Withdrawal",
                description: "Could not cancel withdrawal",
                duration: 3000,
                isClosable: true,
                status: "error",
              });
            LogRocket.error(e)
        })
        onClose()
    }

    if(user?.is_admin)
    return(
        <ModalTemplate isOpen={isOpen}  onClose={onClose} modalSize="3xl">
            <AdminEdit
              onClose={onClose}
              {...withdrawalData}
            />
        </ModalTemplate>
    );

    return(
        <ModalTemplate isOpen={isOpen}  onClose={onClose}>
            <Flex direction={'column'} width={'full'}>
              <Heading size={'20px'} textAlign={'center'}>Withdrawal Information</Heading>
              <Flex direction={'column'} width={'full'} mt={'16'} gap={'6'}>
                <Flex width={'full'} justify={'end'}>
                    <Flex justify={'start'} width={'250px'}><Text as={'b'}>Withdrawal Amount</Text></Flex>
                    <Flex justify={'start'} width={'250px'}><StatusTag status={"unknown"}>{user?.market?.currency || '$'} {withdrawalData.amount}</StatusTag></Flex>
                </Flex>
                <Flex width={'full'} justify={'end'}>
                    <Flex justify={'start'} width={'250px'}><Text as={'b'}>Status</Text></Flex>
                    <Flex justify={'start'} width={'250px'}><StatusTag status={withdrawalData.status as any}>{withdrawalData.status}</StatusTag></Flex>
                </Flex>
                <Flex direction={'column'} width={'full'} justify={'center'} mb={'6'} gap={'4'} mt={'6'}>
                    <Text textAlign={'center'} size={'10px'} color={'#6C757D'}>Are You Sure You Want To Cancel Your Withdrawal?</Text>
                    <Flex justify={'center'}><Button w={'300px'} fontWeight={'400px'} bg={'red'} color={'white'} borderRadius={'lg'} _hover={{color: 'black'}} onClick={handleCancelWithdrawal}>Cancel</Button></Flex>
                </Flex>
              </Flex>
            </Flex>
        </ModalTemplate>
    )
}

export default EditWithdrawalModal