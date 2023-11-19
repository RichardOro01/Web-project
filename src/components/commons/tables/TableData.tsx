"use client";

import { Button, Checkbox, Table } from "antd";
import Title from "antd/es/typography/Title";
import { ColumnType, ColumnsType } from "antd/es/table";
import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/components/core/stores/store";
import {
  setCurrentModal,
  setEditingModal,
} from "@/components/core/stores/modalSlice";
import { CRUD_ModalsType } from "@/components/modals";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { CRUD_Modals } from "@/components/modals/modals";
import Services from "@/services/services";

interface TableDataProps {
  title: string;
  columns: ColumnsType<any>;
  modal: CRUD_ModalsType;
  data: TableDataType<any>[];
  checkBoxColumns?: string[];
}

const TableData: React.FC<TableDataProps> = ({
  columns,
  title,
  modal,
  data,
  checkBoxColumns,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentModal = useSelector((state: RootState) => state.modal.current);

  const handleDelete = (value: TableDataType<any>) => {
    Services[modal].delete(value.key.toString());
    router.refresh();
  };

  const handleEdit = (value: TableDataType<any>) => {
    dispatch(setEditingModal(value));
    dispatch(setCurrentModal(modal));
  };

  const adaptedCheckBox = (): ColumnsType<any> => {
    if (checkBoxColumns && checkBoxColumns.length > 0) {
      return columns.map((column) => {
        if (column.key && checkBoxColumns.includes(column.key.toString())) {
          const { key } = column;
          return {
            ...column,
            render: (_, record) => {
              return <Checkbox checked={record[key.toString()]} />;
            },
          } as ColumnType<any>;
        }
        return column;
      });
    }
    return columns;
  };

  const columnsAdapted: ColumnsType<any> = [
    ...adaptedCheckBox(),
    {
      fixed: "right",
      width: "64px",
      render: (value) => (
        <div className="flex items-center justify-end gap-2">
          <DeleteOutlined
            className="cursor-pointer"
            onClick={() => handleDelete(value)}
          />
          <EditOutlined
            className="cursor-pointer"
            onClick={() => handleEdit(value)}
          />
        </div>
      ),
    },
  ];
  return (
    <div className="flex flex-col">
      <Title>{title}</Title>
      <Table
        columns={columnsAdapted}
        dataSource={data}
        scroll={{ y: 450, x: 700 }}
      />
      <footer className="flex justify-end gap-2">
        <Button onClick={() => router.push("/", { scroll: false })}>
          Back
        </Button>
        <Button onClick={() => dispatch(setCurrentModal(modal))} type="primary">
          Insert
        </Button>
      </footer>

      {currentModal && CRUD_Modals[currentModal]}
    </div>
  );
};

export default TableData;
