import { Flex } from "@chakra-ui/react";
import React from "react";
import FilterableTable from "../../components/organism/Table/FilterableTable/FilterableTable";
import { IPayout } from "../../globaltypes";
import { PayoutsTableColumns } from "../../utils/tables/TableTypes";
import { FlexColCenterStart } from "../../utils/theme/FlexConfigs";

const examplePayoutsData: IPayout[] = [
  {
    payoutId: "xxxxx",
    amount: 140,
    status: "active",
    payDate: "2021-01-01",
  },
  {
    payoutId: "xxxxx",
    amount: 100,
    status: "active",
    payDate: "2021-01-01",
  },
  {
    payoutId: "xxxxx",
    amount: 130,
    status: "active",
    payDate: "2021-01-01",
  },
];

function Payouts() {
  return (
    <Flex w="full" h="full" {...FlexColCenterStart} data-testid="payouts-table">
      <FilterableTable
        viewAddFieldButton={false}
        viewSearchField={false}
        viewSortablesField={true}
        sortables={[
          {
            columnName: "Amount",
            columnKey: "amount",
          },
        ]}
        columns={PayoutsTableColumns}
        data={examplePayoutsData}
      />
    </Flex>
  );
}

export default Payouts;

export function getStaticProps() {
  return {
    props: {
      adminonly: false,
      authonly: true,
      dashboard: true,
    },
  };
}
