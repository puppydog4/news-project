const db = require("../../db/connection");
const { checkUserExists } = require("../utils/apiUtils");
exports.fetchUsers = async () => {
  const { rows } = await db.query(
    "SELECT username,name,avatar_url FROM users;"
  );
  return rows;
};

exports.fetchUserByUsername = async (username) => {
  await checkUserExists(username);
  const { rows } = await db.query(
    "SELECT username,name,avatar_url FROM users WHERE username = $1;",
    [username]
  );

  return rows[0];
};
