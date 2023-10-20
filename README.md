# UNTITLED BACKEND

This is the backend for Untitled Project. This project reimagines the employee onboarding and offboarding experiences, leveraging technology, automation, and streamlined procedures to make the transition as seamless and efficient as possible. The solution aims to significantly improve the HR processes for welcoming new employees and managing the exit of departing employees.

## Technologies

This API was developed with the following technologies:

- NodeJS
- NestJS

## Getting Started

Pre-requisites

- Node(LTS version)
- NPM v9.0.0 or higher
- MongoDB

You can get the latest version of NodeJS from [here](https://nodejs.org/en/download/) or you can check the version you have installed on your machine by running the following command in your terminal

```bash
  node -v
```

You can get the latest version of NPM from [here](https://www.npmjs.com/get-npm) or you can check the version you have installed on your machine by running the following command in your terminal

```bash
  npm -v
```

## Installation

Clone the project

```bash
  git clone git@github.com:codename-untitled/untitled-backend.git
```

Go to the project directory

```bash
  cd untitled-backend
```

Install dependencies

```bash
  npm install
```

Run the code

```bash
  npm run dev
```

## Entity Relationship Diagram

## Authentication

This API uses JWT for authentication. To get a token, you need to register and login. The token is valid for 24 hours. You can use the token to access protected routes. To access authenticated routes, set your authorization header to Bearer [ token ]. Read postman documentation for further details

## Postman Documentation

## Live Link

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

- PORT=your port number
- MONGO_URI=your mongodb uri
- JWT_SECRET=your jwt secret

## API Reference

| Method | Description       | Endpoints          |
| :----- | :---------------- | :----------------- |
| POST   | Login a user      | /api/auth/login    |
| POST   | Register a user   | /api/auth/register |
| GET    | Get all users     | /api/users         |
| GET    | Get a single user | /api/users/:id     |
| POST   | Create a user     | /api/users         |

## Authors

- [@vicodevv](https://www.github.com/vicodevv)
- [@MrOrero](https://github.com/MrOrero)

## License

[MIT](https://choosealicense.com/licenses/mit/)
