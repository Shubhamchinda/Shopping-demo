import _ from "lodash";

import { Order } from "../models/Order";

import { errorObj, successObj, secret } from "../config/settings";
import { getField } from "./_utils";

let order = {
  add: data => {
    return new Promise(async resolve => {
      let newEntity = new Order();
      _.each(data, (val, key) => {
        newEntity[key] = val;
      });
      const count = await Order.count((err, val) => {
        if (!err) {
          newEntity.num = val;
        }
      });

      newEntity.save(function(err, data) {
        if (err) {
          if (err.code === 11000) {
            return resolve({
              ...errorObj,
              message: `This ${getField(err)} is already registered.`,
              err,
              data
            });
          }
          return resolve({
            ...errorObj,
            message: "error during user registration",
            err,
            data
          });
        }
        return resolve({
          ...successObj,
          message: "Order added successfully",
          data
        });
      });
    });
  },
  getById: _id => {
    return new Promise(resolve => {
      Order.findOne({ _id })
        .populate("orders")
        .lean()
        .exec((error, doc, success) => {
          if (error || !doc) {
            console.error(error);
            error = {
              message: "Error in User Details",
              data: doc,
              success: false,
              type: "error",
              error: true
            };
            return resolve(error);
          }
          success = {
            message: "Single User",
            data: doc,
            success: true,
            type: "success",
            error: false
          };
          resolve(success);
        });
    });
  },
  update: data => {
    return new Promise(resolve => {
      Order.findByIdAndUpdate(data._id, data).exec((error, data) => {
        if (error) {
          console.error(error);
          return resolve(errorObj);
        }
        resolve({ successObj, data });
      });
    });
  },
  delete: data => {
    return new Promise(async resolve => {
      Order.deleteById(data).exec((error, doc) => {
        if (error) {
          console.error(error);

          return resolve(errorObj);
        }
        resolve(successObj);
      });
    });
  }
};

export default order;
