// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

import "../libraries/Roles.sol";
import "../libraries/Lessors.sol";
import "./IRentProperty.sol";
import "../structs/Payment.sol";

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/** 
 * @title Rent Property contract
 * @author Vickler Charles
 */
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

    
    /**
     * @notice Emitted when a tenant rent a property
     * @param lessor address
     * @param tenant address
     * @param propertyId rented property id
    */
    event PropertyRented(address indexed lessor, address indexed tenant, uint propertyId);


    /**
     * @notice Emitted when a property is created
    */
    event PropertyCreated();
    
    
    /*
      --- Funtions modifiers
    */
    
    modifier onlyTenantsWithoutRentedProperties() {
        require(_tenant[msg.sender].tenant == address(0), "already property rented");
        _;
    }
    

    /// @return lessors list
    function getLessors() public view override returns (LessorsLib.Lessor[] memory) {
        return _lessors.getLessors(numOfLessors);
    }
    
    
     /**
     * @notice create a new payment
     * @param amount the payment amount
     * @param to who sends the payment
     * @param from who receive the payment
     * @param date payment date in seconds
    */
    function createPayment(uint amount, address to, address from, uint date) private returns(Payment memory) {
        Payment memory payment = Payment(amount, from, to, date);
        payments.push(payment);
        return payment;
    }

     /**
     * @notice rent property
     * @param lessorAddress property lessor address
     * @param propertyId property id to rent
    */
    function rentProperty(address lessorAddress, uint propertyId) public override payable onlyTenantsWithoutRentedProperties {
        LessorsLib.Lessor storage lessor = _lessors.getLessor(lessorAddress);
        LessorsLib.Property storage property = lessor.properties[propertyId];
        uint256 montlyPrice = property.montlyPrice;
        uint256 depositPrice = property.depositPrice;
        
        uint256 value = msg.value;
        uint256 deposit = value.sub(montlyPrice);
        uint256 amountToTransfer = value.sub(deposit);
        
        require(montlyPrice.add(depositPrice) == value, "wrong amount");
        require(property.available == true, "This property is not available for rent");
        
        // Update lessor property 
        property.tenant = payable(msg.sender); 
        property.available = false;
        property.depositAmount = deposit;
        property.lastPayment = createPayment(amountToTransfer, msg.sender, lessor.owner, block.timestamp);
        property.nextPayment = block.timestamp + MONTH;
        
        // Set rented poperty to tenant
        _tenant[msg.sender] = property;
        _tenantRoles.add(msg.sender);

        // Transfer tokens to property owner
        (bool sent, ) = lessor.owner.call{value: amountToTransfer}("");
        require(sent, "Failed to tranfer token to tenant");
        
        emit PropertyRented(property.tenant, msg.sender,  property.id);
    }
    
    /// @notice Returns propery by tenant address.
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
     * @dev create new property
     * @param _title the property title
     * @param _description the property description
     * @param _imgUrl the property image url
     * @param _amount the property amount
     * @param _deposit the property deposit
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
