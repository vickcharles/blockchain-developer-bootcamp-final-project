// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

contract RealEstatePropertyFactory {
    mapping(address => RealEstateProperty) public properties;
    address[] public numOfAddress;

    struct RealEstateProperty {
        address owner;
        uint256 numOfProperties;
        Property[] properties;
    }

    struct Property {
        string title;
        string description;
        uint256 montlyPrice;
        uint256 deposit;
    }

    // get all Property for rental
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

    modifier hasAProperty() {
        require(
            findPropertyOwner(msg.sender) == false,
            "address already exits"
        );
        _;
    }

    function findPropertyOwner(address _address)
        public
        view
        returns (bool isFounded)
    {
        isFounded = false;
        for (uint256 i = 0; i < numOfAddress.length; i++) {
            if (numOfAddress[i] == _address) {
                isFounded = true;
            }
        }
    }

    modifier isOwner(address _address) {
        RealEstateProperty memory p = properties[_address];
        require(msg.sender == p.owner, "Not owner");
        _;
    }

    // create a property - only property owners
    function createProperty(
        address _address,
        string memory _title,
        string memory _description,
        uint256 _amount,
        uint256 _deposit
    ) public isOwner(_address) {
        Property memory property;
        property.title = _title;
        property.description = _description;
        property.montlyPrice = _amount;
        property.deposit = _deposit;
        RealEstateProperty storage p = properties[_address];
        p.properties.push(property);
    }

    // Owners create a real state property
    function createRealEstateProperty() public hasAProperty {
        RealEstateProperty storage c = properties[msg.sender];
        c.owner = msg.sender;
        numOfAddress.push(msg.sender);
    }
}
