"use strict";
const { register, create, get } = require("registry");

class MyError extends Error {
  constructor(msg) { super(msg); this.name = "MyError"; }
}
register("MyError", MyError);

exports.MyError = MyError;
exports.throwError = () => { throw create("MyError", "test"); };
exports.checkError = (e) => ({ match: e instanceof (get("MyError") || Object), found: !!get("MyError") });
