import { Flex } from '@chakra-ui/react'
import React from 'react'
import BaseTable from '../../components/organism/Table/BaseTable/BaseTable'
import { UserTableColumns } from '../../utils/tables/TableTypes'
import { FlexColCenterStart } from '../../utils/theme/FlexConfigs'

function UserManagement() {
  return (
    <Flex {...FlexColCenterStart} w="full" h="full"  >
      <BaseTable
        data={[]}
        columns={UserTableColumns}

        />
    </Flex>
  )
}

export default UserManagement

export function getStaticProps() {
    return {
        props: {
            adminonly: true,
            authonly: true,
            dashboard: true
        }
    }
}