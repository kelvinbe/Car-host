import React from "react";
import { Flex } from "@chakra-ui/react";
import ComingSoon from "../../components/molecules/ComingSoon/ComingSoon";

function Integrations() {
  return (
    <Flex w="full" h="full" data-testid="integrations-table">
      <ComingSoon/>
      {/* <FilterableTable
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
      /> */}
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
