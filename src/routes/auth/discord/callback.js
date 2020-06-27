import DiscordApi from "../../../utils/DiscordApi";
import { discordServerId } from "../../../constants";

export async function post(req, res, next) {
  // expects a body with access_token and token_type, state, clientNonce
  // obviously, state and clientNonce can be faked by bad actor to be the same
  // but what's important is protecting the client from a fake attack I think
  // so we can tell them if something fishy happened...
  const { access_token, token_type, state, clientNonce } = req.body;
  console.log(req.body);
  if (
    state === undefined ||
    clientNonce === undefined ||
    state !== clientNonce
  ) {
    return res.status(400).json({
      message:
        "Something happened to your login through Discord. Try again and make sure you're on a stable (and secure!) network.",
    });
  }

  if (access_token === undefined || token_type === undefined) {
    return res.status(400).json({
      message:
        "Something happened to your login through Discord. Try again and make sure you're on a stable (and secure!) network.",
    });
  }

  try {
    const api = new DiscordApi({
      access_token,
      token_type,
    });

    const [user, guilds] = await Promise.all([api.getUser(), api.getGuilds()]);
    const isInFumoServer = await api.isInGuild(discordServerId);
    if (!isInFumoServer) {
      return res.json({
        username: user.username,
        isInFumoServer,
        html: `<h3>Welcome ${user.username},</h3> <h4>it doesn't seem like you're in the Fumo server. You won't be able to place pins or do much, just a heads up...</h4><h4>Redirecting you to <a href='/'>main page</a>...</h4>`,
      });
    }

    // we know the token is good, so let's save it for now
    req.session.discord_token = access_token;
    req.session.username = user.username;
    res.json({
      username: user.username,
      isInFumoServer,
      html: `<h3>Welcome ${user.username},</h3><h4>Redirecting you to <a href='/'>main page</a>...</h4>`,
    });

    console.log(req.session);
  } catch (err) {
    res.status(401).json({
      message:
        "It seems like something happened and your credentials aren't authorized",
    });
  }
}
