import { Form, FormInstance, Modal, notification, Checkbox } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/inputs.module.css";
import InputText from "@/components/commons/forms/InputText";
import { useDispatch, useSelector } from "react-redux";
import { hideCurrentModal } from "@/components/core/stores/modalSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/components/core/stores/store";
import { Driver } from "@/interfaces/Driver";
import driverService from "@/services/tables/drivers";

const DriverModal: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useRef<FormInstance>(null);
  const editing = useSelector((state: RootState) => state.modal.editing);
  const [data, setData] = useState<
    Omit<{ [key in keyof Driver]: string }, "key">
  >({
    id: "",
    name: "",
    address: "",
    phone: "",
    district_name: "",
    is_free_cover: "",
  });
  const handleOk = async () => {
    form.current
      ?.validateFields()
      .then(async (data) => {
        try {
          if (editing) {
            await driverService.update(editing, data);
          } else {
            await driverService.add(data);
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
      driverService.get(editing).then((data) => {
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
        <h2 className="form_title">{editing ? "Edit" : "Insert"} Driver</h2>
        <div className={styles.form_container}>
          <Form.Item
            name="id"
            rules={[{ required: true, message: "ID code required" }]}
          >
            <InputText
              label="ID"
              id="id"
              maxLength={50}
              currentValue={data.id}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, id: e.target.value };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <InputText
              label="Name"
              id="name"
              min={1}
              max={200}
              currentValue={data.name}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, name: e.target.value };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="address"
            rules={[{ required: true, message: "Address is required" }]}
          >
            <InputText
              label="Address"
              id="address"
              min={1}
              max={200}
              currentValue={data.address}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, address: e.target.value };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[{ required: true, message: "Phone is required" }]}
          >
            <InputText
              id="phone"
              label="Phone"
              type="number"
              maxLength={15}
              currentValue={data.phone}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, phone: e.target.value };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="district_name"
            rules={[{ required: true, message: "Phone is required" }]}
          >
            <InputText
              id="district_name"
              label="District Name"
              max={50}
              currentValue={data.district_name}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, district_name: e.target.value };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="is_free_cover"
            getValueFromEvent={() => {
              return !data.is_free_cover;
            }}
          >
            <Checkbox
              id="is_free_cover"
              checked={!!data.is_free_cover}
              onChange={(e) =>
                setData((data) => {
                  return {
                    ...data,
                    is_free_cover: e.target.checked ? "true" : "",
                  };
                })
              }
            >
              Is Free Cover?
            </Checkbox>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default DriverModal;
