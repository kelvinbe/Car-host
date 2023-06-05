import React from "react";
import ModalTemplate from "./ModalTemplate"; 
import { Button, Flex, Heading, Text, useToast, Avatar } from "@chakra-ui/react";
import { IWithdrawals } from "../../../globaltypes";
import StatusTag from "../../atoms/status/StatusTag";
import { updateWithdrawal } from "../../../redux/withdrawalSlice";
import { useAppDispatch } from "../../../redux/store";
import LogRocket from "logrocket";
import useUsers from "../../../hooks/useUsers";

interface IProps {
    isOpen: boolean;
    onClose: ()=>void;
    withdrawalData: Partial<IWithdrawals>; 
}


const EditWithdrawalModal = (props: IProps)=>{
    const {isOpen, onClose, withdrawalData,} = props;
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

    const handleApproveWithdrawal = ()=>{
        const updatedData: Partial<IWithdrawals> = {...withdrawalData, status: 'APPROVED'}
        dispatch(updateWithdrawal(updatedData)).unwrap().then(()=>{
            toast({
                position: "top",
                title: "Approve Withdrawal",
                description: "Withdrawal has been approved",
                duration: 3000,
                isClosable: true,
                status: "success",
              });
        })
        .catch((e)=>{
            toast({
                position: "top",
                title: "Approve Withdrawal",
                description: "Could not approve withdrawal",
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
        <ModalTemplate isOpen={isOpen}  onClose={onClose} modalSize="6xl">
            <Flex direction={'column'} width={'full'}>
              <Heading size={'20px'} textAlign={'center'}>Withdrawal Information</Heading>
              <Flex width={'full'} mt={'4'} gap={'6'} justify={'center'} >
                <Flex width={'49%'} direction={'column'} gap={'4'} px={'10'} justify={'center'}>
                  <Flex  justify={'center'} align={'center'} direction={'row'}  gap={'4'}>
                    <Avatar
                      src={user?.profile_pic_url}
                      size="xl"
                    />
                    <Flex direction={'column'} align={'start'} justify={'center'}>
                      <Flex justify={'start'}><Text as={'b'}>{`${withdrawalData.user?.fname} ${withdrawalData.user?.lname}`}</Text></Flex>
                      <Flex justify={'start'}><Text>{`${withdrawalData.user?.market?.name}, ${withdrawalData.user?.sub_market?.name}`}</Text></Flex>
                    </Flex>
                  </Flex>
                  <Flex justify={'center'} ml={'5em'} bg={'black'} color={'white'} width={'70px'} p={'1'}>
                    <Text>Host</Text>
                  </Flex>
                </Flex>
                <Flex w={'1px'} h={'400px'} bg={'gray'}></Flex>
                <Flex width={'49%'} direction={'column'} px={'10'} gap={'5'}  align={'center'} justify={'center'} >
                  <Flex width={'full'} justify={'end'}>
                    <Flex justify={'start'} width={'250px'}><Text as={'b'}>Withdrawal Amount</Text></Flex>
                    <Flex justify={'start'} width={'250px'}><StatusTag status={"unknown"}>{user?.market?.currency || '$'} {withdrawalData.amount}</StatusTag></Flex>
                  </Flex>
                  <Flex width={'full'} justify={'end'}>
                    <Flex justify={'start'} width={'250px'}><Text as={'b'}>Status</Text></Flex>
                    <Flex justify={'start'} width={'250px'}><StatusTag status={withdrawalData.status as any}>{withdrawalData.status}</StatusTag></Flex>
                  </Flex>
                  <Flex justify={'center'} mt={'12'} gap={'4'}>
                    <Button w={'200px'} fontWeight={'400px'} bg={'#38B000'} color={'white'} _hover={{color: 'white', bg:'#11ad4d'}} onClick={handleApproveWithdrawal}>Approve</Button>
                    <Button w={'200px'} fontWeight={'400px'} bg={'#ADB5BD'} color={'white'} _hover={{color: 'white', bg:'red'}} onClick={handleCancelWithdrawal}>Cancel</Button>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
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