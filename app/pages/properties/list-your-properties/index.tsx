import React, { useState } from 'react'
import ListYourProperty from '../../../components/organism/Forms/ListYourProperty/ListYourProperty';
import { Steps } from "antd";
import { Flex } from '@chakra-ui/react';
import ListYourPropertyAmenities from '../../../components/organism/Forms/ListYourProperty/ListYourPropertyAmenities';
import ListYourPropertyServices from '../../../components/organism/Forms/ListYourProperty/ListYourPropertyServices';
import { GetServerSideProps } from 'next';
import { PagePhaseProps } from '../../../types';
import { InitialPageProps } from '../../../globaltypes';

const steps = [
  { title: "Property Details" },
  { title: "Property Amenities" },
  { title: "Services offered" },
];

const ListYourProperties = () => {
  const [current, setCurrent] = useState<number>(0);
  const [status, setStatus] = useState<"wait" | "process" | "error" | "finish">("process");

  const handleBackClick = ()=>{
    if (current===0) return
    setCurrent(current-1);
    setStatus('process');
  }

  const handleContinueClick = ()=>{
    setCurrent(current + 1);
  }
  return (
    <div>
      <Flex w={"70%"}>
        <Steps size="small" current={current} items={steps} status={status} />
      </Flex>
      {current === 0 && <ListYourProperty handleBackClick={handleBackClick} handleContinueClick={handleContinueClick} current={current}/>}
      {current === 1 && <ListYourPropertyAmenities handleBackClick={handleBackClick} handleContinueClick={handleContinueClick}/>}
      {current === 2 && <ListYourPropertyServices handleBackClick={handleBackClick} handleContinueClick={handleContinueClick}/>}
    </div>
  )
}

export default ListYourProperties 

export const getServerSideProps: GetServerSideProps<InitialPageProps & PagePhaseProps> = async () => {
    return {
      props: {
        adminonly: false,
        authonly: false,
        dashboard: true,
        phase: "ph2"
      },
    };
  }