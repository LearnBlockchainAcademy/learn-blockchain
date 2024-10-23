import React from "react";
import { Week, convertHashToData, sampleEncoded } from "~~/utils/convert";

export const Curriculum = ({ curriculum }: { curriculum: string }) => {
  return (
    <div className="bg-inherit">
      <h3 className="m-2 p-2">Currculum</h3>
      <div>
        {convertHashToData(curriculum) ? (
          <div>
            <BigScreen curriculums={convertHashToData(curriculum)} />
            <SmallScreen curriculums={convertHashToData(curriculum)} />
          </div>
        ) : (
          <div>
            <BigScreen curriculums={convertHashToData(sampleEncoded)} />
            <SmallScreen curriculums={convertHashToData(sampleEncoded)} />
          </div>
        )}
      </div>
    </div>
  );
};

interface ScreenProps {
  curriculums: Week[] | undefined;
}

const BigScreen: React.FC<ScreenProps> = ({ curriculums }) => {
  const [active, setActive] = React.useState<number>(0);
  return (
    <div className="hidden sm:flex space-x-20 px-4 ">
      <ul>
        {curriculums &&
          curriculums.map((data, index) => (
            <li
              key={index}
              className={
                "text-semibold px-4 py-2 text-xl cursor-pointer border-l-2 border-primary dark:border-secondary" +
                `${active === index && "border-secondary dark:border-primary text-primary"}`
              }
              onClick={() => setActive(index)}
            >
              Week {data.week}
            </li>
          ))}
      </ul>
      <div className="">{curriculums && <Display data={curriculums[active]} display="large" />}</div>
    </div>
  );
};

const SmallScreen: React.FC<ScreenProps> = ({ curriculums }) => {
  return (
    <div className="block sm:hidden">
      {curriculums &&
        curriculums.map((curr, index) => (
          <div key={index} className="collapse collapse-plus bg-base-200">
            <input type="radio" name="accordion" />
            <div className="collapse-title text-xl font-medium">Week {curr.week}</div>
            <div className="collapse-content">
              <Display data={curr} display="mobile" />
            </div>
          </div>
        ))}
    </div>
  );
};

interface DisplayProps {
  data: Week;
  display: "mobile" | "large";
}
const Display: React.FC<DisplayProps> = ({ data, display }) => {
  return (
    <div className="block">
      <h3 className="underline my-2 bold" hidden={display === "mobile"}>
        Week {data.week}
      </h3>
      <ul className=" list-disc px-4">
        <li className="py-2 px-2 text-base">{data.course}</li>
        <li className="py-2 px-2 text-base">{data.assignment}</li>
        <li>
          <h4 className="py-2 px-2">Materials</h4>
          <ul className=" list-inside" style={{ listStyleType: "square" }}>
            {data.materials.map((material, index) => (
              <li key={index} className="py-1 px-2 text-base">
                {material}
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};
