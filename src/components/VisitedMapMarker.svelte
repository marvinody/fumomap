<script>
  import { onMount, setContext } from "svelte";
  import map from "../map";
  let L;
  export let lat;
  export let lng;
  export let label = "A fumo has visited here";

  const addMarker = () => {
    const blueIcon = new L.Icon.Default({
      iconUrl: "blue-icon.png",
      imagePath: "/marker-icons/"
    });
    console.log({ visited: blueIcon });
    const marker = new L.marker([lat, lng], {
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
