
# Sweat Zone - A sports facility booking web app

**Description:** 

The Sports Facility Booking System is designed to streamline the process of reserving sports facilities. Users can easily browse available facilities, check their availability, and book them without any hassle. Our goal is to provide a seamless and user-friendly experience for sports enthusiasts and facility managers alike.





## Features

- User Registration and Authentication: Secure sign-up and login for users.
- Facility Browsing:Endpoints to retrieve a list of available sports facilities with detailed information.
- Real-Time Availability: Check the availability of facilities in real-time.

- Booking Management:Create, modify, or cancel reservations through simple API calls.


## Tech Stack

**Backend:** Node.js, Express,Typescript

**Database:** MongoDB

**Authentication:** JWT (JSON Web Tokens)


## Installation

1.Clone the repository:

```bash
  https://github.com/kazisadman/sports-facility.git
```
2.Navigate to the project directory:
```bash
cd sports-facility
```
3.Install dependencies:
```bash
npm install
```
4.Set up environment variables: Create a .env file in the root directory and add the following configuration:
```bash
DATABASE_URL=your_mongodb_connection_string
PORT=port_to_run_server
ACCESS_TOKEN_SECRET=your_jwt_secret
ACCESS_TOKEN_EXPIRY=jwt_token_expiry_time
```
5.Start the server:
```bash
npm start
```
## API Reference

#### User Sign Up

```http
  POST /api/auth/signup
```

| Request Body | Type     | 
| :-------- | :------- | 
| `name` | `string` | 
|`email` |`string`|
|`password` |`string`|
|`phone` |`string`|
|`role` |`string`|
|`address` |`string`|

#### User Login

```http
  POST /api/auth/login
```

| Request Body | Type     | 
| :-------- | :------- | 
|`email` |`string`|
|`password` |`string`|

#### Create a Facility (Admin Only)

```http
  POST /api/facility
```
- Headers:
```
Authorization: Bearer JWT_TOKEN
```

| Request Body | Type     | 
| :-------- | :------- | 
|`name` |`string`|
|`description` |`string`|
|`pricePerHour` |`number`|
|`location` |`string`|

#### Delete a Facility - Soft Delete (Admin Only)

```http
 DELETE /api/facility/:id
```
- Headers:
```
Authorization: Bearer JWT_TOKEN
```

#### Update a Facility (Admin Only)

```http
 PUT /api/facility/:id
```
- Headers:
```
Authorization: Bearer JWT_TOKEN
```

| Request Body | Type     | 
| :-------- | :------- | 
|`name` |`string`|
|`description` |`string`|
|`pricePerHour` |`string`|
|`location` |`string`|

#### Get all Facilities

```http
GET /api/facility
```
- Headers:
```
Authorization: Bearer JWT_TOKEN
```
###  Check Availability

Check the availability of time slots for booking on a specific date.

*   **Route**: `GET /api/check-availability`

#### Query Parameters

*   **date** (`string`, optional): The date for which availability is to be checked. Format: `YYYY-MM-DD`. If not provided, today's date will be used by default.

#### Response

  *   **success** (`boolean`): Indicates whether the request was successful.
  *   **statusCode** (`number`): HTTP status code of the response.
  *   **message** (`string`): Descriptive message indicating the outcome of the request.
  *   **data** (`Array` of `Object`): Array containing information about available time slots.

##### Time Slot Object

  *   **startTime** (`string`): The start time of the available slot.
  *   **endTime** (`string`): The end time of the available slot.

#### Example Request

```sql
GET /api/check-availability?date=2024-06-15
```
#### Create a Booking (User Only)

```http
  POST /api/bookings
```
- Headers:
```
Authorization: Bearer JWT_TOKEN
```

| Request Body | Type     | 
| :-------- | :------- | 
|`facility` |`string`|
|`date` |`string`|
|`startTime` |`string`|
|`endTime` |`string`|

#### View All Bookings (Admin Only)

```http
GET /api/bookings
```
- Headers:
```
Authorization: Bearer JWT_TOKEN
```

#### View Bookings by User (User Only)

```http
GET /api/bookings/user
```
- Headers:
```
Authorization: Bearer JWT_TOKEN
```
#### Cancel a Booking (User Only)

```http
DELETE /api/bookings/:id
```
- Headers:
```
Authorization: Bearer JWT_TOKEN
```

#### Payable Amount Calculation:

```
payableAmount = (endTime - startTime) * pricePerHour
```

