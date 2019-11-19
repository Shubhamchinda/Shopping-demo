const express = require("express");
const errorObj = require("../config/settings").errorObj;
import userCtrl from "../controllers/user";
import orderCtrl from "../controllers/order";

const app = express.Router();

const console = require("tracer").console();

app.route("/").post(async (req, res) => {
  let { body } = req;
  console.log(body, "body");
  let response = await userCtrl.add(body);
  res.json(response);
});

app.route("/login").post(async (req, res) => {
  const { body } = req;
  const response = await userCtrl.login(body);

  res.json(response);
  // res.render('login.ejs')
});

// app.route("/order")

app
  .route("/user/:_id")
  .post(async (req, res) => {
    let { body } = req;
    let response = await orderCtrl.add(body);
    const { _id } = req.params
    if(!response.error){
      let updateUser = await userCtrl.update({_id : _id, order : response.data._id})
    }
    res.json(response);
  })
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
    console.log(req.params,"PAPAPA")
    if (!_id) {
      res.json({ ...errorObj, message: "Expected  _id." });
    }
    let response = await orderCtrl.delete(_id);
    res.json(response);
  })
  .put(async (req, res)=>{
    let { body } = req;
    console.log(body,"EDIT")
    let response = await orderCtrl.update(body);
    res.json(response);
  })

module.exports = app;
