import { Form, FormInstance, Modal, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/inputs.module.css";
import InputText from "@/components/commons/forms/InputText";
import InputNum from "@/components/commons/forms/InputNum";
import { useDispatch, useSelector } from "react-redux";
import { hideCurrentModal } from "@/components/core/stores/modalSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/components/core/stores/store";
import { Car,EditCar } from "@/interfaces/Car";
import carService from "@/services/tables/cars";
import { InputSelect } from "@/components/commons/forms/InputSelect";
import useGetCouples from "@/services/hooks/useGetCouples";
import { coupleOptionsAdapter } from "@/interfaces/adapters/CoupleAdapter";
import { carCreateAdapter, carFormAdapter, carTypesAdapter } from "@/interfaces/adapters/CarAdapter";
import useGetBrands from "@/services/hooks/useGetBrands";
import { brandOptionsAdapter } from "@/interfaces/adapters/BrandAdapter";

const CarModal: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useRef<FormInstance>(null);
  const editing = useSelector((state: RootState) => state.modal.editing as EditCar|undefined);
  const [api, contextHolder] = notification.useNotification();
  const [data, setData] = useState<FormDataType<EditCar>>(
    {
      fleet_number: "",
      plate: "",
      brand_code: "",
      couple_code:"",
      car_code:""
    }
  );

  const couplesData = useGetCouples()
  const brandsData = useGetBrands()
  
  const handleOk = async () => {
    try {
      await form.current?.validateFields();
      const adaptedTypesData = carTypesAdapter(data);
      if (editing) {
        await carService.update(data.car_code?.toString(), adaptedTypesData);
      } else {
        await carService.add(carCreateAdapter(adaptedTypesData));
      }
      api.success({ message: "Car created" }); //TODO cuando se cierra el modal no deja ver esto
      dispatch(hideCurrentModal());
      router.refresh();
    } catch (error: any) {
      if (error.detail) api.error({ message: error.detail });
    } finally {
      dispatch(hideCurrentModal());
      router.refresh();
    }
  };

  useEffect(() => {
    if (editing) {
      setData(carFormAdapter(editing));
    }
  }, [editing]);

  return (
    <>
    {contextHolder}
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
            name="fleet_number"
            rules={[{ required: true, message: "Number required" }]}
          >
            <InputNum
              label="Fleet Number"
              id="fleet_number"
              maxLength={6}
              currentValue={data.fleet_number}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, fleet_number: e.target.value };
                })
              }
            />
          </Form.Item>

          <Form.Item
            name="plate"
            rules={[{ required: true, message: "Plate required" }]}
          >
            <InputText
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
            <InputSelect
              label="Brand"
              id="brand"
              currentValue={data.brand_code}
              options={brandOptionsAdapter(brandsData.list)}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, brand_code: e.target.value };
                })
              }
            />
          </Form.Item>

          <Form.Item
            name="couple"
            rules={[{ required: true, message: "Select the Couple" }]}
          >
            <InputSelect
              label="Couple"
              id="couple"
              currentValue={data.couple_code}
              options={coupleOptionsAdapter(couplesData.list)}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, couple_code: e.target.value };
                })
              }
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
    </>
  );
};

export default CarModal;
