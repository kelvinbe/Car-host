import React, { useEffect, useMemo, useState } from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  Area,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import AnalyticsHeader from "../../atoms/Headers/AnalyticsHeader";
import { Flex, Progress } from "@chakra-ui/react";
import { useAppSelector } from "../../../redux/store";
import { IAnalyticsData } from "../../../globaltypes";
import Image from "next/image";
import noData from "../../../public/images/no_available_data.png";
import { selectEarningsFeedback } from "../../../redux/analyticsSlice";
import { isEmpty } from "lodash";

interface IProps {
  vehicleId?: string;
  setVehicleId: (vehicleId?: string) => void;
  handleVehicleSelect: (vehicle: string) => void;
  handleCalendarTypeSelect: (calendarType: string) => void;
  timeRange: string;
  setTimeRange: (timeRange: string) => void;
  earnings: IAnalyticsData[];
}
const AnalyticsChart = (props: IProps) => {
  const {data, loading} = useAppSelector(selectEarningsFeedback)

  return (
    <div style={{ width: "100%", height: "450px" }}>
      <Flex paddingBottom={"60px"}>
        <AnalyticsHeader />
      </Flex>
      {loading && <Progress
         w="full"
         size="xs"
         colorScheme="red"
         isIndeterminate
      />}
      {!isEmpty(data) ? (
        <ResponsiveContainer
        >
          <AreaChart 
            data={data}
            margin={{
              top: 10,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F4A9A3" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#F4A9A3" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid horizontal={true} vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#E74236"
              fill="url(#gradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <Flex
          width={"full"}
          marginY={"8"}
          justifyContent={"space-around"}
          wrap="wrap"
          align={"center"}
        >
          <Image src={noData} alt="no data" width={100} height={100} />
        </Flex>
      )}
    </div>
  );
};

export default AnalyticsChart;
