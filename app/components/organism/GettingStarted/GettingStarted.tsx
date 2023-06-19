import { Button, Flex, Heading, Text } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import Logo from '../../atoms/Brand/Logo'
import divvlyProperty from '../../../public/images/property4.png'
import divvlyCar from '../../../public/images/AuthForm.png'

const staysBgImageStyles={
    background:`url(${divvlyProperty.src}) center/cover no-repeat`,
    position: 'relative',
    width: '300px',
    height: '300px',
    borderRadius: '15px',
    cursor: 'pointer'
  }
  const carsBgImageStyles={
    ...staysBgImageStyles,
    background:
    `url(${divvlyCar.src}) center/cover no-repeat`,
  }

  const textDivStyles = {
    position: 'absolute',
    backgroundColor: '#BC2B3D',
    width: '180px',
    height: '50px',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '15px',
    top: '130px',
    left: '55px',
  }
const GettingStarted = () => {
  const [staysSelected, setStaysSelected] = useState<boolean>(false);
  const [carsSelected, setCarsSelected] = useState<boolean>(false);
  const [staysBrightness, setStaysBrightness] = useState<string>('100%');
  const [carsBrightness, setCarsBrightness] = useState<string>('100%');

  const divRef = useRef<HTMLDivElement>(null)
  const handleStaysSelect=()=>{
    setStaysSelected(true)
    setStaysBrightness('40%')
    setCarsSelected(false)
    setCarsBrightness('100%')
  }
  const handleCarsSelect=()=>{
    setCarsSelected(true)
    setCarsBrightness('40%')
    setStaysSelected(false)
    setStaysBrightness('100%')
  }

  useEffect(() => {
    function outOfLocationFocus(event: MouseEvent) {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setCarsSelected(false)
        setCarsBrightness('100%')
        setStaysSelected(false)
        setStaysBrightness('100%')
      }
    }
    document.addEventListener("click", outOfLocationFocus);

    return () => document.addEventListener("click", outOfLocationFocus);
  }, []);
  const handleGetStarted = ()=>{
    /**
     * @todo implement a redirect to the selected page
     */
  }
  return (
    <Flex direction={'column'} width={['full', 'full','full', '50%']} gap={'4'} border={'1px'} p={10} borderRadius={'50px'}>
      <Flex direction={'column'} gap={6} align={'center'}>
        <Logo/>
        <Heading fontSize={'36px'} fontWeight={'600'}>Welcome To Divvly!</Heading>
        <Text fontWeight={'700'}>Choose Category</Text>
      </Flex>
      <Flex gap={8} justify={'center'} direction={['column', 'column', 'row']} ref={divRef}>
        <Flex sx={staysBgImageStyles} filter='auto' brightness={staysBrightness} onClick={handleStaysSelect}>
            <Flex sx={textDivStyles}>
                <Text fontSize={'20px'} as={'b'} color={'white'}>Stays</Text>
            </Flex>
        </Flex>
        <Flex sx={carsBgImageStyles} filter='auto' brightness={carsBrightness} onClick={handleCarsSelect}>
            <Flex sx={textDivStyles}>
                <Text fontSize={'20px'} as={'b'} color={'white'}>Car Rentals</Text>
            </Flex>
        </Flex>
      </Flex>
      <Flex justify={'center'} pt={'14'} pb={8}>
        <Button 
          bg={'#BC2B3D'} 
          color={'white'} 
          _hover={{bg: 'red.800', color: 'white'}} 
          width={'300px'} 
          borderRadius={'full'} 
          disabled={!staysSelected && !carsSelected} 
          onClick={handleGetStarted}
        >
          Get Started
        </Button>
      </Flex>
    </Flex>
  )
}

export default GettingStarted