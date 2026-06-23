const loginController = async (req, res) => {
  try {
  } catch (err) {
    console.log("Error in loginController:", err.message || err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

module.exports = loginController;
