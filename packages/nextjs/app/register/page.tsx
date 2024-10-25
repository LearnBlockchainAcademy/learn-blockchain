"use client";

import { FormEvent, useState } from "react";
// import Link from "next/link";
import type { NextPage } from "next";
import Input from "~~/components/Input";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { convertCohortToId } from "~~/utils/convert";
import { notification } from "~~/utils/scaffold-eth";

const Register: NextPage = () => {
  const { writeContractAsync } = useScaffoldWriteContract("CohortForm");
  const [submitting, setSubmitting] = useState(false);
  const { data: currentCohort } = useScaffoldReadContract({
    contractName: "CohortForm",
    functionName: "currentCohort",
  });
  const cohort = currentCohort && convertCohortToId(currentCohort);
  const { data: getCohort } = useScaffoldReadContract({
    contractName: "CohortForm",
    functionName: "getCohort",
    args: [cohort],
  });
  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const formdata = new FormData(e.currentTarget);
      const name = formdata.get("name") as string;
      const email = formdata.get("email") as string;
      const blockchainExperience = formdata.get("blockchainExperience") as string;
      const github = formdata.get("github") as string;
      const linkedin = formdata.get("linkedin") as string;
      if (name && email && blockchainExperience && github && linkedin && cohort) {
        await writeContractAsync({
          functionName: "addDetails",
          args: [cohort, name, email, blockchainExperience, github, linkedin],
        });
        formdata.set("cohort", "");
        notification.success("Details added successfully. Redirecting you to the whatsapp group");
        setTimeout(() => {
          window.location.href = getCohort?.whatsappLink as string;
        }, 2000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <section className="flex flex-col justify-center pt-10 px-4 w-full">
      <div className="py-4 rounded-md min-h-8 mb-2 block bg-white dark:bg-transparent">
        <h1 className="text-lg p-4 font-bold">Register</h1>
        <p className="text-sm px-4">Register here for the new cohort for blockchain learning</p>
      </div>
      <form onSubmit={e => submitForm(e)} id="form" className="flex flex-col justify-center gap-2 px-5`">
        <div className="rounded-md p-4 block bg-white dark:bg-transparent shadow-sm">
          <label className="text-base" htmlFor="name">
            What is your name?
          </label>
          <Input name="name" type="text" />
        </div>
        <div className="rounded-md p-4 block bg-white dark:bg-transparent shadow-sm">
          <label className="text-base" htmlFor="email">
            Email
          </label>
          <Input name="email" type="email" />
        </div>
        <div className="rounded-md p-4 block bg-white dark:bg-transparent shadow-sm">
          <label className="text-base" htmlFor="blockchainExperience">
            What experience do you have with the blockchain?
          </label>
          <Input name="blockchainExperience" type="text" />
        </div>
        <div className="rounded-md p-4 block bg-white dark:bg-transparent shadow-sm">
          <label className="text-base" htmlFor="github">
            What is your github profile?
          </label>
          <Input name="github" type="text" />
        </div>
        <div className="rounded-md p-4 block bg-white dark:bg-transparent shadow-sm dark:border-[0.5px] dark:border-teal-50">
          <label className="text-base" htmlFor="linkedin">
            What is your linkedin profile?
          </label>
          <Input name="linkedin" type="text" />
        </div>
        <button
          className="flex flex-start space-x-2 w-fit px-8 py-3 text-base-100 rounded-sm bg-purple-500 dark:text-white"
          disabled={submitting}
          type="submit"
        >
          {" "}
          <span>Submit</span> {submitting && <span className="loading loading-bars loading-md"></span>}
        </button>
      </form>
    </section>
  );
};

export default Register;
