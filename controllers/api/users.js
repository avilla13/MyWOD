// controllers/api/users.js
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const bcrypt = require('bcrypt');

module.exports = {
  create,
  login,
  checkToken
}

async function create(req, res) {
  try {
    // Add the user to the database
    const user = await User.create(req.body);
    // token will be a string
    const token = createJWT(user);
    // Yes, we can use res.json to send back just a string
    // The client code needs to take this into consideration
    res.json(token);
  } catch (err) {
    // Client will check for non-2xx status code 
    // 400 = Bad Request
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    const passwordsMatch = await bcrypt.compare(req.body.password, user.password);
    if (passwordsMatch) {
      const token = createJWT(user)
      res.json(token)
    } else {
      res.status(400).json(error);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

function checkToken(req, res) {
  // Verify middleware is doing its job
  console.log('req.user', req.user);
  res.json(req.exp);
}


/*-- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}
