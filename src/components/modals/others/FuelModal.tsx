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

const FuelModal: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useRef<FormInstance>(null);
  const editing = useSelector((state: RootState) => state.modal.editing);
  const [data, setData] = useState<
    Omit<{ [key in keyof Fuel]: string }, "key">
  >({
    fuel_name: "",
  });
  const handleOk = async () => {
    console.log(data);
    form.current
      ?.validateFields()
      .then(async (data) => {
        try {
          if (editing) {
            await fuelService.update(editing, data);
          } else {
            await fuelService.add(data);
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
      fuelService.get(editing).then((data) => {
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
