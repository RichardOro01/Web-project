import { Form, FormInstance, Modal, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/inputs.module.css";
import InputText from "@/components/commons/forms/InputText";
import InputNum from "@/components/commons/forms/InputNum";
import { useDispatch, useSelector } from "react-redux";
import { hideCurrentModal } from "@/components/core/stores/modalSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/components/core/stores/store";
import { Car } from "@/interfaces/Car";
import carService from "@/services/tables/cars";

const CarModal: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useRef<FormInstance>(null);
  const editing = useSelector((state: RootState) => state.modal.editing);
  const [data, setData] = useState<Omit<{ [key in keyof Car]: string }, "key">>(
    {
      number: "",
      plate: "",
      brand: "",
      driver1: "",
      driver2: "",
    }
  );
  const handleOk = async () => {
    form.current
      ?.validateFields()
      .then(async (data) => {
        try {
          if (editing) {
            await carService.update(editing, data);
          } else {
            await carService.add(data);
          }
        } catch (error) {
          notification.error({ message: error as string });
        } finally {
          dispatch(hideCurrentModal());
          router.refresh();
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (editing) {
      carService.get(editing).then((data) => {
        setData(data);
      });
    }
  }, [editing]);

  return (
    <Modal
      centered
      open
      onCancel={() => dispatch(hideCurrentModal())}
      onOk={handleOk}
    >
      <Form className="form" ref={form} method="post">
        <h2 className="form_title">{editing ? "Edit" : "Insert"} Car</h2>
        <div className={styles.form_container}>
          <Form.Item
            name="number"
            rules={[{ required: true, message: "Number is Required" }]}
          >
            <InputNum
              label="Number"
              id="number"
              maxLength={6}
              currentValue={data.number}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, number: e.target.value };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="plate"
            rules={[{ required: true, message: "Plate required" }]}
          >
            <InputNum
              label="Plate"
              id="plate"
              maxLength={6}
              currentValue={data.plate}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, plate: e.target.value };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="brand"
            rules={[{ required: true, message: "Brand is required" }]}
          >
            <InputText
              label="Brand"
              id="brand"
              type="text"
              min={1}
              max={200}
              currentValue={data.brand}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, brand: e.target.value };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="driver1"
            rules={[{ required: true, message: "Driver1 is required" }]}
          >
            <InputText
              label="Driver1"
              id="driver1"
              min={1}
              max={200}
              currentValue={data.driver1}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, driver1: e.target.value };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="driver2"
            rules={[{ required: true, message: "Driver2 is required" }]}
          >
            <InputText
              label="Driver2"
              id="driver2"
              min={1}
              max={200}
              currentValue={data.driver2}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, driver2: e.target.value };
                })
              }
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default CarModal;
