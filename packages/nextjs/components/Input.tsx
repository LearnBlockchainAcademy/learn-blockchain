import React, { HTMLInputTypeAttribute } from "react";

type InputProp = React.ComponentProps<"input"> & {
  name: string;
  type: HTMLInputTypeAttribute;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};
export default function Input({ name, type, onChange }: InputProp) {
  return (
    <input
      name={name}
      type={type}
      className="my-2 py-4 outline-none text-sm w-full border-b bg-inherit"
      placeholder="Your answer"
      onChange={onChange}
    />
  );
}
