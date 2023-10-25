import { Form, FormInstance, Modal, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/inputs.module.css";
import InputText from "@/components/commons/forms/InputText";
import { useDispatch, useSelector } from "react-redux";
import { hideCurrentModal } from "@/components/core/stores/modalSlice";
import countryService from "@/services/tables/countries";
import { useRouter } from "next/navigation";
import { RootState } from "@/components/core/stores/store";
import { Country } from "@/interfaces/Country";

const CountryModal: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useRef<FormInstance>(null);
  const editing = useSelector((state: RootState) => state.modal.editing);
  const [data, setData] = useState<
    Omit<{ [key in keyof Country]: string }, "key">
  >({
    country_name: "",
  });
  const handleOk = async () => {
    console.log(data);
    form.current
      ?.validateFields()
      .then(async (data) => {
        try {
          if (editing) {
            await countryService.update(editing, data);
          } else {
            await countryService.add(data);
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
      countryService.get(editing).then((data) => {
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
        <h2 className="form_title">{editing ? "Edit" : "Insert"} Country</h2>
        <div className={styles.form_container}>
          <Form.Item
            name="country_name"
            rules={[{ required: true, message: "District name required" }]}
          >
            <InputText
              label="Country"
              id="country_name"
              maxLength={50}
              currentValue={data.country_name}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, country_name: e.target.value };
                })
              }
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default CountryModal;
