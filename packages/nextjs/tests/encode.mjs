import { AbiCoder } from "ethers";

// const Week = {
//   week: number,
//   course: string,
//   assignment: string,
//   materials: [string],
// };

const abiCoder = AbiCoder.defaultAbiCoder();

const sampleData = [
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

/**
 * converts decoded data into usable function
 * @param {Array<>} decoded decoded data
 * @returns data of type Array<{week: number; course: string; assignment: string; materials: Array<string>}>
 */
const convertDecodedToUsableData = decoded => {
  const result = [];
  for (const data of decoded) {
    const res = {};
    res["week"] = Number(data[0]);
    res["course"] = data[1];
    res["assignment"] = data[2];
    res["materials"] = [...data[3]];
    result.push(res);
  }
  return result;
};

const convertHashToData = hash =>
  abiCoder.decode(["tuple(uint256 week, string course, string assignment, string[] materials)[]"], hash);

const convertDataToHash = data =>
  abiCoder.encode(["tuple(uint256 week, string course, string assignment, string[] materials)[]"], [data]);

const encoded = convertDataToHash(sampleData);
const decoded = convertHashToData(encoded);
console.log(convertDecodedToUsableData(decoded[0]));
