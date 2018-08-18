# Back end API for Portland area happy hour application developed by the Thinkful community


## Installation
1. From the terminal: Run npm install
2. From the terminal: run ``node server``
3. In a browser, go to http://localhost:8080/

## Seed-db
run node seed-db.js to refresh database with what is in seed-data.json.

## Endpoints

### GET/bars
### GET/bars/:id

- **Response**

``` 
[
    {
        "id": "5b7755a6200e6a03750db70a",
        "name": "Sapphire Hotel",
        "address": "5008 SE Hawthorne Blvd, Portland, OR 97215",
        "hours": "Daily 4-6 pm, Sunday-Thursday 10pm-close",
        "description": "$2 Pabst, $4 wells, $5 wine, $6 cocktails, $3-7 menu"
    },
    ...
```

### POST/bars

- **Request**

```
{
	"name": "testBar",
	"address": "123 Main st",
	"hours": "Mon- Fri 4-6pm",
	"description": "$1 off dranks"
}
```

- **Response**

```
{
    "id": "5b775791be961107269f2fa8",
    "name": "testBar",
    "address": "123 Main st",
    "hours": "Mon- Fri 4-6pm",
    "description": "$1 off dranks"
}
```

### PUT/bars/:id

1 or all fields can be updated, example:

- **Request**

```
{
	"name": "testBarUpdated",
	"description": "this changed"
}
```

- **Response**

```
{
    "id": "5b775791be961107269f2fa8",
    "name": "testBarUpdated",
    "address": "123 Main st",
    "hours": "Mon- Fri 4-6pm",
    "description": "this changed"
}
```

### DELETE/bars/:id

- **Response**

```
204 No Content
```






