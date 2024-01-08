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
import { downloadPDF, mapData} from "@/lib/utils";import { useTranslation } from "react-i18next";
import useTranslationData from "../../../../i18n/hooks/useTranslationData";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { authorizeModifyData } from "@/services/utils/Authorization";

interface TableDataProps {
  title: string;
  columns: ColumnsType<any>;
  modal: CRUD_ModalsType;
  Data: any[];
  checkBoxColumns?: string[];
  dataToShow: TableDataType<any>[];
}

const TableData: React.FC<TableDataProps> = ({
  columns,
  title,
  modal,
  Data,
  checkBoxColumns,
  dataToShow,
}) => {
  const {t} = useTranslation([title])
  const router = useRouter();
  const dispatch = useDispatch();
  const currentModal = useSelector((state: RootState) => state.modal.current);
  const [api, contextHolder] = notification.useNotification();
  const [deleting, setDeleting] = useState<(string | number)[]>([]);
  const translatedData = useTranslationData(title,dataToShow)
  const {data} = useSession()

  const handleDelete = async (value: TableDataType<any>) => {
    if (!deleting.includes(value.key)) {
      addToDeleting(value.key);
      try {
        await Services[modal].delete(value.key.toString());
        router.refresh();
        api.success({ message: t("Element Successfully Deleted",{ns:"translation"}) });
      } catch (error: any) {
        api.error({ message: error.detail.message });
      } finally {
        removeFromDeleting(value.key);
      }
    }
  };

  const translateColumns = (adaptedCheckBox:ColumnsType<any>) =>{
    return adaptedCheckBox.map((item:any) =>{return {...item, title:t(item.title,{ns:title})}})
  }

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

  const addToDeleting = (value: string | number) => {
    if (!deleting.includes(value))
      setDeleting((deleting) => [...deleting, value]);
  };

  const removeFromDeleting = (value: string | number) => {
    setDeleting((deleting) => {
      return deleting.filter((deletingValue) => deletingValue !== value);
    });
  };

  const columnsAdapted: ColumnsType<any> = [
    ...translateColumns(adaptedCheckBox()),
    {
      fixed: "right",
      width: "64px",
      render: (value) => {
        return (
          <div className="flex items-center justify-end gap-2">
            {!deleting.includes(value.key) &&
             authorizeModifyData(data?.role_code,title) && (
              <DeleteOutlined
                className="cursor-pointer"
                onClick={() => handleDelete(value)}
                //disabled={!authorizeModifyData(data?.role_code,title)}
              />
            )}
            {deleting.includes(value.key) && (
              <LoadingOutlined style={{ fontSize: 16 }} spin />
            )}
            {authorizeModifyData(data?.role_code,title) &&
              <EditOutlined
              className="cursor-pointer"
              onClick={() => handleEdit(Data[dataToShow.indexOf(value)])}
              //disabled={!authorizeModifyData(data?.role_code,title)}
            />}
          </div>
        );
      },
    },
  ];


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
          <Button
            onClick={() =>
              downloadPDF(
                mapData(dataToShow, columns),
                columns,
                "Contracts in period"
              )
            }
          >
            Download PDF
          </Button>
          <Button onClick={() => router.push("/", { scroll: false })}>
            {t("Back",{ns:"translation"})}
          </Button>
          <Button
            onClick={() => dispatch(setCurrentModal(modal))}
            type="primary"
            disabled={!authorizeModifyData(data?.role_code,title)}
          >
            {t("Insert",{ns:"translation"})}
          </Button>
        </footer>

        {currentModal && CRUD_Modals[currentModal]}
      </div>
    </>
  );
};

export default TableData;
