"use client";

import React from "react";
import { NextPage } from "next";
import { FaMinus, FaPlus } from "react-icons/fa";
import Input from "~~/components/Input";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { Week, convertCohortToId, convertDataToHash } from "~~/utils/convert";

const CreateCurriculum: NextPage = () => {
  const [submitting, setSubmitting] = React.useState(false);
  const initValues = {
    week: 0,
    course: "",
    assignment: "",
    materials: [""],
  };
  const { writeContractAsync } = useScaffoldWriteContract("CohortForm");
  const { data: currentCohort } = useScaffoldReadContract({
    contractName: "CohortForm",
    functionName: "currentCohort",
  });
  const cohort = convertCohortToId(currentCohort as string);
  const [formData, setFormData] = React.useState<Week[]>([initValues]);
  const handleMaterialChanges = (formIndex: number, materialIndex: number, value: string): void => {
    const data = formData;
    data[formIndex].materials[materialIndex] = value;
    setFormData(data);
  };
  const handleAddMaterial = (formIndex: number): void => {
    const data = formData;
    data[formIndex].materials.push("");
    setFormData(data);
  };
  const handleRemoveMaterial = (formIndex: number, materialIndex: number): void => {
    const data = formData;
    data[formIndex].materials.splice(materialIndex, 1);
    setFormData(data);
  };
  const handleAddWeek = () => setFormData(prev => [...prev, initValues]);
  const handleSubmit = async () => {
    setSubmitting(true);
    if (formData[0].week === 0 || formData[0].course === "") {
      setSubmitting(false);
      return;
    }
    try {
      const encoded = convertDataToHash(formData);
      await writeContractAsync({
        functionName: "createCurriculumn",
        args: [cohort, encoded as `0x${string}`],
      });
      setFormData([initValues]);
      setSubmitting(false);
    } catch (error: any) {
      console.error(error);
      setSubmitting(false);
    }
  };
  return (
    <section className="flex flex-col justify-center pt-10 px-4 w-full">
      <div className="py-4 rounded-md min-h-8 mb-2 block items-center bg-white dark:bg-transparent">
        <div className="float-left">
          <h1 className="text-lg p-4 font-bold">Create curriculum</h1>
          <p className="text-sm px-4">Create curriculum for the new cohort for blockchain learning</p>
        </div>
        <div className="float-right m-2">
          <button className="text-base-100 bg-primary px-8 py-3" onClick={handleAddWeek}>
            Add week
          </button>
        </div>
      </div>
      <form>
        {formData.map((week, index) => (
          <div key={index} className="w-full space-y-2">
            <div className="rounded-md p-4 block bg-white dark:bg-transparent shadow-sm">
              <label htmlFor="week" className="text-base">
                What is the Week Number?
              </label>
              <Input
                name="week"
                value={week.week}
                type="number"
                onChange={e =>
                  setFormData(prev => {
                    prev[index].week = Number(e.target.value);
                    return prev;
                  })
                }
              />
            </div>
            <div className="rounded-md p-4 block bg-white dark:bg-transparent shadow-sm">
              <label htmlFor="course" className="text-base">
                What is the Course title?
              </label>
              <Input
                name="course"
                type="text"
                value={week.course}
                onChange={e =>
                  setFormData(prev => {
                    prev[index].course = e.target.value;
                    return prev;
                  })
                }
              />
            </div>
            <div className="rounded-md p-4 block bg-white dark:bg-transparent shadow-sm">
              <label htmlFor="course" className="text-base">
                What is the Assignment title?
              </label>
              <Input
                name="course"
                type="text"
                onChange={e =>
                  setFormData(prev => {
                    prev[index].assignment = e.target.value;
                    return prev;
                  })
                }
                value={week.assignment}
              />
            </div>
            <div className="rounded-md p-4 block bg-white dark:bg-transparent shadow-sm">
              <label htmlFor="material" className="form-control">
                <div className="label">
                  <span className="label-text text-base">Materials?</span>
                  <span className="label-text-alt">
                    <div onClick={() => handleAddMaterial(index)} role="button">
                      <FaPlus size={5} className="text-primary-content" />
                    </div>
                  </span>
                </div>
              </label>
              {week.materials.map((material, matIndex) => (
                <div key={matIndex} className="flex space-x-2">
                  <Input
                    type="text"
                    value={material}
                    name="material"
                    placeholder="Class resource..."
                    onChange={e => handleMaterialChanges(index, matIndex, e.target.value)}
                  />
                  <div role="button" className="mt-4" onClick={() => handleRemoveMaterial(index, matIndex)}>
                    <FaMinus size={5} className="text-primary" />
                  </div>
                </div>
              ))}
            </div>
            <div className="divider-primary divider"></div>
          </div>
        ))}
        <div className="flex mt-2 space-x-3">
          <div>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="flex flex-start space-x-2 w-fit px-8 py-3 text-base-100 rounded-sm bg-purple-500 dark:text-white"
            >
              {" "}
              <span>Submit</span> {submitting && <span className="loading loading-bars loading-md"></span>}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CreateCurriculum;
