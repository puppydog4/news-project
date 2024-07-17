const { fetchUsers } = require("../models/users-models");

exports.getUsers = async (req, res) => {
  const users = await fetchUsers();
  res.status(200).send({ users });
};
