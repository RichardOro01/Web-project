import { Form, FormInstance, Modal, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/inputs.module.css";
import InputText from "@/components/commons/forms/InputText";
import InputNum from "@/components/commons/forms/InputNum";
import { InputSelect } from "@/components/commons/forms/InputSelect";
import { useDispatch, useSelector } from "react-redux";
import { hideCurrentModal } from "@/components/core/stores/modalSlice";
import contractService from "@/services/tables/contracts";
import { useRouter } from "next/navigation";
import { RootState } from "@/components/core/stores/store";
import { Contract, EditContract } from "@/interfaces/Contract";
import {
  contractCreateAdapter,
  contractFormAdapter,
  contractTypesAdapter,
} from "@/interfaces/adapters/ContractAdapter";
import InputDate from "@/components/commons/forms/InputDate";
import { Car } from "@/interfaces/Car";
import carService from "@/services/tables/cars";
import { Country } from "@/interfaces/Country";
import countryService from "@/services/tables/countries";
import { countryOptionsAdapter } from "@/interfaces/adapters/CountryAdapter";
import { carOptionsAdapter } from "@/interfaces/adapters/CarAdapter";

const ContractModal: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useRef<FormInstance>(null);
  const editing = useSelector(
    (state: RootState) => state.modal.editing as Contract | undefined
  );
  const [api, contextHolder] = notification.useNotification();
  const [data, setData] = useState<FormDataType<EditContract>>({
    contract_code: "",
    applicant_name: "",
    start_date: "",
    end_date: "",
    contract_kms: "",
    contract_amount: "",
    contract_country: "",
    car_code: "",
  });

  const [countries, setCountries] = useState<Country[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const handleOk = async () => {
    try {
      await form.current?.validateFields();
      console.log(data);
      const adaptedTypesData = contractTypesAdapter(data);
      console.log("adapted ", contractCreateAdapter(adaptedTypesData));
      if (editing) {
        await contractService.update(
          data.contract_code.toString(),
          adaptedTypesData
        );
      } else {
        await contractService.add(contractCreateAdapter(adaptedTypesData));
      }
      api.success({ message: "Contract created" }); //TODO cuando se cierra el modal no deja ver esto
      dispatch(hideCurrentModal());
      router.refresh();
    } catch (error: any) {
      if (error.detail) api.error({ message: error.detail.message });
    }
  };

  const updateCountry = async () => {
    const countries = await countryService.get();
    setCountries(countries);
  };

  const updateCar = async () => {
    const cars = await carService.get();
    setCars(cars);
  };

  useEffect(() => {
    if (editing) {
      setData(contractFormAdapter(editing));
    }
  }, [editing]);

  const updateAll = async () => {
    updateCountry();
    updateCar();
  };

  useEffect(() => {
    updateAll();
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
          <h2 className="form_title">{editing ? "Edit" : "Insert"} Contract</h2>
          <div className={styles.form_container}>
            <Form.Item
              name="applicant_name"
              rules={[{ required: true, message: "Applicant required" }]}
            >
              <InputText
                label="Applicant"
                id="applicant_name"
                maxLength={50}
                currentValue={data.applicant_name}
                onChange={(e) =>
                  setData((data) => {
                    return { ...data, applicant_name: e.target.value };
                  })
                }
              />
            </Form.Item>
            <Form.Item
              name="start_date"
              rules={[{ required: true, message: "Start date required" }]}
            >
              <InputDate
                dateType="date"
                label="Start date"
                id="start_date"
                currentValue={data.start_date}
                onChange={(e) =>
                  setData((data) => {
                    return { ...data, start_date: e.target.value };
                  })
                }
              />
            </Form.Item>
            <Form.Item
              name="end_date"
              rules={[{ required: true, message: "End date required" }]}
            >
              <InputDate
                dateType="date"
                label="End date"
                id="end_date"
                currentValue={data.end_date}
                onChange={(e) =>
                  setData((data) => {
                    return { ...data, end_date: e.target.value };
                  })
                }
              />
            </Form.Item>
            <Form.Item
              name="contract_kms"
              rules={[{ required: true, message: "Kms required" }]}
            >
              <InputNum
                label="Kms"
                id="contract_kms"
                maxLength={50}
                currentValue={data.contract_kms}
                onChange={(e) =>
                  setData((data) => {
                    return { ...data, contract_kms: e.target.value };
                  })
                }
              />
            </Form.Item>
            <Form.Item
              name="contract_country"
              rules={[{ required: true, message: "Country required" }]}
            >
              <InputSelect
                id="contract_country"
                label="Country"
                options={countryOptionsAdapter(countries)}
                currentValue={data.contract_country}
                onChange={(e) =>
                  setData((data) => {
                    return {
                      ...data,
                      contract_country: e.target.value,
                    };
                  })
                }
              />
            </Form.Item>
            <Form.Item
              name="car_code"
              rules={[{ required: true, message: "Car required" }]}
            >
              <InputSelect
                id="car_code"
                label="Car"
                options={carOptionsAdapter(cars)}
                currentValue={data.car_code}
                onChange={(e) =>
                  setData((data) => {
                    return {
                      ...data,
                      car_code: e.target.value,
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

export default ContractModal;
