require("dotenv").config();

const sendToken = (user, statusCode, res) => {
  try {
    const token = user.getToken();

    const options = {
      expire: new Date(
        Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 100
      ),
      httpOnly: true,
    };
    return res.status(statusCode).cookie(`access_token`, token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendToken;