// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

library Roles {
    struct Role {
        mapping(address => bool) bearer;
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
        uint256 id;
        string title;
        string description;
        uint256 montlyPrice;
        uint256 deposit;
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
    function rentProperty(address propertyOwner, uint256 propertyId)
        public
        payable
    {
        RealEstateProperty storage property = properties[propertyOwner];
        uint256 montlyPrice = property.properties[propertyId].montlyPrice;
        uint256 depositPrice = property.properties[propertyId].deposit;
        uint256 sum = msg.value;
        uint256 deposit = sum - montlyPrice;
        uint256 toPay = sum - deposit;
        uint256 toCheck = montlyPrice + depositPrice;
        require(toCheck == msg.value, "You don't have enough ether");
        require(
            property.properties[propertyId].available == true,
            "This property is not available for rent"
        );
        property.properties[propertyId].tenant = payable(msg.sender);
        property.properties[propertyId].available = false;
        tenant[msg.sender] = property.properties[propertyId];
        property.owner.transfer(toPay);
        _tenant.add(msg.sender);
    }

    /**
     * @dev get single property by address
     */
    function getProperty(address _address)
        public
        view
        returns (
            string memory,
            string memory,
            uint256
        )
    {
        return (
            properties[_address].properties[0].title,
            properties[_address].properties[0].description,
            properties[_address].properties[0].deposit
        );
    }

    // Create a property - only property owners
    function createProperty(
        string memory _title,
        string memory _description,
        uint256 _amount,
        uint256 _deposit
    ) public isPropertyOwner {
        Property memory property;
        RealEstateProperty storage p = properties[msg.sender];
        property.title = _title;
        property.description = _description;
        property.montlyPrice = _amount;
        property.deposit = _deposit;
        property.available = true;
        property.owner = msg.sender;
        property.id = p.numOfProperties++;
        p.properties.push(property);
    }

    // Owners create a real state property
    function createRealEstateProperty() public hasProperty {
        RealEstateProperty storage c = properties[msg.sender];
        c.owner = payable(msg.sender);
        numOfAddress.push(msg.sender);
        _propertyOwners.add(msg.sender);
    }
}
