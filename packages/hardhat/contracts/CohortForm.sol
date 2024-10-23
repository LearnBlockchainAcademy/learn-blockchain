// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@account-abstraction/contracts/interfaces/IAccount.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CohortForm is AccessControl, IAccount {
  address public owner;
  bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
  bytes32 public constant STUDENT_ROLE = keccak256("STUDENT_ROLE");
  string public currentCohort = "Cohort 1";
  address public superAdmin;
  struct Form {
    address student;
    string cohort;
    string name;
    string email;
    string blockchainExperience;
    string github;
    string linkedin;
  }
  struct Cohort {
    uint256 cohortNumber;
    string name;
    uint256 numberOfMembers;
    string whatsappLink;
    string githubLink;
  }
  mapping (address => string) cohorts;
  mapping(address => Form) details;
  mapping (string => address[]) studentsInCohort;
  mapping (string => Cohort) cohortMap;
  mapping (string => bytes) curriculum;
  Form[] private allStudents;
  string[] public registeredCohorts;
  /**
   * reverts if an action is not allowed
   */
  error NotAllowed(string reason);
  event StudentRegistered(string name, string cohort);
  event CohortCreated(string name);

  constructor(address _superAdmin) {
    owner = msg.sender;
    superAdmin = _superAdmin;
    _grantRole(ADMIN_ROLE, _superAdmin);
  }

  modifier onlyAdmin {
    if (!hasRole(ADMIN_ROLE, msg.sender)) revert ("Not an admin");
    _;
  }

  /**
   * validates user operation for the IAccount interface
   *  user operation
   */
  function validateUserOp(PackedUserOperation calldata, bytes32, uint256) external pure returns (uint256 validationData) {
    // address recovered = ECDSA.recover(MessageHashUtils.toEthSignedMessageHash(userOpHash), userOp.signature);
    // return hasRole(ADMIN_ROLE, recovered) || hasRole(STUDENT_ROLE, recovered) ? 0 : 1;
    return 0;
  }

  /**
   * compare strings
   * @param str1 first string
   * @param str2 second string
   */
  function compareStrings(string memory str1, string memory str2) internal pure returns(bool) {
    return(keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2)));
  }

  function setCurrentCohort(string memory _cohort) public {
    currentCohort = _cohort;
  }

  /**
   * Add details of student
   * @param cohort cohort
   * @param name name of student
   * @param email email of student
   * @param blockchainExperience experience student has with the blockchain
   * @param github github account
   * @param linkedin linkedin profile
   */
  function addDetails(string memory cohort, string memory name, string memory email, string memory blockchainExperience, string memory github, string memory linkedin) public {
    if (compareStrings(cohorts[msg.sender], cohort)) revert NotAllowed("You are already in this cohort");
    Form memory form = Form(msg.sender, cohort, name, email, blockchainExperience, github, linkedin);
    details[msg.sender] = form;
    studentsInCohort[cohort].push(msg.sender);
    allStudents.push(form);
    _grantRole(STUDENT_ROLE, msg.sender);
    emit StudentRegistered(name, cohort);
  }

  /**
    * registers an admin
   */
  function registerAdmin(address _address) onlyAdmin public {
    _grantRole(ADMIN_ROLE, _address);
  }

  /**
   * 
   * @param _address address of student
   */
  function getStudentDetail(address _address) public view returns (Form memory) {
    if (!hasRole(STUDENT_ROLE, _address)) revert NotAllowed("This is not a student");
    return details[_address];
  }

  function getStudentsByCohort(string memory cohort) onlyAdmin public view returns (address[] memory) {
    return studentsInCohort[cohort];
  }

  function getAllStudents() onlyAdmin public view returns (Form[] memory) {
    return allStudents;
  }

  function createCohort(uint256 number, string memory name, uint256 numberOfMembers, string memory whatsappLink, string memory githubLink) onlyAdmin public {
    Cohort memory cohort = Cohort(number, name, numberOfMembers, whatsappLink, githubLink);
    string memory num = Strings.toString(number);
    string memory id = string.concat("cohort", num);
    cohortMap[id] = cohort;
    registeredCohorts.push(id);
    emit CohortCreated("id");
  }

  function getCohort(string memory id) public view returns(Cohort memory) {
    return cohortMap[id];
  }

  function createCurriculumn(string memory cohort, bytes memory _curriculum) public onlyAdmin {
    curriculum[cohort] = _curriculum;
  }

  function getCurriculumn(string memory cohort) public view returns (bytes memory) {
    return curriculum[cohort];
  }

  function getRegisteredCohorts() public view returns (string[] memory) {
    return registeredCohorts;
  }
}