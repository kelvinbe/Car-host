import React from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import FilterableTable from "../../components/organism/Table/FilterableTable/FilterableTable";
import { IAuthCode } from "../../globaltypes";
import { insertTableActions } from "../../utils/tables/utils";
import {
  FlexColCenterStart,
  FlexRowCenterStart,
} from "../../utils/theme/FlexConfigs";
import { AuthCodeTableColumns } from "../../utils/tables/TableTypes";

const authcodeData: IAuthCode[] = [
  {
    date: "02/01/2023",
    code: "AduoDOUYWvz",
    status: "active",
  },
  {
    date: "02/02/2023",
    code: "CipoDOUYWvz",
    status: "cancelled",
  },
  {
    date: "02/03/2023",
    code: "fuoIDOUYWvz",
    status: "reserved",
  },
];

function AuthCodeManagement() {
  return (
    <Flex
      {...FlexColCenterStart}
      w="full"
      h="full"
      data-testid="auth-code-management-table"
    >
      <FilterableTable
        viewAddFieldButton={true}
        viewSearchField={true}
        viewSortablesField={true}
        buttonName="Create AuthCode"
        sortables={[
          {
            columnKey: "date",
            columnName: "Date",
          },
        ]}
        columns={insertTableActions(AuthCodeTableColumns, (i, data) => {
          return (
            <Flex {...FlexRowCenterStart}>
              <IconButton
                aria-label="Edit"
                icon={<EditIcon />}
                size="sm"
                onClick={() => {
                  console.log(i, data);
                }}
                marginRight="10"
              />
              <IconButton
                aria-label="Delete"
                icon={<DeleteIcon />}
                size="sm"
                onClick={() => {
                  console.log(i, data);
                }}
                color="cancelled.1000"
              />
            </Flex>
          );
        })}
        data={authcodeData}
        dataFetchFunction={() => {}}
      />
    </Flex>
  );
}

export default AuthCodeManagement;

export function getStaticProps() {
  return {
    props: {
      adminonly: false,
      authonly: true,
      dashboard: true,
    },
  };
}
