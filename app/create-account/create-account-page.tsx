"use client";

import Link from "next/link";
import { useForm, FormProvider } from "react-hook-form";
import Input from "../../components/input";
import Btn from "../../components/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRequestApi } from "../../hooks/useRequestApi";
import { ICreateAccountForm } from "../../types/Form";
import { IResponseData } from "../../types/Response";

export default function CreateAccountPage() {
  const router = useRouter();
  const methods = useForm<ICreateAccountForm>();

  const { handleApi, data, error, isLoading } = useRequestApi<IResponseData>({
    url: "/api/users/create-account",
    method: "POST",
  });

  const onValid = async (validForm: ICreateAccountForm) => {
    if (isLoading) return;

    handleApi(validForm);
  };

  useEffect(() => {
    if (!data) return;
    if (data.ok) {
      router.push("/log-in");
    }
  }, [data, router]);

  return (
    <div className="">
      <div className="mb-8 flex justify-center items-center text-white">
        <span>
          <Link href="/">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              ></path>
            </svg>
          </Link>
        </span>
        <h1 className="flex-1 text-center font-medium text-4xl">Sign Up</h1>
      </div>
      <FormProvider {...methods}>
        <form
          className="bg-white px-10 py-8 flex flex-col space-y-4 rounded-3xl rounded-tr-none"
          onSubmit={methods.handleSubmit(onValid, (errors) =>
            console.log(errors)
          )}
        >
          <Input id="name" placeholder="ex) Lucy" labelName="Name" />
          <Input
            id="email"
            labelName="Email"
            placeholder="ex) user@someemail.com"
          />
          <Input id="phone" labelName="Phone" placeholder="ex) 01012345678" />
          <Btn text={isLoading ? "Loading..." : "Sign Up"} />
          <span className="text-center">
            Already have any account?{" "}
            <Link className="font-semibold" href="/log-in">
              Sign In
            </Link>
          </span>
        </form>
      </FormProvider>
    </div>
  );
}
