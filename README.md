# Smallcase REST API

> Postman collection link  
> https://www.getpostman.com/collections/69d1e92f89dc7eaf52b3

> Heroku hosted API link  
> https://smallcase-trades.herokuapp.com/api/v1/

## APIs

- [Trade](#trade)
- [Portfolio](#portfolio)
- [Returns](#returns)

## **Trade**

### Trade object

```
{
  "type": "string",
  "ticker": "string",
  "averageBuyPrice": "number",
  "shares": "number"
}
```

## **Requests**

|               Route                |           Description            |
|:----------------------------------:|:--------------------------------:|
|     [GET /trade](#get-trades)      | Returns all trades in the system |
|   [GET /trade/:id](#get-tradeid)   |   Returns trade with given id    |
|     [POST /trade](#post-trade)     |       Creates a new trade        |
| [PATCH /trade/:id](#patch-tradeid) |     Updates data of a trade      |

## **GET /trades**

Returns all trades in the system.

- **Params**  
  None
- **Query**  
  size=[integer], page=[integer]
- **Body**  
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200
  - **Content:**

```
{
  status: 200,
  message: 'Trades returned successfully!'
  data: [
    {<trade_object>}
  ]
}
```

- **Error Response:**
  - **Code:** 404
    - **Content:** `{ 'status': 404, 'message': 'Trades not found' }`

## **GET /trade/:id**

Returns the specified trade.

- **Params**  
  _Required:_ `id=[string]`
- **Body**  
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200
  - **Content:** `{ 'status': 200, 'message': 'Trade returned successfully!', 'data': <trade_object> }`
- **Error Response:**
  - **Code:** 404
    - **Content:** `{ 'status': 400, message: 'Trade not found' }`

## **POST /trade**

Creates a new Trade.

- **Params**  
  None
- **Query**  
  None
- **Headers**  
  Content-Type: application/json
- **Body** `{ <trade_object> }`
- **Success Response:**
  - **Code:** 200
    - **Content:** `{ status: 200, data: <trade_object>, message: 'Trade added successfully' }`
- **Error Response:**
  - **Code:** 400
    - **Content:** `{ message: 'No shares available to sell', status: 400 }`

## **PATCH /trade/:id**

Updates data of a Trade.

- **Params**  
  _Required:_ `id=[string]`
- **Query**  
  None
- **Headers**  
  Content-Type: application/json
- **Body** `{ <trade_object> }`
- **Success Response:**
  - **Code:** 200
    - **Content:** `{ status: 200, data: <trade_object>, message: 'Trade added successfully' }`
- **Error Response:**
  - **Code:** 404
    - **Content:** `{ message: 'Trade not found', status: 404 }`

***

## **Portfolio**

### Portfolio object

```
{
  "ticker": "string",
  "averageBuyPrice": "number",
  "shares": "number"
}
```

## **Requests**

|              Route               |             Description              |
|:--------------------------------:|:------------------------------------:|
| [GET /portfolio](#get-portfolio) | Returns all securities in the system |

## **GET /portfolio**

Returns all securities in the system.

- **Params**  
  None
- **Query**  
  None
- **Body**  
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200
  - **Content:**

``` 
{
  status: 200,
  message: 'Securities returned successfully'
  data: [
    {<portfolio_object>}
  ]
}
```

- **Error Response:**
  - **Code:** 404
    - **Content:** `{ 'status': 404, 'message': 'Securities not found' }`

***

## **Returns**

### Returns object

```
{
  "ticker": "string",
  "averageBuyPrice": "number",
  "shares": "number"
}
```

## **Requests**

|            Route             |             Description              |
|:----------------------------:|:------------------------------------:|
| [GET /returns](#get-returns) | Get cumulative returns in the system |

## **GET /returns**

Returns in the system.

- **Params**  
  None
- **Query**  
  None
- **Body**  
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200
  - **Content:**

``` 
{
  status: 200,
  message: 'Returns returned successfully'
  data: [
    {<returns_object>}
  ]
}
```

- **Error Response:**
  - **Code:** 400
    - **Content:** `{ 'status': 400, 'message': 'No data to generate returns' }`
