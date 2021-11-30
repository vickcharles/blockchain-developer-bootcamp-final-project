// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;
import "../structs/Payment.sol";

library LessorsLib {
  struct Lessors {
    mapping (address => Lessor) _lessors;
  }
  
  struct Lessor {
    address payable owner;
    uint256 numOfProperties;
    Property[] properties;
  }

 struct Property {
    uint id;
    string title;
    string description;
    string imgUrl;
    uint256 montlyPrice;
    uint256 depositAmount;
    uint256 depositPrice;
    address lessor;
    address payable tenant;
    Payment lastPayment;
    uint nextPayment;
    bool available;
 }
 
 
  /**
   * @dev create new property to this lessor
   */
  function createProperty(
     Lessors storage lessors, 
     string memory _title,
     string memory _description,
     string memory _imgUrl,
     uint256 _amount,
     uint256 _deposit
    ) internal returns(Lessor storage lessor)
   {
      Property memory property;
      lessor = lessors._lessors[msg.sender];
      property.title = _title;
      property.description = _description;
      property.imgUrl = _imgUrl;
      property.montlyPrice = _amount;
      property.depositPrice = _deposit;
      property.available = true;
      property.lessor = msg.sender;
      property.id = lessor.numOfProperties++;
      lessor.properties.push(property);
      
   }
   
   
    /**
   * @dev retrieve a lessor property
   */
   function getLessors(Lessors storage lessors, address[] memory numOfLessors) view internal returns(Lessor[] memory) {
      uint256 numLength = numOfLessors.length;
      Lessor[] memory memoryArray = new Lessor[](
      numOfLessors.length);
      for (uint256 i = 0; i < numLength; i++) {
        memoryArray[i] = lessors._lessors[numOfLessors[i]];
       }
      return memoryArray;
   }
   
   
   
   /**
   * @dev retrieve a lessor property
   */
   function getLessor(Lessors storage lessors, address _lessorAddress) view internal returns(Lessor storage) {
       return lessors._lessors[_lessorAddress];
   }
   
   
    /**
   * @dev retrieve a lessor property
   */
   function getLessorProperty(Lessors storage lessors, address _lessorAddress, uint _propertyId) view internal returns(Property memory) {
       return lessors._lessors[_lessorAddress].properties[_propertyId];
   }
   
}
