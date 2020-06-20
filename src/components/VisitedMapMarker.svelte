<script>
  import { onMount, setContext } from "svelte";
  import map from "../map";
  let L;
  export let lat;
  export let lon;
  export let label;

  const addMarker = () => {
    const blueIcon = new L.Icon.Default({
      iconUrl: "blue-icon.png",
      imagePath: "/marker-icons/"
    });
    console.log({ visited: blueIcon });
    const marker = new L.marker([lat, lon], {
      icon: blueIcon
    })
      .addTo($map)
      .bindPopup(label)
      .openPopup();
  };
  onMount(async () => {
    L = await import("leaflet");
    addMarker();
  });
</script>
