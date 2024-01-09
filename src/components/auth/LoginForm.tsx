"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import user from "@/assets/icons/user.svg";
import lock from "@/assets/icons/lock.svg";
import { Button, Form, FormInstance, Input, notification } from "antd";
import { signInCredentials } from "@/interfaces/Auth";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";

const LoginForm = () => {
  const formRef = useRef<FormInstance>(null);
  const params = useSearchParams();
  const [api, contextHolder] = notification.useNotification();
  const [callbackUrl, setCallbackUrl] = useState("/");
  const { t } = useTranslation(["translation"]);

  const handleSignIn: React.MouseEventHandler<HTMLElement> = async (e) => {
    e.preventDefault();
    try {
      await formRef.current?.validateFields();
      const { password, username }: signInCredentials =
        formRef.current?.getFieldsValue();
      const res = await signIn("credentials", {
        callbackUrl: callbackUrl,
        redirect: true,
        username,
        password,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const error = params.get("error");
    if (error === "CredentialsSignin") {
      api.error({ message: "Por favor, revise las credenciales" });
    }
    const callbackUrl = params.get("callbackUrl");
    if (callbackUrl) {
      setCallbackUrl(callbackUrl);
    }
  }, [params]);

  return (
    <>
      {contextHolder}
      <Form ref={formRef} className="flex flex-col gap-2">
        <div className="flex gap-1">
          <Image src={user} alt="user" />
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Field required" }]}
          >
            <Input
              type="text"
              placeholder={t("User", { ns: "translation" })}
              maxLength={100}
            />
          </Form.Item>
        </div>
        <div className="flex gap-1">
          <Image src={lock} alt="user" />
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Field required" }]}
          >
            <Input type="password" placeholder="********" maxLength={100} />
          </Form.Item>
        </div>
        <Button onClick={handleSignIn} type="primary">
          {t("Login", { ns: "translation" })}
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
