import { AttachmentIcon, EditIcon, LinkIcon, ViewIcon } from '@chakra-ui/icons'
import { Flex, IconButton } from '@chakra-ui/react'
import React from 'react'
import FilterableTable from '../../components/organism/Table/FilterableTable/FilterableTable'
import { ILocation } from '../../globaltypes'
import { LocationTableColumns } from '../../utils/tables/TableTypes'
import { insertTableActions } from '../../utils/tables/utils'
import { FlexColCenterStart, FlexRowCenterAround } from '../../utils/theme/FlexConfigs'

const exampleLocationData: ILocation[] = [
  {
    locationId: "xxxxx",
    address: "Bikini Bottom",
    marketName: "Bikini Bottom Market",
    status: "active",
    vehicle: {
      vehiclePictures: [
        "https://images.unsplash.com/photo-1609184166822-bd1f1b991a06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1499&q=80"
      ]
    } as any
  }
]

function Locations() {
  return (
    <Flex {...FlexColCenterStart} w="full" h="full" >
        <FilterableTable
          sortables={[{
            columnKey: "locationId",	
            columnName: "Location Id",
          }]}	
          columns={insertTableActions(LocationTableColumns, (i, data)=>{
            return (
              <Flex {...FlexRowCenterAround} >
                <IconButton
                  aria-label="Edit"
                  icon={<EditIcon/>}
                  size="sm"
                  onClick={() => {
                    console.log(i, data)
                  }}
                />
                <IconButton
                  aria-label="View"
                  icon={<ViewIcon/>}
                  size="sm"
                  onClick={() => {
                    console.log(i, data)
                  }}
                />
                <IconButton
                  aria-label="Attach"
                  icon={<AttachmentIcon/>}
                  size="sm"
                  onClick={() => {
                    console.log(i, data)
                  }}
                />
              </Flex>
            )
          })}
          data={exampleLocationData}
          dataFetchFunction={() => {}}
        />
    </Flex>
  )
}

export default Locations

export function getStaticProps() {
    return {
        props: {
            adminonly: false,
            authonly: true,
            dashboard: true
        }
    }
}