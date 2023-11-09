"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Logo from "../../assets/Lutweet.svg";
import Input from "../../components/input";
import Btn from "../../components/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface ILogInForm {
  email: string;
}

export default function LogInPage() {
  const router = useRouter();

  const [resData, setResData] = useState<{ ok: boolean; [key: string]: any }>();
  const methods = useForm<ILogInForm>();
  const onValid = async (validForm: ILogInForm) => {
    console.log(validForm);

    const res = await fetch("/api/users/log-in", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validForm),
    }).then((resp) => resp.json());

    setResData(res);
  };

  useEffect(() => {
    if (!resData) return;
    if (resData.ok) {
      router.push("/");
    }
  }, [resData]);

  return (
    <div>
      <div className="flex justify-center mb-12">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className="py-9 bg-white rounded-3xl rounded-tr-none">
        <h1 className="text-center text-3xl">Login</h1>
        <FormProvider {...methods}>
          <form
            className="bg-white px-10 py-8 flex flex-col space-y-4 rounded-3xl rounded-tr-none"
            onSubmit={methods.handleSubmit(onValid, (error) =>
              console.log(error)
            )}
          >
            <Input
              id="email"
              labelName="Email"
              placeholder="ex) username@email.com"
            />
            <Btn text="Log in" />
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
