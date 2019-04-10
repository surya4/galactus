const usersModel = require('../models/user');

const blankStruct = {
  status: null,
  success: null,
  message: null,
  action: null,
  data: null
};


createUser = async (req, res, next) => {
  const response = Object.assign(blankStruct, { action: 'createUser' });
  let userData;
  let responseData;

  if (!req.body.name || !req.body.email || !req.body.gender) {
    Object.assign(blankStruct, { success: false, message: "paramsMissing", status: 520});
    return res.status(520).send(response);
  }

  const userObj = {
    name : req.body.name,
    email : req.body.email,
    gender : req.body.gender
  }
  
  try {
    userData = await usersModel.create(userObj)
  } catch (error) {
    console.log('error', error);
    Object.assign(blankStruct, { success: false, message: "serverError", status: 520});
    return res.status(520).send(response);
  }

  responseData = {
    id: userData._id,
    name: userData.name,
    email: userData.email,
    gender: userData.gender,
  }

  Object.assign(blankStruct, { success: true, message: "success", status: 200, data: responseData});
  return res.status(200).send(response);
}

getUser = async (req, res, next) => {
  const response = Object.assign(blankStruct, { action: 'getUser' });
  let userData;
  let responseData;

  if (!req.params.id) {
    Object.assign(blankStruct, { success: false, message: "paramsMissing", status: 520});
    return res.status(520).send(response);
  }

  try {
    userData = await usersModel.find({_id: req.params.id}, {__v: 0})
  } catch (error) {
    console.log('error', error);
    Object.assign(blankStruct, { success: false, message: "serverError", status: 520});
    return res.status(520).send(response);
  }

  console.log("userData", userData)

  if (userData && userData.length) {
    responseData = {
      id: userData[0]._id,
      name: userData[0].name,
      email: userData[0].email,
      gender: userData[0].gender,
    }
  }

  Object.assign(blankStruct, { success: true, message: "success", status: 200, data: responseData});
  return res.status(200).send(response);
}

updateUser = async (req, res, next) => {
  const response = Object.assign(blankStruct, { action: 'updateUser' });
  let userData;
  let responseData;

  if (!req.params.id) {
    Object.assign(blankStruct, { success: false, message: "paramsMissing", status: 520});
    return res.status(520).send(response);
  }

  const userObj = {}

  if (req.body.name) {
    userObj.name = req.body.name;
  }

  if (req.body.email) {
    userObj.email = req.body.email;
  }

  if (req.body.gender) {
    userObj.gender = req.body.gender;
  }

  const query = { _id: req.params.id, 'flags.deleted': false };

  try {
    userData = await usersModel.findByIdAndUpdate(query, userObj, {upsert: true})
  } catch (error) {
    console.log('error', error);
    Object.assign(blankStruct, { success: false, message: "serverError", status: 520});
    return res.status(520).send(response);
  }

  responseData = {
    id: userData._id,
    name: userData.name,
    email: userData.email,
    gender: userData.gender,
  }

  Object.assign(blankStruct, { success: true, message: "success", status: 200, data: responseData});
  return res.status(200).send(response);
}

deleteUser = async (req, res, next) => {
  const response = Object.assign(blankStruct, { action: 'user-deleteUser' });

  if (!req.params.id) {
    Object.assign(blankStruct, { success: false, message: "paramsMissing", status: 520});
    return res.status(520).send(response);
  }

  const query = { _id: req.params.id, 'flags.deleted': false };
  const updateObj = { 'flags.deleted': true };

  try {
    userData = await usersModel.findOneAndUpdate(query, updateObj)
  } catch (error) {
    console.log('error', error);
    Object.assign(blankStruct, { success: false, message: "serverError", status: 520});
    return res.status(520).send(response);
  }

  Object.assign(blankStruct, { success: true, message: "success", status: 200});
  return res.status(200).send(response);
}

module.exports = {
  createUser, getUser, updateUser, deleteUser
}