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
import { Discrepancy } from "@/interfaces/Discrepancy";

const DiscrepancyModal: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useRef<FormInstance>(null);
  const editing = useSelector((state: RootState) => state.modal.editing);
  const [data, setData] = useState<
    Omit<{ [key in keyof Discrepancy]: string }, "key">
  >({
    month: "",
    fleet_number: "",
    planned_kms: "",
    tours_kms: "",
    difference_kms: "",
    planned_fuel: "",
    consumed_fuel : "",
    dif_spending_fuel : "",
  });
  const handleOk = async () => {
    form.current
      ?.validateFields()
      .then(async (data) => {
        try {
          if (editing) {
            await discrepancyService.update(editing, data);
          } else {
            await discrepancyService.add(data);
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
      discrepancyService.get(editing).then((data) => {
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
        <h2 className="form_title">{editing ? "Edit" : "Insert"} Discrepancy</h2>
        <div className={styles.form_container}>
          <Form.Item
            name="month"
            rules={[{ required: true, message: "Month required" }]}
          >
            <InputSelect
              id="month"
              label="Month"
              options={[{ label: "January", value: "January" },
              { label: "February", value: "February" },
              { label: "March", value: "March" },
              { label: "April", value: "April" },
              { label: "May", value: "May" },
              { label: "June", value: "June" },
              { label: "July", value: "July" },
              { label: "August", value: "August" },
              { label: "September", value: "September" },
              { label: "October", value: "October" },
              { label: "November", value: "November" },
              { label: "December", value: "December" }]}
              currentValue={data.month}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, month: e.target.value };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="fleet_number"
            rules={[{ required: true, message: "Fleet number required" }]}
          >
            <InputText
              label="Fleet number"
              id="fleet_number"
              type="number"
              min={1}
              max={200}
              currentValue={data.fleet_number}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, fleet_number: e.target.value };
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
