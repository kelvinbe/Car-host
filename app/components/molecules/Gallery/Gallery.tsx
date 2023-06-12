import React from 'react'
import { Image, Box, Flex, SimpleGrid } from '@chakra-ui/react'
import ImageButton from '../../atoms/ImageButton/ImageButton'


interface IGallery {
    images: string[]
}

const Gallery = (props: IGallery) => {


const {images} = props

return (
    <div data-testid="Gallery" style={{marginTop: '50px'}}>
        <Flex>
            <Flex>
            <Image rounded={'lg'} boxSize={'700px'} src={images[0]} alt="gallery-image" />
            </Flex>
            <SimpleGrid  paddingLeft={4} columns={2} spacing={3.2}>
            {images.slice(1, 5).map((image, index) => {
                return <Box key={index}>
                    <Image rounded={'lg'} boxSize={'345px'} src={image} alt="gallery-image" />
                    {index === 3 && (
                           <Flex
                           position={'absolute'}
                           top={'39%'}
                           left={'72%'}
                           transform={'translate(-56%, -72%)'}
                           zIndex={2}
                         >
                           <ImageButton count={images.length} />
                         </Flex>
                    )}

                    </Box>
            })}
            </SimpleGrid>
        </Flex>
    </div>
)
}

export default Gallery