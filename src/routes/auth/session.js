export function get(req, res) {
  console.log(req.session);
  res.json(req.session);
}
