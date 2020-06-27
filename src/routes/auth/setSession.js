export function get(req, res) {
  req.session.discord_token = "poop";
  res.json({ message: "set to poop" });
}
