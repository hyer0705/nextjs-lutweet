"use client";

import { useFormContext } from "react-hook-form";
import { ILogInForm } from "../app/log-in/log-in-page";
import { ICreateAccountForm } from "../app/create-account/create-account-page";

interface IInputProps {
  id: "name" | "email" | "phone";
  labelName: string;
  placeholder: string;
}

export default function Input({ id, labelName, placeholder }: IInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<ILogInForm & ICreateAccountForm>();
  return (
    <>
      <div className="flex flex-col p-4 pb-0 rounded-md shadow-md">
        <label htmlFor={id} className="text-gray-500 font-semibold">
          {labelName}
        </label>
        {id === "name" && (
          <input
            className="py-4 focus:outline-none"
            id={id}
            placeholder={placeholder}
            {...register("name", {
              required: "이름을 입력해주세요.",
              minLength: {
                value: 2,
                message: "이름은 2글자 이상이어야 합니다.",
              },
            })}
          />
        )}
        {id === "email" && (
          <input
            className="py-4 focus:outline-none"
            id={id}
            placeholder={placeholder}
            {...register("email", {
              required: "이메일을 입력해주세요.",
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "이메일을 형태로 입력해주세요.",
              },
            })}
          />
        )}
        {id === "phone" && (
          <input
            className="py-4 focus:outline-none"
            id={id}
            placeholder={placeholder}
            {...register("phone", {
              required: "전화번호를 입력해주세요.",
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
        )}
      </div>
      <span className="px-4 text-red-500 font-semibold">
        {id === "name" && errors.name?.message}
        {id === "email" && errors.email?.message}
        {id === "phone" && errors.phone?.message}
      </span>
    </>
  );
}
