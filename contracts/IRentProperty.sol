// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;
import "../libraries/Lessors.sol";

interface IRentProperty {
  function getLessors() external returns (LessorsLib.Lessor[] memory);
  function rentProperty(address lessorAddress, uint propertyId) external payable;
  function getPropertyByTenant(address _address) external returns (
    uint256 id,
    string memory title,
    string memory description,
    string memory imgUrl,
    uint256 depositPrice,
    uint256 montlyPrice,
    address tenant,
    address owner,
    bool available,
    Payment memory lastPayment,
    uint256 nextPayment
    );
    
    
    function createProperty(
        string memory _title,
        string memory _description,
        string memory _imgUrl,
        uint256 _amount,
        uint256 _deposit
    ) external;
}
