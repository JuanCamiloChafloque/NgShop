const sendToken = (user, statusCode, res) => {
  //Create JWT Token
  const token = user.getJwtToken();

  //Options for cookies
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: false,
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, user: user, token: token });
};

module.exports = sendToken;
