"use client";

import { Button, Table } from "antd";
import Title from "antd/es/typography/Title";
import { ColumnsType } from "antd/es/table";
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
import { TableData } from "@/interfaces/TableData";

interface TableDataProps {
  title: string;
  columns: ColumnsType<any>;
  modal: CRUD_ModalsType;
  data: any[];
}

const TableData: React.FC<TableDataProps> = ({
  columns,
  title,
  modal,
  data,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentModal = useSelector((state: RootState) => state.modal.current);

  const handleDelete = (value: TableData) => {
    Services[modal].delete(value.key);
    router.refresh();
  };

  const handleEdit = (value: TableData) => {
    dispatch(setEditingModal(value.key));
    dispatch(setCurrentModal(modal));
  };

  const columnsAdapted: ColumnsType<any> = [
    ...columns,
    {
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
    <>
      <Title>{title}</Title>
      <Table columns={columnsAdapted} dataSource={data} />
      <footer className="flex justify-end gap-2">
        <Button onClick={() => router.push("/", { scroll: false })}>
          Back
        </Button>
        <Button onClick={() => dispatch(setCurrentModal(modal))} type="primary">
          Insert
        </Button>
      </footer>

      {currentModal && CRUD_Modals[currentModal]}
    </>
  );
};

export default TableData;
