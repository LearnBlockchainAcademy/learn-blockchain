"use client";

import { Dispatch, FormEvent, useContext, useState } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaPlus, FaWhatsapp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { Curriculum } from "~~/components/Curriculum";
import Input from "~~/components/Input";
import Modal from "~~/components/modals";
import { ModalContext } from "~~/components/modals/ModalContext";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { convertCohortToId } from "~~/utils/convert";

interface cohortDetails {
  cohortNumber: bigint;
  name: string;
  numberOfMembers: bigint;
  whatsappLink: string;
  githubLink: string;
}

export default function AdminPage() {
  const { data: currentCohort } = useScaffoldReadContract({
    contractName: "CohortForm",
    functionName: "currentCohort",
  });
  // const cort = convertCohortToId(currentCohort as string);
  // const { data: students } = useScaffoldReadContract({
  //   contractName: "CohortForm",
  //   functionName: "getStudentsByCohort",
  //   args: [cort],
  // });
  const [cohortDetails, setCohortDetails] = useState<cohortDetails | null>(null);
  // const [studentDetails, setStudentDetails] = useState<`0x${string}`[] | undefined>(students as `0x${string}`[]);
  const [studentAddress, setStudentAddress] = useState<string>("");
  const [editing, setEditing] = useState(false);
  const [curriculum, setCurriculum] = useState<
    | {
        length: bigint;
        curriculum: `0x${string}`;
      }
    | undefined
  >(undefined);
  const { writeContractAsync } = useScaffoldWriteContract("CohortForm");

  const { setModal, openModal, modal }: any = useContext(ModalContext);

  const handleEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const cohort = formData.get("cohort");
    if (!cohort || (cohort as string).length < 6 || !(cohort as string).startsWith("Cohort")) {
      setEditing(false);
      return;
    }
    await writeContractAsync({
      functionName: "setCurrentCohort",
      args: [cohort as string],
    });
    setEditing(false);
  };

  return (
    <section>
      <div className="block text-black">
        <div className="flex sm:flex-row flex-col gap-2">
          <div className="w-full">
            {/*current cohort and cohort details*/}
            <div className="rounded-md min-h-8 mb-2 block bg-white">
              <h1 className="text-lg p-4 font-bold" hidden={editing} onClick={() => setEditing(true)}>
                {currentCohort}
              </h1>
              <form hidden={!editing} onSubmit={e => handleEdit(e)}>
                <Input type="text" name="cohort" />
                <button type="submit" aria-hidden hidden>
                  Submit
                </button>
              </form>
            </div>
            <div className="bg-white block">
              {/*cohort details */}
              <div className="flex justify-between w-full my-3">
                <h3 className="m-2 p-2 w-full">Cohort details</h3>
                <FaPlus
                  size={10}
                  className="cursor-pointer mt-2 flex flex-end text-primary-content"
                  onClick={() => {
                    setModal({ method: "createCohort" });
                    openModal();
                  }}
                />
              </div>

              {/* Select cohort */}
              <div>
                <SelectCohort
                  setCurriculum={setCurriculum}
                  currentCohort={currentCohort as string}
                  setCohortDetails={setCohortDetails}
                />
              </div>
              <CohortDetails details={cohortDetails as cohortDetails} />
            </div>
          </div>
          <div className="w-full bg-white min-h-40">
            {/* students */}
            <h3 className="m-2 p-2">Students</h3>
            {/* Select cohort */}
            <div className="">
              <StudentInput setStudentAddress={setStudentAddress} />
            </div>
            <div className="bg-white w-full">
              {studentAddress ? (
                <StudentDetail studentAddress={studentAddress as `0x${string}`} />
              ) : (
                <p className="text-center">No student address provided</p>
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex-col mt-2 flex justify-center bg-white min-h-40">
          {/* curriculum */}
          <div className="flex justify-center space-x-10">
            <div className="flex flex-grow w-full mt-4">
              <SelectCohort
                setCohortDetails={setCohortDetails}
                currentCohort={currentCohort as string}
                setCurriculum={setCurriculum}
              />
            </div>
            <Link
              role="button"
              className="btn rounded-none text-primary-content mt-4 mx-4 flex flex-end"
              href={"/create-curriculum"}
            >
              Create Curriculum
            </Link>
          </div>
          <Curriculum curriculum={curriculum?.curriculum as `0x${string}`} />
        </div>
      </div>
      <Modal method={modal?.method} curriculum={modal?.data} />;
    </section>
  );
}

const StudentInput = ({ setStudentAddress }: { setStudentAddress: Dispatch<any> }) => {
  const [address, setAddress] = useState("");

  return (
    <form
      className="rounded-md p-4 block bg-white shadow-sm"
      onSubmit={e => {
        e.preventDefault();
        if (address.length === 42 && address.startsWith("0x")) {
          setStudentAddress(address);
        }
      }}
    >
      <label htmlFor="studentAddress" className="text-base">
        {"Student's address"}
      </label>
      <Input
        name="studentAddress"
        value={address}
        type="text"
        onChange={e => {
          setAddress(e.target.value);
        }}
      />
      <button type="submit" hidden></button>
    </form>
  );
};

const SelectCohort = ({
  currentCohort,
  setCohortDetails,
  setCurriculum,
}: {
  currentCohort: string;
  setCohortDetails: Dispatch<any>;

  setCurriculum: Dispatch<any>;
}) => {
  const [cohort, setCohort] = useState<string>(convertCohortToId(currentCohort));
  const { data: cohortList } = useScaffoldReadContract({
    contractName: "CohortForm",
    functionName: "getRegisteredCohorts",
  });
  const { data: cohortDetails } = useScaffoldReadContract({
    contractName: "CohortForm",
    functionName: "getCohort",
    args: [cohort],
  });

  const { data: curriculum } = useScaffoldReadContract({
    contractName: "CohortForm",
    functionName: "getCurriculumn",
    args: [cohort],
  });
  setCohortDetails(cohortDetails);
  setCurriculum(curriculum);

  return (
    <div className="dropdown w-full max-w-72">
      <div
        tabIndex={0}
        role="button"
        className="flex justify-around mx-4 w-full text-sm border-b-[1.1px] border-secondary"
      >
        <span className="w-full ">Select Cohort</span>
        <div className="-m-2 text-primary-content dark:text-secondary-content">
          <FaCaretDown size={10} />
        </div>
      </div>
      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-10 w-full p-2 shadow cursor-pointer">
        {cohortList?.map((cohort, index) => {
          return (
            <li
              className={
                "border-b py-3 px-2 w-full text-sm cursor-pointer" +
                `${cohort === convertCohortToId(currentCohort) && "font-bold"}`
              }
              key={index}
              onClick={() => setCohort(cohort)}
              role="button"
            >
              {cohort}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const CohortDetails = ({ details }: { details: cohortDetails | null }) => {
  return details ? (
    <div className="block min-h-40 p-4">
      <div className="flex justify-start space-x-3 p-4">
        <p className="m-1">{details.name}</p>
        <span className="m-1">{details.cohortNumber.toLocaleString()}</span>
      </div>
      <p>Number of members: {details.numberOfMembers.toLocaleString()}</p>
      <div className="mt-4 flex justify-start space-x-3">
        <Link role="button" href={details.whatsappLink || "#"} className="p-2 m-1 flex space-x-2">
          <FaWhatsapp size={15} /> <span className="text-xs">Cohort WhatsApp group</span>
        </Link>
        <Link role="button" href={details.githubLink || "#"} className="p-2 m-1 flex space-x-2">
          <FaGithub size={15} /> <span className="text-xs">Cohort Github</span>
        </Link>
      </div>
    </div>
  ) : (
    <div className="text-center min-h-20 m-5 text-base flex justify-center items-center">Nothing here yet</div>
  );
};

const StudentDetail = ({ studentAddress }: { studentAddress: `0x${string}` }) => {
  const { data: details } = useScaffoldReadContract({
    contractName: "CohortForm",
    functionName: "getStudentDetail",
    args: [studentAddress],
  });
  return (
    <div>
      {details ? (
        <div>
          <div className="m-2 p-2">{details.name}</div>
          <div className="m-2 p-2">{details.email}</div>
          <div className="block m-2 p-2">
            <h4 className="font-semibold">Bio:</h4>
            <p className="leading">{details.blockchainExperience}</p>
          </div>
          <div className="flex justify-start space-x-2 m-2 p-2">
            <Link role="button" href={details.github} className="p-2">
              <FaGithub size={5} />
            </Link>
            <Link role="button" href={details.linkedin} className="p-2">
              <FaLinkedinIn size={5} />
            </Link>
          </div>
        </div>
      ) : (
        "No student details"
      )}
    </div>
  );
};
