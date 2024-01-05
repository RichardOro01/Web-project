"use client";

import { Button, Checkbox, Spin, Table, notification } from "antd";
import Title from "antd/es/typography/Title";
import { ColumnType, ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/components/core/stores/store";
import {
  setCurrentModal,
  setEditingModal,
} from "@/components/core/stores/modalSlice";
import { CRUD_ModalsType } from "@/components/modals";
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { CRUD_Modals } from "@/components/modals/modals";
import Services from "@/services/services";
import { downloadPDF} from "@/lib/utils";import { useTranslation } from "react-i18next";
import useTranslationData from "../../../../i18n/hooks/useTranslationData";

interface TableDataReportsProps {
  title: string;
  columns: ColumnsType<any>;
  checkBoxColumns?: string[];
  dataToShow: TableDataType<any>[];
}

const TableDataReports: React.FC<TableDataReportsProps> = ({
  columns,
  title,
  checkBoxColumns,
  dataToShow,
}) => {
  const {t} = useTranslation([title])
  const router = useRouter();
  const currentModal = useSelector((state: RootState) => state.modal.current);
  const [api, contextHolder] = notification.useNotification();
  const [deleting, setDeleting] = useState<(string | number)[]>([]);
  const translatedData = useTranslationData(title,dataToShow)

  const translateColumns = (adaptedCheckBox:ColumnsType<any>) =>{
    return adaptedCheckBox.map((item:any) =>{return {...item, title:t(item.title,{ns:title})}})
  }

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
    ...translateColumns(adaptedCheckBox()),
    {
      fixed: "right",
      width: "64px",
      render: (value) => {
        return (
          <div className="flex items-center justify-end gap-2">
            {deleting.includes(value.key) && (
              <LoadingOutlined style={{ fontSize: 16 }} spin />
            )}
          </div>
        );
      },
    },
  ];

  const handleDownloadPDF = () => {
    downloadPDF(
      dataToShow.map((row) =>
        columns.map((column) => row[column.key as string])
      ),
      columns,
      title
    );
  };

  return (
    <>
      {contextHolder}
      <div className="flex flex-col">
        <Title>{t(title,{ns:title})}</Title>
        <Table
          columns={columnsAdapted}
          dataSource={dataToShow}
          scroll={{ y: 450, x: 700 }}
        />
        <footer className="flex justify-end gap-2">
          <Button onClick={() => handleDownloadPDF}>{t("Download PDF",{ns:"translation"})}</Button>
          <Button onClick={() => router.push("/", { scroll: false })}>
            {t("Back",{ns:"translation"})}
          </Button>
        </footer>

        {currentModal && CRUD_Modals[currentModal]}
      </div>
    </>
  );
};

export default TableDataReports;
