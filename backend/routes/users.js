const express = require("express");
const errorObj =  require("../config/settings").errorObj;
import userCtrl from "../controllers/user";

const app = express.Router();

const console = require("tracer").console();


app
    .route("/")
    .post(async (req, res) => {
        let {body} = req;
        console.log(body,'body')
        let response = await userCtrl.add(body);
        res.json(response);
    })

app
    .route("/login")
    .post(async (req, res) => {
    const { body } = req;
    const response = await userCtrl.login(body);

    res.json(response);
    // res.render('login.ejs')
    });

app
  .route("/user/:_id")
  .get(async (req, res) => {
    const {
      params: { _id }
    } = req;
    const response = await userCtrl.userById(_id);

    return res.json({ ...response });
  })
  .delete(async (req, res) => {
    const {
      params: { _id }
    } = req;
    if (!_id) {
      res.json({ ...errorObj, message: "Expected  _id." });
    }
    let response = await userCtrl.delete(_id);
    res.json(response);
  });

module.exports =  app;
