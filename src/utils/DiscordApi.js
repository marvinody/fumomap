import axios from "axios";

export default class DiscordAPI {
  constructor({ access_token, token_type }) {
    this.api = axios.create({
      baseURL: "https://discord.com/api/v6",
      headers: {
        Authorization: `${token_type} ${access_token}`,
      },
    });
    this.user = null;
    this.guilds = null;
  }

  async getUser() {
    if (this.user) {
      return this.user;
    }
    const { data: user } = await this.api.get("/users/@me");
    this.user = user;
    return user;
  }
  async getGuilds() {
    if (this.guilds) {
      return this.guilds;
    }
    const { data: guilds } = await this.api.get("/users/@me/guilds");
    this.guilds = guilds;
    return guilds;
  }
  async isInGuild(guildId) {
    const guilds = await this.getGuilds();
    return guilds.find((guild) => guild.id === guildId);
  }
}
