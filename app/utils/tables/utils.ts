import { ColumnsType } from 'antd/es/table';



/**
 * @name insertTableActions
 * @description Insert table actions
 * @param {Array} columnDefinitions
 * @param {Function} actions  function
 * @returns {Array} columnDefinitions
 */

export const insertTableActions = (columnDefinitions: ColumnsType<any>, actions: (i: string, data: any)=> any): ColumnsType<any> => {
    // console.log('columnDefinitions', columnDefinitions	)
    const columns = columnDefinitions.filter((column) => column.key !== 'actions');
    const actionsColumn = {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        render: actions
    }
    const newColumns = [...columns, actionsColumn];
    
    return newColumns
}