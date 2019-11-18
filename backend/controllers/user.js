import _ from "lodash";
import Bcrypt from "../config/encrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";


import { errorObj, successObj, secret } from "../config/settings";
import { getField } from './_utils';

let user = {
    add: (data)=> {
        return new Promise((resolve) => {
            console.log(data,"asda")
            data.password = Bcrypt.encryptPassword(data.password);
            let newEntity = new User();
            _.each(data, (val, key) => {
                newEntity[key] = val;
            });

            newEntity.save(function (err, data) {
                if (err) {
                    if (err.code === 11000) {
                        return resolve({
                            ...errorObj,
                            message: `This ${getField(err)} is already registered.`,
                            err,
                            data
                        });
                    }
                    return resolve({ ...errorObj, message: "error during user registration", err, data });
                }
                return resolve({ ...successObj, message: "user added successfully", data });

            });
        });
    },
    userById: (_id) => {
        return new Promise((resolve) => {
            User.findOne({ _id })
                .populate('BranchId')
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
    delete: (data) => {
        return new Promise(async (resolve) => {
            User.remove({ _id: { $in: data } })
                .exec((error, doc, success) => {
                    if (error || !doc.n) {
                        console.error(error);
                        error = {
                            message: "Error in delete User Details",
                            data: doc,
                            success: false,
                            type: "error",
                            error: true
                        };
                        return resolve(error);
                    }
                    success = {
                        message: "User deleted successfully",
                        data: doc,
                        success: true,
                        type: "success",
                        error: false
                    };
                    resolve(success);
                });

        });
    },
    generateToken: (user) => {
        return new Promise((resolve) => {
            let x = jwt.sign({
                _id: user._id,
                mobile: user.mobile,
                name: user.name,
            },
                secret,
                {
                    expiresIn: "90d",
                });
            resolve({ ...successObj, message: "successful", data: { x } });
        });
    },
    login: (data) => (new Promise((resolve) => {
        const { email, password } = data;
        const error = "wrong email or password";

        User.findOne({ email })
            .populate('branchId')
            .exec(function (err, user) {
               if (!user) {
                    return resolve({ message: error, ...errorObj, data: user });
                }
                if (!Bcrypt.compaerPassword(password, user.password)) {
                    return resolve({ ...errorObj, message: error });
                }

                const JWTToken = jwt.sign(
                    {
                        _id: user._id,
                        email: user.email,
                    },
                    secret,
                    {
                        expiresIn: "24h",
                    });

                return resolve({
                    ...successObj,
                    token: JWTToken,
                    user: {
                        _id: user._id,
                        email: user.email,
                    },
                });

            });

    }))

};

export default user;
