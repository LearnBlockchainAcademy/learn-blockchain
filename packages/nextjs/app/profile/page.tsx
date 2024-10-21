"use client";

import { useState } from "react";
import Link from "next/link";
import { NextPage } from "next";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { useAccount } from "wagmi";
import { Curriculum } from "~~/components/Curriculum";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const ProfilePage: NextPage = () => {
  const style = {
    background: "linear-gradient(45deg, rgba(177,51,30,1) 3%, rgba(255,149,34,1) 53%, rgba(34,88,215,1) 93%)",
  };
  const { address } = useAccount();
  const { data: details } = useScaffoldReadContract({
    contractName: "CohortForm",
    functionName: "getStudentDetail",
    args: [address],
  });

  const { data: cohortDetails } = useScaffoldReadContract({
    contractName: "CohortForm",
    functionName: "getCohort",
    args: [details?.cohort],
  });

  const { data: curriculum } = useScaffoldReadContract({
    contractName: "CohortForm",
    functionName: "getCurriculumn",
    args: [details?.cohort],
  });

  const [curr, setCurr] = useState(false);

  return (
    <section className="container p-2 rounded-md min-w-full block min-h-[50vh] max-h-[70]">
      {details ? (
        <div>
          <div className="" style={{ width: "100%", height: "180px", ...style }}></div>
          <div className="relative">
            {/* <div className="absolute -top-14 m-4 flex justify-center items-center bg-slate-50 rounded-full h-24 w-24 bg-transparent px-2 -mt-[10] z-10 mb-4">
              <FaRegUser className=" h-16 w-16" />
            </div> */}
            <div className="p-2 flex justify-between bg-white w-full">
              <div className="mt-16 pl-2 flex flex-col justify-start">
                <p className="font-bold text-lg">{details?.name}</p>
                <p className="text-base">{details?.email}</p>
                <p className="text-sm">
                  {details &&
                    details?.cohort.charAt(0).toLocaleUpperCase() +
                      details?.cohort.slice(1, 6) +
                      " " +
                      details?.cohort.slice(6)}
                </p>

                <div className="mt-4 flex justify-start sm:flex-row flex-col space-x-3">
                  <Link role="button" href={cohortDetails?.whatsappLink || "#"} className="p-2 m-1 flex space-x-1">
                    <FaWhatsapp size={5} /> <span className="text-sm w-full mt-1">WhatsApp</span>
                  </Link>
                  <Link role="button" href={cohortDetails?.githubLink || "#"} className="p-2 m-1 flex space-x-1">
                    <FaGithub size={5} /> <span className="text-sm w-full mt-1">Github</span>
                  </Link>
                  <button
                    className="btn"
                    onClick={() => {
                      setCurr(!curr);
                    }}
                  >
                    {!curr ? "View Curriculum" : "Close Curriculum"}
                  </button>
                </div>
              </div>
              <div className="mt-10 flex flex-col justify-center p-2">
                <Link role="button" href={details?.github || "#"} className="p-2 m-1 flex space-x-2">
                  <FaGithub size={5} />
                  <span className="text-base">Github</span>
                </Link>
                <Link role="button" href={details?.linkedin || "#"} className="p-2 m-1 flex space-x-2">
                  <FaLinkedinIn size={5} />
                  <span className="font-semi-bold text-base">Linkedin</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-white">{curr && <Curriculum curriculum={curriculum as string} />}</div>
        </div>
      ) : (
        <div className="flex justify-center items-center space-x-2 h-fit">
          <span className="loading loading-bars loading-md"></span> <p className="font-bold">Loading</p>
        </div>
      )}
    </section>
  );
};
export default ProfilePage;
