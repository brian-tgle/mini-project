# Simple Expenses Management web app

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- This is simple Expense Management application that allow users to log and monitor expenses. Application contain frontend single page application with mobile first approach developed in ReactJS and backend REST API developed in NodeJS, ExpressJS.
- In this project I served two kinds of CURD form: one is modal for create and update, onother one is create and update form on the same page with data list.

## Feature
- Authentication
- Category management
- Expenses management
- Visualize Report

## Built with (Technology description):
- **NodeJS/MongoDB**: For server side. (Node 14+)
- **ReactJS**: For client side. (React 17.x)
- 💎 **Hooks**: Use react hooks API instead of traditional class API
- 🚀 **State of The Art Development**: Newest development stack of NodeJS/React/Hooks/React Sweet State
- **react-sweet-state** for state management
- **husky/lint-staged** for checking before commiting and pushing (check it out in ```husky``` and ```lint-staged``` section in ```package.json```)
- **stylelint** for checking style convention
- **jest** framework and runner, **react-test-renderer**, **enzyme** are test utilities
- **localForage** for improving the offline experience by using asynchronous storage

## 📦 Install

```bash
$ git clone https://github.com/brian-tgle/mini-project.git
$ cd mini-project
```
### Start server
```bash
$ cd server
$ npm install
$ npm start
```
Server live on: http://localhost:5000/

##### Sample accounts:
```user1 / 12345678a@A```
```user2 / 12345678a@A```

##### Exposed API:
Endpoint: http://localhost:5000/api

AUTH
```bash
POST: /auth/login            Login

Payload:
{
  "username": string,
  "password": string
}
```
```bash
GET: /auth/register          Register a new account

Payload:
{
  "username": string,
  "password": string,
  "fullname": string
}
```
EXPENSES
```bash
GET: /expenses                List of expenses
```
```bash
POST: /expenses               Create a new expense

Payload:
{
  "title": string,
  "category": id,
  "date": date,
  "value": number
}
```
```bash
PUT: /expenses/:expensesId     Update a expense

Payload:
{
  "title": string,
  "category": id,
  "date": date,
  "value": number
}
```
```bash
DELETE: /expenses/:expensesId  Delete a expenses
```
CATEGORY
```bash
GET: /categories                List of categories
```
```bash
POST: /categories               Create a new category

Payload:
{
  "title": string,
  "description": string
}
```
```bash
PUT: /categories/:categoryId     Update a category

Payload:
{
  "title": string,
  "description": string
}
```
```bash
DELETE: /categories/:categoryId  Delete a category
```
REPORT
```
GET: /report                Get report of last 30 days.
```

### Start client
```bash
$ npm install
$ npm start
```
Client live on: http://localhost:3000/

## 🔨 Build

```bash
npm install
npm run build
```

## 🖥 Browsers support

Modern browsers and Internet Explorer 10+.

## IDE Settings
Current setting available: auto fixing and linting code on save.
Check it out in ```.vscode/settings.json```.

## Production evironment
To server high trafic I decided to use AWS Lambda which you pay only for resources used to deal with a particular request. It all setup in server folder.
run ```npm run deploy```