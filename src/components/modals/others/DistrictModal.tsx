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

const DistrictModal: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useRef<FormInstance>(null);
  const editing = useSelector((state: RootState) => state.modal.editing);
  const [data, setData] = useState<
    Omit<{ [key in keyof District]: string }, "key">
  >({
    district_name: "",
  });
  const handleOk = async () => {
    console.log(data);
    form.current
      ?.validateFields()
      .then(async (data) => {
        try {
          if (editing) {
            await districtService.update(editing, data);
          } else {
            await districtService.add(data);
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
      districtService.get(editing).then((data) => {
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
