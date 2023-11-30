import { Form, FormInstance, Modal, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/inputs.module.css";
import InputText from "@/components/commons/forms/InputText";
import InputNum from "@/components/commons/forms/InputNum";
import { InputSelect } from "@/components/commons/forms/InputSelect";
import { useDispatch, useSelector } from "react-redux";
import { hideCurrentModal } from "@/components/core/stores/modalSlice";
import discrepancyService from "@/services/tables/discrepancies";
import { useRouter } from "next/navigation";
import { RootState } from "@/components/core/stores/store";
import { Discrepancy, EditDiscrepancy } from "@/interfaces/Discrepancy";
import { discrepancyTypesAdapter } from "@/interfaces/adapters/DiscrepancyAdapter";

const DiscrepancyModal: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useRef<FormInstance>(null);
  const editing = useSelector((state: RootState) => state.modal.editing as Discrepancy | undefined);
  
  const [api, contextHolder] = notification.useNotification();
  const [data, setData] = useState<FormDataType<EditDiscrepancy>>({
    month_code: "",
    car_code: "",
    planned_kms: "",
    tours_kms: "",
    difference_kms: "",
    planned_fuel: "",
    consumed_fuel : "",
    dif_spending_fuel : "",
  });

  const handleOk = async () => {
    try {
      await form.current?.validateFields();
      const adaptedTypesData = discrepancyTypesAdapter(data);

      if (editing) {
        /* await servicesAppService.update(data.roadmap_date y car_code.toString(),adaptedTypesData); */
      } else {
        await discrepancyService.add(adaptedTypesData);
      }
      api.success({ message: "Discrepancy created" }); //TODO cuando se cierra el modal no deja ver esto
      dispatch(hideCurrentModal());
      router.refresh();
    } catch (error: any) {
      if (error.detail) api.error({ message: error.detail });
    }
  };

  return (
    <Modal
      centered
      open
      onCancel={() => dispatch(hideCurrentModal())}
      onOk={handleOk}
    >
      <Form className="form" ref={form} method="post">
        <h2 className="form_title">{editing ? "Edit" : "Insert"} Discrepancy</h2>
        <div className={styles.form_container}>
          <Form.Item
            name="month_code"
            rules={[{ required: true, message: "Month required" }]}
          >
            <InputSelect
              id="month_code"
              label="Month"
              options={[{ label: "January", value: "2023-01-01" }]}
              currentValue={data.month_code}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, month_code: e.target.value };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="car_code"
            rules={[{ required: true, message: "Car code number required" }]}
          >
            <InputSelect
              id="car_code"
              label="Car code"
              options={[
                { label: "car1", value: "31" },
                { label: "car2", value: "32" },
                { label: "car3", value: "33" },
                { label: "car4", value: "34" },
                { label: "car5", value: "35" },
                { label: "car6", value: "36" },
                { label: "car7", value: "37" },
              ]}
              currentValue={data.car_code}
              onChange={(e) =>
                setData((data) => {
                  return {
                    ...data,
                    car_code: e.target.value,
                  };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="planned_kms"
            rules={[{ required: true, message: "Planned kms required" }]}
          >
            <InputNum
              label="Planned kms"
              id="planned_kms"
              maxLength={6}
              currentValue={data.planned_kms}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, planned_kms: e.target.value };
                })
              }
            />
            </Form.Item>
            <Form.Item
            name="tours_kms"
            rules={[{ required: true, message: "Tours kms required" }]}
            >
            <InputNum
              label="Tours kms"
              id="tours_kms"
              maxLength={6}
              currentValue={data.tours_kms}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, tours_kms: e.target.value };
                })
              }
            />
            </Form.Item>
          <Form.Item
            name="difference_kms"
            rules={[{ required: true, message: "Difference kms required" }]}
            >
          <InputNum
              label="Difference kms"
              id="difference_kms"
              maxLength={6}
              currentValue={data.difference_kms}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, difference_kms: e.target.value };
                })
              }
            />
            </Form.Item>
            <Form.Item
            name="planned_fuel"
            rules={[{ required: true, message: "Planned fuel required" }]}
            >
            <InputNum
              label="Planned fuel"
              id="planned_fuel"
              maxLength={6}
              currentValue={data.planned_fuel}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, planned_fuel: e.target.value };
                })
              }
            />
            </Form.Item>
            <Form.Item
            name="consumed_fuel"
            rules={[{ required: true, message: "Consumed fuel required" }]}
            >    
            <InputNum
              label="Consumed fuel"
              id="consumed_fuel"
              maxLength={6}
              currentValue={data.consumed_fuel}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, consumed_fuel: e.target.value };
                })
              }
            />
            </Form.Item>
          <Form.Item
            name="dif_spending_fuel"
            rules={[{ required: true, message: "Dif spending fuel required" }]}
          >
            <InputNum
              label="Dif spending fuel"
              id="dif_spending_fuel"
              maxLength={6}
              currentValue={data.dif_spending_fuel}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, dif_spending_fuel: e.target.value };
                })
              }
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default DiscrepancyModal;
