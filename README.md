# example-secure-messenger
A code test to build a super simple "secure" messenger

## Golang Backend
The golang backend boots up a Rest api built on the Gin Framework, which communicates with a RabbitMQ server and a Mysql server.
We use Mysql to store public keys from users, and register users, while we use the RabbitMQ to create
a Queue where the client can subscribe and recieve any messages instantaneously instead of polling the backend.


### REST API

#### POST /user
Details: adds user to database along with their publickey as well as creates a queue for them to recieve msgs from
send a raw json in the following format

json: { "username": examples, "public_key": "pubkey data"}

#### GET /Users
Details: Retrieves all users in a json format

#### POST /Message
Details: Sends a message to the users rabbit MQ queue for their consumption

Send data in Raw JSON Format
json: {"sender":"the senders username", recipient:"the recipients username", "message": "the rsa encrypted msg"}

## Simple Frontend
The front end is a simple javascript/html website designed
 to plug into the backend and connect to rabbit mq for recieving msgs


# How to Execute Code:

Everything is containerized so all you simply have to do is download this git project locally then run:

`docker-compose build`
`docker-compose up`

then visit localhost:80 in a browser.
 
### FRONT END

once code is up and running please visit localhost:8080, in your browser and you should have access to the secure messenger app

### RABBIT MQ
you can see whats gooing on with rabbit mq by visiting localhost:15672, password and username guest

## Known Issues
- Sometimes test_db doesnt load properly when creating the docker container and you need to go to adminer which is localhost:8082, login there and create test_db
- Displaying the recieved messages isn't working right now.
