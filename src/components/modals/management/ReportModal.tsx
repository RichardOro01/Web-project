import { Form, FormInstance, Modal, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/inputs.module.css";
import InputNum from "@/components/commons/forms/InputNum";
import { useDispatch, useSelector } from "react-redux";
import { hideCurrentModal } from "@/components/core/stores/modalSlice";
import reportService from "@/services/tables/reports";
import { useRouter } from "next/navigation";
import { RootState } from "@/components/core/stores/store";
import { Report } from "@/interfaces/Report";
import {
  reportCreateAdapter,
  reportFormAdapter,
  reportTypesAdapter,
} from "@/interfaces/adapters/ReportAdapter";
import InputText from "@/components/commons/forms/InputText";

const ReportModal: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useRef<FormInstance>(null);
  const editing = useSelector(
    (state: RootState) => state.modal.editing as Report | undefined
  );
  const [api, contextHolder] = notification.useNotification();
  const [data, setData] = useState<FormDataType<Report>>({
    report_code: "",
    amo_others: "",
    income_others: "",
    income_total: "",
    income_rents: "",
    amo_rents: "",
    amo_services: "",
  });

  const handleOk = async () => {
    try {
      await form.current?.validateFields();
      const adaptedTypesData = reportTypesAdapter(data);
      if (editing) {
        await reportService.update(
          data.report_code.toString(),
          adaptedTypesData
        );
      } else {
        await reportService.add(reportCreateAdapter(adaptedTypesData));
      }
      api.success({ message: "Report created" }); //TODO cuando se cierra el modal no deja ver esto
      dispatch(hideCurrentModal());
      router.refresh();
    } catch (error: any) {
      if (error.detail) api.error({ message: error.detail });
    }
  };

  useEffect(() => {
    if (editing) {
      setData(reportFormAdapter(editing));
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
        <h2 className="form_title">{editing ? "Edit" : "Insert"} Report</h2>
        <div className={styles.form_container}>
          <Form.Item
            name="amo_services"
            rules={[{ required: true, message: "Amount services required" }]}
          >
            <InputText
              label="Amount services"
              id="amo_services"
              type="number"
              min={1}
              max={1000}
              currentValue={data.amo_services}
              onChange={(e) =>
                setData((data) => {
                  return {
                    ...data,
                    amo_services: e.target.value,
                  };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="amo_rents"
            rules={[{ required: true, message: "Amount rents required" }]}
          >
            <InputText
              label="Amount rents"
              id="amo_rents"
              type="number"
              min={1}
              max={1000}
              currentValue={data.amo_rents}
              onChange={(e) =>
                setData((data) => {
                  return {
                    ...data,
                    amo_rents: e.target.value,
                  };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="income_rents"
            rules={[{ required: true, message: "Income rents required" }]}
          >
            <InputNum
              label="Income rents"
              id="income_rents"
              maxLength={50}
              currentValue={data.income_rents}
              onChange={(e) =>
                setData((data) => {
                  console.log(data);
                  return { ...data, income_rents: e.target.value };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="amo_others"
            rules={[{ required: true, message: "Amount others required" }]}
          >
            <InputText
              label="Amount others"
              id="amo_others"
              type="number"
              min={1}
              max={1000}
              currentValue={data.amo_others}
              onChange={(e) =>
                setData((data) => {
                  return {
                    ...data,
                    amo_others: e.target.value,
                  };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="income_others"
            rules={[{ required: true, message: "Income others required" }]}
          >
            <InputNum
              label="Income others"
              id="income_others"
              maxLength={50}
              currentValue={data.income_others}
              onChange={(e) =>
                setData((data) => {
                  console.log(data);
                  return { ...data, income_others: e.target.value };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="income_total"
            rules={[{ required: true, message: "Income total required" }]}
          >
            <InputNum
              label="Income total"
              id="income_total"
              maxLength={50}
              currentValue={data.income_total}
              onChange={(e) =>
                setData((data) => {
                  console.log(data);
                  return { ...data, income_total: e.target.value };
                })
              }
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default ReportModal;
