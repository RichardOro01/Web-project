import React from 'react'
import { ColumnsType } from "antd/es/table";
import { Car } from '@/interfaces/Car';
import carService from '@/services/tables/cars';
import TableData from '@/components/commons/tables/TableData';

const columns: ColumnsType<Car> = [
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Plate",
      dataIndex: "plate",
      key: "plate",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Driver 1",
      dataIndex: "driver1",
      key: "driver1",
    },
    {
      title: "Driver 2",
      dataIndex: "driver2",
      key: "driver2",
    },
  ];

const CarPage = async () => {
    let cars: Car[] = [];
    try {
      cars = await carService.get();
    } catch (error) {
      console.log(error);
    }
    return (
      <main className="flex flex-col gap-8 p-5">
        <TableData title="Cars" modal="cars" data={cars} {...{ columns }} />
      </main>
    );
}

export default CarPage
