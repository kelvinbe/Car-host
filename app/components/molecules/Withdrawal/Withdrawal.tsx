import { Flex, Heading, Text, Button, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import WithDrawalModal from '../../organism/Modals/WithDrawalModal'
import useUsers from '../../../hooks/useUsers';

const Withdrawal = () => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {user}=useUsers();

  return (
    <>
    <WithDrawalModal isOpen={isOpen} onClose={onClose}/>
    <Flex w={'full'} p={'5'} bg={'#F5F6F7'}>
        <Flex direction={'column'} gap={'6'} width={'50%'}>
            <Heading size={'md'}>Total Balance</Heading> 
            <Text size={'20px'} as={'b'}>{user?.market?.currency} {user?.earnings.available}</Text>
        </Flex>
        <Flex direction={'row'} width={'50%'} justify={'end'} align={'center'}>
          <Button width={'230px'} bg={'#2E72CA'} color={'white'} _hover={{
            bg:'red'
          }} fontWeight={'500px'} onClick={onOpen}>Withdraw</Button>
        </Flex>
      </Flex>
      </>
  )
}

export default Withdrawal