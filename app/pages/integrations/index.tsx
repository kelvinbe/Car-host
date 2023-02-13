import React from "react";
import { Flex, IconButton } from "@chakra-ui/react";
import FilterableTable from "../../components/organism/Table/FilterableTable/FilterableTable";
import { ColumnsType } from "antd/es/table";
import { HamburgerIcon, DeleteIcon } from "@chakra-ui/icons";
import { IIntegrations } from "../../globaltypes";
import { IntegrationsTableColumns } from "../../utils/tables/TableTypes";
import { insertTableActions } from "../../utils/tables/utils";
import {
  FlexRowCenterAround,
  FlexRowStartStart,
  FlexColStartEnd,
} from "../../utils/theme/FlexConfigs";
import { MdEdit } from "react-icons/md";

const IntegrationsData: IIntegrations[] = [
  {
    integrationName: "Integration One",
    status: "active",
  },
  {
    integrationName: "Integration Two",
    status: "reserved",
  },
  {
    integrationName: "Integration Three",
    status: "cancelled",
  },
];

function Integrations() {
  return (
    <Flex w="full" h="full" data-testid="integrations-table">
      <FilterableTable
        buttonName="Create Integration"
        sortables={[
          {
            columnKey: "date",
            columnName: "Date",
          },
        ]}
        columns={insertTableActions(IntegrationsTableColumns, (i, data) => {
          return (
            <Flex {...FlexRowStartStart}>
              <IconButton
                aria-label="Edit"
                icon={<MdEdit />}
                size="md"
                onClick={() => {
                  console.log(i, data);
                }}
                bg="transparent"
              />
              <IconButton
                aria-label="Delete"
                icon={<DeleteIcon />}
                size="md"
                onClick={() => {
                  console.log(i, data);
                }}
                color="red"
                bg="transparent"
              />
            </Flex>
          );
        })}
        data={IntegrationsData}
      />
    </Flex>
  );
}

export default Integrations;

export function getStaticProps() {
  return {
    props: {
      adminonly: false,
      authonly: true,
      dashboard: true,
    },
  };
}
