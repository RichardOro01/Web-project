import { Form, FormInstance, Modal, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/inputs.module.css";
import InputText from "@/components/commons/forms/InputText";
import InputNum from "@/components/commons/forms/InputNum";
import { InputSelect } from "@/components/commons/forms/InputSelect";
import { useDispatch, useSelector } from "react-redux";
import { hideCurrentModal } from "@/components/core/stores/modalSlice";
import servicesService from "@/services/tables/services";
import { useRouter } from "next/navigation";
import { RootState } from "@/components/core/stores/store";
import { ServiceApp } from "@/interfaces/Service";
import InputDate from "@/components/commons/forms/InputDate";

const ServiceModal: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useRef<FormInstance>(null);
  const editing = useSelector((state: RootState) => state.modal.editing);
  const [data, setData] = useState<
    Omit<{ [key in keyof ServiceApp]: string }, "key">
  >({
    request_number: "",
    service_name: "",
    tour_group: "",
    country: "",
    pickup_place: "",
    pickup_time: "",
    pax: "",
    service_kms: "",
    amount: "",
  });
  const handleOk = async () => {
    form.current
      ?.validateFields()
      .then(async (data) => {
        try {
          if (editing) {
            await servicesService.update(editing, data);
          } else {
            await servicesService.add(data);
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
      servicesService.get(editing).then((data) => {
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
            name="tour_group"
            rules={[{ required: true, message: "Tour Group required" }]}
          >
            <InputSelect
              id="tour_group"
              label="Tour Group"
              options={[{ label: "Adventure Explorers", value: "TG001" }]}
              currentValue={data.tour_group}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, tour_group: e.target.value };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="country"
            rules={[{ required: true, message: "Country required" }]}
          >
            <InputSelect
              id="country"
              label="Country"
              options={[{ label: "Cuba", value: "cu" }]}
              currentValue={data.country}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, country: e.target.value };
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
