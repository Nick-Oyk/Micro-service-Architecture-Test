# Micro-service architecture test

## 
This application was built using docker, consisting of 3 Nestjs containers, 1 postgres container, and 1 mongodb container.

## Prerequisite

Docker and docker compose must be installed on your machine in order to run the program.

## Getting Started

Clone the repository or unzip the source file into your desired folder.


navigate into the source folder.

issue the command below to start the app.

```
docker-compose up
```

issue the command below to stop the app.

```
docker-compose down
```

## Available endpoints

### Create Order
Method: POST
```
http://localhost:3000/api/order/create
```

### Cancel Order
Method: PATCH
```
http://localhost:3000/api/order/cancel/:id
```

### Get All Order Status
Method: GET
```
http://localhost:3000/api/order/status/all or http://localhost:3000/api/order/status/all?take=1&skip=0
```

### Get An Order Status
Method: GET
```
http://localhost:3000/api/order/status/:id
```

### Get All Payment Status
Method: GET
```
http://localhost:3000/api/payment/status/all
```

### Get A Payment Status
Method: GET
```
http://localhost:3000/api/payment/status/:id
```



