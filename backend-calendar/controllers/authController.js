const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "https://google-calendar-nine-blond.vercel.app/api/auth/callback"
);

const login = (req, res) => {
  const url = client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
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

  try {
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const googleId = payload.sub;
    const email = payload.email;

    let user = await User.findOne({ googleId });

    if (!user) {
      user = new User({ googleId, accessToken: tokens.access_token, email });
    } else {
      user.accessToken = tokens.access_token;
      if (tokens.refresh_token) {
        user.refreshToken = tokens.refresh_token;
      }
    }
    await user.save();

    res.redirect(
      `http://localhost:5173/dashboard?token=${tokens.access_token}`
    );


  } catch (error) {
    console.error("Authentication error:", error.response?.data || error);
    res.status(500).json({ message: "Google authentication failed", error });
  }
};

module.exports = {
  login,
  googleAuth,
};
