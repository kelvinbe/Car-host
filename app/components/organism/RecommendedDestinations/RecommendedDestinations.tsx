import { Box, Flex, Heading, IconButton, Image } from '@chakra-ui/react'
import React, { useState } from 'react'
import  {HiChevronRight, HiChevronLeft} from 'react-icons/hi';
import destination1 from '../../../public/images/destination1.png';
import destination2 from '../../../public/images/destination2.png';
import destination3 from '../../../public/images/destination3.png';

const destinations = [
    {
        title: 'Downtown Miami ',
        image: destination1.src,
    },
    {
        title: 'Downtown Miami ',
        image: destination2.src,
    },
    {
        title: 'Downtown Miami ',
        image: destination3.src,
    },
    {
        title: 'Downtown Algiers ',
        image: destination1.src,
    },
    {
        title: 'Downtown Musanda ',
        image: destination2.src,
    },
    {
        title: 'Downtown Florida ',
        image: destination3.src,
    }
]
const RecommendedDestinations = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const prevIndex = (currentIndex - 1 + destinations.length) % destinations.length;
  const nextIndex = (currentIndex + 1) % destinations.length;

  const handlePrevClick = () => {
    setCurrentIndex(prevIndex);
  };
  const handleNextClick = () => {
    setCurrentIndex(nextIndex);
  };

  return (
    <Flex direction={'column'} justify={'center'} pb={'10'}>
        <Heading size={'lg'} pb={'10'}>Recommended Destinations</Heading>
        <Flex gap={{sm: '2', md:'6', lg:'10'}} direction={'row'} align={'center'} justify={'center'}>
            <Flex direction={'column'} justify={'center'}>
              <IconButton variant={'outline'} icon={<HiChevronLeft/>} aria-label='Previous' borderRadius={'full'} borderColor={'#BC2B3D'} onClick={handlePrevClick} />
            </Flex>
            <Flex gap={{sm: '2', md:'14'}}>
                <Box>
                    <Image src={destinations[prevIndex].image} alt={destinations[prevIndex].title}/>
                    <Heading size={'20px'} pt={'4'}>{destinations[prevIndex].title}</Heading>
                </Box>
                <Box>
                    <Image src={destinations[currentIndex].image} alt={destinations[currentIndex].title}/>
                    <Heading size={'20px'} pt={'4'}>{destinations[currentIndex].title}</Heading>
                </Box>
                <Box>
                    <Image src={destinations[nextIndex].image} alt={destinations[nextIndex].title}/>
                    <Heading size={'20px'} pt={'4'}>{destinations[nextIndex].title}</Heading>
                </Box>
                
            </Flex>
            <Flex direction={'column'} justify={'center'}>
              <IconButton variant={'outline'} icon={<HiChevronRight/>} aria-label='Next' borderRadius={'full'} borderColor={'#BC2B3D'} onClick={handleNextClick}/>
            </Flex>
        </Flex>
    </Flex>
  )
}

export default RecommendedDestinations