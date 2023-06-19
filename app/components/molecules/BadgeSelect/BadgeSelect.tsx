import { Flex, Tag, TagCloseButton, TagLabel, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import index from "../../../pages/properties/list-your-properties";

export interface IMeal{
  name: string,
  selected: boolean
}

interface IProps{
  data: {name: string, selected: boolean}[];
  setData: (data: {name: string, selected: boolean}[])=> void;
  setSelectedData: (data: {name: string, selected: boolean}[])=> void;
  selectedData: {name: string, selected: boolean}[];
}
const BadgeSelect = (props: IProps) => {

  const {data, setSelectedData, setData} = props;
  const handleClick = (item: {name: string, selected: boolean}) => {
    item.selected= !item.selected;
    const newData = data.map((item)=>{
        if(item.name===item.name){
            return item
        }
        return item
    })
    setData(newData);
  };

  useEffect(()=>{
    setSelectedData(data.filter((item)=> item.selected));
  },[data]);

  return (
    <Flex direction={'column'}>
     <Text>{data.filter((item)=>item.selected).length} Selected</Text>
      <Flex  gap={"4"} flexWrap={'wrap'}>
      {data.map((itemData, index) => {
        return (
          <Flex 
            key={index} 
            border={'1px'}
            borderRadius="15px"
            justify={'space-between'}
            px={'4'}
            py={'1'}
            height={'35px'}
            // width={'180px'}
            align={'center'}
            onClick={() => handleClick(itemData)}
            _hover={{ cursor: "pointer" }} gap={'4'}
            bg={itemData.selected? '#BC2B3D': ''}
            color={itemData.selected ? 'white': ''}
          >
            <Text>{itemData.name}</Text>
            {itemData.selected &&<Text>x</Text>}
          </Flex>
        );
      })}
      </Flex>
    </Flex>
  );
};

export default BadgeSelect;
