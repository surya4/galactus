const blankStruct = {
  status: null,
  success: null,
  action: null,
  data: null
};


async function get(req, res, next) {
  const response = Object.assign(blankStruct, { action: 'index-get' });
  Object.assign(blankStruct, { success: true, status: 200, data: "Hello"});
  return res.status(200).send(response);
}

module.exports = {
  get
}