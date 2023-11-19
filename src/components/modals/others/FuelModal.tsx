import { Form, FormInstance, Modal, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/inputs.module.css";
import InputText from "@/components/commons/forms/InputText";
import { useDispatch, useSelector } from "react-redux";
import { hideCurrentModal } from "@/components/core/stores/modalSlice";
import fuelService from "@/services/tables/fuels";
import { useRouter } from "next/navigation";
import { RootState } from "@/components/core/stores/store";
import { Fuel } from "@/interfaces/Fuel";
import {
  fuelCreateAdapter,
  fuelFormAdapter,
  fuelTypesAdapter,
} from "@/interfaces/adapters/FuelAdapter";

const FuelModal: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useRef<FormInstance>(null);
  const editing = useSelector(
    (state: RootState) => state.modal.editing as TableDataType<Fuel> | undefined
  );
  const [api, contextHolder] = notification.useNotification();
  const [data, setData] = useState<FormDataType<Fuel>>({
    fuel_code: "",
    fuel_name: "",
  });
  const handleOk = async () => {
    try {
      await form.current?.validateFields();
      const adaptedTypesData = fuelTypesAdapter(data);
      if (editing) {
        await fuelService.update(data.fuel_code.toString(), adaptedTypesData);
      } else {
        await fuelService.add(fuelCreateAdapter(adaptedTypesData));
      }
      api.success({ message: "Fuel created" }); //TODO cuando se cierra el modal no deja ver esto
      dispatch(hideCurrentModal());
      router.refresh();
    } catch (error: any) {
      if (error.detail) api.error({ message: error.detail });
    }
  };

  useEffect(() => {
    if (editing) {
      setData(fuelFormAdapter(editing));
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
        <h2 className="form_title">{editing ? "Edit" : "Insert"} Fuel</h2>
        <div className={styles.form_container}>
          <Form.Item
            name="fuel_name"
            rules={[{ required: true, message: "Fuel name required" }]}
          >
            <InputText
              label="Fuel"
              id="fuel_name"
              maxLength={50}
              currentValue={data.fuel_name}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, fuel_name: e.target.value };
                })
              }
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default FuelModal;
