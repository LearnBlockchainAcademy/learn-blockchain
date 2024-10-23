import { Curriculum } from "../Curriculum";
import { CreateCohort } from "./CreateCohort";
import { FaTimes } from "react-icons/fa";

export default function Modal({
  method,
  curriculum,
}: {
  method: "createCohort" | "createCurriculum" | "showCurriculum" | undefined;
  curriculum?: `0x${string}`;
}) {
  return (
    <dialog id="modal" className="w-full p-2 flex flex-col justify-center space-y-4 h-fit overflow-scroll">
      <form method="dialog" className="modal-backdrop m-2 float-right h-fit">
        <button className="w-fit text-primary-content h-fit">
          <FaTimes size={10} />
        </button>
      </form>
      <div className="">
        {method === "createCohort" ? <CreateCohort /> : curriculum && <Curriculum curriculum={curriculum as string} />}
      </div>
    </dialog>
  );
}
