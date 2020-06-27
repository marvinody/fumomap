<script context="module">
  export async function preload(page, session) {
    //http://localhost:3000/auth/discord/callback#token_type=Bearer&access_token=DIE72viAsl4qE4woITb7WhNIpbS3La&expires_in=604800&scope=identify+guilds&state=15773059ghq9183habn
    console.log(page);
  }
</script>

<script>
  import { stores } from "@sapper/app";
  import getHashParams from "../../../utils/fragmentParser";
  import Loading from "../../../components/Loading.svelte";
  const { session } = stores();
  import { onMount } from "svelte";
  import axios from "axios";
  import { goto } from "@sapper/app";

  let loading = true;
  let error = null;
  let username = null;
  let html = null;

  onMount(async () => {
    const params = getHashParams();
    try {
      const { data } = await axios.post("/auth/discord/callback", {
        ...params,
        clientNonce: sessionStorage.getItem("nonce")
      });
      username = data.username;
      html = data.html;
      // if we didn't crash, we know the token is good, so let's save it locally
      $session.discord_token = params.access_token;
      $session.username = username;
      setTimeout(() => {
        goto("/");
      }, 3000);
    } catch (err) {
      console.error(err);
      error = err.response.data.message;
    } finally {
      loading = false;
    }
  });
</script>

<style>

</style>

{#if loading}
  <Loading />
{:else if error !== null}
  <h3>{error}</h3>
{:else}
  {@html html}
{/if}
