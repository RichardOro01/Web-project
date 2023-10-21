import { ModalProps } from "@/interfaces/modal";
import { Form, FormInstance, Modal } from "antd";
import React, { useRef } from "react";
import styles from "@/styles/inputs.module.css";
import InputText from "@/components/commons/forms/InputText";
import InputNum from "@/components/commons/forms/InputNum";
import { InputSelect } from "@/components/commons/forms/InputSelect";
import { useDispatch } from "react-redux";
import { hideCurrentModal } from "@/components/core/stores/modalSlice";

const BrandModal: React.FC = () => {
  const dispatch = useDispatch();
  const form = useRef<FormInstance>(null);
  const handleOk = () => {
    form.current
      ?.validateFields()
      .then((data) => console.log(data))
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
        <h2 className="form_title">Insert Brand</h2>
        <div className={styles.form_container}>
          <Form.Item
            name="brand_name"
            rules={[{ required: true, message: "Brand name required" }]}
          >
            <InputText label="Brand" id="brand_name" maxLength={50} />
          </Form.Item>
          <Form.Item
            name="seats_amount"
            rules={[{ required: true, message: "Seats required" }]}
          >
            <InputText
              label="Seats"
              id="seats_amount"
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
