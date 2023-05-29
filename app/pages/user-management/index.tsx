import { Flex } from '@chakra-ui/react'
import React from 'react'
import BaseTable from '../../components/organism/Table/BaseTable/BaseTable'
import { UserTableColumns } from '../../utils/tables/TableTypes'
import { FlexColCenterStart } from '../../utils/theme/FlexConfigs'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '../../components/organism/ErrorFallback'
import { logError } from '../../utils/utils'

function UserManagement() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
      <Flex {...FlexColCenterStart} w="full" h="full"  >
        <BaseTable
          data={[]}
          columns={UserTableColumns}

        />
      </Flex>
    </ErrorBoundary>
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