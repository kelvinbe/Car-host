import { Flex } from '@chakra-ui/react'
import React from 'react'
import BaseTable from '../../components/organism/Table/BaseTable/BaseTable'
import { IUserProfile } from '../../globaltypes'
import { UserTableColumns } from '../../utils/tables/TableTypes'
import { FlexColCenterStart } from '../../utils/theme/FlexConfigs'

const exampleUserManagementData: IUserProfile[] = [
  {
    email: "spongebob@krastkrab.com",
    fname: "Spongebob",
    lname: "Squarepants",
    handle: "spongebob",
    marketId: "xxxxx",
    profilePicUrl: "https://pngimg.com/uploads/spongebob/spongebob_PNG1.png",
    status: "active",
    userType: "admin",
    phone: "1234567890",
  }
]

function UserManagement() {
  return (
    <Flex {...FlexColCenterStart} w="full" h="full"  >
      <BaseTable
        data={exampleUserManagementData}
        columns={UserTableColumns}
        dataFetchFunction={() => {}}

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