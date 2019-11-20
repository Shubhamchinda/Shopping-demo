 Task 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## npm install
    Install npm modules to root folder

## backend npm modules
    cd to backend and then run `npm install` / `yarn` to install dependencies


## npm run dev
    To start both backend and frontend server

## npm start

    To run only backend, navigate to `./backend` and run `npm start`

    to run only frontend, run `npm start` in root folder

## MongoDB connection

    Please add your url to `.env` file (optional)

## Approach
This project is bootstrapped with Create react-app.
* After that for backend I set up node/ express server on a different port.
* For login authentication I used passport.js
* After that I created a node MVC model
* Controllers folder have all the methods for respective model
* Models have a database structure.
* For deleting I used soft-delete
* Routes folder have all the api related to the project
# Modules used Backend
* cors
* express-session
* express
* mongoose
* passport
* lodash
* mongoose-delete

## Frontend Structure

I used class based and functional based components in frontend. 
I used Hooks as well.

**Pages**

* SignIn/SignUp
* Orders

After Login the entire app is one page app.

I created as many different components as possible in order to make the code understandable and can be debugged easily.

# Component List

* Sign In
* Sign Up
* Main
* Navbar
* Toast Notification Alert
* Orders
* TableBody
* NewOrder Form
* Pop-up Modal





