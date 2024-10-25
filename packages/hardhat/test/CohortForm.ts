import { expect } from "chai";
import { ethers } from "hardhat";
import { CohortForm } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("CohortForm", function () {
  let cohortForm: CohortForm;
  let owner: HardhatEthersSigner;
  let admin1: HardhatEthersSigner;
  let admin2: HardhatEthersSigner;
  before(async () => {
    [owner, admin1, admin2] = await ethers.getSigners();
    const cohortFormFactory = await ethers.getContractFactory("CohortForm");
    cohortForm = (await cohortFormFactory.deploy(owner.address)) as CohortForm;
    await cohortForm.waitForDeployment();
  });
  describe("Check for admin", async function () {
    it("Should check if the owner is an admin", async function () {
      const res = await cohortForm.connect(owner).getStudentsByCohort("cohort1");
      console.log(res);
      expect(res.length).to.eq(0);
    });
  });
  describe("Grant admin role and also use it to check for all students", async function () {
    it("Should create an admin", async function () {
      await cohortForm.connect(owner).registerAdmin(admin1.address);
      expect((await cohortForm.connect(admin1).getAllStudents()).length).to.equal(0);
    })
    it("should fail and revert", async function () {
      await expect(cohortForm.connect(admin2).getAllStudents()).to.be.revertedWith("Not an admin");
    });
  });
});
