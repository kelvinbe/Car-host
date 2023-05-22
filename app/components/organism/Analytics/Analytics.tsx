import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { selectEarnings, fetchEarnings } from "../../../redux/earningSlice";
import useVehicles from "../../../hooks/useVehicles";
import AnalyticsChart from "../../molecules/AnalyticsChart/AnalyticsChart";
import VehicleReportDetails from "../../molecules/VehicleReportDetails/VehicleReportDetails";
import { IVehicle } from "../../../globaltypes";

const Analytics = () => {
  const { allVehicles } = useVehicles();
  const dispatch = useAppDispatch();
  const [vehicleId, setVehicleId] = useState<string | undefined>("");
  const [timeRange, setTimeRange] = useState("monthly");
  const [vehicle, setVehicle] = useState<Partial<IVehicle>>();
  const { earnings } = useAppSelector(selectEarnings);

  useEffect(() => {
    dispatch(fetchEarnings({ vehicle_id: vehicleId, time_range: timeRange }));
  }, [vehicleId, timeRange]);

  useEffect(() => {
    if (allVehicles.length > 0) {
      setVehicleId(allVehicles[0].id);
    }
  }, [allVehicles]);

  useEffect(() => {
    allVehicles.length > 0 &&
      setVehicle(allVehicles.find((vehicle) => vehicle.id === vehicleId));
  }, [vehicleId]);

  const handleVehicleSelect = (selectedVehicle: string) => {
    setVehicleId(selectedVehicle);
  };

  const handleCalendarTypeSelect = (selectedCalendarType: string) => {
    setTimeRange(selectedCalendarType);
  };

  return (
    <Flex direction={["column", "row"]} gap={8} width={"full"} height={"700px"}>
      <Flex borderRadius={"lg"} width={"65%"}>
        <AnalyticsChart
          setVehicleId={setVehicleId}
          vehicleId={vehicleId}
          handleCalendarTypeSelect={handleCalendarTypeSelect}
          handleVehicleSelect={handleVehicleSelect}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          earnings={earnings}
        />
      </Flex>
      <Flex borderRadius={"lg"} width={"35%"}>
        <VehicleReportDetails vehicle={vehicle} earnings={earnings} />
      </Flex>
    </Flex>
  );
};

export default Analytics;
