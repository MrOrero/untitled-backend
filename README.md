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

- MONGO_URI= (your mongo uri)
- JWT_SECRET= (your jwt secret)
- FIREBASE_API_KEY= (your firebase api key)
- FIREBASE_AUTH_DOMAIN= (your firebase auth domain)
- FIREBASE_PROJECT_ID= (your firebase project id)
- FIREBASE_STORAGE_BUCKET= (your firebase storage bucket)
- FIREBASE_MESSAGING_SENDER_ID= (your firebase messaging sender id)
- FIREBASE_APP_ID= (your firebase app id)
- FIREBASE_MEASUREMENT_ID= (your firebase measurement id)

## API Reference

| Method | Description                    | Endpoints                   |
| :----- | :----------------------------- | :-------------------------- |
| POST   | Register a company             | /companies/register         |
| POST   | Login a company                | /companies/login            |
| GET    | Get all companies              | /companies/all              |
| GET    | Get a single company           | /companies/:id              |
| POST   | Create an employee             | /employees/create           |
| POST   | Login an employee              | /employees/login            |
| GET    | Get all employees              | /employees/all              |
| GET    | Get all companies in a company | /employees/all/:companyId   |
| GET    | Get a single employee          | /employees/:id              |
| PUT    | Edit an employee               | /employees/:id              |
| DELETE | Delete an employee             | /employees/:id              |
| POST   | Create an Onboarding workflow  | /onboarding-workflow        |
| GET    | Get all Onboarding workflows   | /onboarding-workflow/all    |
| GET    | Get a single Onboarding        | /onboarding-workflow/:id    |
| POST   | Assign a workflow              | /onboarding-workflow/assign |

## Authors

- [@vicodevv](https://www.github.com/vicodevv)
- [@MrOrero](https://github.com/MrOrero)

## License

[MIT](https://choosealicense.com/licenses/mit/)
