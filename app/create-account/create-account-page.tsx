"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";

interface ICreateAccountForm {
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
    <div className="text-gray-400">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit(onValid, (errors) => console.log(errors))}>
        <div>
          <label>Name</label>
          <input
            {...register("name", {
              required: "이름을 입력해주세요.",
              minLength: {
                value: 2,
                message: "이름은 2글자 이상이어야 합니다.",
              },
            })}
            placeholder="ex) Lucy"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            {...register("email", {
              required: "이메일을 입력해주세요.",
            })}
            placeholder="ex) user@someemail.com"
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            {...register("phone", {
              required: "전화번호를 입력해주세요.",
              minLength: {
                value: 11,
                message: "전화번호는 11자이어야 합니다.",
              },
              maxLength: {
                value: 11,
                message: "전화번호는 11자이어야 합니다.",
              },
            })}
            placeholder="ex) 01012345678"
          />
        </div>
        <button>Sign Up</button>
        <span>
          Already have any account? <Link href="/log-in">Sign In</Link>
        </span>
      </form>
    </div>
  );
}
