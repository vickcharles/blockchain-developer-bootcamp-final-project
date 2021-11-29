// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

import "../libraries/Roles.sol";
import "../libraries/Lessors.sol";
import "./IRentProperty.sol";
import "../structs/Payment.sol";

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RentProperty is IRentProperty {
    
    /*
      --- Libraries
    */
    using Roles for Roles.Role;
    using SafeMath for uint256;
    using LessorsLib for LessorsLib.Lessors;
    
    /*
      --- Constants
    */
    
    uint public constant MONTH = 2628000;

    /*
      --- State variables
    */
    
    LessorsLib.Lessors private _lessors;
    Roles.Role private _lessorRoles;
    Roles.Role private _tenantRoles;

    
    mapping(address => LessorsLib.Property) public _tenant;
    Payment[] public payments;
    address[] public numOfLessors;
    
    
     /*
      --- Events
    */
    
    event PropertyRented(address indexed lessor, address indexed tenant, uint propertyId);
    event PropertyCreated();
    
    
    /*
      --- Funtions modifiers
    */
    
    modifier isPropertyOwner() {
        require(_lessorRoles.has(msg.sender), "Not property owner");
        _;
    }
    
    modifier hasProperty() {
        require(!_lessorRoles.has(msg.sender), "has property");
        _;
    }
    
    modifier onlyTenant() {
        require(_tenantRoles.has(msg.sender), "Not owner");
        _;
    }
    
    modifier isTenant() {
        require(_tenantRoles.has(msg.sender) == false, "Already has a Property");
        _;
    }


    // @return lessors list
    function getLessors() public view override returns (LessorsLib.Lessor[] memory) {
        return _lessors.getLessors(numOfLessors);
    }
    
    
     /**
     * @notice create a new payment
     * @dev return new payment
    */
    function createPayment(uint amount, address to, address from, uint date) private returns(Payment memory) {
        Payment memory payment = Payment(amount, from, to, date);
        payments.push(payment);
        return payment;
    }

     /**
     * @notice return new payment
    */
    function rentProperty(address lessorAddress, uint propertyId) public override payable {
        require(_tenant[msg.sender].tenant == address(0), "already property rented");
        LessorsLib.Lessor storage lessor = _lessors.getLessor(lessorAddress);
        LessorsLib.Property storage property = lessor.properties[propertyId];
        uint256 montlyPrice = property.montlyPrice;
        uint256 depositPrice = property.depositPrice;
        
        uint256 value = msg.value;
        uint256 deposit = value.sub(montlyPrice);
        uint256 amountToTransfer = value.sub(deposit);
        
        require(montlyPrice.add(depositPrice) == value, "wrong amount");
        require(property.available == true, "This property is not available for rent");
        
        // update lessor property 
        property.tenant = payable(msg.sender); 
        property.available = false;
        property.depositAmount = deposit;
        property.lastPayment = createPayment(amountToTransfer, msg.sender, lessor.owner, block.timestamp);
        property.nextPayment = block.timestamp + MONTH;
        
        // set rented poperty to tenant
        _tenant[msg.sender] = property;
        _tenantRoles.add(msg.sender);

        (bool sent, ) = lessor.owner.call{value: amountToTransfer}("");
        require(sent, "Failed to tranfer token to tenant");
        
        emit PropertyRented(property.tenant, msg.sender,  property.id);
    }
    
    /**
     * @notice get single property by tenant address
    */
    function getPropertyByTenant(address _address)
        public
        view
        override
        returns (
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
            
        )
    {
            require(_tenantRoles.has(_address), "don't have a property");
            id = _tenant[_address].id;
            title = _tenant[_address].title;
            description = _tenant[_address].description;
            imgUrl = _tenant[_address].imgUrl;
            depositPrice = _tenant[_address].depositPrice;
            montlyPrice = _tenant[_address].montlyPrice;
            tenant = _tenant[_address].tenant;
            owner = _tenant[_address].lessor;
            available = _tenant[_address].available;
            lastPayment = _tenant[_address].lastPayment;
            nextPayment = _tenant[_address].nextPayment;
            
    }
    
    /**
     * @dev create new porpery and get lessor role
    */
    function createProperty(
        string memory _title,
        string memory _description,
        string memory _imgUrl,
        uint256 _amount,
        uint256 _deposit
    ) public override {
        LessorsLib.Lessor storage lessor = _lessors.createProperty(_title, _description, _imgUrl, _amount, _deposit);
     
       if(lessor.owner == address(0)) {
          lessor.owner = payable(msg.sender);
          numOfLessors.push(msg.sender);
         _lessorRoles.add(msg.sender);
       }

        emit PropertyCreated();
    }
}
