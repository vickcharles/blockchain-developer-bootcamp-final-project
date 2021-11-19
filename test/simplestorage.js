const RentProperty = artifacts.require("../RentProperty.sol");

contract("RentProperty", (accounts) => {
  it("...should create a new lessor with 2 properties.", async () => {
    const simpleStorageInstance = await RentProperty.deployed();

    await simpleStorageInstance.createProperty(
      "foo title",
      "foo description",
      200,
      200
    );

    await simpleStorageInstance.createProperty(
      "foo title",
      "foo description",
      200,
      200
    );

    const numOfPropertiesExpected = 2;
    const numOfLessorExpected = 1;

    const lessors = await simpleStorageInstance.getLessors.call();

    assert.equal(
      lessors.length,
      numOfLessorExpected,
      "The value 1 was not stored."
    );
    assert.equal(
      lessors[0].properties.length,
      numOfPropertiesExpected,
      "The value 2 was not stored."
    );
  });

  it("...should create multiple lessors", async () => {
    const simpleStorageInstance = await RentProperty.deployed();

    await simpleStorageInstance.createProperty(
      "foo title",
      "foo description",
      200,
      200
    );

    await simpleStorageInstance.createProperty(
      "foo title",
      "foo description",
      200,
      200,
      { from: accounts[1] }
    );

    const numOfLessorExpected = 2;

    const lessors = await simpleStorageInstance.getLessors.call();

    assert.equal(
      lessors.length,
      numOfLessorExpected,
      "The value 89 was not stored."
    );
  });

  it("...should create property correcly ", async () => {
    const simpleStorageInstance = await RentProperty.deployed();

    await simpleStorageInstance.createProperty(
      "foo title",
      "foo description",
      200,
      200
    );

    const lessors = await simpleStorageInstance.getLessors.call();
    const {
      title,
      description,
      montlyPrice,
      depositPrice,
      lessor,
      tenant,
      available,
    } = lessors[0].properties[0];

    assert.equal(title, "foo title", "title was no stored correcly.");
    assert.equal(
      description,
      "foo description",
      "description was no stored correcly."
    );
    assert.equal(montlyPrice, "200", "montlyPrice was no stored correcly.");
    assert.equal(depositPrice, "200", "depositPrice was no stored correcly.");
    assert.equal(
      tenant,
      "0x0000000000000000000000000000000000000000",
      "tenant was no stored correcly."
    );

    assert.equal(available, true, "available was no stored correcly.");
    assert.equal(lessor, accounts[0], "tenant was no stored correcly.");
  });

  it("...should rent property correcly", async () => {
    const simpleStorageInstance = await RentProperty.deployed();

    await simpleStorageInstance.createProperty(
      "foo title",
      "foo description",
      200,
      200,
      { from: accounts[0] }
    );
    // value should be the sum of depositPrice and montlyPrice
    await simpleStorageInstance.rentProperty(accounts[0], 0, {
      value: 400,
      from: accounts[1],
    });
    const lessors = await simpleStorageInstance.getLessors.call();
    const { depositAmount, tenant, available } = lessors[0].properties[0];
    assert.equal(tenant, accounts[1], "tenant was no stored correcly.");
    assert.equal(available, false, "tenant was no stored correcly.");
    assert.equal(depositAmount, "200", "tenant was no stored correcly.");
  });

  it("...should get lessor correctly", async () => {
    const simpleStorageInstance = await RentProperty.deployed();

    await simpleStorageInstance.createProperty(
      "foo title",
      "foo description",
      200,
      200
    );

    const lessors = await simpleStorageInstance.getLessors.call();
    assert.equal(lessors.length, 2, "lessors was no stored correcly.");
  });
});
