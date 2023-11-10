"use client";

import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Logo from "../../assets/Lutweet.svg";
import Input from "../../components/input";
import Btn from "../../components/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ILogInForm } from "../../types/Form";
import { useRequestApi } from "../../hooks/useRequestApi";
import { IResponseData } from "../../types/Response";

export default function LogInPage() {
  const router = useRouter();
  const methods = useForm<ILogInForm>();

  const { data, isLoading, error, handleApi } = useRequestApi<IResponseData>({
    url: "/api/users/log-in",
    method: "POST",
  });

  const onValid = async (validForm: ILogInForm) => {
    if (isLoading) return;
    handleApi(validForm);
  };

  useEffect(() => {
    if (!data) return;
    if (data.ok) {
      router.push("/");
    }
  }, [data, router]);

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
            <Btn text={isLoading ? "Loading..." : "Log In"} />
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
