## Real Estate rental agreements


## About The Project

Smart Contract to automate and manage rental cashflow between property owners, property managers and tenants.

Property Owners will be able to:

- Connect to metamask wallet
- Create new properties to rents
- Receive montly payments from tenants

In future features, The property owners will be able to select a trusted third party property manager who will have the role of contract administrator to do some validations actions between the landlord and tenant agreements.


Tenants will be able to:

- Rent property 
- Check income payment
- Pay monthly rent

In future features, user will be able pay maintenance expenses invoices


## Running project 

before running the following commands make sure you are located in the project root

### Run Smart Contract for local development with Truffle Suite 

- Run yarn install in project root to install Truffle build and smart contract dependencies
- Run local testnet in port 7545 with an Ethereum client, e.g. Ganache
- truffle migrate --network development
- truffle console --network development
- Run tests in Truffle console: test
- development network id is 1337, remember to change it in Metamask as well!

### Frontend
- cd client
- yarn install
- yarn start
- Open http://localhost:3000

## Public Ethereum wallet for certification:

0x44E91B3e2a0ACe8a174104B009F88Dbe60323d0a


