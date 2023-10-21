import { ModalProps } from "@/interfaces/modal";
import { Form, FormInstance, Modal } from "antd";
import React, { useRef } from "react";
import styles from "@/styles/inputs.module.css";
import InputText from "@/components/commons/forms/InputText";
import InputNum from "@/components/commons/forms/InputNum";
import { InputSelect } from "@/components/commons/forms/InputSelect";
import InputDate from "@/components/commons/forms/InputDate";

const ServiceModal: React.FC<ModalProps> = ({ hideModal }) => {
  const form = useRef<FormInstance>(null);
  const handleOk = () => {
    form.current
      ?.validateFields()
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };
  return (
    <Modal centered open onCancel={hideModal} onOk={handleOk}>
      <Form className="form" ref={form} method="post">
        <h2 className="form_title">Insert Service</h2>
        <div className={styles.form_container}>
          <Form.Item
            name="service"
            rules={[{ required: true, message: "Service name required" }]}
          >
            <InputText label="Service name" id="service_name" maxLength={50} />
          </Form.Item>
          <Form.Item
            name="tour"
            rules={[{ required: true, message: "Tour Group required" }]}
          >
            <InputSelect
              id="tour_group"
              label="Tour Group"
              options={[{ label: "Adventure Explorers", value: "TG001" }]}
            />
          </Form.Item>
          <Form.Item
            name="country"
            rules={[{ required: true, message: "Country required" }]}
          >
            <InputSelect
              id="country"
              label="Country"
              options={[{ label: "Cuba", value: "cu" }]}
            />
          </Form.Item>
          <Form.Item
            name="pickup"
            rules={[{ required: true, message: "Pickup place required" }]}
          >
            <InputText label="Pickup place" id="pickup" maxLength={50} />
          </Form.Item>
          <Form.Item
            name="pickup_time"
            rules={[{ required: true, message: "Pickup time required" }]}
          >
            <InputDate dateType="time" label="Pickup time" id="pickup_time" />
          </Form.Item>
          <Form.Item
            name="pax"
            rules={[{ required: true, message: "Pax required" }]}
          >
            <InputText label="Pax" id="pax" type="number" min={1} max={20} />
          </Form.Item>
          <Form.Item
            name="service"
            rules={[{ required: true, message: "Service required" }]}
          >
            <InputNum label="Service(kms)" id="service_kms" maxLength={50} />
          </Form.Item>
          <Form.Item
            name="amount"
            rules={[{ required: true, message: "Amount required" }]}
          >
            <InputText
              label="Amount"
              id="amount"
              type="number"
              min={1}
              max={20}
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default ServiceModal;
