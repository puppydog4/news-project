const { fetchUsers, fetchUserByUsername } = require("../models/users-models");

exports.getUsers = async (req, res) => {
  const users = await fetchUsers();
  res.status(200).send({ users });
};

exports.getUsersByUsername = async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = await fetchUserByUsername(username);
    res.status(200).send({ user });
  } catch (error) {
    next(error);
  }
};
