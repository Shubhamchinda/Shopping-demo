const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session =  require("express-session");
const passport =  require("passport");


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
}));

mongoose.set("debug", true);

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});


const usersRouter = require('./routes/users');

app.use('/user', usersRouter);



app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
