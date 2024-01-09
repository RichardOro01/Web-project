import { Form, FormInstance, Modal, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/inputs.module.css";
import InputText from "@/components/commons/forms/InputText";
import { useDispatch, useSelector } from "react-redux";
import { hideCurrentModal } from "@/components/core/stores/modalSlice";
import tourService from "@/services/tables/tour_groups";
import { useRouter } from "next/navigation";
import { RootState } from "@/components/core/stores/store";
import { Tourist } from "@/interfaces/TourGroup";
import {
  touristFormAdapter,
  touristTypesAdapter,
} from "@/interfaces/adapters/TouristAdapter";

const TourGroupModal: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useRef<FormInstance>(null);
  const editing = useSelector(
    (state: RootState) => state.modal.editing as Tourist | undefined
  );
  const [api, contextHolder] = notification.useNotification();
  const [data, setData] = useState<FormDataType<Tourist>>({
    group_code: "",
    group_name: "",
  });
  const handleOk = async () => {
    try {
      await form.current?.validateFields();
      if (editing) {
        await tourService.update(data.group_code, touristTypesAdapter(data));
      } else {
        await tourService.add(data);
      }
      api.success({ message: "Tour group created" }); //TODO cuando se cierra el modal no deja ver esto
      dispatch(hideCurrentModal());
      router.refresh();
    } catch (error: any) {
      if (error.detail) api.error({ message: error.detail });
    }
  };

  useEffect(() => {
    if (editing) {
      setData(touristFormAdapter(editing));
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
        <h2 className="form_title">{editing ? "Edit" : "Insert"} Tour Group</h2>
        <div className={styles.form_container}>
          <Form.Item
            name="group_code"
            rules={[{ required: true, message: "Group code required" }]}
          >
            <InputText
              label="Code"
              id="group_code"
              maxLength={10}
              currentValue={data.group_code}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, group_code: e.target.value };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="group_name"
            rules={[{ required: true, message: "Tour group name required" }]}
          >
            <InputText
              label="Tour group"
              id="group_name"
              maxLength={50}
              currentValue={data.group_name}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, group_name: e.target.value };
                })
              }
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default TourGroupModal;
