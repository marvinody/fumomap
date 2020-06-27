<script>
  import { onMount, createEventDispatcher } from "svelte";

  import storeMap from "../map";
  export let lat;
  export let lon;
  export let zoom;

  let container;
  let map;
  const dispatch = createEventDispatcher();

  onMount(async () => {
    const L = await import("leaflet");

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.6.0/dist/leaflet.css";

    link.onload = () => {
      map = new L.map(container).setView([lat, lon], zoom);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      storeMap.set(map);

      map.on("click", event => {
        console.log("map click");
        dispatch("mapClick", event);
      });
    };

    document.head.appendChild(link);

    return () => {
      map.remove();
      link.parentNode.removeChild(link);
    };
  });
</script>

<style>
  div {
    width: 100%;
    height: 300px;
  }
</style>

<div bind:this={container}>
  {#if map}
    <slot />
  {/if}
</div>
