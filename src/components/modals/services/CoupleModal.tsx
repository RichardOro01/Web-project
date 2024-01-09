import { Form, FormInstance, Modal, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/inputs.module.css";
import InputText from "@/components/commons/forms/InputText";
import { useDispatch, useSelector } from "react-redux";
import { hideCurrentModal } from "@/components/core/stores/modalSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/components/core/stores/store";
import { Couple, CreateCouple } from "@/interfaces/Couple";
import coupleService from "@/services/tables/couples";
import { InputSelect } from "@/components/commons/forms/InputSelect";
import { coupleCreateAdapter, coupleFormAdapter, coupleTypesAdapter } from "@/interfaces/adapters/CoupleAdapter";
import driverService from "@/services/tables/drivers";
import { driversOptionAdapter } from "@/interfaces/adapters/DriverAdapter";
import { Driver, DriverOption } from "@/interfaces/Driver";
import { useTranslation } from "react-i18next";

const CoupleModal: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useRef<FormInstance>(null);
  const {t} = useTranslation(['Couples'])
  const editing = useSelector((state: RootState) => state.modal.editing as CreateCouple|undefined);
  const [api, contextHolder] = notification.useNotification();

  const [drivers,setDrivers] = useState<DriverOption[]>([])

  const [data, setData] = useState<FormDataType<CreateCouple>>({
    couple_code:"",
    driver1: "",
    driver2: "",
  });



  const handleOk = async () => {
    form.current
      ?.validateFields()
      console.log(data)
      const adaptedTypesData = coupleTypesAdapter(data);
        try {
          if (editing) {
            await coupleService.update(data.couple_code.toString(), adaptedTypesData);
          } else {
            await coupleService.add(adaptedTypesData);
          }
          api.success({ message: "Couple created" }); //TODO cuando se cierra el modal no deja ver esto
          dispatch(hideCurrentModal());
          router.refresh();
        } catch (error:any) {
          if (error.detail) api.error({ message: error.detail });
        }
  };

  useEffect(() => {
    if (editing) {
      setData(coupleFormAdapter(editing))
    }
  }, [editing]);

  const updateDrivers = async () => {
    const driver = await driverService.get();
    setDrivers(driver);
  };

  useEffect(() => {
    updateDrivers();
  }, []);

  // useEffect(()=>{
  //   setDrivers(drivers.filter((driver:Driver) => driver.driver_code!=Number(data.driver1) && driver.driver_code!=Number(data.driver2)))
  // },[data.driver1,data.driver2])

  return (
    <Modal
      centered
      open
      onCancel={() => dispatch(hideCurrentModal())}
      onOk={handleOk}
      cancelText={t("Cancel",{ns:"translation"})}
    >
      <Form className="form" ref={form} method="post">
        <h2 className="form_title">{t(editing ? "Edit Couple" : "Insert Couple",{ns:"Couples"})}</h2>
        <div className={styles.form_container}>
          <Form.Item
            name="driver1"
            rules={[{ required: true, message: "Driver 1 required" }]}
          >
            <InputSelect
              label={t("Driver 1",{ns:'Couples'})}
              id="driver1"
              currentValue={data.driver1}
              options={driversOptionAdapter(drivers)}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, driver1: e.target.value };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="driver2"
            rules={[{ required: true, message: "Driver 2 required" }]}
          >
            <InputSelect
              label={t("Driver 2",{ns:'Couples'})}
              id="driver2"
              currentValue={data.driver2}
              options={driversOptionAdapter(drivers)}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, driver2: e.target.value };
                })
              }
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default CoupleModal;
