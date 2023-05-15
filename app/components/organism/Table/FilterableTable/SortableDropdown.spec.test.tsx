import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import SortableDropdown from './SortableDropdown'

describe('SortableDropdown', () => {
  const onSortMock = jest.fn()

  beforeEach(() => {
    onSortMock.mockClear()
  })

  it('renders the column name and no sort order by default', () => {
    render(<SortableDropdown columnName="Name" />)
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.queryByText('(Asc)')).toBeNull()
    expect(screen.queryByText('(Desc)')).toBeNull()
  })

  it('renders the column name with ascending sort order', () => {
    render(<SortableDropdown columnName="Name" sortOrder="ascend" />)
    expect(screen.getByText('Name (Asc)')).toBeInTheDocument()
  })

  it('renders the column name with descending sort order', () => {
    render(<SortableDropdown columnName="Name" sortOrder="descend" />)
    expect(screen.getByText('Name (Desc)')).toBeInTheDocument()
  })

})