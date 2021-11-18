// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "../libraries/Roles.sol";
import "../libraries/Lessors.sol";


contract RentProperty {
    
    /*
      --- Libraries
    */
    
    using Roles for Roles.Role;
    using LessorsLib for LessorsLib.Lessors;

    /*
      --- State variables
    */
    
    LessorsLib.Lessors private _lessors;
    Roles.Role private _lessorRoles;
    Roles.Role private _tenant;

    
    mapping(address => LessorsLib.Property) public tenant;
    address[] public numOfLessors;
    
    
     /*
      --- Events
    */
    
    event PropertyRented(address indexed lessor, address indexed tenant, uint propertyId);
    event PropertyCreated(address indexed lessor, uint propertyId);
    
    
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
        require(_tenant.has(msg.sender), "Not owner");
        _;
    }
    
    modifier isTenant() {
        require(_tenant.has(msg.sender) == false, "Already has a Property");
        _;
    }

    
     /**
     * @dev get all properties for rental
    */
    function getLessors() public view returns (LessorsLib.Lessor[] memory) {
        return _lessors.getLessors(numOfLessors);
    }

     /**
     * @dev rent a property
    */
    function rentProperty(address lessorAddress, uint propertyId) public payable  {
        LessorsLib.Lessor storage lessor = _lessors.getLessor(lessorAddress);
        LessorsLib.Property storage property = lessor.properties[propertyId];
        uint montlyPrice = property.montlyPrice;
        uint depositPrice = property.depositPrice;
        
        uint value = msg.value;
        uint deposit = value - montlyPrice;
        uint amountToTransfer = value - deposit;
        
        require(montlyPrice + depositPrice == value, "You don't have enough ether");
        require(property.available == true, "This property is not available for rent");
        
        // update lessor property 
        property.tenant = payable(msg.sender); 
        property.available = false;
        property.depositAmount = deposit;

        // transfer token to lessor 
        lessor.owner.transfer(amountToTransfer);
        
        // set rented poperty to tenant
        tenant[msg.sender] = property;
        _tenant.add(msg.sender);
        
        emit PropertyRented(property.tenant, msg.sender,  property.id);
    }
    
    /**
     * @dev get single property by address
    */
    function getPropertyByTenant(address _address)
        public
        view
        returns (
            uint256 id,
            string memory title,
            string memory description,
            uint256 depositPrice,
            uint256 montlyPrice,
            address currentTenant,
            address owner,
            bool available
            
        )
    {
            id = tenant[_address].id;
            title = tenant[_address].title;
            description = tenant[_address].description;
            depositPrice = tenant[_address].depositPrice;
            montlyPrice = tenant[_address].montlyPrice;
            currentTenant = tenant[_address].tenant;
            owner = tenant[_address].lessor;
            available = tenant[_address].available;
            
    }
    
    /**
     * @dev create new porpery ang get lessor role
    */
    function createProperty(
        string memory _title,
        string memory _description,
        uint256 _amount,
        uint256 _deposit
    ) public {
        LessorsLib.Lessor storage lessor = _lessors.createProperty(_title, _description, _amount, _deposit);
     
       // check if created lessor already exits
       if(lessor.owner == address(0)) {
          lessor.owner = payable(msg.sender);
          numOfLessors.push(msg.sender);
         _lessorRoles.add(msg.sender);
       }
    }
}
