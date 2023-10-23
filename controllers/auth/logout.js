// @desc Logout
// @route GET /api/v1/auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
  const { cookies } = req;

  if (!cookies?.jwt && !cookies?.access) return res.sendStatus(204); //No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.clearCookie("access", { httpOnly: true, sameSite: "None", secure: true });
  return res.json({ message: "Cookie cleared" });
};

export default logout;
