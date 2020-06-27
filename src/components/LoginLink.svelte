<script>
  import { stores } from "@sapper/app";
  const { session } = stores();
  const url = `https://discord.com/api/oauth2/authorize?response_type=token&client_id=${$session.DISCORD_CLIENT_ID}&scope=identify%20guilds`;

  const clickDiscord = event => {
    console.log($session);
    event.preventDefault();
    const nonce = Math.random();
    sessionStorage.setItem("nonce", nonce.toString());
    window.location = url + "&state=" + nonce.toString();
    return;
  };

  export let text = "login";
</script>

<a href={url} on:click={clickDiscord}>{text}</a>
