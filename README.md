# 📚 Edu - School API

This project provides APIs to **add schools** and **list schools nearby a given location** using latitude and longitude.  
It is designed for easy integration into educational platforms or mapping applications.

---
Please note that on the forst request it may take  sec to a minute because of free tier
## 🚀 Base URL
```bash 
https://edu-m3yi.onrender.com/api 
```
 📌 Endpoints

1️⃣ Add School
Method: `POST`  
URL: `/addSchool`  

```bash 
https://edu-m3yi.onrender.com/api/addSchool
```
```bash 
{
  "name": "St. Xavier's High School",
  "address": "123 Main Street",
  "latitude": 28.7041,
  "longitude": 77.1025
}
```
### GET LIST
**Method:** `GET`  
**URL:** `/listSchools`  

```bash
https://edu-m3yi.onrender.com/api/listSchools?latitude=XX.XXXX&longitude=XX.XXXX
```
example :
https://edu-m3yi.onrender.com/api/listSchools?latitude=28.7041&longitude=77.1025

Request Body Example:
```bash
{
  "name": "Example School",
  "address": "Example Road",
  "latitude": 28.7041,
  "longitude": 77.1025
}

 ```
Sample cURL:
```bash
curl -X POST "https://edu-m3yi.onrender.com/api/addSchool" \
-H "Content-Type: application/json" \
-d '{
  "name": "Example School",
  "address": "Example Road",
  "latitude": 28.7041,
  "longitude": 77.1025
}'

 ```
Success Response Example:

```bash
{
  "success": true,
  "message": "School added successfully",
  "data": {
    "_id": "64f1a2b7c8b9f4...",
    "name": "Example School",
    "address": "Example Road",
    "latitude": 28.7041,
    "longitude": 77.1025
  }
}

 ```
2️⃣ List Schools Nearby
Method: GET
URL: /listSchools

Query Parameters:
```bash 
| Parameter | Type   | Required | Description           |
| --------- | ------ | -------- | --------------------- |
| latitude  | number | ✅        | Latitude of location  |
| longitude | number | ✅        | Longitude of location |


```
Sample Request:

```bash 
curl -X GET "https://edu-m3yi.onrender.com/api/listSchools?latitude=28.7041&longitude=77.1025"

```
Success Response Example:
```bash 
{
  "success": true,
  "schools": [
    {
      "_id": "64f1a2b7c8b9f4...",
      "name": "Example School",
      "address": "Example Road",
      "latitude": 28.7041,
      "longitude": 77.1025
    }
  ]
}

```
🛠 Local Setup
Clone the Repository

```bash 
git clone https://github.com/saurabh-1907/Edu.git
cd Edu

```

Install Dependencies
```bash 
npm install

```
Environment Variables
Create a .env file in the root directory:

```bash 
PORT=5000
DATABASE_URL=your_mongodb_connection_string  //Planet Scale My Sql connection string


```

Run the Server

```bash

npm start
```
Server will run on:
```bash
http://localhost:5000

```


