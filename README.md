
# FINAL Dynamic Enterprise Portal

## Backend
cd server
npm install
npm start

## Frontend
cd client
npm install
npm run dev

## MongoDB
Create server/.env

MONGO_URI=your_mongodb_url
JWT_SECRET=mysecretkey

## Register First User
POST http://localhost:5000/api/auth/register

{
"name":"Saurabh",
"email":"admin@test.com",
"password":"123456",
"role":"admin"
}
