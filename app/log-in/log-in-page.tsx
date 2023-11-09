"use client";

import { useForm, FormProvider } from "react-hook-form";
import Input from "../../components/input";
import { error } from "console";

export interface ILogInForm {
  email: string;
}

export default function LogInPage() {
  const methods = useForm<ILogInForm>();
  const onValid = (vaildForm: ILogInForm) => {
    console.log(vaildForm);
  };

  return (
    <div className="">
      <h1 className="text-white">Logo</h1>
      <div className="bg-white rounded-3xl rounded-tr-none">
        <h1 className="text-center text-3xl">Login</h1>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onValid, (error) =>
              console.log(error)
            )}
          >
            <Input
              id="email"
              labelName="Email"
              placeholder="ex) username@email.com"
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
