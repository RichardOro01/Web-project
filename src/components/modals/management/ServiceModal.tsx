import { Form, FormInstance, Modal, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/inputs.module.css";
import InputText from "@/components/commons/forms/InputText";
import InputNum from "@/components/commons/forms/InputNum";
import { InputSelect } from "@/components/commons/forms/InputSelect";
import { useDispatch, useSelector } from "react-redux";
import { hideCurrentModal } from "@/components/core/stores/modalSlice";
import servicesAppService from "@/services/tables/services";
import { useRouter } from "next/navigation";
import { RootState } from "@/components/core/stores/store";
import { ServiceI, EditService } from "@/interfaces/Service";
import InputDate from "@/components/commons/forms/InputDate";
import {
  serviceCreateAdapter,
  serviceFormAdapter,
  serviceTypesAdapter,
} from "@/interfaces/adapters/ServiceAdapter";
import { Tourist } from "@/interfaces/TourGroup";
import tourService from "@/services/tables/tour_groups";
import { touristOptionsAdapter } from "@/interfaces/adapters/TouristAdapter";
import { Country } from "@/interfaces/Country";
import countryService from "@/services/tables/countries";
import { countryOptionsAdapter } from "@/interfaces/adapters/CountryAdapter";
import { convertToMilitaryTime } from "@/lib/utils";

const ServiceModal: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useRef<FormInstance>(null);
  const editing = useSelector(
    (state: RootState) => state.modal.editing as ServiceI | undefined
  );
  const [api, contextHolder] = notification.useNotification();
  const [data, setData] = useState<FormDataType<EditService>>({
    service_code: "",
    service_name: "",
    pickup_place: "",
    pickup_time: "",
    pax: "",
    service_kms: "",
    amount: "",
    request_number: "",
    country_code: "",
    tour_group_code: "",
  });

  const [countries, setCountries] = useState<Country[]>([]);
  const [groups, setGroups] = useState<Tourist[]>([]);
  const handleOk = async () => {
    try {
      await form.current?.validateFields();
      console.log(data);
      const adaptedTypesData = serviceTypesAdapter(data);
      console.log(adaptedTypesData);

      if (editing) {
        adaptedTypesData.pickup_time = convertToMilitaryTime(
          adaptedTypesData.pickup_time
        );
        await servicesAppService.update(
          data.service_code.toString(),
          serviceCreateAdapter(adaptedTypesData)
        );
      } else {
        await servicesAppService.add(serviceCreateAdapter(adaptedTypesData));
      }
      api.success({ message: "Service created" }); //TODO cuando se cierra el modal no deja ver esto
      dispatch(hideCurrentModal());
      router.refresh();
    } catch (error: any) {
      if (error.detail) api.error({ message: error.detail });
    }
  };

  const updateCountry = async () => {
    const countries = await countryService.get();
    setCountries(countries);
  };

  const updateGroup = async () => {
    const groups = await tourService.get();
    setGroups(groups);
  };

  useEffect(() => {
    if (editing) {
      setData(serviceFormAdapter(editing));
    }
  }, [editing]);

  useEffect(() => {
    updateCountry();
  }, []);

  useEffect(() => {
    updateGroup();
  }, []);

  return (
    <Modal
      centered
      open
      onCancel={() => dispatch(hideCurrentModal())}
      onOk={handleOk}
    >
      <Form className="form" ref={form} method="post">
        <h2 className="form_title">{editing ? "Edit" : "Insert"} Service</h2>
        <div className={styles.form_container}>
          <Form.Item
            name="request_number"
            rules={[{ required: true, message: "Request number required" }]}
          >
            <InputNum
              label="Request number"
              id="request_number"
              maxLength={50}
              currentValue={data.request_number}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, request_number: e.target.value };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="service_name"
            rules={[{ required: true, message: "Service name required" }]}
          >
            <InputText
              label="Service name"
              id="service_name"
              maxLength={50}
              currentValue={data.service_name}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, service_name: e.target.value };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="tour_group_code"
            rules={[{ required: true, message: "Group required" }]}
          >
            <InputSelect
              id="tour_group_code"
              label="Tourist group"
              options={touristOptionsAdapter(groups)}
              currentValue={data.tour_group_code}
              onChange={(e) =>
                setData((data) => {
                  return {
                    ...data,
                    tour_group_code: e.target.value,
                  };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="country_code"
            rules={[{ required: true, message: "Country required" }]}
          >
            <InputSelect
              id="country_code"
              label="Country"
              options={countryOptionsAdapter(countries)}
              currentValue={data.country_code}
              onChange={(e) =>
                setData((data) => {
                  return {
                    ...data,
                    country_code: e.target.value,
                  };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="pickup_place"
            rules={[{ required: true, message: "Pickup place required" }]}
          >
            <InputText
              label="Pickup place"
              id="pickup"
              maxLength={50}
              currentValue={data.pickup_place}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, pickup_place: e.target.value };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="pickup_time"
            rules={[{ required: true, message: "Pickup time required" }]}
          >
            <InputDate
              dateType="time"
              label="Pickup time"
              id="pickup_time"
              currentValue={data.pickup_time}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, pickup_time: e.target.value };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="pax"
            rules={[{ required: true, message: "Pax required" }]}
          >
            <InputText
              label="Pax"
              id="pax"
              type="number"
              min={1}
              max={20}
              currentValue={data.pax}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, pax: e.target.value };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="service_kms"
            rules={[{ required: true, message: "Service required" }]}
          >
            <InputNum
              label="Service(kms)"
              id="service_kms"
              maxLength={50}
              currentValue={data.service_kms}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, service_kms: e.target.value };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="amount"
            rules={[{ required: true, message: "Amount required" }]}
          >
            <InputText
              label="Amount"
              id="amount"
              type="number"
              min={1}
              max={20}
              currentValue={data.amount}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, amount: e.target.value };
                })
              }
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default ServiceModal;
