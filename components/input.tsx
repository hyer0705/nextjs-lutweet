"use client";

import { UseFormRegisterReturn } from "react-hook-form";

interface IInputProps {
  id: string;
  labelName: string;
  register: UseFormRegisterReturn;
  placeholder: string;
}

export default function Input({
  id,
  labelName,
  register,
  placeholder,
}: IInputProps) {
  return (
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
  );
}
