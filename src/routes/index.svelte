<script context="module">
  export async function preload(page, session) {
    return {
      DISCORD_CLIENT_ID: session.DISCORD_CLIENT_ID
    };
  }
</script>

<script>
  import Map from "../components/Map.svelte";
  import FumoMapMarker from "../components/FumoMapMarker.svelte";
  import VisitedMapMarker from "../components/VisitedMapMarker.svelte";
  import { stores } from "@sapper/app";
  import axios from "axios";
  const { session } = stores();

  export let DISCORD_CLIENT_ID;
  const url = `https://discord.com/api/oauth2/authorize?response_type=token&client_id=${DISCORD_CLIENT_ID}&scope=identify%20guilds`;

  const clickDiscord = event => {
    event.preventDefault();
    const nonce = Math.random();
    sessionStorage.setItem("nonce", nonce.toString());
    window.location = url + "&state=" + nonce.toString();
    return;
  };

  const clickLogout = async event => {
    event.preventDefault();
    await axios.post("/auth/logout");
    $session.username = undefined;
    $session.discord_token = undefined;
  };
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

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

<h1>Great success!</h1>

<Map lat={35} lon={-84} zoom={13}>
  <FumoMapMarker lat={35.8225} lon={-84.0024} label="Fumos live here" />
  <VisitedMapMarker lat={35.8225} lon={-84.04} label="Fumos visited here" />

</Map>

<p>
  <strong>
    Try editing this file (src/routes/index.svelte) to test live reloading.
    {#if $session.username}
      Welcome {$session.username}
      <a href="#" on:click={clickLogout}>Logout</a>
    {:else}
      <a href={url} on:click={clickDiscord}>click here for discord</a>
    {/if}
  </strong>
</p>
