import { Form, FormInstance, Modal, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/inputs.module.css";
import InputText from "@/components/commons/forms/InputText";
import InputNum from "@/components/commons/forms/InputNum";
import { InputSelect } from "@/components/commons/forms/InputSelect";
import { useDispatch, useSelector } from "react-redux";
import { hideCurrentModal } from "@/components/core/stores/modalSlice";
import brandService from "@/services/tables/brands";
import { useRouter } from "next/navigation";
import { RootState } from "@/components/core/stores/store";
import { Brand, EditBrand } from "@/interfaces/Brand";
import {
  brandCreateAdapter,
  brandFormAdapter,
  brandTypesAdapter,
} from "@/interfaces/adapters/BrandAdapter";
import { Fuel } from "@/interfaces/Fuel";
import fuelService from "@/services/tables/fuels";
import { fuelOptionsAdapter } from "@/interfaces/adapters/FuelAdapter";

const BrandModal: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useRef<FormInstance>(null);
  const editing = useSelector(
    (state: RootState) => state.modal.editing as TableDataType<Brand> | undefined
  );
  const [api, contextHolder] = notification.useNotification();
  const [data, setData] = useState<FormDataType<EditBrand>>({
    brand_code: "",
    brand_name: "",
    amo_seats: "",
    fuel_code: "",
    spending: "",
  });

  const [fuels, setFuels] = useState<Fuel[]>([]);
  const handleOk = async () => {
    try {
      await form.current?.validateFields();
      const adaptedTypesData = brandTypesAdapter(data);
      if (editing) {
        await brandService.update(data.brand_code.toString(), adaptedTypesData);
      } else {
        await brandService.add(brandCreateAdapter(adaptedTypesData));
      }
      api.success({ message: "Brand created" }); //TODO cuando se cierra el modal no deja ver esto
      dispatch(hideCurrentModal());
      router.refresh();
    } catch (error: any) {
      if (error.detail) api.error({ message: error.detail });
    }
  };

  const updateFuel = async () => {
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
          <h2 className="form_title">{editing ? "Edit" : "Insert"} Brand</h2>
          <div className={styles.form_container}>
            <Form.Item
              name="brand_name"
              rules={[{ required: true, message: "Brand name required" }]}
            >
              <InputText
                label="Brand"
                id="brand_name"
                maxLength={50}
                currentValue={data.brand_name}
                onChange={(e) =>
                  setData((data) => {
                    return { ...data, brand_name: e.target.value };
                  })
                }
              />
            </Form.Item>
            <Form.Item
              name="amo_seats"
              rules={[{ required: true, message: "Seats required" }]}
            >
              <InputText
                label="Seats"
                id="amo_seats"
                type="number"
                min={1}
                max={200}
                currentValue={data.amo_seats}
                onChange={(e) =>
                  setData((data) => {
                    return {
                      ...data,
                      amo_seats: e.target.value,
                    };
                  })
                }
              />
            </Form.Item>
            <Form.Item
              name="spending"
              rules={[{ required: true, message: "Spending required" }]}
            >
              <InputNum
                label="Spending"
                id="spending"
                maxLength={6}
                currentValue={data.spending}
                onChange={(e) =>
                  setData((data) => {
                    return {
                      ...data,
                      spending: e.target.value,
                    };
                  })
                }
              />
            </Form.Item>
            <Form.Item
              name="fuel_code"
              rules={[{ required: true, message: "Fuel required" }]}
            >
              <InputSelect
                id="fuel_code"
                label="Gasoline"
                options={fuelOptionsAdapter(fuels)}
                currentValue={data.fuel_code}
                onChange={(e) =>
                  setData((data) => {
                    return {
                      ...data,
                      fuel_code: e.target.value,
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

export default BrandModal;
