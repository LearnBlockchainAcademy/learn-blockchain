import { AbiCoder, BytesLike, Result } from "ethers";

export const sampleData = [
  {
    week: 1,
    course: "Introduction to blockchain",
    assignment: "create a presentation on blockchain basics",
    materials: ["learn blockchain microsoft learn", "learn blockchain microsoft learn"],
  },
  {
    week: 2,
    course: "Introduction to blockchain",
    assignment: "create a presentation on blockchain basics",
    materials: [
      "learn blockchain microsoft learn",
      "learn blockchain microsoft learn",
      "learn blockchain microsoft learn",
      "learn blockchain microsoft learn",
    ],
  },
  {
    week: 3,
    course: "Introduction to blockchain",
    assignment: "create a presentation on blockchain basics",
    materials: [
      "learn blockchain microsoft learn",
      "learn blockchain microsoft learn",
      "learn blockchain microsoft learn",
      "learn blockchain microsoft learn",
      "learn blockchain microsoft learn",
    ],
  },
];

export const convertCohortToId = (cohort: string): string => {
  const cohortArray = cohort && cohort.split(" ");
  return cohortArray && cohortArray[0].charAt(0).toLocaleLowerCase() + cohortArray[0].slice(1) + cohortArray[1];
};

export type Week = {
  week: number;
  course: string;
  assignment: string;
  materials: string[];
};

const abiCoder = AbiCoder.defaultAbiCoder();

const convertDecodedToUsableData = (decoded: Result): Week[] => {
  const result = [];
  for (const data of decoded[0]) {
    const res: Week = {
      week: 0,
      course: "",
      assignment: "",
      materials: [],
    };
    res["week"] = Number(data[0]);
    res["course"] = data[1];
    res["assignment"] = data[2];
    res["materials"] = [...data[3]];
    result.push(res);
  }
  return result;
};

export const convertHashToData = (hash: BytesLike): Week[] | undefined => {
  if (hash && hash !== "0x" && hash !== "0x0") {
    const decoded = abiCoder.decode(
      ["tuple(uint256 week, string course, string assignment, string[] materials)[]"],
      hash,
    );
    return convertDecodedToUsableData(decoded);
  }
  return undefined;
};

export const convertDataToHash = (data: Week[]) =>
  abiCoder.encode(["tuple(uint256 week, string course, string assignment, string[] materials)[]"], [data]);

export const sampleEncoded = convertDataToHash(sampleData);
