# SQL, EXPRESS, TYPESCRIPT ran Database

Endpoints built with Express and TypeScript for managing news articles with user authentication, where data is stored and retrieved from within SQL database

## Motivation

This was an University task, where I could choose between:
Option 1: An Express.js API backend with authentication and database integration.
Option 2: A frontend application using Supabase for the backend services.

The reason for choosing option 1 was that it offered an extremely superior learning path.
Supabase is build on knowledge from task 1, understanding what supabase does behind curtains is the main drive for choosing to build a non front end REST API. I have learned how to create responses for endpoints, build SQL tables and use them with validations. This gave me true coding insight into what it means to build back-end code and how we use it in front-end. Now I am more confident than ever in my knowledge of how the Browsers work.

## Technology Stack

- **Express.js** with TypeScript
- **MySQL** database with mysql2
- **JWT** authentication with bcrypt password hashing
- **Zod** for validation
- **Swagger** for API documentation

## Security Features

- **Password Hashing**
- **JWT Tokens**
- **SQL Injection Prevention**
- **Input Validation**
- **Authentication Middleware**

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/Nikita-stud/development-platforms-ca
   cd development-platforms-ca
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:

   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=blog
   PORT=3000
   NODE_ENV=development
   JWT_SECRET=your_secure_jwt_secret_key_here
   ```

4. **Set up the database**

   Make sure your MySQL database tables are created with the proper schema.

## Development

- TypeScript compilation: `npm run build`
- Development server: `npm run dev`
- Production server: `npm start`

### Register a new user

```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

#### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

#### Get all articles (Public)

```http
GET /articles?page=1&limit=10
```

#### Create a new article (Protected)

```http
POST /articles
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "title": "My Article Title",
  "body": "This is the content of my article...",
  "category": "Technology"
}
```

## API Documentation

Once the server is running, visit:

```
http://localhost:3000/api-docs
```

This provides interactive Swagger documentation for one endpoint.

## Contact

You can always contact me though email or my phone number.

nikita151998de@gmail.com
<br>
+4745588474
