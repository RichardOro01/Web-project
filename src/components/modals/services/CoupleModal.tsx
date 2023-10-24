import { Form, FormInstance, Modal, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/inputs.module.css";
import InputText from "@/components/commons/forms/InputText";
import InputNum from "@/components/commons/forms/InputNum";
import { InputSelect } from "@/components/commons/forms/InputSelect";
import { useDispatch, useSelector } from "react-redux";
import { hideCurrentModal } from "@/components/core/stores/modalSlice";
import brandService from "@/services/tables/brands";
import { useRouter } from "next/navigation";
import { RootState } from "@/components/core/stores/store";
import { Couple } from "@/interfaces/Couple";
import coupleService from "@/services/tables/couples";

const CoupleModal: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useRef<FormInstance>(null);
  const editing = useSelector((state: RootState) => state.modal.editing);
  const [data, setData] = useState<
    Omit<{ [key in keyof Couple]: string }, "key">
  >({
    driver1: "",
    driver2: ""
  });
  const handleOk = async () => {
    form.current
      ?.validateFields()
      .then(async (data) => {
        try {
          if (editing) {
            await coupleService.update(editing, data);
          } else {
            await coupleService.add(data);
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
      coupleService.get(editing).then((data) => {
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
        <h2 className="form_title">{editing ? "Edit" : "Insert"} Couple</h2>
        <div className={styles.form_container}>
          <Form.Item
            name="driver1"
            rules={[{ required: true, message: "Driver 1 required" }]}
          >
            <InputText
              label="Driver 1"
              id="driver1"
              maxLength={50}
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
            rules={[{ required: true, message: "Driver 2 required" }]}
          >
            <InputText
              label="Driver 2"
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

export default CoupleModal
