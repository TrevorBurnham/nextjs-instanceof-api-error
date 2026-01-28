"use strict";
const classes = new Map();
exports.register = (name, cls) => classes.set(name, cls);
exports.create = (name, msg) => {
  const Cls = classes.get(name);
  return Cls ? new Cls(msg) : Object.assign(new Error(msg), { name });
};
exports.get = (name) => classes.get(name);
