<script context="module">
  export async function preload() {
    const res = await this.fetch(`/markers.json`);
    const data = await res.json();
    if (res.status === 200) {
      return { markers: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import Map from "../components/Map.svelte";
  import MarkerList from "../components/MarkerList.svelte";
  import LoginLink from "../components/LoginLink.svelte";
  import { stores } from "@sapper/app";

  const { session } = stores();
  export let markers;
  $: isLoggedIn = Boolean($session.discord_token);
  const clickMap = event => {
    console.log("IN INDEX", { event });
    console.log({ latlng: event.detail.latlng });
    if (isLoggedIn) {
      markers = [
        ...markers,
        {
          type: "fumo",
          latlng: { lat: 35.8225, lng: -85.0 + Math.random() }
        }
      ];
    }
    console.log(markers);
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

<Map lat={35} lon={-84} zoom={13} on:mapClick={clickMap}>
  <MarkerList {markers} />
</Map>

<p>
  <strong>
    Try editing this file (src/routes/index.svelte) to test live reloading.
    {#if isLoggedIn}
      Welcome {$session.username}
    {:else}
      <LoginLink text="Login with Discord" />
    {/if}
  </strong>
</p>
