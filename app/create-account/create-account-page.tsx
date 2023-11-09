"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import Input from "../../components/input";
import Btn from "../../components/button";

export interface ICreateAccountForm {
  name: string;
  email?: string;
  phone?: string;
}

export default function CreateAccountPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateAccountForm>();

  const onValid = (validForm: ICreateAccountForm) => {
    console.log(validForm);
  };

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
      <form
        className="bg-white px-10 py-8 flex flex-col space-y-4 rounded-3xl rounded-tr-none"
        onSubmit={handleSubmit(onValid, (errors) => console.log(errors))}
      >
        <Input
          id="name"
          placeholder="ex) Lucy"
          labelName="Name"
          errorMsg={errors.name?.message}
          register={register("name", {
            required: "이름을 입력해주세요.",
            minLength: { value: 2, message: "이름은 2글자 이상이어야 합니다." },
          })}
        />
        <Input
          id="email"
          labelName="Email"
          placeholder="ex) user@someemail.com"
          errorMsg={errors.email?.message}
          register={register("email", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "이메일을 형태로 입력해주세요.",
            },
          })}
        />
        <Input
          id="phone"
          labelName="Phone"
          placeholder="ex) 01012345678"
          errorMsg={errors.phone?.message}
          register={register("phone", {
            required: "전화번호 입력해주세요.",
            minLength: {
              value: 10,
              message: "전화번호는 최소 10자입니다.",
            },
            maxLength: {
              value: 11,
              message: "전화번호는 최대 11자입니다.",
            },
          })}
        />
        <Btn text="Sign Up" />
        <span className="text-center">
          Already have any account?{" "}
          <Link className="font-semibold" href="/log-in">
            Sign In
          </Link>
        </span>
      </form>
    </div>
  );
}
