import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { FlexRowCenterCenter } from "../../../utils/theme/FlexConfigs";

interface IProps {
  status: "active" | "cancelled" | "reserved" | "paid" | "pending" | "inactive" | "hold" | "denied" | "upcoming" | "success" | "complete" | "expired" | "revoked" | "nonactive" | "other" | "banned" | "suspended" | "unknown";
  children: React.ReactNode | string;
}

function StatusTag(props: IProps) {
  return (
    <Flex
      data-testid="status-tag"
      {...FlexRowCenterCenter}
      alignItems="center"
      borderRadius="22px"
      padding="4.5px 26px"
      justifyContent="center"
      border="1px solid"
      bgColor={`${props.status?.toLocaleLowerCase()}.100`}
      borderColor={`${props.status?.toLocaleLowerCase()}.1000`}
      width={150}
    >
      <Text
        fontSize="14px"
        fontWeight="700"
        textTransform={"capitalize"}
        color={`${props.status?.toLocaleLowerCase()}.1000`}
      >
        {props.children}
      </Text>
    </Flex>
  );
}

export default StatusTag;
