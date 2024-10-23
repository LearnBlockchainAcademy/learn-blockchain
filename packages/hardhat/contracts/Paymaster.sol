// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;
import "@account-abstraction/contracts/interfaces/IPaymaster.sol";

contract Paymaster {
  constructor() {
    
  }
  enum PostOpMode {
    opSucceeded, // user op succeeded
    opReverted, // user op reverted. still has to pay for gas.
    postOpReverted //user op succeeded, but caused postOp to revert. Now it's a 2nd call, after user's op was deliberately reverted.
  }

  function validatePaymasterUserOp(PackedUserOperation calldata, bytes32, uint256) pure
  external returns (bytes memory context, uint256 validationData){
    // Paymaster server
    // 20 bytes: paymaster address
    // time period
    // signature
    context = new bytes(0);
    validationData = 0;
  }

  function postOp(PostOpMode mode, bytes calldata context, uint256 actualGasCost) external{}
}