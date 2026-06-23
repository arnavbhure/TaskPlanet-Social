const signupController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
  } catch (err) {
    console.log("Error in signupController:", err.message || err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

module.exports = signupController;
