import React from "react";
import { Flex } from "@chakra-ui/react";
import FilterableTable from "../../components/organism/Table/FilterableTable/FilterableTable";
import { ColumnsType } from "antd/es/table";

interface DType {
  name: string;
  age: number;
  show: string;
  description: string;
}

const data: DType[] = [
  {
    name: "John Brown",
    age: 32,
    show: "New York No. 1 Lake Park",
    description:
      "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
  },
  {
    name: "Jim Green",
    age: 42,
    show: "London No. 1 Lake Park",
    description:
      "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
  },
  {
    name: "Joe Black",
    age: 32,
    show: "Sidney No. 1 Lake Park",
    description:
      "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
  },
];

const columns: ColumnsType<any> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: (a: DType, b: DType) => a.name.length - b.name.length,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    sorter: (a: DType, b: DType) => a.age - b.age,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Show",
    dataIndex: "show",
    key: "show",
    sorter: (a: DType, b: DType) => a.show.length - b.show.length,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    sorter: (a: DType, b: DType) => a.description.length - b.description.length,
    sortDirections: ["descend", "ascend"],
  },
];

function Reservations() {
  return (
    <Flex w="full" h="full" data-testid="reservations-table">
      <FilterableTable
        viewAddFieldButton={true}
        viewSearchField={true}
        viewSortablesField={true}
        buttonName="Create Reservation"
        columns={columns}
        data={data}
        sortables={[
          {
            columnKey: "description",
            columnName: "Description",
          },
          {
            columnKey: "name",
            columnName: "Name",
          },
          {
            columnKey: "age",
            columnName: "Age",
          },
        ]}
      />
    </Flex>
  );
}

export default Reservations;

export function getStaticProps() {
  return {
    props: {
      adminonly: false,
      authonly: true,
      dashboard: true,
    },
  };
}
