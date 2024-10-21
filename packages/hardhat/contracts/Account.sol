// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

import "@account-abstraction/contracts/core/EntryPoint.sol";
import "@account-abstraction/contracts/interfaces/IAccount.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import "./CohortForm.sol";

contract AccountAbstraction is IAccount {
  address public owner;
  uint256 public count = 0;
  constructor(address _owner) {
    owner = _owner;
  }

  /**
   * validates user operation for the IAccount interface
   * @param userOp user operation
   */
  function validateUserOp(PackedUserOperation calldata userOp, bytes32 userOpHash, uint256) external view returns (uint256 validationData) {
    address recovered = ECDSA.recover(MessageHashUtils.toEthSignedMessageHash(userOpHash), userOp.signature);
    return recovered == owner ? 0 : 1;
  }

  function execute() external {
    count++;
  }
}

contract AccountFactory {
  /**
   * creates a new account
   * @param owner The owner of the account
   */
  function createAccount(address owner) external returns (address) {
    AccountAbstraction acc = new AccountAbstraction(owner);
    return address(acc);
  }
}