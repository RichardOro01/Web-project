import { Form, FormInstance, Modal, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/inputs.module.css";
import InputText from "@/components/commons/forms/InputText";
import InputNum from "@/components/commons/forms/InputNum";
import { useDispatch, useSelector } from "react-redux";
import { hideCurrentModal } from "@/components/core/stores/modalSlice";
import roadmapService from "@/services/tables/roadmaps";
import { useRouter } from "next/navigation";
import { RootState } from "@/components/core/stores/store";
import { Roadmap } from "@/interfaces/Roadmap";
import InputDate from "@/components/commons/forms/InputDate";

const RoadmapModal: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useRef<FormInstance>(null);
  const editing = useSelector((state: RootState) => state.modal.editing);
  const [data, setData] = useState<
    Omit<{ [key in keyof Roadmap]: string }, "key">
  >({
    date: "",
    fleet_number: "",
    kms: "",
    departure_time: "",
  });
  const handleOk = async () => {
    form.current
      ?.validateFields()
      .then(async (data) => {
        try {
          if (editing) {
            await roadmapService.update(editing, data);
          } else {
            await roadmapService.add(data);
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
      roadmapService.get(editing).then((data) => {
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
        <h2 className="form_title">{editing ? "Edit" : "Insert"} Roadmap</h2>
        <div className={styles.form_container}>
          <Form.Item
            name="date"
            rules={[{ required: true, message: "Date required" }]}
          >
            <InputDate
              dateType="date"
              label="Date"
              id="date"
              currentValue={data.date}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, date: e.target.value };
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
            name="kms"
            rules={[{ required: true, message: "Kms required" }]}
          >
            <InputNum
              label="Kms"
              id="kms"
              maxLength={6}
              currentValue={data.kms}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, kms: e.target.value };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="departure_time"
            rules={[{ required: true, message: "Departure time required" }]}
          >
            <InputDate
              dateType="time"
              label="Departure time"
              id="departure_time"
              currentValue={data.departure_time}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, departure_time: e.target.value };
                })
              }
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default RoadmapModal;
