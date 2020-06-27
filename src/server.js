import sirv from "sirv";
import express from "express";
import compression from "compression";
import * as sapper from "@sapper/server";
import session from "express-session";
import connect from "connect-sqlite3";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";
const app = express();

const SQLiteStore = connect(session);
app.use(
  session({
    store: new SQLiteStore(),
    resave: false,
    secret: "my secret",
    saveUninitialized: false,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, // 1 week
  })
);
app.use(compression({ threshold: 0 }));

app.use(sirv("static", { dev }));
app.use(express.json());
app.use(
  sapper.middleware({
    session: (req) => ({
      DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
      discord_token: req.session.discord_token,
      username: req.session.username,
    }),
  })
);

app.listen(PORT, (err) => {
  if (err) console.log("error", err);
});
