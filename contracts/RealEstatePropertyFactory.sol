// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

library Roles {
  struct Role {
    mapping (address => bool) bearer;
  }

  /**
   * @dev give an account access to this role
   */
  function add(Role storage role, address account) internal {
    require(account != address(0));
    require(!has(role, account));
    role.bearer[account] = true;
  }

  /**
   * @dev remove an account's access to this role
   */
  function remove(Role storage role, address account) internal {
    require(account != address(0));
    require(has(role, account));

    role.bearer[account] = false;
  }

  /**
   * @dev check if an account has this role
   * @return bool
   */
  function has(Role storage role, address account)
    internal
    view
    returns (bool)
  {
    require(account != address(0));
    return role.bearer[account];
  }
}

contract RealEstatePropertyFactory {
    using Roles for Roles.Role;

    // state variables
    Roles.Role private _propertyOwners;
    Roles.Role private _tenant;
    
    modifier isPropertyOwner() {
        require(_propertyOwners.has(msg.sender), "Not propertyowner");
        _;
    }
    
    modifier hasProperty() {
        require(!_propertyOwners.has(msg.sender), "has property");
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
    
    mapping(address => RealEstateProperty) public properties;
    mapping(address => Property) public tenant;
    address[] public numOfAddress;

    struct RealEstateProperty {
        address payable owner;
        uint256 numOfProperties;
        Property[] properties;
    }

    struct Property {
        uint id;
        string title;
        string description;
        uint256 montlyPrice;
        uint256 depositAmount;
        uint256 depositPrice;
        address owner;
        address payable tenant;
        bool available;
    }
    
     /**
     * @dev get all properties for rental
    */
    function getProperties() public view returns (RealEstateProperty[] memory) {
        uint256 numLength = numOfAddress.length;
        RealEstateProperty[] memory memoryArray = new RealEstateProperty[](
            numOfAddress.length
        );
        for (uint256 i = 0; i < numLength; i++) {
            memoryArray[i] = properties[numOfAddress[i]];
        }
        return memoryArray;
    }

     /**
     * @dev rental a property
    */
    function rentProperty(address propertyOwner, uint propertyId) public payable  {
        RealEstateProperty storage property = properties[propertyOwner];
        uint montlyPrice = property.properties[propertyId].montlyPrice;
        uint depositPrice = property.properties[propertyId].depositPrice;
        uint sum = msg.value;
        uint deposit = sum - montlyPrice;
        uint toPay = sum - deposit;
        uint toCheck = montlyPrice + depositPrice;
        require(toCheck == msg.value, "You don't have enough ether");
        require(property.properties[propertyId].available == true, "This property is not available for rent");
        property.properties[propertyId].tenant = payable(msg.sender); 
        property.properties[propertyId].available = false;
        property.properties[propertyId].depositAmount = deposit;
        tenant[msg.sender] = property.properties[propertyId];
        property.owner.transfer(toPay);
        _tenant.add(msg.sender);
    }
    
    /**
     * @dev get single property by address
    */
    function getPropertyByTenant(address _address)
        public
        view
        returns (
            string memory,
            string memory,
            uint256,
            address,
            address,
            bool
            
        )
    {
        require(_tenant.has(_address), "Not has property rented");
        return (
            tenant[_address].title,
            tenant[_address].description,
            tenant[_address].depositPrice,
            tenant[_address].tenant,
            tenant[_address].owner,
            tenant[_address].available
            
        );
    }
    
    function getBalanceOf(address _address) public view returns(uint)  {
      return _address.balance;        
    }

    function createProperty(
        string memory _title,
        string memory _description,
        uint256 _amount,
        uint256 _deposit
    ) public {
        Property memory property;
        RealEstateProperty storage p = properties[msg.sender];
        property.title = _title;
        property.description = _description;
        property.montlyPrice = _amount;
        property.depositPrice = _deposit;
        property.available = true;
        property.owner = msg.sender;
        property.id = p.numOfProperties++;
        p.properties.push(property);
       
       if(!_propertyOwners.has(msg.sender)) {
          p.owner = payable(msg.sender);
          numOfAddress.push(msg.sender);
         _propertyOwners.add(msg.sender);
       }
    }
}
