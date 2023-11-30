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
import { countryTypesAdapter } from "@/interfaces/adapters/CountryAdapter";

const CountryModal: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useRef<FormInstance>(null);
  const editing = useSelector(
    (state: RootState) => state.modal.editing as Country | undefined
  );
  const [api, contextHolder] = notification.useNotification();
  const [data, setData] = useState<FormDataType<Country>>({
    country_code: "",
    country_name: "",
  });
  const handleOk = async () => {
    try {
      await form.current?.validateFields();
      if (editing) {
        await countryService.update(
          data.country_code,
          countryTypesAdapter(data)
        );
      } else {
        await countryService.add(data);
      }
      api.success({ message: "Country created" }); //TODO cuando se cierra el modal no deja ver esto
      dispatch(hideCurrentModal());
      router.refresh();
    } catch (error: any) {
      if (error.detail) api.error({ message: error.detail });
    }
  };

  useEffect(() => {
    if (editing) {
      setData(editing);
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
            rules={[{ required: true, message: "Country code required" }]}
          >
            <InputText
              label="Code"
              id="country_code"
              maxLength={2}
              currentValue={data.country_code}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, country_code: e.target.value };
                })
              }
            />
          </Form.Item>
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
