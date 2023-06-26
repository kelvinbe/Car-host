import { Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import BaseTable from '../../components/organism/Table/BaseTable/BaseTable'
import { UserTableColumns } from '../../utils/tables/TableTypes'
import { FlexColCenterStart } from '../../utils/theme/FlexConfigs'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '../../components/organism/ErrorFallback'
import { logError } from '../../utils/utils'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { fetchAllUsers, selectAllUsersFeedback, selectAllUsersPaginationState } from '../../redux/admin.users'
import FilterableTable from '../../components/organism/Table/FilterableTable/FilterableTable'
import { UserManagementTable } from '../../utils/tables/admin.table.schema'
import { IUserProfile } from '../../globaltypes'

function UserManagement() {
  const dispatch = useAppDispatch()
  const feedback = useAppSelector(selectAllUsersFeedback)
  const { current_page, current_size } = useAppSelector(selectAllUsersPaginationState)

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [])

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
      <Flex {...FlexColCenterStart} w="full" h="full"  >

        <FilterableTable
          viewSearchField
          viewSortablesField
          data={feedback.data}
          sortables={[
            {
              columnKey: "created_at",
              columnName: "Created"
            }
          ]}
          onSort={(sort)=>{
            const order = sort?.order == "descend" ? "desc" : "asc"
            const sort_by = sort?.columnKey as keyof IUserProfile

            dispatch(fetchAllUsers({
              sort: order,
              sort_by
            }))
          }}
          setSearch={(search)=>{
            dispatch(fetchAllUsers({
              search
            }))
          }}
          primitiveTableProps={{
            loading: feedback.loading,
            scroll: {
              x: 'max-content'
            }
          }}
          columns={UserManagementTable}
          pagination={{
            position: ["bottomCenter"],
            onChange: (page, pageSize) => {
              dispatch(fetchAllUsers({ page, size: pageSize }))
            },
            total: ((current_page ?? 0) * (current_size ?? 0)) + (
              feedback?.data?.length < (current_size ?? 0) ? 0 : 1
            ),
            showSizeChanger: true, 
          }}
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