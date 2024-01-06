import TableData from '@/components/commons/tables/TableData';
import TableDataReports from '@/components/commons/tables/TablesDataReports';
import { Free_cover } from '@/interfaces/Free_cover';
import { free_coverTableAdapter } from '@/interfaces/adapters/Free_coverAdapter';
import prisma from '@/lib/prisma';
import free_coverServices from '@/services/tables/free_cover';
import Title from 'antd/es/skeleton/Title';
import Table, { ColumnsType } from 'antd/es/table';
import React from 'react'

const columns: ColumnsType<Free_cover> = [
    {
      title: "Brand name",
      dataIndex: "brand_name",
      key: "brand_name",
    },
    {
      title: "Driver name",
      dataIndex: "driver_name",
      key: "driver_name",
    },
];

const Free_coverPage = async () => {
    let free_covers: Free_cover[] = [];
    try {
      free_covers = await free_coverServices.get();
    } catch (error) {
      console.log(error);
    }
    return (
      <main className="flex flex-col gap-8 p-5">
        <TableDataReports
          title="free_covers"
          dataToShow={free_coverTableAdapter(free_covers)}
          {...{ columns }}
        />
      </main>
    );
}

export default Free_coverPage
