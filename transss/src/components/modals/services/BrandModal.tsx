import { ModalProps } from "@/interfaces/modal";
import { Form, Modal } from "antd";
import React from "react";
import styles from "@/styles/inputs.module.css";
import InputText from "@/components/commons/forms/InputText";
import InputNum from "@/components/commons/forms/InputNum";
import { InputSelect } from "@/components/commons/forms/InputSelect";

const BrandModal: React.FC<ModalProps> = ({ hideModal }) => {
  return (
    <Modal centered open onCancel={hideModal}>
      <Form className="form" method="post">
        <h2 className="form_title">Insert Brand</h2>
        <div className={styles.form_container}>
          <InputText label="Brand" id="brand_name" maxLength={50} />
          <InputText
            label="Seats"
            id="seats_amount"
            type="number"
            min={1}
            max={200}
          />
          <InputNum label="Spending" id="spending" maxLength={6} />
          <InputSelect
            id="fuel"
            label="Gasoline"
            options={[{ label: "Gasoline", value: "gasoline" }]}
          />
        </div>
      </Form>
    </Modal>
  );
};

export default BrandModal;
