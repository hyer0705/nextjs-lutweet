"use client";

import { useForm } from "react-hook-form";
import Header from "../../../components/header";
import { useRequestApi } from "../../../hooks/useRequestApi";
import { IResponseWriteData } from "../../../types/Response";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface IWriteForm {
  content: string;
}

export default function WritePage() {
  const router = useRouter();
  const { data, isLoading, handleApi } = useRequestApi<IResponseWriteData>({
    url: "/api/tweets/write",
    method: "POST",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IWriteForm>();

  const onValid = (validForm: IWriteForm) => {
    if (isLoading) return;
    handleApi(validForm);
  };

  useEffect(() => {
    if (!data) return;
    if (data.ok) {
      router.push(`/tweet/${data.tweet.id}`);
    }
  }, [data, router]);

  return (
    <div className="text-white">
      <Header title="Write" />
      <div className="flex space-x-2">
        <div className="w-10 h-10 bg-gray-500 rounded-full" />
        <form
          onSubmit={handleSubmit(onValid, (error) => console.error(error))}
          className="flex-1 space-y-4"
        >
          <textarea
            {...register("content", { required: "내용을 입력해주세요." })}
            className="resize-y w-full p-2 bg-inherit rounded-md focus:outline-none"
            rows={5}
            placeholder="What is happening?!"
          />
          <span className="text-red-600 font-semibold">
            {errors.content?.message}
          </span>
          <button className="w-full py-1 bg-white text-black rounded-xl rounded-tr-none">
            Write
          </button>
        </form>
      </div>
    </div>
  );
}
