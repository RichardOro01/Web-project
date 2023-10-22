import { Form, FormInstance, Modal, notification } from "antd";
import React, { useRef } from "react";
import styles from "@/styles/inputs.module.css";
import InputText from "@/components/commons/forms/InputText";
import InputNum from "@/components/commons/forms/InputNum";
import { InputSelect } from "@/components/commons/forms/InputSelect";
import { useDispatch, useSelector } from "react-redux";
import { hideCurrentModal } from "@/components/core/stores/modalSlice";
import brandService from "@/services/brands";
import { useRouter } from "next/navigation";
import { RootState } from "@/components/core/stores/store";

const BrandModal: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useRef<FormInstance>(null);
  const editing = useSelector((state: RootState) => state.modal.editing);
  const handleOk = async () => {
    form.current
      ?.validateFields()
      .then(async (data) => {
        try {
          if (editing) {
            await brandService.update(editing, data);
          } else {
            await brandService.add(data);
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
  return (
    <Modal
      centered
      open
      onCancel={() => dispatch(hideCurrentModal())}
      onOk={handleOk}
    >
      <Form className="form" ref={form} method="post">
        <h2 className="form_title">{editing ? "Edit" : "Insert"} Brand</h2>
        <div className={styles.form_container}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Brand name required" }]}
          >
            <InputText label="Brand" id="name" maxLength={50} />
          </Form.Item>
          <Form.Item
            name="seats"
            rules={[{ required: true, message: "Seats required" }]}
          >
            <InputText
              label="Seats"
              id="seats"
              type="number"
              min={1}
              max={200}
            />
          </Form.Item>
          <Form.Item
            name="spending"
            rules={[{ required: true, message: "Spending required" }]}
          >
            <InputNum label="Spending" id="spending" maxLength={6} />
          </Form.Item>
          <Form.Item
            name="fuel"
            rules={[{ required: true, message: "Fuel required" }]}
          >
            <InputSelect
              id="fuel"
              label="Gasoline"
              options={[{ label: "Gasoline", value: "gasoline" }]}
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default BrandModal;
