import { Form, FormInstance, Modal, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/inputs.module.css";
import InputNum from "@/components/commons/forms/InputNum";
import { useDispatch, useSelector } from "react-redux";
import { hideCurrentModal } from "@/components/core/stores/modalSlice";
import roadmapService from "@/services/tables/roadmaps";
import { useRouter } from "next/navigation";
import { RootState } from "@/components/core/stores/store";
import { EditRoadmap, Roadmap } from "@/interfaces/Roadmap";
import InputDate from "@/components/commons/forms/InputDate";
import { InputSelect } from "@/components/commons/forms/InputSelect";
import {
  roadmapFormAdapter,
  roadmapTypesAdapter,
} from "@/interfaces/adapters/RoadmapAdapter";
import { Car } from "@/interfaces/Car";
import carService from "@/services/tables/cars";
import { carOptionsAdapter } from "@/interfaces/adapters/CarAdapter";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const RoadmapModal: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useRef<FormInstance>(null);
  const {t} = useTranslation(['Roadmaps'])
  const editing = useSelector(
    (state: RootState) => state.modal.editing as Roadmap | undefined
  );

  const [api, contextHolder] = notification.useNotification();
  const [currentTupleData, setCurrentTupleData] = useState<FormDataType<EditRoadmap>>({
    roadmap_date: "",
    car_code: "",
    kms: "",
    departure_time: "",
  });

  const [data, setData] = useState<FormDataType<EditRoadmap>>({
    roadmap_date: "",
    car_code: "",
    kms: "",
    departure_time: "",
  });

  const [cars, setCars] = useState<Car[]>([]);

  const handleOk = async () => {
    try {
      await form.current?.validateFields();
      console.log(data)
      const adaptedTypesData = roadmapTypesAdapter(data);
      console.log(editing)

      if (editing) {
         await roadmapService.update(`${currentTupleData.car_code}-:-${currentTupleData.roadmap_date}`,adaptedTypesData)
      } else {
        await roadmapService.add(adaptedTypesData);
      }
      api.success({ message: "Roadmap created" }); //TODO cuando se cierra el modal no deja ver esto
      dispatch(hideCurrentModal());
      router.refresh();
    } catch (error: any) {
      if (error.detail) api.error({ message: error.detail });
    }
  };

  const updateCar = async () => {
    const cars = await carService.get();
    setCars(cars);
  };

  useEffect(() => {
    if (editing) {
      setData(roadmapFormAdapter(editing));
      setCurrentTupleData(roadmapFormAdapter(editing));
      console.log(editing)
    }
  }, [editing]);

  useEffect(() => {
    updateCar();
  }, []);

  return (
    <Modal
      centered
      open
      onCancel={() => dispatch(hideCurrentModal())}
      onOk={handleOk}
    >
      <Form className="form" ref={form} method="post">
        <h2 className="form_title">{t(editing ? "Edit Roadmap" : "Insert Roadmap",{ns:"Roadmaps"})}</h2>
        <div className={styles.form_container}>
          <Form.Item
            name="date"
            rules={[{ required: true, message: "Date required" }]}
          >
            <InputDate
              dateType="date"
              label={t("Roadmap date",{ns:'Roadmaps'})}
              id="roadmap_date"
              currentValue={data.roadmap_date}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, roadmap_date: e.target.value };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="car_code"
            rules={[{ required: true, message: "Car code number required" }]}
          >
            <InputSelect
              id="car_code"
              label={t("Car code",{ns:'Roadmaps'})}
              options={carOptionsAdapter(cars)}
              currentValue={data.car_code}
              onChange={(e) =>
                setData((data) => {
                  return {
                    ...data,
                    car_code: e.target.value,
                  };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="kms"
            rules={[{ required: true, message: "Kms required" }]}
          >
            <InputNum
              label="Kms"
              id="kms"
              maxLength={6}
              currentValue={data.kms}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, kms: e.target.value };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="departure_time"
            rules={[{ required: true, message: "Departure time required" }]}
          >
            <InputDate
              dateType="time"
              label={t("Departure time",{ns:"Roadmaps"})}
              id="departure_time"
              currentValue={data.departure_time}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, departure_time: e.target.value };
                })
              }
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default RoadmapModal;
