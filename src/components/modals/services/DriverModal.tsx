import { Form, FormInstance, Modal, notification, Checkbox } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/inputs.module.css";
import InputText from "@/components/commons/forms/InputText";
import { useDispatch, useSelector } from "react-redux";
import { hideCurrentModal } from "@/components/core/stores/modalSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/components/core/stores/store";
import { Driver, EditDriver } from "@/interfaces/Driver";
import driverService from "@/services/tables/drivers";
import { InputSelect } from "@/components/commons/forms/InputSelect";
import districtService from "@/services/tables/districts";
import { District } from "@/interfaces/District";
import { districtOptionsAdapter } from "@/interfaces/adapters/DistrictAdapter";
import { driverFormAdapter, driverTypesAdapter } from "@/interfaces/adapters/DriverAdapter";
import { useTranslation } from "react-i18next";

const DriverModal: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useRef<FormInstance>(null);
  const {t} = useTranslation(['Drivers'])
  const [district,setDistrict] = useState <District[]>([])
  const editing = useSelector((state: RootState) => state.modal.editing as EditDriver|undefined);
  const [api, contextHolder] = notification.useNotification();
  console.log(editing)
  const [data, setData] = useState<FormDataType<EditDriver>>(
  {
    id_driver: "",
    driver_name: "",
    address: "",
    phone: "",
    district_code: "",
    is_free_cover: "",
    driver_code:""
  });
  const handleOk = async () => {
    form.current
      ?.validateFields()
      const adaptedTypesData = driverTypesAdapter(data);
        try {
          if (editing) {
            await driverService.update(data.driver_code.toString(), adaptedTypesData);
          } else {
            await driverService.add(adaptedTypesData);
          }
          api.success({ message: "Car created" }); //TODO cuando se cierra el modal no deja ver esto
          dispatch(hideCurrentModal());
          router.refresh();
        } catch (error:any) {
          if (error.detail) api.error({ message: error.detail });
        } finally {
          dispatch(hideCurrentModal());
          router.refresh();
        }
  };

  useEffect(() => {
    if (editing) {
      setData(driverFormAdapter(editing));
    }
  }, [editing]);

  const updateDistrict = async () => {
    const fuels = await districtService.get();
    setDistrict(fuels);
  };

  useEffect(() => {
    updateDistrict();
  }, []);

  return (
    <>
    {contextHolder}
    <Modal
      centered
      open
      onCancel={() => dispatch(hideCurrentModal())}
      onOk={handleOk}
    >
      <Form className="form" ref={form} method="post">
        <h2 className="form_title">{t(editing ? "Edit Driver" : "Insert Driver",{ns:"Drivers"})}</h2>
        <div className={styles.form_container}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <InputText
              label={t("Name",{ns:'Drivers'})}
              id="name"
              min={1}
              max={200}
              currentValue={data.driver_name}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, driver_name: e.target.value };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="address"
            rules={[{ required: true, message: "Address is required" }]}
          >
            <InputText
              label={t("Address",{ns:'Drivers'})}
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
              label={t("Phone",{ns:'Drivers'})}
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
            name="District"
            rules={[{ required: true, message: "Select the District" }]}
          >
            <InputSelect
              label={t("District name",{ns:'Drivers'})}
              id="district"
              currentValue={data.district_code}
              options={districtOptionsAdapter(district)}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, district_code: e.target.value };
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
              checked={data.is_free_cover=='true'?true:false}
              onChange={(e) =>
                setData((data) => {
                  return {
                    ...data,
                    is_free_cover: e.target.checked ? "true" : "",
                  };
                })
              }
            >
              {t("Is Free Cover?",{ns:'Drivers'})}
            </Checkbox>
          </Form.Item>
        </div>
      </Form>
    </Modal>
    </>
  );
};

export default DriverModal;
