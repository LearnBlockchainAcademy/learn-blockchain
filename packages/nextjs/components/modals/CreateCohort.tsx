"use client";

import React from "react";
import Input from "../Input";
import SubmitButton from "../Submit";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export const CreateCohort: React.FC = () => {
  const [submitting, setSubmitting] = React.useState(false);
  const { writeContractAsync } = useScaffoldWriteContract("CohortForm");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const cohortNumber = formData.get("number") as unknown as bigint;
    const cohortName = formData.get("name") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const github = formData.get("github") as string;
    const numOfMembers = formData.get("numOfMembers") as unknown as bigint;
    console.log(formData);
    await writeContractAsync({
      functionName: "createCohort",
      args: [cohortNumber, cohortName, numOfMembers, whatsapp, github],
    });
    setSubmitting(false);
    // @ts-ignore
    document.getElementById("modal")?.close();
  };
  return (
    <div className="block p-4 w-full h-full mx-auto">
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <label htmlFor="number">What is the Cohort Number?</label>
          <Input name="number" type="number" />
        </div>
        <div>
          <label htmlFor="name">What is the Cohort&apos;s ame?</label>
          <Input name="name" type="text" />
        </div>
        <div>
          <label htmlFor="numOfMembers">What is the number of members you are expecting?</label>
          <Input name="numOfMembers" type="number" />
        </div>
        <div>
          <label htmlFor="whatsapp">What is the link to the cohort&apos; Whatsapp group?</label>
          <Input name="whatsapp" type="text" />
        </div>
        <div>
          <label htmlFor="github">What is the link to the cohort&apos; Github?</label>
          <Input name="github" type="text" />
        </div>
        <SubmitButton submitting={submitting} />
      </form>
    </div>
  );
};
