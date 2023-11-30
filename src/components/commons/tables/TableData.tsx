"use client";

import { Button, Checkbox, Table, notification } from "antd";
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
  data: any[];
  checkBoxColumns?: string[];
  dataToShow: TableDataType<any>[];
}

const TableData: React.FC<TableDataProps> = ({
  columns,
  title,
  modal,
  data,
  checkBoxColumns,
  dataToShow,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentModal = useSelector((state: RootState) => state.modal.current);
  const [api, contextHolder] = notification.useNotification();

  const handleDelete = async (value: TableDataType<any>) => {
    try {
      await Services[modal].delete(value.key.toString());
      router.refresh();
      api.success({ message: "Element Successfully Deleted" });
    } catch (error: any) {
      api.error({ message: error.detail.message });
    }
  };

  const handleEdit = (value: any) => {
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
            onClick={() => handleEdit(data[dataToShow.indexOf(value)])}
          />
        </div>
      ),
    },
  ];
  return (
    <>
      {contextHolder}
      <div className="flex flex-col">
        <Title>{title}</Title>
        <Table
          columns={columnsAdapted}
          dataSource={dataToShow}
          scroll={{ y: 450, x: 700 }}
        />
        <footer className="flex justify-end gap-2">
          <Button onClick={() => router.push("/", { scroll: false })}>
            Back
          </Button>
          <Button
            onClick={() => dispatch(setCurrentModal(modal))}
            type="primary"
          >
            Insert
          </Button>
        </footer>

        {currentModal && CRUD_Modals[currentModal]}
      </div>
    </>
  );
};

export default TableData;
