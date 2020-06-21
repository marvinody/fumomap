<script context="module">
  export async function preload(page, session) {
    //http://localhost:3000/auth/discord/callback#token_type=Bearer&access_token=DIE72viAsl4qE4woITb7WhNIpbS3La&expires_in=604800&scope=identify+guilds&state=15773059ghq9183habn
    console.log(page);
  }
</script>

<script>
  import { stores } from "@sapper/app";
  import getHashParams from "../../../utils/fragmentParser";
  import DiscordApi from "../../../utils/DiscordApi";
  import { discordServerId } from "../../../constants";
  const { session } = stores();
  import { onMount } from "svelte";

  export let DISCORD_CLIENT_ID;
  const url = `https://discord.com/api/oauth2/authorize?response_type=token&client_id=${DISCORD_CLIENT_ID}&state=15773059ghq9183habn&scope=identify%20guilds`;

  const clickDiscord = event => {
    const nonce = Math.random();
    sessionStorage.setItem("nonce", nonce.toString());
    window.location = url + "&state=" + nonce;
  };
  onMount(async () => {
    const params = getHashParams();
    const api = new DiscordApi(params);
    const [user, guilds] = await Promise.all([api.getUser(), api.getGuilds()]);
    if (await api.isInGuild(discordServerId)) {
      console.log("user is in fumo!");
    }
    console.log({ user, guilds });
  });
</script>

<style>
  h1,
  figure,
  p {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  figure {
    margin: 0 0 1em 0;
  }

  img {
    width: 100%;
    max-width: 400px;
    margin: 0 0 1em 0;
  }

  p {
    margin: 1em auto;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>
