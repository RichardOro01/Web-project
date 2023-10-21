import { ModalProps } from "@/interfaces/modal";
import { Form, FormInstance, Modal } from "antd";
import React, { useRef } from "react";
import styles from "@/styles/inputs.module.css";
import InputText from "@/components/commons/forms/InputText";
import InputNum from "@/components/commons/forms/InputNum";
import { InputSelect } from "@/components/commons/forms/InputSelect";
import InputDate from "@/components/commons/forms/InputDate";

const ContractModal: React.FC<ModalProps> = ({ hideModal }) => {
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
        <h2 className="form_title">Insert Contract</h2>
        <div className={styles.form_container}>
          <Form.Item
            name="applicant"
            rules={[{ required: true, message: "Applicant required" }]}
          >
            <InputText label="Applicant" id="applicant" maxLength={50} />
          </Form.Item>
          <Form.Item
            name="start_date"
            rules={[{ required: true, message: "Start date required" }]}
          >
            <InputDate dateType="date" label="Start date" id="start_date" />
          </Form.Item>
          <Form.Item
            name="end_date"
            rules={[{ required: true, message: "End date required" }]}
          >
            <InputDate dateType="date" label="End date" id="end_date" />
          </Form.Item>
          <Form.Item
            name="kms"
            rules={[{ required: true, message: "Kms required" }]}
          >
            <InputNum label="Kms" id="kms" maxLength={50} />
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
            name="fleet_number"
            rules={[{ required: true, message: "Fleet number required" }]}
          >
            <InputNum label="Fleet number" id="fleet_number" maxLength={50} />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default ContractModal;
