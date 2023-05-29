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
import noData from "../../../public/images/no_available_data.png";

interface IProps {
  vehicle?: Partial<IVehicle>;
  earnings?: IAnalyticsData[];
}

const thStyles = {
  fontSize: '15px',
};
const VehicleReportDetails = (props: IProps) => {
  const { vehicle, earnings } = props;
  const { reservations, fetchReservations } = useReservation();
  const { user } = useUsers();

  useEffect(() => {
    fetchReservations();
  }, []);
  const totalVehcileReservations = reservations.filter(
    (reservation) => reservation.vehicle_id === vehicle?.id
  ).length;

  const totalVehicleEarnings = earnings && sumBy(earnings, (item) => item.value);
  return (
    <Flex
      direction={"column"}
      border={"1px"}
      borderColor={"gray.300"}
      borderRadius={"2xl"}
      width={"full"}
      padding={"3"}
    >
      <Box marginLeft={"4"} borderRadius={"lg"} paddingTop={"4"}>
            {vehicle?.pictures && (
              <Image
                src={vehicle?.pictures[0]}
                alt=""
                width={400}
                height={200}
                style={{ borderRadius: "20px" }}
              />
            )}
          </Box>
      {!vehicle && !earnings ? (
        <Flex
          width={"full"}
          marginTop={"3"}
          justifyContent={"space-around"}
          wrap="wrap"
          align={"center"}
        > 
        <Heading size={"md"} width={"full"} textAlign={"center"} textTransform={'uppercase'}>
        Vehicle Report
      </Heading>
          <Image src={noData} alt="no data" width={100} height={100} />
        </Flex>
      ) : (
        <Flex direction={'column'} justify={'space-around'}>
          <Heading
            size={"md"}
            textAlign={"center"}
            paddingTop={"2"}
            transform={"auto"}
          >
            {`${vehicle?.make} ${vehicle?.model} ${vehicle?.year}`}
          </Heading>
          <TableContainer paddingTop={'2'}>
            <Table size="sm">
              <Tbody gap={'3'}>
                <Tr>
                  <Th color={'black'} css={thStyles}>Make</Th>
                  <Td as={'b'}>{vehicle?.make}</Td>
                </Tr>
                <Tr>
                  <Th color={'black'} css={thStyles}>Model</Th>
                  <Td as={'b'}>{vehicle?.model}</Td>
                </Tr>
                <Tr>
                  <Th color={'black'} css={thStyles}>Plate</Th>
                  <Td as={'b'}>{vehicle?.plate}</Td>
                </Tr>
                <Tr>
                  <Th color={'black'} css={thStyles}>Total Reservations</Th>
                  <Td as={'b'}>{totalVehcileReservations}</Td>
                </Tr>
                <Tr>
                  <Th color={'black'} css={thStyles}>Hourly rate</Th>
                  <Td as={'b'}>{vehicle?.hourly_rate}</Td>
                </Tr>
                <Tr>
                  <Th color={'black'} css={thStyles}>Total Earnings</Th>
                  <Td as={'b'}>
                    {user?.market?.currency} {totalVehicleEarnings}
                  </Td>
                </Tr>
              </Tbody>
              <Tfoot></Tfoot>
            </Table>
          </TableContainer>
          
        </Flex>
      )}
    </Flex>
  );
};

export default VehicleReportDetails;
