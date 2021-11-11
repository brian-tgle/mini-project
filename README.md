# Simple Expenses Management web app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Demo

## Feature
- Authentication
- Expenses management
- Category management
- Visualize Report

## Built with:
- **NodeJS/MongoDB**: For server side. (Node 10+)
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

Dummy accounts: 

##### Sample account:
```user1 / 12345678a@A```

##### Exposed API:
AUTH
```bash
POST: /auth/login            Login
```
```bash
GET: /auth/register          Register a new account
```
EXPENSES
```bash
GET: /expenses                List of expenses
```
```bash
POST: /expenses               Create a new expense
```
```bash
PUT: /expenses/:expensesId     Update a expense
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
```
```bash
PUT: /categories/:expensesId     Update a category
```
```bash
DELETE: /categories/:expensesId  Delete a category
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
