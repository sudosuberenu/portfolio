# Alchemy api-rest service
This project exposes 4 different endpoints to read data from Ethereum Blockchain via an Alchemy node.

One of the endpoint starts a job that is subscribed to an Infure websocket and store the lastest minted block data in a local mysql database.

<br></br>
## How to deploy in local machine

1. Copy the ".env.example" file and name it as ".env"

2. Fill the ".env" file with the proper values

3. Up the database by running

`docker run --name assessment-mysql -v $PWD/db:/docker-entrypoint-initdb.d -e MYSQL_ROOT_PASSWORD=1234 -p 3306:3306 mysql:8.0`

3. Install the dependencies

`npm install`

4. Start the prisma client

`prisma generate`

5. Up nodejs application by running

`npm start`

<br></br>
## How to run all tests in local machine

Run the application following the instruction in "How to deploy in local machine" section

In the root folder run:

`npm run test`

Note: This script launches all the tests (ut, integration, and e2e). TODO! Slipt the different tests in 3 differentes scripts.

<br></br>
## Endpoints Usage

*Note: Make sure to add the header 'x-api-key' with the proper value in all requests. This value should be set in the .env file.

- GET http://localhost:3000/api/v1/job/synchronize

Starts the job that uses the Infure ws connection to get the lastest minted block data and store it in the local MySQL

If everything is good, it returns 
`{
    "message": "Synchronization started"
}`

- GET http://localhost:3000/api/v1/address/:address/balance

Returns the balance of an address.

If everything is good, it returns

`{
    "message": "success",
    "data": {
        "DAIbalance": "0"
    }
}`

- GET http://localhost:3000/api/v1/tx/DAI

Returns the last minted 100 DAI txs.

If everything is good, it returns

`{
    "message": "success",
    "data": {
        "txs": [
            {
                "blockNum": "0x883da2",
                "uniqueId": ...
            }
        ],
        "previousPageUrl": "/api/v1/tx/DAI/?offset=100&page=15b5a859-868d-4fa8-89a8-8422873357c6"
    }
}`

Pagination is an option. Examples:
http://localhost:3000/api/v1/tx/DAI?offset=100&page=15b5a859-868d-4fa8-89a8-8422873357c6

Where *offset* is the number of txs and *page* the current page. The api returns in the response a field `"previousPageUrl": "/api/v1/tx/DAI/?offset=100&page=15b5a859-868d-4fa8-89a8-8422873357c6"` with a link ready to paginate to the previous page.

- GET http://localhost:3000/api/v1/tx?[to|from]=address

Returns the txs by sender or recipient.

If everything is good, it returns

`
{
    "message": "success",
    "data": {
        "txs": [
            {
                "blockNum": "0x563786",
              ...
            }
        ]
    }
}
`

# Technologies
- Docker: Used to run a MySQL database.
- MySQL: Used as database because its your stack, is fast, flexible and is easy to setup.
- Express: Used as a main framework for this application server. 
- Jest: Used as the main testing framework.
- Winston: Used as the Logger. 
- Helmet: Used as middleware to improve the security for http calls.
- Prisma: Used as a ORM. Ive been reading good stuff about it, and i thought it was a good oportunity to use it.
- Alchemy SDK: Used to request data from Alchemy. Its an easy/fast/reliability way to connect to the blockchain and get the lastest data. Another advantage is the Alchemy's Subscription API, that allows you to subscribe to events and receive updates as they occur.