import React from "react"
import FilterableTable from "../../../components/organism/Table/FilterableTable/FilterableTable"
import { Flex, IconButton } from "@chakra-ui/react"
import { insertTableActions } from "../../../utils/tables/utils"
import { PropertiesTableColumns } from "../../../utils/tables/TableTypes"
import { FlexRowCenterBetween } from "../../../utils/theme/FlexConfigs"
import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons"
import ErrorFallback from "../../../components/organism/ErrorFallback"
import { logError } from "../../../utils/utils"
import { ErrorBoundary } from "react-error-boundary"
import { GetServerSideProps } from "next"
import { InitialProps } from "../../../globaltypes"

// This Static data is only being used until the api and global state is set up
const managementData = [
  {
    status: "active",
    propertiesName: "Ketone Apartments",
    bedrooms: "5",
    beds: "5",
    baths: "2",
    location: "Kileleshwa, Nairobi",
  },
  {
    status: "inactive",
    propertiesName: "Cupertino Apartments",
    bedrooms: "2",
    beds: "2",
    baths: "1",
    location: "Kileleshwa, Nairobi",
  },
  {
    status: "active",
    propertiesName: "Korea Town Hotel",
    bedrooms: "3",
    beds: "3",
    baths: "2",
    location: "Kileleshwa, Nairobi",
  },
  {
    status: "pending",
    propertiesName: "Viewpoint, Apartments",
    bedrooms: "1",
    beds: "1",
    baths: "1",
    location: "Kileleshwa, Nairobi",
  },
  {
    status: "blocked",
    propertiesName: "Sky-view Apartments",
    bedrooms: "4",
    beds: "3",
    baths: "2",
    location: "Kileleshwa, Nairobi",
  },
]

const Management = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
      <Flex w="full" h="full">
        <FilterableTable
          viewAddFieldButton={true}
          viewSearchField={true}
          viewSortablesField={true}
          buttonName="Create Listing"
          columns={insertTableActions(PropertiesTableColumns, (i, data) => {
            function viewProperty(id: any): void {
              throw new Error("Function not implemented.")
            }
            return (
              <Flex {...FlexRowCenterBetween} bgColor={'#1877f212'} borderRadius={'5px'} height={'60px'} >
                <IconButton
                  aria-label="View"
                  icon={<ViewIcon />}
                  size="sm"
                  onClick={() => viewProperty(data.id)}
                  marginRight="4"
                  data-cy={"view-button"}
                />
                <IconButton
                  aria-label="Edit"
                  icon={<EditIcon />}
                  size="sm"
                  marginRight="4"
                  data-cy={"edit-button"}
                />
              <IconButton
                  aria-label="Delete"
                  icon={<DeleteIcon />}
                  size="sm"
                  color="cancelled.1000"
                  data-cy="delete-button"
                />
              </Flex>
            )
          })}
          sortables={[
            {
              columnKey: "propertyName",
              columnName: "Property Name",
            },
          ]}
          data={managementData}
        />
      </Flex>
    </ErrorBoundary>
  )
}

export default Management

export const getServerSideProps: GetServerSideProps<InitialProps> =
  async () => {
    return {
      props: {
        authonly: true,
        dashboard: true,
        adminonly: false,
        tag: "v2",
      },
    }
  }
