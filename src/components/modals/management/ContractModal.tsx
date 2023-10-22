import { Form, FormInstance, Modal, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/inputs.module.css";
import InputText from "@/components/commons/forms/InputText";
import InputNum from "@/components/commons/forms/InputNum";
import { InputSelect } from "@/components/commons/forms/InputSelect";
import { useDispatch, useSelector } from "react-redux";
import { hideCurrentModal } from "@/components/core/stores/modalSlice";
import contractService from "@/services/tables/contracts";
import { useRouter } from "next/navigation";
import { RootState } from "@/components/core/stores/store";
import { Contract } from "@/interfaces/Contract";
import InputDate from "@/components/commons/forms/InputDate";

const ContractModal: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useRef<FormInstance>(null);
  const editing = useSelector((state: RootState) => state.modal.editing);
  const [data, setData] = useState<
    Omit<{ [key in keyof Contract]: string }, "key">
  >({
    applicant: "",
    start_date: "",
    end_date: "",
    kms: "",
    amount: "",
    country: "",
    fleet_number: "",
  });
  const handleOk = async () => {
    form.current
      ?.validateFields()
      .then(async (data) => {
        try {
          if (editing) {
            await contractService.update(editing, data);
          } else {
            await contractService.add(data);
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
      contractService.get(editing).then((data) => {
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
        <h2 className="form_title">{editing ? "Edit" : "Insert"} Contract</h2>
        <div className={styles.form_container}>
          <Form.Item
            name="applicant"
            rules={[{ required: true, message: "Applicant required" }]}
          >
            <InputText
              label="Applicant"
              id="applicant"
              maxLength={50}
              currentValue={data.applicant}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, applicant: e.target.value };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="start_date"
            rules={[{ required: true, message: "Start date required" }]}
          >
            <InputDate
              dateType="date"
              label="Start date"
              id="start_date"
              currentValue={data.start_date}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, start_date: e.target.value };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="end_date"
            rules={[{ required: true, message: "End date required" }]}
          >
            <InputDate
              dateType="date"
              label="End date"
              id="end_date"
              currentValue={data.end_date}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, end_date: e.target.value };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="kms"
            rules={[{ required: true, message: "Kms required" }]}
          >
            <InputNum
              label="Kms"
              id="kms"
              maxLength={50}
              currentValue={data.kms}
              onChange={(e) =>
                setData((data) => {
                  console.log(data);
                  return { ...data, kms: e.target.value };
                })
              }
            />
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
              currentValue={data.amount}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, amount: e.target.value };
                })
              }
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
              currentValue={data.country}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, country: e.target.value };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="fleet_number"
            rules={[{ required: true, message: "Fleet number required" }]}
          >
            <InputNum
              label="Fleet number"
              id="fleet_number"
              maxLength={50}
              currentValue={data.fleet_number}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, fleet_number: e.target.value };
                })
              }
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default ContractModal;
