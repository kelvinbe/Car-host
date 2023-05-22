import {
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Box,
  Tfoot,
  Th,
  Tr,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect } from "react";
import { IAnalyticsData, IVehicle } from "../../../globaltypes";
import { sumBy } from "lodash";
import useReservation from "../../../hooks/useReservation";
import useUsers from "../../../hooks/useUsers";

interface IProps {
    vehicle?:  Partial<IVehicle>;
    earnings?: IAnalyticsData[];
}
const VehicleReportDetails = (props: IProps) => {
  const {vehicle, earnings} = props;
  const {reservations, fetchReservations} = useReservation();
  const {user} = useUsers()

  useEffect(()=>{
    fetchReservations();
  },[])
  const totalVehcileReservations = reservations.filter((reservation)=>reservation.vehicle_id===vehicle?.id).length
  if(!earnings && !vehicle) return null;
  const totalVehicleEarnings = sumBy(earnings, (item)=>item.value) 
  return (
    <Flex
      direction={"column"}
      border={"1px"}
      borderColor={"gray.300"}
      borderRadius={"lg"}
      width={"full"}
      padding={"2"}
    >
      <Heading size={"md"} textAlign={"center"} paddingTop={"2"} transform={'auto'}>
        {`${vehicle?.make} ${vehicle?.model} ${vehicle?.year}`}
      </Heading>
      <TableContainer>
        <Table size="sm">
          <Tbody>
            <Tr>
              <Th>Make</Th>
              <Td>{vehicle?.make}</Td>
            </Tr>
            <Tr>
              <Th>Model</Th>
              <Td>{vehicle?.model}</Td>
            </Tr>
            <Tr>
              <Th>Plate</Th>
              <Td>{vehicle?.plate}</Td>
            </Tr>
            <Tr>
              <Th>Total Reservations</Th>
              <Td>{totalVehcileReservations}</Td>
            </Tr>
            <Tr>
              <Th>Hourly rate</Th>
              <Td>{vehicle?.hourly_rate}</Td>
            </Tr>
            <Tr>
              <Th>Total Earnings</Th>
              <Td>{user?.market?.currency} {totalVehicleEarnings}</Td>
            </Tr>
          </Tbody>
          <Tfoot></Tfoot>
        </Table>
      </TableContainer>
      <Box marginLeft={'4'} borderRadius={'lg'} paddingTop={'4'}>
        {vehicle?.pictures && <Image src={vehicle?.pictures[0]} alt="" width={400} height={200} style={{borderRadius: '20px'}}/>} 
      </Box>
    </Flex>
  );
};

export default VehicleReportDetails;
