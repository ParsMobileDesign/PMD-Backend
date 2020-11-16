const httpError = require("../models/httpError");
const userDummyData = require("../routes/userDummyData");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");

const getUserById = (req, res, next) => {
  const uid = req.params.uid;

  const obj = userDummyData.find((e) => e.id == uid);
  if (!obj) throw new httpError("Could not find the user.", 404);
  res.status(200).json({ obj });
};

const getUsers = (req, res, next) => {
  res.json({ userDummyData });
};

const userLogin = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    throw new httpError("Invalid inputs passed", 400);
  }
  const { username, password } = req.body;
  console.log(username, password);
  var obj = userDummyData.find(
    (e) => e.username === username && e.password === password
  );
  if (!obj)
    throw new httpError(
      "username and password does not match ! try again.",
      404
    );
  res
    .status(200)
    .json({ flname: obj.FLName, message: "user has successfully logged in." });
};
const userSignUp = (req, res, next) => {
  var err = validationResult(req);
  if (!err.isEmpty)
    throw new httpError(
      "Passed inputs are invalid, Please check them and try again.",400
    );
  const { FLName, username, password } = req.body;
  var obj = userDummyData.find(
    (e) => e.username === username && e.password === password
  );
  console.log(obj);
  if (obj)
    throw new httpError(
      "this user has already been registered. Try log in ",
      404
    );
  userDummyData.push({ id: uuidv4(), FLName, username, password });
  res
    .status(201)
    .json({ message: "user has been successfully created. try log in" });
};
exports.getUserById = getUserById;
exports.getUsers = getUsers;
exports.userLogin = userLogin;
exports.userSignUp = userSignUp;
