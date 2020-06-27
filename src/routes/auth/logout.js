export function post(req, res) {
  req.session.destroy();
  res.status(204).end();
}
