import React from 'react';
import HomePageHeader from '../../../components/organism/Header/HomePageHeader';
import { Flex } from '@chakra-ui/react';
import HomePageAboutUS from '../../../components/organism/AboutUs/HomePageAboutUS';
import HomePagePropertyList from '../../../components/organism/PropertyList/HomePagePropertyList';
import RecommendedDestinations from '../../../components/organism/RecommendedDestinations/RecommendedDestinations';
import PropertiesFooter from '../../../components/organism/Footer/PropertiesFooter';

const HomePage = ()=>{
    return(
        <div style={{width: '100%',}}>
            <Flex direction={'column'}>
            <HomePageHeader />
            <HomePageAboutUS />
            <HomePagePropertyList/>
            <RecommendedDestinations/>
            <PropertiesFooter />
            </Flex>
            
        </div>
    )
}

export default HomePage;
