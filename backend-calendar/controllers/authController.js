const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `https://google-calendar-nine-blond.vercel.app/api/auth/callback`
);

const login = (req, res) => {
  const url = client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/calendar",
    ],
  });
  res.redirect(url);
};
const googleAuth = async (req, res) => {
  const { code } = req.query;
  const { token } = await client.getToken(code);
  console.log(code,token)
  client.setCredentials(token);
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const googleId = payload.sub;
    const email = payload.email;

    let user = await User.findOne({ googleId });
    if (!user) {
      user = new User({ googleId, accessToken: token ,email});
      await user.save();
    }

    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ accessToken: jwtToken });
  } catch (error) {
    res.status(400).json({ message: "Google authentication failed", error });
  }
};

module.exports = {
  googleAuth,
  login,
};
