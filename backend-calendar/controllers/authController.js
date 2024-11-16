const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);

const googleAuth = async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const { sub: googleId, email } = ticket.getPayload();

    let user = await User.findOne({ googleId });
    if (!user) {
      user = new User({ googleId, accessToken: token });
      await user.save();
    }

    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ accessToken: jwtToken });
  } catch (error) {
    res.status(400).json({ message: 'Google authentication failed', error });
  }
};

module.exports = {
  googleAuth
};
