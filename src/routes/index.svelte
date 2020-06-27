<script>
  import Map from "../components/Map.svelte";
  import FumoMapMarker from "../components/FumoMapMarker.svelte";
  import VisitedMapMarker from "../components/VisitedMapMarker.svelte";
  import LoginLink from "../components/LoginLink.svelte";
  import { stores } from "@sapper/app";
  const { session } = stores();
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
    {#if $session.discord_token}
      Welcome {$session.username}
    {:else}
      <LoginLink text="Login with Discord" />
    {/if}
  </strong>
</p>
