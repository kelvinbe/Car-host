import { Flex, Heading, Select, Text } from "@chakra-ui/react";
import React, { ChangeEvent } from "react";
import { IVehicle } from "../../../globaltypes";
import useUsers from "../../../hooks/useUsers";

interface IProps{
    handleVehicleSelect: (vehicle: string)=>void;
    handleCalendarTypeSelect: (calendarType: string)=>void;
    vehicles: Partial<IVehicle>[];
}
const AnalyticsHeader = (props: IProps) => {
  const {handleCalendarTypeSelect, handleVehicleSelect, vehicles}=props 
  const {user} = useUsers()
  const onVehicleSelect= (e: ChangeEvent)=>{
    handleVehicleSelect((e.target as HTMLSelectElement).value)
  }

  const onCalendarTypeSelect=(e: ChangeEvent)=>{
    handleCalendarTypeSelect((e.target as HTMLSelectElement).value)
  }
  if(!vehicles && !user) return null;
  return (
    <Flex width={"full"} paddingLeft={"4"}>
      <Flex width={"25%"} direction={['column']}>
        <Heading as={"h3"} size={"md"}>
          Analytics
        </Heading>
        <Text paddingTop={'2'}>Total Balance: <b>$ {user?.earnings.all_time}</b></Text>
      </Flex>
      <Flex width={"75%"}>
        <Flex>
            <Text as={'b'}>Earnings</Text>
            <div
            style={{
                marginLeft: "20px",
                color:  'red'
              }}>
                &bull;
            </div>
            <Text marginLeft={'20px'} as={'b'}>Reservations</Text>
            <div
            style={{
                marginLeft: "20px",
                color: 'black'
              }}>
                &bull;
            </div>
        </Flex>
        <Flex marginLeft={'20px'}>
            <Text as={'b'}>Select Vehicle:</Text>
            <Flex gap={'4'} marginLeft={'10px'}>
            <Select border={'1px'} style={{color: 'gray'}} marginTop={'-1'} onChange={onVehicleSelect}>
              {vehicles.map((vehicle)=><option value={vehicle?.id} key={vehicle?.id}>{`${vehicle?.make} ${vehicle?.model}`}</option>)}
            </Select>
            <Select border={'1px'} borderRadius={'lg'} style={{color: 'gray'}} marginTop={'-1'} onChange={onCalendarTypeSelect}>
                <option value={'monthly'}>Monthly</option>
                <option value={'yearly'}>Yearly</option>
            </Select>
            </Flex>
            
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AnalyticsHeader;
