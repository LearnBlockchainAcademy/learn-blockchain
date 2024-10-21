import React from "react";

type ButtonProp = React.ComponentProps<"input"> & {
  submitting: boolean;
  type?: "button" | "reset" | "submit" | undefined;
  onClick?: () => void;
};
export default function SubmitButton({ submitting, type, onClick }: ButtonProp) {
  return (
    <button
      className="flex flex-start space-x-2 w-fit px-8 py-3 text-base-100 rounded-sm bg-purple-500 dark:text-white"
      disabled={submitting}
      type={type || "submit"}
      onClick={onClick}
    >
      {" "}
      <span>Submit</span> {submitting && <span className="loading loading-bars loading-md"></span>}
    </button>
  );
}
