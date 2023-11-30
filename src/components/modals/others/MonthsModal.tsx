import { Form, FormInstance, Modal, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/inputs.module.css";
import InputText from "@/components/commons/forms/InputText";
import InputNum from "@/components/commons/forms/InputNum";
import { InputSelect } from "@/components/commons/forms/InputSelect";
import { useDispatch, useSelector } from "react-redux";
import { hideCurrentModal } from "@/components/core/stores/modalSlice";
import monthService from "@/services/tables/months";
import { useRouter } from "next/navigation";
import { RootState } from "@/components/core/stores/store";
import { Month } from "@/interfaces/Month";
import {
  monthCreateAdapter,
  monthFormAdapter,
  monthTypesAdapter,
} from "@/interfaces/adapters/MonthAdaparter";
import InputDate from "@/components/commons/forms/InputDate";


const MonthsModal: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useRef<FormInstance>(null);
  const editing = useSelector(
    (state: RootState) => state.modal.editing as Month | undefined
  );
  
  const [api, contextHolder] = notification.useNotification();
  const [data, setData] = useState<FormDataType<Month>>({
    month_code: "",
    report_code: "",
  });
  

  const handleOk = async () => {
    try {
      await form.current?.validateFields();
      const adaptedTypesData = monthTypesAdapter(data);
      /* if (editing) {
        await monthService.update(data.month_code.toString(), adaptedTypesData);
      } else  */
      /* { */
        await monthService.add(monthCreateAdapter(adaptedTypesData));
     /*  } */
      api.success({ message: "Month created" }); //TODO cuando se cierra el modal no deja ver esto
      dispatch(hideCurrentModal());
      router.refresh();
    } catch (error: any) {
      if (error.detail) api.error({ message: error.detail });
    }
  };

  /* const updateFuel = async () => {
    const fuels = await fuelService.get();
    setFuels(fuels);
  };

  useEffect(() => {
    if (editing) {
      setData(brandFormAdapter(editing));
    }
  }, [editing]);

  useEffect(() => {
    updateFuel();
  }, []); */

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
          <h2 className="form_title">{editing ? "Edit" : "Insert"} Month</h2>
          <div className={styles.form_container}>
            <Form.Item
              name="month_code"
              rules={[{ required: true, message: "Month required" }]}
            >
              <InputDate
              dateType="date"
              label="Month"
              id="month_code"
              currentValue={data.month_code}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, month_code: e.target.value };
                })
              }
            />
            </Form.Item>
            <Form.Item
              name="report_code"
              /* rules={[{ required: true, message: "Report code required" }]} */
            >
              <InputSelect
                id="report_code"
                label="Report code"
                options={[{label: 'reporte 1', value: ''}]}
                currentValue={data.report_code}
                onChange={(e) =>
                  setData((data) => {
                    return {
                      ...data,
                      report_code: e.target.value,
                    };
                  })
                }
              />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default MonthsModal;
