import { Form, FormInstance, Modal, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/inputs.module.css";
import InputText from "@/components/commons/forms/InputText";
import InputNum from "@/components/commons/forms/InputNum";
import { useDispatch, useSelector } from "react-redux";
import { hideCurrentModal } from "@/components/core/stores/modalSlice";
import roadmapService from "@/services/tables/roadmaps";
import { useRouter } from "next/navigation";
import { RootState } from "@/components/core/stores/store";
import { EditRoadmap, Roadmap } from "@/interfaces/Roadmap";
import InputDate from "@/components/commons/forms/InputDate";
import { InputSelect } from "@/components/commons/forms/InputSelect";
import { roadmapFormAdapter, roadmapTypesAdapter } from "@/interfaces/adapters/RoadmapAdapter";
import { Car } from "@/interfaces/Car";
import carService from "@/services/tables/cars";
import { carOptionsAdapter } from "@/interfaces/adapters/CarAdapter";

const RoadmapModal: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useRef<FormInstance>(null);
  const editing = useSelector(
    (state: RootState) => state.modal.editing as Roadmap | undefined
  );

  const [api, contextHolder] = notification.useNotification();
  const [data, setData] = useState<FormDataType<EditRoadmap>>({
    roadmap_date: "",
    car_code: "",
    kms: "",
    departure_time: "",
  });

  const [cars, setCars] = useState<Car[]>([])

  const handleOk = async () => {
    try {
      await form.current?.validateFields();
      const adaptedTypesData = roadmapTypesAdapter(data);

      if (editing) {
        /* await servicesAppService.update(data.roadmap_date y car_code.toString(),adaptedTypesData); */
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

  /* const handleOk = async () => {
    const adaptedTypesData = roadmapTypesAdapter(data);
    await form.current?.validateFields()
      .then(async (data) => {
        try {
          if (editing) {
            await roadmapService.update(editing, data);
          } else {
            await roadmapService.add(adaptedTypesData);
          }
        } catch (error) {
          notification.error({ message: error as string });
        } finally {
          api.success({ message: "Roadmap created" });
          dispatch(hideCurrentModal());
          router.refresh();
        }
      })
      .catch((error) => console.log(error));
  }; */

  /* const handleOk = async () => {
    try {
      await form.current?.validateFields();
      const adaptedTypesData = roadmapTypesAdapter(data);
      if (editing) {
        await roadmapService.update(editing, data);
      } else {
        await roadmapService.add(roadmapCreateAdapter(adaptedTypesData));
      }
      api.success({ message: "Roadmap created" }); //TODO cuando se cierra el modal no deja ver esto
      dispatch(hideCurrentModal());
      router.refresh();
    } catch (error: any) {
      if (error.detail) api.error({ message: error.detail });
    }
  };
 */

  const updateCar = async () => {
    const cars = await carService.get();
    setCars(cars);
  };

  useEffect(() => {
    if (editing) {
      setData(roadmapFormAdapter(editing));
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
        <h2 className="form_title">{editing ? "Edit" : "Insert"} Roadmap</h2>
        <div className={styles.form_container}>
          <Form.Item
            name="date"
            rules={[{ required: true, message: "Date required" }]}
          >
            <InputDate
              dateType="date"
              label="Date"
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
                label="Car code"
                options={[{label: "car1", value: "31"},{label: "car2", value: "32"},{label: "car3", value: "33"},{label: "car4", value: "34"},{label: "car5", value: "35"},{label: "car6", value: "36"},{label: "car7", value: "37"}]}
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
              label="Departure time"
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
