<script>
  import { onMount, setContext } from "svelte";
  import map from "../map";
  let L;
  export let lat;
  export let lon;
  export let label;

  const addMarker = () => {
    const marker = new L.marker([lat, lon])
      .addTo($map)
      .bindPopup(label)
      .openPopup();
  };
  onMount(async () => {
    L = await import("leaflet");
    addMarker();
  });
</script>
