"use client";

import { UseFormRegisterReturn } from "react-hook-form";

interface IInputProps {
  id: string;
  labelName: string;
  register: UseFormRegisterReturn;
  placeholder: string;
  errorMsg?: string;
}

export default function Input({
  id,
  labelName,
  register,
  placeholder,
  errorMsg,
}: IInputProps) {
  return (
    <>
      <div className="flex flex-col p-4 pb-0 rounded-md shadow-md">
        <label htmlFor={id} className="text-gray-500 font-semibold">
          {labelName}
        </label>
        <input
          {...register}
          id={id}
          placeholder={placeholder}
          className="py-4 focus:outline-none"
        />
      </div>
      <span className="px-4 text-red-500 font-semibold">{errorMsg}</span>
    </>
  );
}
