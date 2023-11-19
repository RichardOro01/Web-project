import { Form, FormInstance, Modal, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/inputs.module.css";
import InputText from "@/components/commons/forms/InputText";
import { useDispatch, useSelector } from "react-redux";
import { hideCurrentModal } from "@/components/core/stores/modalSlice";
import districtService from "@/services/tables/districts";
import { useRouter } from "next/navigation";
import { RootState } from "@/components/core/stores/store";
import { District } from "@/interfaces/District";
import {
  districtCreateAdapter,
  districtFormAdapter,
  districtTypesAdapter,
} from "@/interfaces/adapters/DistrictAdapter";

const DistrictModal: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useRef<FormInstance>(null);
  const editing = useSelector(
    (state: RootState) =>
      state.modal.editing as TableDataType<District> | undefined
  );
  const [api, contextHolder] = notification.useNotification();
  const [data, setData] = useState<FormDataType<District>>({
    district_code: "",
    district_name: "",
  });
  const handleOk = async () => {
    try {
      await form.current?.validateFields();
      const adaptedTypesData = districtTypesAdapter(data);
      if (editing) {
        await districtService.update(
          data.district_code.toString(),
          adaptedTypesData
        );
      } else {
        await districtService.add(districtCreateAdapter(adaptedTypesData));
      }
      api.success({ message: "District created" }); //TODO cuando se cierra el modal no deja ver esto
      dispatch(hideCurrentModal());
      router.refresh();
    } catch (error: any) {
      if (error.detail) api.error({ message: error.detail });
    }
  };

  useEffect(() => {
    if (editing) {
      setData(districtFormAdapter(editing));
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
        <h2 className="form_title">{editing ? "Edit" : "Insert"} District</h2>
        <div className={styles.form_container}>
          <Form.Item
            name="district_name"
            rules={[{ required: true, message: "District name required" }]}
          >
            <InputText
              label="District"
              id="district_name"
              maxLength={50}
              currentValue={data.district_name}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, district_name: e.target.value };
                })
              }
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default DistrictModal;
